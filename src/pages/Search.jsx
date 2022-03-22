import React from "react";
import SearchResult from "../components/SearchResult/SearchResult";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import {Helmet} from "react-helmet";
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <Helmet>
        <title>Dmovie - Search</title>
        <meta name="description" content="dmovie search page" />
      </Helmet>
      <Navbar />
      <SearchResult txtSearch={searchParams.get("query") || ""} />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Search;
