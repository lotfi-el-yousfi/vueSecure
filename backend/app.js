const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

const SECRET_KEY = 'q351q5s1d654q65sd65q4s56d456q4s65d465qs45d6465q4sd65465q4sd'; // Replace with a strong secret

// Read the database (db.json)
const readData = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// Authentication middleware
const authenticateToken = (req, res, next) => {

  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
app.post('/endpoints', authenticateToken, (req, res) => {
  console.log(res.headers);
  const data = readData();
  const endpoints = Object.keys(data).map(objectName => {
    // return [
    //   { method: 'GET', path: `/${objectName}` },
    //   { method: 'POST', path: `/${objectName}` },
    //   { method: 'PUT', path: `/${objectName}/:id` },
    //   { method: 'DELETE', path: `/${objectName}/:id` }
    // ];
    return objectName
  }).flat();
  res.json(endpoints);
});
// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== 'admin' || password !== 'admin') return res.status(403).send('Invalid credentials');

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Generate dynamic routes
const createCrudRoutes = (objectName) => {
  // GET: Fetch all items
  app.get(`/${objectName}`, authenticateToken, (req, res) => {
    const data = readData();
    if (!data[objectName]) return res.status(404).send(`${objectName} not found`);

    res.json(data[objectName]);
  });

  // POST: Add a new item
  app.post(`/${objectName}`, authenticateToken, (req, res) => {
    const data = readData();
    if (!data[objectName]) return res.status(404).send(`${objectName} not found`);

    const newItem = {
      id: data[objectName].length + 1,
      ...req.body
    };
    data[objectName].push(newItem);
    writeData(data);
    res.status(201).json(newItem);
  });

  // PUT: Update an item by ID
  app.put(`/${objectName}/:id`, authenticateToken, (req, res) => {
    const data = readData();
    if (!data[objectName]) return res.status(404).send(`${objectName} not found`);

    const { id } = req.params;
    const itemIndex = data[objectName].findIndex(item => item.id === parseInt(id));

    if (itemIndex === -1) return res.status(404).send(`${objectName.slice(0, -1)} not found`);

    data[objectName][itemIndex] = { ...data[objectName][itemIndex], ...req.body };
    writeData(data);
    res.json(data[objectName][itemIndex]);
  });

  // DELETE: Remove an item by ID
  app.delete(`/${objectName}/:id`, authenticateToken, (req, res) => {
    const data = readData();
    if (!data[objectName]) return res.status(404).send(`${objectName} not found`);
    console.log(objectName, req.params);
    const { id } = req.params;
    const itemIndex = data[objectName].findIndex(item => parseInt(item.id) === parseInt(id));

    if (itemIndex === -1) return res.status(404).send(`${objectName.slice(0, -1)} not found`);

    const removedItem = data[objectName].splice(itemIndex, 1);
    writeData(data);
    res.json(removedItem);
  });
};

// Initialize routes dynamically based on db.json
const initializeRoutes = () => {
  const data = readData();
  const objectNames = Object.keys(data);

  objectNames.forEach(objectName => {
    createCrudRoutes(objectName);
  });
};

// Start the server and initialize the routes
app.listen(9090, () => {
  initializeRoutes();
  console.log('Server running on port 9090');
  console.log('http://localhost:9090/');
  console.log('http://localhost:9090/login');
  console.log(`//////////////////////////////////////////////////////////////////`);

  const data = readData();
  const objectNames = Object.keys(data);

  objectNames.forEach(objectName => {
    console.log(`CRUD Endpoints for ${objectName}:`);
    const endpoints = [
      `GET /${objectName}`,
      `POST /${objectName}`,
      `PUT /${objectName}/:id`,
      `DELETE /${objectName}/:id`,
    ];
    endpoints.forEach(endpoint => console.log(`  ${endpoint}`));
    console.log(`//////////////////////////////////////////////////////////////////`);
  });


});

