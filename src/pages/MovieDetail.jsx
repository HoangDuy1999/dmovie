import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MovieInfo from "../components/MovieInfo/MovieInfo";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
const MovieDetail = () => {
  // const [movieId, setMovieId] = useState(useParams().movieId);
  // const handleChangeMovieId = function (id) {
  //   console.log("set lại movieid");
  //   console.log("cái qq j v: " + id);
  //   setMovieId(() => id);
  // };

  // console.log(useParams().movieId);
  return (
    <div>
      <Navbar />
      <MovieInfo
        // id={movieId}
        category="movie"
        // onChangeMovieId={handleChangeMovieId}
      />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MovieDetail;
