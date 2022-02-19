import { BsPlayCircle } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import React, { useState, useEffect, useLayoutEffect } from "react";
import "./cartItem.scss";
import { Link } from "react-router-dom";
const NowPlaying = ({ item, types, colorGroup, length, person = false }) => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const [posterHover, setPosterHover] = useState(false);
  const [name, setName] = useState("");
  const handleOnMoveOverPoster = (e) => {
    const timeout = setTimeout(() => {
      setPosterHover(true);
    }, 10);
    return () => clearTimeout(timeout);
  };
  const handleOnMoveOutPoster = (e) => {
    const timeout = setTimeout(() => {
      setPosterHover(false);
    }, 10);
    return () => clearTimeout(timeout);
  };
  useEffect(() => {
    const getName = async () => {
      // if (types === "movies") {
      //   setName(item.title);
      // } else {
      //   setName(item.name);
      // }
      item.title ? setName(item.title) : setName(item.name);
    };
    getName();
  }, []);
  return (
    <div
      className="now_playing"
      style={
        length <= 4 && size[0] !== 768
          ? { paddingRight: "10px" }
          : size[0] > 768 && size <= 978
          ? { paddingRight: "10px" }
          : {}
      }
    >
      <div
        className="now_playing_container"
        style={size[0] > 420 && size[0] !== 768 ? { marginRight: "15px" } : {}}
        title={name}
      >
        <Link
          to={"/" + types + "/detail/" + item.id}
          style={{ textDecoration: "none" }}
        >
          <img
            style={posterHover ? { transform: "scale(1.2)" } : {}}
            className="now_playing_image"
            onError={(event) => {
              event.target.src =
                "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
              event.onerror = null;
            }}
            src={process.env.REACT_APP_PATH_IMG + item.poster_path}
            alt={name}
          />
        </Link>
        <div
          className="icon_group"
          onMouseOver={(e) => {
            handleOnMoveOverPoster(e);
          }}
          onMouseOut={(e) => {
            handleOnMoveOutPoster(e);
          }}
          style={posterHover ? { opacity: 1 } : { opacity: 0 }}
        >
          <Link
            to={"/" + types + "/detail/" + item.id}
            style={{ textDecoration: "none" }}
          >
            <div className="play_icon">
              <BsPlayCircle
                style={{
                  fontSize: "40px",
                  marginRight: "10px",
                  color: "white",
                  cursor: "pointer"
                }}
              />
            </div>
          </Link>
          <div className="add_icon">
            <IoIosAddCircleOutline
              style={{
                fontSize: "50px",
                color: "white",
                cursor: "pointer"
              }}
            />
          </div>
        </div>
      </div>

      <div className="now_play_description">
        <span className="now_play_title" title={name}>
          {name}
        </span>
      </div>
    </div>
  );
};

export default NowPlaying;
