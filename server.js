const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 8080;

// // Require all models
const db = require("./models");

// Initialize Express
const app = express();

// Configure middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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



app.post("/addComment",function(req,res){
    console.log(req.body);
    res.sendStatus(200);
    db.Comment.create({ 
        comment:req.body.commentText,
        article: req.body.articleId
    })
    .then(function(comment) {
        // If saved successfully, print the new Library document to the console
        console.log(comment._id);
        return db.Article.findOneAndUpdate({_id:req.body.articleId}, { $push: { comments:comment._id }}, { new: true });
        
    })
    .catch(function(err) {
         // If an error occurs, print it to the console
        console.log(err.message);
    });
});
app.get("/", function(req, res) {
    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://news.ycombinator.com/").then(function(response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);
      // For each element with a "title" class
      $('span.comhead').each(function(i, element){
        var a = $(this).prev();
        var title = a.text();
        var url = a.attr('href');
        var subtext = a.parent().parent().next().children('.subtext').children();
        var username = $(subtext).eq(1).text();
         
        
        // If this found element had both a title and a link
        if (title && url  && username) {
          // Insert the data in the scrapedData db
                db.Article.create({ 
                    headline: title,
                    url:url,
                    author:username
                })
            .then(function(article) {
            // If saved successfully, print the new Library document to the console
                console.log(article);
                
            })
            .catch(function(err) {
                // If an error occurs, print it to the console
                console.log(err.message);
             });
          
          
        }
      });
    });

    db.Article.find({})
    .populate("comments")
    .then(function(articles) {
      // If any Libraries are found, send them to the client with any associated Books
      
      console.log(articles[0].comments[0].comment);
      res.render("index",{content:articles});
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err.message);
    });
   
    
    
    // Send a "Scrape Complete" message to the browser
    //res.render('index',article);
  });





// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });