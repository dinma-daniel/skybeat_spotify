import React from "react";
import "./TrendBody.css";
import Vrow from "./Vrow";

function TrendBody() {
  return (
    <div className="Trend_content">
      <div className="body_row"></div>
      <h3 className="header">Trending </h3>
      <Vrow />
    </div>
  );
}

export default TrendBody;
