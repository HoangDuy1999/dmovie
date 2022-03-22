import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MovieInfo from "../components/MovieInfo/MovieInfo";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet";
const MovieDetail = () => {
  
  return (
    <div>
       <Helmet>
        <title>Dmovie - MovieDetail</title>
        <meta name="description" content="Movie detail" />
      </Helmet>
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
