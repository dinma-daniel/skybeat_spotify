//inbuilt packages
const path = require("path");
const fs = require("fs");

//external packages
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());

require("./skybeatbot/bot");

const client = require("spotify-api.js");
const spot = new client.Client("NO TOKEN"); //keep it like that
const spotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new spotifyWebApi();

//get a new token every five minutes
setInterval(async () => {
  token = await spot.oauth.get({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
  console.log("token", token);
}, 300000);

app.use("/", express.static(path.join(__dirname, "build")));

/// test every new endpoint before placing in controller and routees
app.get("/search", async (req, res, next) => {
  // ENSURE TOKEN IS WORKING

  if (!req.query.name) {
    const error = new Error(
      "Provide Name in the query parameter:::   ?name='olamide' "
    );
    error.statusCode = 400;
    next(error);
  }
  const spotify = new client.Client(token);

  spotifyApi.setAccessToken(token);
  //START USING WRAPPERS

  try {
    const artist = await spotify.artist.search(req.query.name, "3");
    if (typeof artist != "object") {
      const error = new Error("No Artist with that Name.");
      error.statusCode = 400;

      next(error);
    }
    console.log(artist);
    const topTracks = await spotify.artist.top(artist[0].id);

    let newArray = topTracks.tracks.map(myFunction);

    function myFunction(track) {
      return {
        artist: {
          name: artist[0].name,
          images: artist[0].images,
          genres: artist[0].genres,
        },
        track: {
          id: track.id,
          name: track.name,
          popularity: track.popularity,
          images: track.album.images,
          preview_url: track.preview_url,
        },
      };
    }

    res.send(newArray);
  } catch (e) {
    console.log(e);
  }
});

app.get("/trending", async (req, res, next) => {
  if (!req.query.limit) {
    const error = new Error(
      "Provide a limit in the query parameter,  /trending?limit=56 "
    );
    error.statusCode = 400;
    next(error);
  }

  // ENSURE TOKEN IS WORKING
  const spotify = new client.Client(token);
  spotifyApi.setAccessToken(token);
  //START USING WRAPPERS

  try {
    const track = await spotify.playlist.tracks(
      "6UeSakyzhiEt4NB3UAd6NQ",
      req.query.limit
    );
    let newarray = track.map(myFunction);

    function myFunction(track) {
      return {
        id: track.track.id,
        name: track.track.name,
        preview_url: track.track.preview_url,
        popularity: track.track.popularity,
        images: track.track.album.images,
        artists: track.track.album.artists,
      };
    }
    newarray.sort((a, b) =>
      a.popularity < b.popularity
        ? 1
        : a.popularity === b.popularity
        ? a.name > b.name
          ? 1
          : -1
        : -1
    );
    res.status(200).send(newarray);
  } catch (e) {
    console.log(e);
  }
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 401;
  const message = error.message;
  res.status(status).json({ message: message });
});

app.use((req, res, next) => {
  res.sendFile(__dirname + "/public/index.html");
});

port = 6999 || process.env.PORT;
//token seetings
let token;
(async () => {
  token = await spot.oauth.get({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
  console.log("token", token);
  app.listen(port, () => {
    console.log("connected");
  });
})();
