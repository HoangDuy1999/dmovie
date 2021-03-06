import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import NewsInfo from "../components/NewsInfo/NewsInfo";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet} from "react-helmet";
const NewsDetail = () => {
  return (
    <div>
       <Helmet>
        <title>Dmovie - NewsDetail</title>
        <meta name="description" content="Get detail newspaper" />
      </Helmet>
      <Navbar />
      <NewsInfo />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NewsDetail;
