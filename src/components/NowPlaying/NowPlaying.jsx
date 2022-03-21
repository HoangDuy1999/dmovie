import React, { useEffect, useState } from "react";
import "./nowPlaying.scss";
import tmdbApi from "../../api/tmdbApi";
import CarItem from "../CardItem/CardItem";
import Button from "@mui/material/Button";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NowPlayings = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const navigate = useNavigate();

  const getMovies = async () => {
    try {
      const response = await tmdbApi.getNowPlaying({ page: 1 });
      setNowPlayingMovies(response.results.slice(0, 10));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMovies();
    return () => {
      setNowPlayingMovies([]); // This worked for me
    };
  }, []);
  
  // console.log(nowPlayingMovies);
  return (
    <div className="now_playings">
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
            marginRight: "1%"
          }}
        >
          <span>Now Playing</span>
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
              onClick={()=> {navigate(`/list?type=now_playing&cate=movie`)}}
            >
              <div>More</div>
              <FaAngleDoubleRight style={{ marginLeft: "5px" }} />
            </div>
          </Button>
        </div>

        <p className="now_playing_description" style={{ marginTop: "-10px" }}>
          Movies that are currently playing in theaters.
        </p>
        <hr style={{ marginTop: "-5px", marginBottom: "20px", marginRight: "1%" }} />
      </div>
      <div className="now_play_bottom">
        {nowPlayingMovies.map((item) => (
          <CarItem item={item} key={item.id} types="movies" colorGroup={{}} />
        ))}
      </div>
    </div>
  );
};

export default NowPlayings;
