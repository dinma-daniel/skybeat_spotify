import React from "react";
import "./ArtistBody.css";
import Arow from "./Arow";

function ArtistBody() {
  return (
    <div className="artist_content">
      <div className="body_row"></div>
      <h3 className="header">Artists </h3>
      <h3 className="a_header">Search for any Artists </h3>
      <Arow />
    </div>
  );
}

export default ArtistBody;
