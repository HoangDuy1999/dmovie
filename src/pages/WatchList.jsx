import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { useParams } from "react-router-dom";
import WatchListInfo from "../components/WatchListInfo/WatchListInfo";
const WatchList = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Navbar />
      <WatchListInfo id={id} />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default WatchList;
