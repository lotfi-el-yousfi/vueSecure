@echo off
start "Dev Server" cmd /k "npm run dev"
start "App Server" cmd /k "cd backend && node app.js"