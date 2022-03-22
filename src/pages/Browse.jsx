import React from "react";
import BrowseInfo from "../components/BrowseInfo/BrowseInfo";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet";

const Browse = () => {
  return (
    <div>
      <Helmet>
        <title>Dmovie - Browse</title>
        <meta name="description" content="get list movies by category" />
      </Helmet>
      <Navbar />
      <BrowseInfo />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Browse;
