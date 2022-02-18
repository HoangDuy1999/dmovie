import React from "react";
import SearchResult from "../components/SearchResult/SearchResult";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <Navbar />
      <SearchResult txtSearch={searchParams.get("query") || ""} />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Search;
