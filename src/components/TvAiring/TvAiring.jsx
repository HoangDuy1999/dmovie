import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CardItem/CardItem";
import "./tvAiring.scss";
import { FaAngleDoubleRight } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const TvAiring = () => {
  const [tvAirings, settvAirings] = useState([]);
  const navigate = useNavigate();
  const getMovies = async () => {
    try {
      const response = await tmdbApi.getTvAiring({ page: 1 });
      settvAirings(response.results.slice(0, 10));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMovies();
    return () => {
      settvAirings([]); // This worked for me
    };
  }, []);
  // console.log(tvAirings);

  return (
    <div className="tv_airing">
      <div className="tv_airing_top">
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
          <span>TV Airing</span>
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
                navigate(`/list?type=airing_today&cate=tv`);
              }}
            >
              <div>More</div>
              <FaAngleDoubleRight style={{ marginLeft: "5px" }} />
            </div>
          </Button>
        </div>

        <hr style={{ marginTop: "-5px", marginBottom: "20px", marginRight: "1%" }} />
      </div>
      <div className="tv_airing_bottom">
        {tvAirings.map((item) => (
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

export default TvAiring;
