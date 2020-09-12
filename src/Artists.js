import React from "react";
import Nav from "./Nav";
import "./Artists.css";
import ArtistBody from "./ArtistBody";

function Artists() {
  return (
    <div className="artist_body">
      <Nav />
      <ArtistBody />
    </div>
  );
}

export default Artists;
