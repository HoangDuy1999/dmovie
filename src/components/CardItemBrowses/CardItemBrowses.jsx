import { BsPlayCircle } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import React, { useState, useEffect } from "react";
import "./cardItemBrowses.scss";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CardItemBrowses = ({ item, types, colorGroup }) => {
  const [name, setName] = useState("");
  const [posterHover, setPosterHover] = useState(false);
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
      if (types === "movies") {
        setName(item.title);
      } else {
        setName(item.name);
      }
    };
    getName();
    return () => {
      setName("");
    };
  }, []);
  return (
    <div className="card_item_browse">
      <div className="card_item_browse_container">
        <Link
          to={"/" + types + "/detail/" + item.id}
          style={{ textDecoration: "none" }}
        >
          <LazyLoadImage
            style={
              posterHover
                ? {
                    transform: "scale(1.2)",
                    transition: "all 0.5s ease-in-out",
                  }
                : {}
            }
            className="card_item_browse_image"
            onError={(event) => {
              event.target.src =
                "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
              event.onerror = null;
            }}
            effect="blur"
            src={process.env.REACT_APP_PATH_IMG + item.poster_path}
            alt={name}
          />
        </Link>
        <div className="vote_group">
          <CircularProgressbarWithChildren
            value={item.vote_average * 10 || 1}
            // text={`${item.vote_average * 10 || 10}%`}
            background
            backgroundPadding={1}
            styles={buildStyles({
              backgroundColor: "#081c22",
              textColor: "#fff",
              pathColor:
                item.vote_average >= 6
                  ? "#20ca76"
                  : item.vote_average || 1 > 5
                  ? "#868e29"
                  : "red",
              trailColor:
                item.vote_average >= 6
                  ? "#1d4028"
                  : item.vote_average || 1 > 5
                  ? "#3d3a10"
                  : "#f19293",
            })}
          >
            <div
              style={{
                fontSize: "16px",
                position: "relative",
                color: "white",
                zIndex: 99999999999,
              }}
            >
              <span>{(item.vote_average || 1) * 10}</span>
              <span style={{ fontSize: "10px", verticalAlign: "text-top" }}>
                %
              </span>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div
          className="icon_group"
          title={name}
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
                  cursor: "pointer",
                }}
              />
            </div>
          </Link>
          {/* <div className="add_icon">
            <IoIosAddCircleOutline
              style={{
                fontSize: "50px",
                color: "white",
                cursor: "pointer",
              }}
            />
          </div> */}
        </div>
      </div>

      <div className="now_play_description">
        <Link
          to={"/" + types + "/detail/" + item.id}
          style={{ textDecoration: "none" }}
        >
          <span
            className="now_play_title"
            title={name}
            style={posterHover ? { textDecoration: "underline" } : {}}
          >
            {name}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CardItemBrowses;
