//scrape script

var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
    request("http://www.apnews.com/apf-topnews", function(err, res, body){
        var $ = cheerio.load(body);
        var articles = [];

        $(".FeedCard").each(function(i, element){
            var head = $(this).children(".CardHeadline").text().trim();
            var sum = $(this).children(".content").text().trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var datatoAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                
                articles.push(datatoAdd);

            }
        });
        cb(articles);
    });
};
module.exports = scrape;
