import { PlayArrow } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./cartItemBrowses.scss";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CartItemBrowses = ({ item, types, colorGroup }) => {
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
    <div className="cart_item_browse">
      <Link
        to={"/" + types + "/detail/" + item.id}
        style={{ textDecoration: "none" }}
      >
        <div className="cart_item_browse_container" title={name}>
          {/* <LazyLoadImage
            alt={name}
            // height={image.height}
            src={process.env.REACT_APP_PATH_IMG + item.poster_path} // use normal <img> attributes as props
            // width={image.width}
          /> */}

          <img
            className="cart_item_browse_image"
            src={process.env.REACT_APP_PATH_IMG + item.poster_path}
            onError={(event) => {
              event.target.src =
                "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
              event.onerror = null;
            }}
            alt={name}
          />
          <div className="cart_item_browse_icon">
            <div className="cart_item_browse_circle"></div>
          </div>
          <div className="cart_item_browse_icon">
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

export default CartItemBrowses;
