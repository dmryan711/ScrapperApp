const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type:String,
        required:[true, "A comment text is required"],
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
      }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;