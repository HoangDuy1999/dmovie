import { BsPlayCircle } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import React, { useState, useEffect } from "react";
import "./cartItemBrowses.scss";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CartItemBrowses = ({ item, types, colorGroup }) => {
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
    <div className="cart_item_browse">
      <div className="cart_item_browse_container">
        <Link
          to={"/" + types + "/detail/" + item.id}
          style={{ textDecoration: "none" }}
        >
          <LazyLoadImage
            style={posterHover ? { transform: "scale(1.2)", transition: "all 0.5s ease-in-out" } : {}}
            className="cart_item_browse_image"
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
          <span className="now_play_title" title={name}>
            {name}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CartItemBrowses;
