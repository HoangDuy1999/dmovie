import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import PeopleList from "../components/PeopleList/PeopleList";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const People = () => {
  return (
    <div>
      <Navbar />
      <PeopleList />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default People;
