import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import NewsInfo from "../components/NewsInfo/NewsInfo";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const NewsDetail = () => {
  return (
    <div>
      <Navbar />
      <NewsInfo />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NewsDetail;
