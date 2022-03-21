import React, { useEffect, useState } from "react";
import "./movieUpcoming.scss";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CardItem/CardItem";
import { FaAngleDoubleRight } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const MovieUpcoming = () => {
  const [nowMovieUpcomings, setNowMovieUpcomings] = useState([]);
  const navigate = useNavigate();

  const getMovies = async () => {
    try {
      const response = await tmdbApi.getMovieUpcoming({ page: 1 });
      setNowMovieUpcomings(response.results.slice(0, 10));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMovies();
    return () => {
      setNowMovieUpcomings([]); // This worked for me
    };
  }, []);

  return (
    <div className="movie_up_coming">
      <div className="movie_up_coming_top">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "30px",
            fontWeight: "600",
            marginBottom: "20px",
            position: "relative",
            marginRight: "1%"
          }}
        >
          <span>Movie Upcoming</span>
          <Button
            variant="text"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 0,
              margin: 0,
              bottom: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/list?type=upcoming&cate=movie`);
              }}
            >
              <div>More</div>
              <FaAngleDoubleRight style={{ marginLeft: "5px" }} />
            </div>
          </Button>
        </div>

        <hr style={{ marginTop: "-5px", marginBottom: "20px", marginRight: "1%" }} />
      </div>
      <div className="movie_up_coming_bottom">
        {nowMovieUpcomings.map((item) => (
          <CarItem item={item} key={item.id} types="movies" colorGroup={{}} />
        ))}
      </div>
    </div>
  );
};

export default MovieUpcoming;
