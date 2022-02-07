import React, {useEffect, useState} from "react";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CartItem/CartItem";
import "./tvAiring.scss";
const TvAiring = () => {
  const [tvAirings, settvAirings] = useState([]);
  // const [page, setPage] = useState(1);
  // const [numItems, setNumItems] = useState(10);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await tmdbApi.getTvAiring({ page: 1 });
        settvAirings(response.results.slice(0, 10));
      } catch (e) {
        console.log(e);
      }
    };
    getMovies();
  }, []);
  console.log(tvAirings);

  return (
    <div className="tv_airing">
      <div className="tv_airing_top">
        <h1 className="tv_airinging_tilte">TV Airing</h1>

        <hr style={{ marginTop: "-5px", marginBottom: "20px" }} />
      </div>
      <div className="tv_airing_bottom">
        {tvAirings.map((item) => (
          <CarItem item={item} key={item.id} types="tv" colorGroup={{backgroundColor: "#fafafa"}} />
        ))}
      </div>
    </div>
  );
};

export default TvAiring;
