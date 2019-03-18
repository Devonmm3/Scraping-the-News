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

    link: {
        type: String,
        required: true
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
        type: Schema.Types.OjectId,
        ref:"Comment"
    }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;