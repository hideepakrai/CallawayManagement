const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
 const authController= require("../Server/controller/user/UserController")
const PORT = process.env.PORT || 3000;
// Start server
const server = http.createServer(app);
// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json()); // Middleware to parse JSON-encoded request bodies

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", authController);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
