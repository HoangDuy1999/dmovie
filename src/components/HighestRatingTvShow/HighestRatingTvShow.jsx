import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CartItem/CartItem";
import "./highestRatingTvShow.scss";
const HighestRatingTvShow = () => {
  const [highestRatingTvShow, setHighestRatingTvShow] = useState([]);
  // const [page, setPage] = useState(1);
  // const [numItems, setNumItems] = useState(10);
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
  // console.log(highestRatingTvShow);

  return (
    <div className="high_rate_tv_show">
      <div className="high_rate_tv_show_top">
        <h1 className="high_rate_tv_showing_tilte">Highest Rating TV Shows</h1>
        <p
          className="high_rate_tv_showing_description"
          style={{ marginTop: "-10px" }}
        >
          TV Shows with highest user rating.
        </p>
        <hr style={{ marginTop: "-5px", marginBottom: "20px" }} />
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
