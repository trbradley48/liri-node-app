require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
// var songQuery = "enter sandman";
// var artist = 'August burns red';
// var bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// var movie = "remember the titans";
// var movieQuery = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
var search = process.argv[2];
var query = process.argv.slice(3, process.argv.length).join(' ');
console.log(query);

function liri(search) {
  if (search === 'concert-this') {
    // var bandQuery = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"
    bandSearch(query);
  }
  else if (search === 'spotify-this-song') {
    spotifySearch(query);
  }
  else if (search === 'movie-this') {
    movieSearch(query);
  }
  else if (search === 'do-what-it-says') {
    fs.readFile("random.txt", 'utf8', function (err, contents) {
      newContents = contents.split(',');
      command = newContents[0];
      query = newContents[1];
      input = newContents.join(' ');
      console.log(input);
      if (err) {
        return console.log(err);
      }
      else {
        if (command === 'concert-this') {
          newInput = contents.slice(0, [])
          console.log(query);
          bandSearch(query);
        }
        else if (command === 'spotify-this-song') {
          console.log(query);
          spotifySearch(query);
        }
        else if (command === 'movie-this') {
          console.log(query);
          movieSearch(query)
        }
      }
    })
  }
}

liri(search);

function spotifySearch(input) {
  spotify.search({ type: 'track', query: input }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    artist = data.tracks.items[0].artists[0].name;
    song = data.tracks.items[0].name;
    preview = data.tracks.items[1].preview_url;
    album = data.tracks.items[0].album.name;
    console.log("Artist: " + artist);
    console.log("Song Title: " + song);
    console.log("Preview: " + preview);
    console.log("Album: " + album);

    // if no song is inputed default to 'The Sign' by Ace of Base
  })
}

// name of venue, venue location, time (MM/DD/YYYY)
function bandSearch(input) {
  bandQuery = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
  axios.get(bandQuery).then(
    function (response) {
      // console.log(response);
      venueName = response.data[0].venue.name;
      venueCity = response.data[0].venue.city;
      venueTime = response.data[0].datetime;
      console.log("Name of Venue: " + venueName);
      console.log("Location: " + venueCity);
      console.log("Time: " + venueTime);
    })
    .catch(err => console.log(err));
}

// title of movie, year it came out, imdb rating, rotten tomatoes rating, counrty where movie was produced, language of the movie, plot of the movie, actors in the movie
// if no movie is inputed default to 'Mr. Nobody'
function movieSearch(input) {
  movieQuery = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"
  axios.get(movieQuery).then(
    function (response) {
      // console.log(response);
      movieTitle = response.data.Title;
      movieYear = response.data.Year
      imdbRating = response.data.imdbRating;
      rottenRating = response.data.Ratings[1].Value;
      movieCountry = response.data.Country;
      movieLanguage = response.data.Language;
      moviePlot = response.data.Plot;
      movieActors = response.data.Actors;
      console.log("Movie Title: " + movieTitle);
      console.log("Release year: " + movieYear);
      console.log("imdb Rating: " + imdbRating);
      console.log("Rotten Tomatoes Rating: " + rottenRating);
      console.log("Country produced: " + movieCountry);
      console.log("Languange: " + movieLanguage);
      console.log("Plot: " + moviePlot);
      console.log("Actors: " + movieActors);
    })
    .catch(err => console.log(err));
}

