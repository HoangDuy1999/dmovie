import React from "react";
import Watch from "../components/Watch/Watch";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const WatchMovie = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <Navbar />
      <Watch cate={searchParams.get("type") || ""} ep={searchParams.get("ep")|| "0"} />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default WatchMovie;
