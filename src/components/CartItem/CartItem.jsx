import { PlayArrow } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./cartItem.scss";
import { Link } from "react-router-dom";
const NowPlaying = ({ item, types, colorGroup }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
      if (types === "movies") {
        setName(item.title);
      } else {
        setName(item.name);
      }
    };
    getName();
  }, []);
  return (
    <div className="now_playing">
      <Link to={types + "/detail/" + item.id} style={{textDecoration: "none"}}>
        <div className="now_playing_container" title={name}>
          <img
            className="now_playing_image"
            src={process.env.REACT_APP_PATH_IMG + item.poster_path}
            alt={name}
          />
          <div className="now_playing_icon">
            <div className="now_playing_circle"></div>
          </div>
          <div className="now_playing_icon">
            <PlayArrow
              size="large"
              style={{
                fontSize: "20px",
                transform: "scale(2)",
                color: "white",
              }}
            />
          </div>
        </div>
        <div className="now_play_description">
          <span className="now_play_title" title={name}>
            {name}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NowPlaying;
