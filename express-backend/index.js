const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow credentials
app.use(cors({
  origin: true, // Replace with your frontend URL
  credentials: true // Allow credentials (cookies)
}));

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Mr. Vipin Kushwaha', { 
    maxAge: 900000, 
    httpOnly: true, 
    secure: true, // Set to true if using HTTPS
    sameSite: 'None' // Necessary for cross-site cookies
  });
  res.status(200).json({ message: 'Cookie set successfully' });
});

// Route to retrieve the cookie
app.get('/get-cookie', (req, res) => {
  const cookie = req.cookies['username'];
  if (cookie) {
    res.status(200).json({ message: `Cookie retrieved: ${cookie}` });
  } else {
    res.status(404).json({ message: 'No cookie found' });
  }
});

// Route to send JSON data with different HTTP status codes
app.get('/status/:code', (req, res) => {
  const code = parseInt(req.params.code, 10);
  if ([200, 201, 400, 404, 500].includes(code)) {
    res.status(code).json({ message: `Response with status code ${code}` });
  } else {
    res.status(400).json({ message: 'Invalid status code' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
