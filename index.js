
require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
// var spotify = new Spotify(keys.spotify);
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


var command = process.argv[2];

var params = {count: 20};
if (command === "my-tweets"){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++){
                console.log(tweets[i].created_at, "\n", tweets[i].text);
            }
        }
      });
}