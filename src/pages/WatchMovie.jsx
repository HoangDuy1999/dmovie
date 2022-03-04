import React, { useState } from "react";
import Watch from "../components/Watch/Watch";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const WatchMovie = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [onFocus, setOnFocus] = useState(false);
  const handleOnFocus = (e) => {
    setOnFocus(e);
  };
  
  return (
    <div>
      <Navbar handleOnFocus={handleOnFocus} />
      <Watch
        cate={searchParams.get("type") || ""}
        ep={searchParams.get("ep") || "0"}
        onFocus={onFocus}
      />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default WatchMovie;
