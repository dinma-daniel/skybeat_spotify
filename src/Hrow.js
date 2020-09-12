import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Hrow.css";

function Hrow() {
  const [Trending, setTrending] = useState([]);
  useEffect(() => {
    async function getTrending() {
      try {
        const trending = await axios.get(
          "http://localhost:6999/trending?limit=9"
        );
        const realTrending = trending.data;
        const data = realTrending.filter((k) => k.preview_url != null);
        setTrending(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    getTrending();
  }, []);

  return (
    <div>
      {/* loop for each song */}
      <section>
        <h3 className="h_head">Top charts</h3>

        <div className="h_border">
          {Trending.length > 0
            ? Trending.map((data) => (
                <div>
                  <img className="box" src={data.images[1].url}></img>
                </div>
              ))
            : ""}
        </div>
      </section>
    </div>
  );
}

export default Hrow;
