import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import PeopleInfor from "../components/PeopleInfo/PeopleInfor";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet} from "react-helmet";
const PeopleDetail = () => {
  return (
    <div>
       <Helmet>
        <title>Dmovie - PeopleDetail</title>
        <meta name="description" content="Get detail people" />
      </Helmet>
      <Navbar />
      <PeopleInfor />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PeopleDetail;
