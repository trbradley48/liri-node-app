# liri-node-app

Technologies used: node.js, axios, spotify api

## About

Liri is a command line - Language Interprotation and Recognition Interface. Similar to SIRI, Liri takes in commands such as the following:

- concert-this "Instert band"
- spotify-this-song "Insert song"
- movie-this "Insert movie"
- do-what-it-says 

Executing one of the above commands will run an API query for each particular command, respecitively. The "do-what-it-says" command will read a text file named, "random.txt" that can take in any of the first 3 commands in the following format: 

```
Command,"band/artist/movie"
```

Below is a screenshot of the commands used and their corresponding outputs:

![Demo of Liri](Assignment-10-Demo.PNG)

## Cloning the repo

**Note**: Once you have the repo cloned locally, you need to create a **keys.js** file in the repo's root in order for the app to work. The contents of **keys.js** must be:

```
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var keys = require("./keys.js");
```

**Note**: You will also need to create a file **.env** which will contains the keys obtain from Spotify. The contents of this file must be:

```
# Spotify API keys

SPOTIFY_ID=<Your ID Here>
SPOTIFY_SECRET=<Your Secret Here>
```



**Note**: You will also need to create a file called **.gitignore** which should contain the following:

```
node_modules
.DS_Store
.env
```

Once the above files have been created, run:

```
npm install
```
in the directory of the cloned github folder in order to acquire the necessary node modules required to run this program.


