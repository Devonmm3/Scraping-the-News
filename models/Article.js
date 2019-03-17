//require mongoose database
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    //title
    title: {
        type: String,
        required: true,
        unique: true
    },
    //description
    description: {
        type: String,
        required: true,
        unique: true
    },
    //save articles
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    //save array of comments
    comments:[{
        type: Schema.OjectId,
        ref:"Comment"
    }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;