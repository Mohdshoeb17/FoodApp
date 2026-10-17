
require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

// MongoDB connection
require("./models/db.js");

// Routes
const AuthRouter = require("./Routes/AuthRouter");
const productRouter = require("./Routes/productRouter");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Home Route
app.get("/", (req, res) => {
  res.send("FoodApp Backend is Running!");
});

// API Routes
app.use("/auth", AuthRouter);
app.use("/products", productRouter);

// Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});
