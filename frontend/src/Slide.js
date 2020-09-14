import React from "react";
import { Carousel } from "react-bootstrap";
import "./Slide.css";
import andrehunter from "./pics/andrehunter.jpg";
import skybeatt from "./pics/skybeatt.png";
import elicemoore from "./pics/elicemoore.jpg";
import tele from "./pics/tele.png";

function Slide() {
  return (
    <div className="s_border">
      <Carousel>
        <Carousel.Item>
          <h3 className="c_text">welcome to skybeat</h3>
          <img className="d-block w-100" src={skybeatt} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <h3 className="c_text">
            We provide tracks based on popularity rating using the Spotify API
          </h3>
          <img className="d-block w-100" src={andrehunter} alt="second slide" />
        </Carousel.Item>

        <Carousel.Item>
          <h3 className="c_text">
            We provide a search functionality to look for your favourite artist
            using the Spotify API
          </h3>
          <img className="d-block w-100" src={elicemoore} alt="Third slide" />
        </Carousel.Item>

        <Carousel.Item>
          <h3 className="c_text">
            We Provide a Telegram Bot that utilizes the Spotify API
          </h3>
          <img className="d-block w-100" src={tele} alt="fourth slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slide;
