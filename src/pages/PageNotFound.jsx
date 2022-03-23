import React from "react";
import PageNotFoundInfo from "../components/PageNotFoundInfo/PageNotFoundInfo";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet";

const PageNotFound = () => {
  return (
    <div>
        <Helmet>
        <title>Dmovie - Page 404</title>
        <meta name="description" content="Get list people" />
      </Helmet>
      <Navbar home={true} />
      <PageNotFoundInfo />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PageNotFound;
