import React, { useEffect, useState } from "react";
import "./nowPlaying.scss";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CardItem/CardItem";
const NowPlayings = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  // const [page, setPage] = useState(1);
  // const [numItems, setNumItems] = useState(10);
  const getMovies = async () => {
    try {
      const response = await tmdbApi.getNowPlaying({ page: 1 });
      setNowPlayingMovies(response.results.slice(0, 10));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMovies();
    return () => {
      setNowPlayingMovies([]); // This worked for me
    };
  }, []);
  console.log(nowPlayingMovies);
  return (
    <div className="now_playings">
      <div className="now_play_top">
        <h1 className="now_playing_tilte">Now Playing</h1>
        <p className="now_playing_description" style={{ marginTop: "-10px" }}>
          Movies that are currently playing in theaters.
        </p>
        <hr style={{ marginTop: "-5px", marginBottom: "20px" }} />
      </div>
      <div className="now_play_bottom">
        {nowPlayingMovies.map((item) => (
          <CarItem item={item} key={item.id} types="movies" colorGroup={{}} />
        ))}
      </div>
    </div>
  );
};

export default NowPlayings;
