import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MovieInfo from "../components/MovieInfo/MovieInfo";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
const MovieDetail = () => {
  
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
