import { BsPlayCircle } from "react-icons/bs";
// import { IoIosAddCircleOutline } from "react-icons/io";
import React, { useState, useEffect } from "react";
import "./cardItemFilmPeoPle.scss";
import { Link } from "react-router-dom";
import defaultImage from "../../images/default_image.jpg";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CardItemFilmPeoPle = ({
  item,
  types,
  colorGroup,
  length,
  person = false,
}) => {
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
  }, []);
  console.log(item);
  return (
    <div className="card_item_people">
      <div
        className="card_item_people_container"
        title={`${name} ${
          item.releaseTime
            ? `(${item.releaseTime})`
            : item?.release_date
            ? `(${item?.release_date?.split("-")[0]})`
            : item?.first_air_date
            ? `(${item?.first_air_date?.split("-")[0]})`
            : ""
        }`}
      >
        <Link
          to={"/" + types + "/detail/" + item.id}
          style={{ textDecoration: "none" }}
        >
          <img
            style={
              posterHover
                ? {
                    transform: "scale(1.2)",
                    transition: "all 0.5s ease-in-out",
                  }
                : {}
            }
            className="now_playing_image"
            onError={(event) => {
              event.target.src = { defaultImage };
              event.onerror = null;
            }}
            src={process.env.REACT_APP_PATH_IMG + item.poster_path}
            alt={name}
          />
        </Link>
        <div className="vote_group">
          <CircularProgressbarWithChildren
            value={item.vote_average * 10 || 60}
            // text={`${item.vote_average * 10 || 10}%`}
            background
            backgroundPadding={1}
            styles={buildStyles({
              backgroundColor: "#081c22",
              textColor: "#fff",
              pathColor:
                item.vote_average >= 6
                  ? "#20ca76"
                  : item.vote_average || 6 > 5
                  ? "#868e29"
                  : "red",
              trailColor:
                item.vote_average >= 6
                  ? "#1d4028"
                  : item.vote_average || 6 > 5
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
              <span>{(item.vote_average || 6) * 10}</span>
              <span style={{ fontSize: "10px", verticalAlign: "text-top" }}>
                %
              </span>
            </div>
          </CircularProgressbarWithChildren>
        </div>
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
            {/* <IoIosAddCircleOutline
              style={{
                fontSize: "50px",
                color: "white",
                cursor: "pointer",
              }}
            /> */}
          </div>
        </div>
      </div>

      <div className="now_play_description_home">
        <Link
          to={"/" + types + "/detail/" + item.id}
          style={{ textDecoration: "none" }}
        >
          <span
            className="now_play_title"
            title={`${name} ${
              item.releaseTime
                ? `(${item.releaseTime})`
                : item?.release_date
                ? `(${item?.release_date?.split("-")[0]})`
                : item?.first_air_date
                ? `(${item?.first_air_date?.split("-")[0]})`
                : ""
            }`}
            style={posterHover ? { textDecoration: "underline" } : {}}
          >
            {name}
            {item?.release_date
              ? ` (${item?.release_date?.split("-")[0]})`
              : item?.first_air_date
              ? ` (${item?.first_air_date?.split("-")[0]})`
              : ""}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CardItemFilmPeoPle;
