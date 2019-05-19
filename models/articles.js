const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {
        type:String,
        required:[true, "A headline is required for an article document"],
        unique:true
    },
    summary: {
        type:String,
        required:[true,"A summary is required for an article document"]
    },
    url: {
        type:String,
        required:[true,"A URL is required for an article document"]
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;