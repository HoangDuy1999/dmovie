import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import NewsList from "../components/NewsList/NewsList";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const News = () => {
  return (
    <div>
      <Navbar />
      <NewsList />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default News;
