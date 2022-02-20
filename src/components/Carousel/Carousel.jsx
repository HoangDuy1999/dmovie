import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tmdbApi from "../../api/tmdbApi";
import { Link } from "react-router-dom";
import "./carousel.scss";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";

const Carousel = () => {
  const [movieTrendItems, setTrendMovieItems] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);
  useEffect(() => {
    const getMovies = async () => {
      try {
        setDoneLoad(false);
        const timeout = setTimeout(() => {
          setDoneLoad(true);
        }, 5000);

        const response = await tmdbApi.getTrending();
        const { innerWidth: width } = window;
        console.log(width);
        if (width <= 420) {
          setTrendMovieItems(response.slice(0, 5));
        } else {
          setTrendMovieItems(response);
        }
        return () => clearTimeout(timeout);
      } catch (e) {
        console.log(e);
      }
    };
    getMovies();
  }, []);

  // console.log(movieTrendItems);
  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="carouselContainer">
        <Slider
          autoplay
          autoplaySpeed={2000}
          dots
          initialSlide={2}
          infinite
          // prevArrow={<PreviousBtn />}
          // nextArrow={<NextBtn />}
          customPaging={(i) => {
            return (
              <div>
                <img
                  src={
                    process.env.REACT_APP_PATH_IMG +
                    movieTrendItems[i].backdrop_path
                  }
                  onError={(event) => {
                    event.target.src =
                      "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                    event.onerror = null;
                  }}
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
            );
          }}
          dotsClass="slick-dots custom-indicator"
        >
          {movieTrendItems.map((item) => (
            <div key={item.id} className="slick_slide">
              <img
                src={process.env.REACT_APP_PATH_IMG + item.backdrop_path}
                onError={(event) => {
                  event.target.src =
                    "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                  event.onerror = null;
                }}
                alt=""
                className="slick_slide_image"
              />
              <div className="slick_slide_infos">
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    msTransform: "translateY(-50%)",
                    transform: "translateY(-50%)",
                  }}
                >
                  <Link
                    to={"movies/detail/" + item.id}
                    style={{ textDecoration: "none" }}
                  >
                    <h2 className="title">{item.title}</h2>{" "}
                  </Link>
                  <p className="description">{item.overview}</p>
                  <span className="type">{item.genres_name}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;
