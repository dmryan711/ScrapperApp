const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = 3000;

// // Require all models
let db = require("./models");

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populate", { useNewUrlParser: true });


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });