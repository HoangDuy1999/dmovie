import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import NewsList from "../components/NewsList/NewsList";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet";
const News = () => {
  return (
    <div>
      <Helmet>
        <title>Dmovie - News</title>
        <meta name="description" content="Get list newspaper" />
      </Helmet>
      <Navbar />
      <NewsList />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default News;
