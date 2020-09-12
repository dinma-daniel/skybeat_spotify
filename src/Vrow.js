import React, { useState, useEffect } from "react";
import "./Vrow.css";
import axios from "axios";

function Vrow() {
  const [Trending, setTrending] = useState([]);
  useEffect(() => {
    async function getTrending() {
      try {
        const trending = await axios.get(
          "http://localhost:6999/trending?limit=32"
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
      <h1 className="t_head">Top Hits</h1>
      {Trending.length > 0
        ? Trending.map((data) => (
            <section>
              <div key={data.id}>
                <div className="t_border">
                  <div>
                    <img className="t_box" src={data.images[1].url}></img>
                  </div>
                  <h1 className="t_text">{data.name}</h1>
                  <audio className="t_audio" controls>
                    <source className="aud" src={data.preview_url} />
                  </audio>
                </div>
              </div>
            </section>
          ))
        : ""}
    </div>
  );
}

export default Vrow;
