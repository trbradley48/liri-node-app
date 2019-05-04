// Initialize variables and npm stuff
require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
var query = process.argv.slice(3, process.argv.length).join(' ');

// Main function to decide which search to execute
function liri(search) {
  if (search === 'concert-this') {
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
      query1 = query.replace(/['"]+/g, '');
      if (err) {
        return console.log(err);
      }
      else {
        if (command === 'concert-this') {
          bandSearch(query1);
        }
        else if (command === 'spotify-this-song') {
          spotifySearch(query1);
        }
        else if (command === 'movie-this') {
          movieSearch(query1)
        }
      }
    })
  }
}

liri(search);

// Function for spotify search
function spotifySearch(input) {
  if (input !== '') {
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
    })
  }
  else {
    input = "The Sign";
    spotifySearch(input);
  }
}

// Function for concert search
function bandSearch(input) {
  bandQuery = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
  axios.get(bandQuery).then(
    function (response) {
      venueName = response.data[0].venue.name;
      venueCity = response.data[0].venue.city;
      time = response.data[0].datetime;
      var convertedDated = moment(time)
      venueDate = convertedDated.format("MM/DD/YYYY");
      console.log("Name of Venue: " + venueName);
      console.log("Location: " + venueCity);
      console.log("Date: " + venueDate);
    })
    .catch(err => console.log(err));
}

// Function for movie search
function movieSearch(input) {
  if (input !== '') {
    movieQuery = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"
  axios.get(movieQuery).then(
    function (response) {
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
  else {
    input = "Mr. Nobody";
    movieSearch(input);
  }
}

