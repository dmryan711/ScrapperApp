const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {
        type:String,
        required:[true, "A headline is required for an article document"],
        //unique:true
    },
    url: {
        type:String,
        required:[true,"A URL is required for an article document"]
    },
    author:{
        type: String,
        required:[true,"An author is required for an article document"]
    },
    comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment"
        } 
      ]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;