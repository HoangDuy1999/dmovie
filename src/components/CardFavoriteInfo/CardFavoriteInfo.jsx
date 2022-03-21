import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./cardFavoriteInfo.scss";
import { BsPlayCircle } from "react-icons/bs";
import defaultImage from "../../images/default_image.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BsFillHeartFill } from "react-icons/bs";

const CardWatchList = ({
  item,
  handleAddMovieToWatchList,
  handleRemoveMovieToWatchList,
}) => {
  const [isHover, setIshHover] = useState(false);
  const handleMouseOverImage = () => {
    if (!isHover) setIshHover(() => true);
  };
  const handleMouseOutImage = () => {
    if (isHover) setIshHover(() => false);
  };
  
  return (
    <div className="card_watch_list_container" key={item._id}>
      <div
        className="top"
        // onMouseOver={() => handleMouseOverImage}
        // onMouseOut={() => handleMouseOutImage}
      >
        <div className="movie_img">
          <LazyLoadImage
            style={
              isHover
                ? {
                    transform: "scale(1.2)",
                    transition: "all 0.5s ease-in-out",
                  }
                : {}
            }
            alt={item.movie_name}
            onError={(event) => {
              event.target.src = { defaultImage };
              event.onerror = null;
            }}
            className="backdrop_img"
            effect="blur"
            src={process.env.REACT_APP_PATH_IMG + item.movie_backdrop}
          />
        </div>
        <div
          className="magnifying_glass"
          style={isHover ? { opacity: 1 } : { opacity: 0 }}
          onMouseOver={(e) => handleMouseOverImage(e)}
          onMouseOut={(e) => handleMouseOutImage(e)}
        >
          <Link
            to={
              "/" +
              (item.movie_type === "movie" ? "movies" : item.movie_type) +
              "/detail/" +
              item.movie_id
            }
            style={{ textDecoration: "none" }}
          >
            <BsPlayCircle
              style={{ color: "white", cursor: "pointer" }}
              fontSize="40px"
              // onMouseOver={(e) => handleMouseOverImage(e)}
              // onMouseOut={(e) => handleMouseOutImage(e)}
            />
          </Link>
        </div>
      </div>

      <div className="bottom">
        <div className="title_film">
          <Link
            to={
              "/" +
              (item.movie_type === "movie" ? "movies" : item.movie_type) +
              "/detail/" +
              item.movie_id
            }
            style={{ textDecoration: "none" }}
          >
            <span>{item.movie_name}</span>
          </Link>
        </div>
        <div className="heart">
          {item.status === 1 ? (
            <BsFillHeartFill
              style={{ color: "red", cursor: "pointer"}}
              onClick={() => handleRemoveMovieToWatchList(item)}
            />
          ) : (
            <BsFillHeartFill onClick={() => handleAddMovieToWatchList(item)} style={{cursor: "pointer"}} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardWatchList;
