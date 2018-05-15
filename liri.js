require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
const keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var request = require("request");
const chalk = require("chalk");
var chalkRainbow = require("chalk-rainbow");
var fs = require("fs");

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
        writeToFile("------");
        writeToFile(tweets[i].text + "-" + tweets[i].created_at);
        writeToFile("------");
        console.log(
          chalk.bgRgb(0, 132, 180)(
            chalk.white(tweets[i].text + "-" + tweets[i].created_at)
          )
        );

        console.log(chalkRainbow("------"));
      }
    }
  });
}

function mySpotify(content = "'The Sign' 'Ace of Base'") {
  spotify.search({ type: "track", query: content }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    const song = data.tracks.items[0];
    writeToFile("------");
    writeToFile("Artist: " + song.artists[0].name);
    writeToFile("Song: " + song.name);
    writeToFile("URL: " + song.preview_url);
    writeToFile("Album: " + song.album.name);
    writeToFile("------");

    spotifyLog("Artist: " + song.artists[0].name);
    spotifyLog("Song: " + song.name);
    spotifyLog("URL: " + song.preview_url);
    spotifyLog("Album: " + song.album.name);
  });
}

function spotifyLog(myString) {
  console.log(chalk.bgHex("#1db954")(chalk.hex("#191414")(myString)));
}

function movies(content = "Mr.Nobody") {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + content + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    var movie = JSON.parse(body);
    var console = writeToFile("------");
    writeToFile("Title: " + movie.Title);
    writeToFile("Release Year: " + movie.Year);
    writeToFile("IMDB Rating: " + movie.imdbRating);
    writeToFile("Rotten Tomatoes: " + movie.Ratings[1].Value);
    writeToFile("Country: " + movie.Country);
    writeToFile("Language: " + movie.Language);
    writeToFile("Plot: " + movie.Plot);
    writeToFile("Actors: " + movie.Actors);
    writeToFile("------");

    movieLog("Title: " + movie.Title);
    movieLog("Release Year: " + movie.Year);
    movieLog("IMDB Rating: " + movie.imdbRating);
    movieLog("Rotten Tomatoes: " + movie.Ratings[1].Value);
    movieLog("Country: " + movie.Country);
    movieLog("Language: " + movie.Language);
    movieLog("Plot: " + movie.Plot);
    movieLog("Actors: " + movie.Actors);
  });
}

function movieLog(myString) {
  console.log(chalk.bgHex("#deb522")(chalk.hex("#0c0b00")(myString)));
}

function random() {
  var result = [];

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(error);
    }

    result = data.split(",");
    var executeString = "Now executing " + result[0];
    executeString += result[1] ? " with content of: " + result[1] : "";
    console.log(chalkRainbow(executeString));
    callCommands(result[0], result[1]);
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
    case "rainbow":
      rainbowPad("");
      content.split(" ").forEach(phrase => rainbowPad(phrase));
      rainbowPad("");
      break;
    default:
      rainbowPad(
        `        ^^^^^^^^^^^^^^^^^^^^^^^^
      < I am a majestic unicorn! >
        ------------------------

              *\\    
                \\   
              /.((( 
              (,/"(((__,--.
                  \  ) _( /{ 
                  !|| " :||      
                  !||   :|| 
                  '''   '''   
      ------------------------------`
      );
  }
}

var writeToFile = function(input) {
  fs.appendFile("log.txt", "\n" + input, function(err) {
    // If an error was experienced we say it.
    if (err) {
      console.log(err);
    }
  });
};

const rainbowPad = myString => {
  console.log(
    chalkRainbow(
      myString.padStart(50 + myString.length / 2, "_").padEnd(100, "_")
    )
  );
};

callCommands(process.argv[2], process.argv[3]);
