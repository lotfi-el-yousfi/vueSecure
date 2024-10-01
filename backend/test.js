// Replace with your server URL if different
const apiBaseUrl = 'http://localhost:9090';

// Variable to store the JWT token
let token = '';

// Function to perform the login
async function login(username, password) {
  try {
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    token = data.token; // Store the token for future requests
    console.log('Login successful! Token:', token);
  } catch (error) {
    console.error('Error during login:', error);
  }
}

// Function to fetch the available endpoints
async function fetchEndpoints() {
  if (!token) {
    console.error('You must log in first.');
    return;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/endpoints`, {
      method: 'GET',
      headers: {
        'Authorization': token, // Pass the token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch endpoints');
    }

    const endpoints = await response.json();
    console.log('Available endpoints:', endpoints);
  } catch (error) {
    console.error('Error fetching endpoints:', error);
  }
}

// Example usage:
(async () => {
  // Perform login
  await login('admin', 'admin'); // Replace with actual credentials

  // Fetch the endpoints
  await fetchEndpoints();
})();
