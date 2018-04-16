
require("dotenv").config();
var keys = require('./keys.js'); 
var Twitter = require('twitter');
// var spotify = new Spotify(keys.spotify);
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


var command = process.argv[2];
if (command === "my-tweets"){
    client.get('statuses/home_timeline', function(error, tweets, response) {
        console.log("response here");
        console.log(tweets);
        if (!error) {
          console.log(tweets);
        }
      });
}