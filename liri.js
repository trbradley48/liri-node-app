require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
var query = process.argv.slice(3, process.argv.length).join(' ');
// console.log(query);

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
          // console.log(query1);
          bandSearch(query1);
        }
        else if (command === 'spotify-this-song') {
          // console.log(query1);
          spotifySearch(query1);
        }
        else if (command === 'movie-this') {
          // console.log(query1);
          movieSearch(query1)
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
  })
}

// name of venue, venue location, time (MM/DD/YYYY)
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

// title of movie, year it came out, imdb rating, rotten tomatoes rating, counrty where movie was produced, language of the movie, plot of the movie, actors in the movie
// if no movie is inputed default to 'Mr. Nobody'
function movieSearch(input) {
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

