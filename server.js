const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = 3000;

// // Require all models
const db = require("./models");

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

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.get("/",function(req,res){

    db.articles.create({ 
        headline: "headline 1",
        summary:"Salt",
        url: "Care"
    
    })
    .then(function(article) {
      // If saved successfully, print the new Library document to the console
      console.log(article);
      res.json({testDocCreated:"true"});
    })
    .catch(function(err) {
      // If an error occurs, print it to the console
      console.log(err.message);
      res.json({testDocCreated:"false", error:err.message});
    });  
    
    
});
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });