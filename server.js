//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
//models
var Comments = require ("./models/userComments.js");
var Article = require ("./models/articals.js");
//route controllers
var htmlRouter = require("./controllers/html-routes.js");
var articleRouter = require("./controllers/articles-routes.js");
//scraping
var request = require("request");
var cheerio = require("cheerio");
//setting mongoose for ES6 promise
mongoose.Promise = Promise;
//express
var port = process.env.PORT || 3000;
var app = express();
//body parser
app.use(bodyParser.urlencoded({
    extended: false
}))
//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars");
//routes
app.use("/", htmlRouter);
app.use("/", articleRouter);
//"pubilc" becomes static
app.use(express.static("public"));
//config database w/mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var database = mongoose.connection;
//show successful MG connection
database.once("open", function() {
    console.log("Moongoose connection succesfully completed.");
    });
//show MG errors
database.on("error", function(error) {
    console.log("Mongoose Error, Please see: ", error);
})

//listen
app.listen(port, function() {
    console.log("App running on port 3000");
});
