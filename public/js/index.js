$(document).ready(function() {
    $(".navbar-burger").toggleClass("is-active");
$(".dropdown").toggle();
$(".dropdown").toggleClass("is-open");
});

//articles are grabbed as json as page loads
$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#scrape-results").prepend("<div class='result-div'><p class='result-text'>" +data[i].title + "<br>" + data[i].description + "</p><button class='save-article button is-info is-medium' data-id'"+ data[i]._id + "'><span class='icon'><i class='fa fa-bookmark'></i></span>Save Sup Article,/button></div.");
    }
});

//button to save the article so the user can save it.  article model needs to go from flase to true

$(document).on("click", ".save-article", function() {
    $(this).children("span.icon").children("i.fa-bookmark").removeClass("fa-bookmark").addClass("fa-check-circle");
    var articleID = $(this).attr("Data-id");
    console.log(articleID);

    $.ajax({
        method: "POST",
        url: "/save/" + articleID,
        data: {
            saved: true
        }
    }).done(function(data) {
        console.log("Data: ", data);
    });
});


//making it mobile responsice with the hamburger bulma menu
