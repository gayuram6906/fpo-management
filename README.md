# FPO Management Frontend

React frontend for the existing Spring Boot FPO Management backend.

Backend expected at:
http://localhost:8081

Frontend:
http://localhost:3000

Run:
npm install
npm start

The app stores the JWT returned by /api/auth/login and automatically sends it as a Bearer token for subsequent API calls.

Note: backend CORS must allow http://localhost:3000 if your SecurityConfig does not already do so.
