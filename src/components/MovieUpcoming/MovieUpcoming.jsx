import React, { useEffect, useState } from "react";
import "./movieUpcoming.scss";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CartItem/CartItem";
const MovieUpcoming = () => {
  const [nowMovieUpcomings, setNowMovieUpcomings] = useState([]);
  // const [page, setPage] = useState(1);
  // const [numItems, setNumItems] = useState(10);
  const getMovies = async () => {
    try {
      const response = await tmdbApi.getMovieUpcoming({ page: 1 });
      setNowMovieUpcomings(response.results.slice(0, 10));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMovies();
    return () => {
      setNowMovieUpcomings([]); // This worked for me
    };
  }, []);
  // console.log(nowMovieUpcomings);
  return (
    <div className="movie_up_coming">
      <div className="movie_up_coming_top">
        <h1 className="movie_up_coming_tilte">Movie Upcoming</h1>
        <hr style={{ marginTop: "-5px", marginBottom: "20px" }} />
      </div>
      <div className="movie_up_coming_bottom">
        {nowMovieUpcomings.map((item) => (
          <CarItem item={item} key={item.id} types="movies" colorGroup={{}} />
        ))}
      </div>
    </div>
  );
};

export default MovieUpcoming;
