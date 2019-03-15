var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    body: {
        //comment text
        type: String
    }
});

//comments in the Article model.  will be listed with an ObjectId, and mongoose will save it.  

//create comment model with CS
var Comment = mongoose.model("Comment", CommentsSchema);

module.exports = Comment;