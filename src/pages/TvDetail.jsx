import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MovieInfo from "../components/MovieInfo/MovieInfo";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet";
const TvDetail = () => {
  const [movieId, setMovieId] = useState(useParams().movieId);
  const handleChangeMovieId = function (id) {};

  console.log(useParams().movieId);
  return (
    <div>
      <Helmet>
        <title>Dmovie - SerieDetail</title>
        <meta name="description" content="Get series detail" />
      </Helmet>
      <Navbar />
      <MovieInfo
        category="tv"
        id={movieId}
        onChangeMovieId={handleChangeMovieId}
      />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default TvDetail;
