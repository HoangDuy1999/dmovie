import React, { useState } from "react";
import "./videoSlider.scss";
import Slider from "react-slick";
import { BiPlayCircle } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const VidieoSlider = ({ videoList, onHandleChangeMovieId }) => {
  const [similarPosterHover, setSimilarPosterHover] = useState("");

  const handleMoveOverSimilarPostter = (e) => {
    setSimilarPosterHover(() => e);
  };
  const handleMoveOutSimilarPostter = (e) => {
    setSimilarPosterHover(() => "");
  };

  const settings = {
    dots: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="items">
      <Slider {...settings}>
        {videoList?.map((item, index) => {
          return (
            <div key={index} className="item">
              <div key={item.id} className="similar_background">
                <div className="backdrop_path">
                  <LazyLoadImage
                    effect="blur"
                    style={
                      similarPosterHover === item.id
                        ? { transform: "scale(1.5)" }
                        : {}
                    }
                    // onClick={() => handleChangeMovieId(item.id)}
                    // ref={index}
                    onMouseOver={(e) => {
                      handleMoveOverSimilarPostter(item.id);
                    }}
                    onMouseOut={(e) => {
                      handleMoveOutSimilarPostter(item.id);
                    }}
                    src={
                      item?.poster_path
                        ? process.env.REACT_APP_PATH_IMG + item.poster_path
                        : item.coverVerticalUrl
                    }
                    onError={(event) => {
                      event.target.src =
                        "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                      event.onerror = null;
                    }}
                    alt=""
                  />
                </div>
                <BiPlayCircle
                  // ref={index}
                  onClick={() => onHandleChangeMovieId(item.id, item.category)}
                  style={
                    similarPosterHover === item.id
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  onMouseOver={(e) => {
                    handleMoveOverSimilarPostter(item.id);
                  }}
                  onMouseOut={(e) => {
                    handleMoveOutSimilarPostter(e);
                  }}
                  className="play_icon"
                />
              </div>

              <div
                onClick={() => onHandleChangeMovieId(item.id, item.category)}
                className="title"
                title={item.title ? item.title : item.name}
              >
                {item.title ? item.title : item.name}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default VidieoSlider;
