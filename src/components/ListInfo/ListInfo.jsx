import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import "./listInfo.scss";
import CardItem from "../CardItem/CardItem";
import Button from "@mui/material/Button";

const ListInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listMovies, setListMovie] = useState([]);
  const [totalPages, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [doneLoad, setDoneLoad] = useState(false);
  const [title, setTitle] = useState("UnKnown");
  searchParams.get("__firebase_request_key");

  const cate = searchParams.get("cate") || "";
  const type = searchParams.get("type") || "";

  const setNameTitle = () => {
    if (type.toLowerCase().includes("now_playing")) {
      setTitle("Now Playing");
    }
    if (type.toLowerCase().includes("airing_today")) {
      setTitle("TV Airing");
    }
    if (type.toLowerCase().includes("upcoming")) {
      setTitle("Movie Upcoming");
    }
    if (
      type.toLowerCase().includes("top_rated") &&
      cate.toLowerCase().includes("tv")
    ) {
      setTitle("Highest Rating TV Shows");
    }
    if (
      type.toLowerCase().includes("top_rated") &&
      cate.toLowerCase().includes("movie")
    ) {
      setTitle("Highest Rated Movies");
    }
  };

  const getList = async () => {
    if (!doneLoad) {
      setDoneLoad(false);
    }
    const response = await tmdbApi.getList(cate, type, { page: page });
    if (response.results) {
      setListMovie((pre) => [...pre, ...response.results]);
      setTotalPage(response.total_pages);
      setDoneLoad(true);
    }
    console.log(response);
  };

  useEffect(() => {
    setNameTitle();
  }, []);
  useEffect(() => {
    getList();
  }, [page]);
  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="list_movie_container">
        <div className="title">{title}</div>
        <div className="content">
          {listMovies.map((item) => (
            <CardItem
              item={item}
              key={item.id}
              types={cate === "movie" ? "movies" : "tv"}
              colorGroup={{}}
            />
          ))}
        </div>
        <div className="bottom">
          {page <= totalPages ? (
            <Button
              variant="outlined"
              style={{ marginTop: "20px" }}
              onClick={() => {
                setPage((pre) => page + 1);
              }}
            >
              Load more...
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ListInfo;
