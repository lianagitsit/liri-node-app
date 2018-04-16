
require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);


var command = process.argv[2];
var title = process.argv.slice(3);

if (command === "my-tweets"){
    twitter.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++){
                console.log("========================================");
                console.log(tweets[i].created_at, "\n", tweets[i].text);
                console.log("========================================");
            }
        }
      });
} else if (command === "spotify-this-song"){
    // Artist, song name, preview link, album
    spotify.search({ type: 'track', query: title }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("========================================");
        console.log("========================================");
        console.log("Artist:", data.tracks.items[0].artists[0].name); 
        console.log("Song:", data.tracks.items[0].name); 
        console.log("Album:", data.tracks.items[0].album.name); 
        console.log("Preview:", data.tracks.items[0].preview_url); 
        console.log("========================================");
        console.log("========================================");
    });
}