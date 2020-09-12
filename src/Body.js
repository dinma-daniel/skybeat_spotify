import React from "react";
import "./Body.css";
import Hrow from "./Hrow";
import Slide from "./Slide";

function Body() {
  return (
    <div className="content">
      <div className="body_row">
        <h3 className="header">Home</h3>
        <Slide />
        <Hrow />
      </div>
    </div>
  );
}

export default Body;
