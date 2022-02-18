import React from "react";
import BrowseInfo from "../components/BrowseInfo/BrowseInfo";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
const Browse = () => {
  return (
    <div>
      <Navbar />
      <BrowseInfo />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Browse;
