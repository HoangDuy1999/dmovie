import React, { useEffect, useState } from "react";
import "./highestRatingMovie.scss";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CardItem/CardItem";
import { FaAngleDoubleRight } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const HighestRatingMovie = () => {
  const [highestRatingMovie, setHighestRatingMovie] = useState([]);
  const navigate = useNavigate();

  const getMovies = async () => {
    try {
      const response = await tmdbApi.getHighestRatingMovie({ page: 1 });
      setHighestRatingMovie(response.results.slice(0, 10));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMovies();
    return () => {
      setHighestRatingMovie([]);
    };
  }, []);

  return (
    <div className="high_rate_movie">
      <div className="now_play_top">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "30px",
            fontWeight: "600",
            marginBottom: "20px",
            position: "relative",
            marginRight: "1%",
          }}
        >
          <span style={{marginRight: "10px"}}>Highest Rated Movies</span>
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
                navigate(`/list?type=top_rated&cate=movie`);
              }}
            >
              <div>More</div>
              <FaAngleDoubleRight style={{ marginLeft: "5px" }} />
            </div>
          </Button>
        </div>
        <p
          className="high_rate_movie_description"
          style={{ marginTop: "-10px" }}
        >
          Movies with highest user rating.
        </p>
        <hr
          style={{ marginTop: "-5px", marginBottom: "20px", marginRight: "1%" }}
        />
      </div>
      <div className="high_rate_movie_bottom">
        {highestRatingMovie.map((item) => (
          <CarItem item={item} key={item.id} types="movies" colorGroup={{}} />
        ))}
      </div>
    </div>
  );
};

export default HighestRatingMovie;
