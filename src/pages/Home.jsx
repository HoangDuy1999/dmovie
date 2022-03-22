import React from "react";
import Carousel from "../components/Carousel/Carousel";
import HighestRatingMovie from "../components/HighestRatingMovie/HighestRatingMovie";
import HighestRatingTvShow from "../components/HighestRatingTvShow/HighestRatingTvShow";
import MovieUpcoming from "../components/MovieUpcoming/MovieUpcoming";
import Navbar from "../components/Navbar/Navbar";
import NowPlaying from "../components/NowPlaying/NowPlaying";
import TvAiring from "../components/TvAiring/TvAiring";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Dmovie - Home</title>
        <meta name="description" content="Home dmovie" />
      </Helmet>
      <Navbar home={true} />
      <Carousel />
      <NowPlaying />
      <TvAiring />
      <MovieUpcoming />
      <HighestRatingTvShow />
      <HighestRatingMovie />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
