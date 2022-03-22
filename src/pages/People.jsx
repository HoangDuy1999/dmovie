import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import PeopleList from "../components/PeopleList/PeopleList";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet";
const People = () => {
  return (
    <div>
       <Helmet>
        <title>Dmovie - PeoPle</title>
        <meta name="description" content="Get list people" />
      </Helmet>
      <Navbar />
      <PeopleList />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default People;
