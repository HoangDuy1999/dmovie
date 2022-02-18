import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import PeopleInfor from "../components/PeopleInfo/PeopleInfor";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const PeopleDetail = () => {
  return (
    <div>
      <Navbar />
      <PeopleInfor />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PeopleDetail;
