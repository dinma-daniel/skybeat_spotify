import React from "react";
import "./App.css";
import Nav from "./Nav";
import Body from "./Body";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Trending from "./Trending";
import Artists from "./Artists";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Trending" component={Trending} />
          <Route path="/Artists" component={Artists} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="app_body">
    <Nav />
    <Body />
  </div>
);

export default App;
