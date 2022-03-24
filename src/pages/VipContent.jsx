import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import VipContentInfo from "../components/VipContentInfo/VipContentInfo";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet";

const VipContent = () => {
  return (
    <div>
      <Helmet>
        <title>Dmovie - VipContent</title>
        <meta name="description" content="Dmovie vip content" />
      </Helmet>
      <Navbar />
      <VipContentInfo />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default VipContent;
