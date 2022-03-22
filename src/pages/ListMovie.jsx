import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ListInfo from "../components/ListInfo/ListInfo";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet} from "react-helmet";
const ListMovie = () => {
  return (
    <div>
       <Helmet>
        <title>Dmovie - ListMovie</title>
        <meta name="description" content="Get movies list by trend" />
      </Helmet>
      <Navbar />
      <ListInfo />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ListMovie;
