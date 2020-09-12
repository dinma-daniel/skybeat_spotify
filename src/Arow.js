import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Arow.css";

function Arow() {
  const [search, setSearch] = useState(" ");
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    let mounted = true;
    async function getArtist() {
      if (mounted) {
        try {
          const artistresult = await axios.get(
            `http://localhost:6999/search?name=${search}`
          );

          const real = artistresult.data;
          if (real.length >= 1) {
            setSearchResult(real);
          }
          console.log(searchResult);
        } catch (e) {
          console.log(e);
        }
      }
    }
    getArtist();
    return function cleanup() {
      mounted = false;
    };
  }, [search]);

  return (
    <div>
      {/* search */}
      <section className="sec">
        <div className="container7">
          <form action="" className="search">
            <input
              className="searc"
              type="search"
              value={search}
              onChange={handleChange}
              placeholder="Search"
            />
          </form>
        </div>
      </section>
      <h1 className="a_header">
        {searchResult.length >= 1 &&
          "TOP TRACKS OF " + searchResult[0].artist.name}
      </h1>

      <section className="artists_body">
        {/* person */}

        <section className="containerr">
          {searchResult.length >= 1 && (
            <img
              className="a_details"
              src={searchResult[0].artist.images[1].url}
            ></img>
          )}
        </section>
        {/* result */}

        <section className="container">
          {searchResult.length >= 1 &&
            searchResult.map((data) => (
              <div className="a_border">
                <div key={data.id}>
                  <img className="a_box" src={data.track.images[1].url}></img>
                  <h1 className="a_text">{data.track.name}</h1>
                </div>
              </div>
            ))}
        </section>
      </section>
    </div>
  );
}

export default Arow;
