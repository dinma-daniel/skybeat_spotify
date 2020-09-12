import React from "react";
import "./Trending.css";
import Nav from "./Nav";
import TrendBody from "./TrendBody";

function Trending() {
  return (
    <div className="trend_body">
      <Nav />
      <TrendBody />
    </div>
  );
}

export default Trending;
