import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navigation">
      <Link to="/">
        <div className="imag"></div>
      </Link>

      <Link to="/">
        <div className="navs">Home</div>
      </Link>

      <Link to="/Trending">
        <div className="navs">Trend</div>
      </Link>

      <Link to="/Artists">
        <div className="navs">Artists</div>
      </Link>

      <a href="https://t.me/SkybeatBot">
        <div className="navs">Bot</div>
      </a>
    </div>
  );
}

export default Nav;
