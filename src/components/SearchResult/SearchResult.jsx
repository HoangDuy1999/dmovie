import React, { useState, useEffect } from "react";
import "./searchResult.scss";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CartItem/CartItem";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";

const SearchResult = ({ txtSearch }) => {
  const [listMovies, setListMovies] = useState([]);
  const [listSeries, setListSeries] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);
  useEffect(() => {
    setDoneLoad(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 5000);
    const searchMovies = async () => {
      const response = await tmdbApi.search("movie", {
        params: { page: 1, query: txtSearch },
      });
      setListMovies(response.results);
      console.log(response.results);
    };
    searchMovies();

    const searchSeries = async () => {
      const response = await tmdbApi.search("tv", {
        params: { page: 1, query: txtSearch },
      });
      setListSeries(response.results);
    };
    searchSeries();
    return () => clearTimeout(timeout);
  }, [txtSearch]);
  return (
    <div style={{ backgroundColor: "#dbdbdb" , marginBottom: "50px" }}>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="search_result_container">
        <div className="list_movies">
          <div className="list_movies_label">
            Movies
            <hr
              style={{
                borderTop: "thin solid gray",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "none",
                minHeight: "1px",
                height: "1px",
                maxHeight: "1px",
                transform: "scale(1)",
                marginBottom: "25px",
              }}
            />
          </div>
          <div
            className="list_movies_content"
          >
            {listMovies.map((item) => (
              <CarItem
                item={item}
                key={item.id}
                // length={listMovies.length}
                types="movies"
                colorGroup={{}}
              />
            ))}
          </div>
        </div>
        <div className="list_tvs">
          <div className="list_tvs_label">
            Series
            <hr
              style={{
                borderTop: "thin solid ligt-",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "none",
                minHeight: "1px",
                height: "1px",
                maxHeight: "1px",
                transform: "scale(1)",
                marginBottom: "25px",
              }}
            />
          </div>
          <div
            className="list_tvs_content"
          >
            {listSeries.map((item) => (
              <CarItem
                // length={listSeries.length}
                item={item}
                key={item.id}
                types="tv"
                colorGroup={{}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
