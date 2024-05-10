const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const userAuth = require('./controller/user/UserController');

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true,
}));


  
// Export the app
module.exports = app;
