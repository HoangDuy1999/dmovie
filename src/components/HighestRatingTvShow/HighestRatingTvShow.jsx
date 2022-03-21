import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CardItem/CardItem";
import "./highestRatingTvShow.scss";
import { FaAngleDoubleRight } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const HighestRatingTvShow = () => {
  const [highestRatingTvShow, setHighestRatingTvShow] = useState([]);
  const navigate = useNavigate();
  const getMovies = async () => {
    try {
      const response = await tmdbApi.getHighestRatingTvShow({ page: 1 });
      setHighestRatingTvShow(response.results.slice(0, 10));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMovies();
    return () => {
      setHighestRatingTvShow([]); // This worked for me
    };
  }, []);

  return (
    <div className="high_rate_tv_show">
      <div className="high_rate_tv_show_top">
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
          <span>Highest Rating TV Shows</span>
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
                navigate(`/list?type=top_rated&cate=tv`);
              }}
            >
              <div>More</div>
              <FaAngleDoubleRight style={{ marginLeft: "5px" }} />
            </div>
          </Button>
        </div>
        <p
          className="high_rate_tv_showing_description"
          style={{ marginTop: "-10px" }}
        >
          TV Shows with highest user rating.
        </p>
        <hr
          style={{ marginTop: "-5px", marginBottom: "20px", marginRight: "1%" }}
        />
      </div>
      <div className="high_rate_tv_show_bottom">
        {highestRatingTvShow.map((item) => (
          <CarItem
            item={item}
            key={item.id}
            types="tv"
            colorGroup={{ backgroundColor: "#fafafa" }}
          />
        ))}
      </div>
    </div>
  );
};

export default HighestRatingTvShow;
