import React, { useState, useEffect } from "react";
import "./searchResult.scss";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CardItem/CardItem";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";

const SearchResult = ({ txtSearch }) => {
  const [listMovies, setListMovies] = useState([]);
  const [listSeries, setListSeries] = useState([]);
  const [listPeoples, setListPeoples] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);
  useEffect(() => {
    setDoneLoad(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 4000);
    const searchMovies = async () => {
      const response = await tmdbApi.search("movie", {
        params: { page: 1, query: txtSearch },
      });
      setListMovies(response.results.splice(0, 10));
      console.log(response.results);
    };
    searchMovies();

    const searchSeries = async () => {
      const response = await tmdbApi.search("tv", {
        params: { page: 1, query: txtSearch },
      });
      setListSeries(response.results.splice(0, 10));
    };
    searchSeries();

    const searchPeoples = async () => {
      const response = await tmdbApi.search("person", {
        params: { page: 1, query: txtSearch },
      });
      setListPeoples(response.results.splice(0, 10));
    };
    searchPeoples();
    return () => clearTimeout(timeout);
  }, [txtSearch]);
  return (
    <div style={{ marginBottom: "50px" }}>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="search_result_container">
        <div className="search_text">Search results for: "{txtSearch}"</div>
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
          <div className="list_movies_content">
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
        <div className="list_group">
          <div className="list_group_label">
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
          <div className="list_group_content">
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

        <div className="list_group">
          <div className="list_group_label">
            Peoples
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
          <div className="list_group_content">
            {listPeoples.map((item) => (
              <CarItem
                // length={listSeries.length}
                person={true}
                item={item}
                key={item.id}
                types="person"
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
