import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tmdbApi from "../../api/tmdbApi";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import "./carousel.scss";

const Carousel = () => {
  const [movieTrendItems, setTrendMovieItems] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await tmdbApi.getTrending();
        setTrendMovieItems(response);
        const timeout = setTimeout(() => {
          setDoneLoad(!doneLoad);
        }, 3000);

        return () => clearTimeout(timeout)
      } catch (e) {
        console.log(e);
      }
    };
    getMovies();
  }, []);

  // console.log(movieTrendItems);
  return (
    <>
      {!doneLoad ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgb(48, 48, 48, 0.1)",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactLoading
            type={"bars"}
            color={"#283040"}
            height={100}
            width={100}
          />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Carousel;
