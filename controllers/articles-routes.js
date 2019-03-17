var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var Comment = require("../models/Comments.js")
var Article = require("../models/Article.js");
var router = express.Router();

//homepage

//scraping needed data from Betches sup/save to mongo
router.get("/scrape", function(req, res) {
    request("https://betches.com/the-sup/", function(error, response, html) {
        var $ = cheerio.load(html);

        $("div.archiveList > article").each(function(i, element) {
            var result = {};
            //get title&description of each article, save them within the result object.  result.title saves the <a> tag from betches
            result.title = $(element).children("div.item-info").children("h2.title").html();
            //result.description saves the text
                    result.description = $(element).children("div.item-info").children("p.teaser").children("a").text();
            
            //new entry, article model

            var entry = new Article(result);

            entry.save(function(err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(doc);
                }
            });
        });
        res.redirect("/");
    });
});

router.get("/articles", function(req, res) {
    Article.find({})
    .exec(function(err, doc) {
        if (err) {
            console.log(error);
        }
        else {
            res.json(doc);
        }
    });
});

router.post("/save/:id", function(req,res) {
    //need article id update saved property to true, as it needs to be.

    Article.findOneAndUpdate({ "_id": req.params.id }, {"saved": true})
    //query goes
    .exec(function(err, doc) {
        //errors
        if (err) {
            console.log(err);
        }
        else {
            console.log("doc: ", doc);
        }
    });
});

//articles

//objectid used to get the article

router.get("/articles/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id })
    .populate("comments")
    .exec(function(error, doc) {
        //error
        if (error) {
            console.log(error);
        }
        else {
            res.json(doc);
        }
    });
});

//new comment
router.post("/comment/:id", function(req,res) {
    var newComment = new Comment(req.body);
    newComment.save(function(error, newComment) {
        if (error) {
            console.log(error);
        }
        else {
            Article.findOneAndUpdate({"_id": req.params.id}, { $push: { "comments": newComment._id }}, {new: true})
            .exec(function(err,doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("doc: ", doc);
                    res.send(doc);
                }
            });
        }
    });
});

//remove
router.post("/unsave/:id", function(req, res) {
    Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": false })
    .exec(function(err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Article has been Removed");
        }
    });
    res.redirect("/saved");
});

module.exports = router;