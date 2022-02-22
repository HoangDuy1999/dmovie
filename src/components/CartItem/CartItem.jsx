import { BsPlayCircle } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import React, { useState, useEffect } from "react";
import "./cartItem.scss";
import { Link } from "react-router-dom";
import defaultImage from "../../images/default_image.jpg";

const NowPlaying = ({ item, types, colorGroup, length, person = false }) => {
  // const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
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
      item.title ? setName(item.title) : setName(item.name);
    };
    getName();
    return () => {
      setName(""); // This worked for me
    };
  }, []);
  return (
    <div className="now_playing">
      <div className="now_playing_container" title={name}>
        <Link
          to={"/" + types + "/detail/" + item.id}
          style={{ textDecoration: "none" }}
        >
          <img
            style={posterHover ? { transform: "scale(1.2)" } : {}}
            className="now_playing_image"
            onError={(event) => {
              event.target.src = {defaultImage}
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
                  marginRight: "0px",
                  color: "white",
                  cursor: "pointer",
                }}
              />
            </div>
          </Link>
          <div className="add_icon">
            <IoIosAddCircleOutline
              style={{
                fontSize: "50px",
                color: "white",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>

      <div className="now_play_description_home">
        <Link
          to={"/" + types + "/detail/" + item.id}
          style={{ textDecoration: "none" }}
        >
          <span className="now_play_title" title={name}>
            {name}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NowPlaying;
