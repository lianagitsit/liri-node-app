
require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs-extra');

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

function doWhatItSays(command, title) {

    // See most recent 20 tweets
    if (command === "my-tweets") {
        twitter.get('statuses/user_timeline', { count: 20 }, function (error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log("========================================");
                    console.log(tweets[i].created_at, "\n", tweets[i].text);
                    console.log("========================================");
                }
            }
        });
    
    // Get song info from Spotify
    } else if (command === "spotify-this-song") {

        if (!title) {
            title = "the%20sign%20artist:ace%20of%20base"; // Default
        }

        spotify.search({ type: 'track', query: title }, function (err, data) {
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

    // Get movie info from OMDB
    } else if (command === "movie-this") {

        if (!title) {
            title = "Mr. Nobody"; // Default
        }

        var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + title;
        request(queryURL, function (error, response, body) {
            if (error) {
                return console.log("Error:", error);
            }

            var parsedBody = JSON.parse(body);
            var rotten;

            // Unsure if RT will always be in the same position in the array, so we loop through to find it
            for (var i = 0; i < parsedBody.Ratings.length; i++) {
                if (parsedBody.Ratings[i]["Source"] === "Rotten Tomatoes") {
                    rotten = parsedBody.Ratings[i]["Value"];
                    i = parsedBody.Ratings.length;
                }
            }

            console.log("========================================");
            console.log("========================================");
            console.log("Title:", parsedBody.Title);
            console.log("Year:", parsedBody.Year);
            console.log("Actors:", parsedBody.Actors);
            console.log("IMDB Rating:", parsedBody.imdbRating);
            console.log("Rotten Tomatoes Rating:", rotten);
            console.log("Country:", parsedBody.Country);
            console.log("Language:", parsedBody.Language);
            console.log("Plot:", parsedBody.Plot);
            console.log("========================================");
            console.log("========================================");
        });
    
    // Read from random.txt and execute command there
    } else if (command === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            };

            var dataArray = data.split(",");
            doWhatItSays(dataArray[0], dataArray[1]);
        })
    }
}

doWhatItSays(process.argv[2], process.argv[3]);