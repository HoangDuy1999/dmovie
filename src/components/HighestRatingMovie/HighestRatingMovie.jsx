import React, { useEffect, useState } from "react";
import "./highestRatingMovie.scss";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CartItem/CartItem";
const HighestRatingMovie = () => {
  const [highestRatingMovie, setHighestRatingMovie] = useState([]);
  // const [page, setPage] = useState(1);
  // const [numItems, setNumItems] = useState(10);
  const getMovies = async () => {
    try {
      const response = await tmdbApi.getHighestRatingMovie({ page: 1 });
      setHighestRatingMovie(response.results.slice(0, 10));
      // console.log("run");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMovies();
    return () =>{
      setHighestRatingMovie([]);
    }
  }, []);
  // console.log(nowPlayingMovies);
  return (
    <div className="high_rate_movie">
      <div className="now_play_top">
        <h1 className="high_rate_movie_tilte">Highest Rated Movies</h1>
        <p
          className="high_rate_movie_description"
          style={{ marginTop: "-10px" }}
        >
          Movies with highest user rating.
        </p>
        <hr style={{ marginTop: "-5px", marginBottom: "20px" }} />
      </div>
      <div className="high_rate_movie_bottom">
        {highestRatingMovie.map((item) => (
          <CarItem item={item} key={item.id} types="movies" colorGroup={{}} />
        ))}
      </div>
    </div>
  );
};

export default HighestRatingMovie;
