import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ListInfo from "../components/ListInfo/ListInfo";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
const ListMovie = () => {
  return (
    <div>
      <Navbar />
      <ListInfo />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ListMovie;
