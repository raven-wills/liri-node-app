require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
const keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var request = require("request");

function Tweets() {
  var client = new Twitter(keys.twitter);

  var params = { screen_name: "RavenWills4" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text + "-" + tweets[i].created_at);

        console.log("------");
      }
    }
  });
}

function mySpotify(content = "'The Sign' 'Ace of Base'") {
  spotify.search({ type: "track", query: content }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
  });
}

function movies(content = "Mr.Nobody") {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + content + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  });
}

function random() {
  var fs = require("fs");
  var result = [];

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(error);
    }

    result = data.split(",");

    callCommands(result[0], result[1]);
    console.log(result);
  });
}

function callCommands(command, content) {
  switch (command) {
    case "my-tweets":
      Tweets();
      break;
    case "spotify-this-song":
      mySpotify(content);
      break;
    case "movie-this":
      movies(content);
      break;
    case "do-what-it-says":
      random();
      break;
    default:
      console.log("Something fun.");
  }
}

callCommands(process.argv[2], process.argv[3]);
