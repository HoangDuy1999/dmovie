import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { useParams } from "react-router-dom";
import FavoriteInfo from "../components/FavoriteInfo/FavoriteInfo";
const FavoriteList = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Navbar />
      <FavoriteInfo id={id} />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default FavoriteList;
