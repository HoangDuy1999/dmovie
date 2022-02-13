import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import tmdbApi from "../../api/tmdbApi";
import ReactPlayer from "react-player";
import "./movieInfo.scss";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PlayCircleFilledWhite from "@material-ui/icons/PlayCircleFilledWhite";
import StarRateIcon from "@material-ui/icons/StarRate";
// import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";

const MovieInfo = ({ moi_id, onChangeMovieId, category }) => {
  // console.log(id);
  const navigate = useNavigate();
  const { id } = useParams();
  const [movieId, setMovieId] = useState(1);
  const [movieInfos, setMovieInfo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [trailerFilms, setTrailerFilms] = useState([]);
  const [selectedtrailerFilms, setSelectedtrailerFilms] = useState({});
  const [similarFilms, setSimilarFilms] = useState([]);
  const [reviewFilms, setReviewFilms] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);
  const settings = {
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: false,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setMovieId(id);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (movieId && category) {
      const getMovies = async () => {
        try {
          const params = {};
          const response = await tmdbApi.detail(category, movieId, { params });
          setMovieInfo(response);
        } catch (e) {
          // console.log(e);
        }
      };
      getMovies();
      const getCredits = async () => {
        const res = await tmdbApi.credits(category, movieId);
        setCasts(res.cast.slice(0, 5));
      };
      getCredits();
      const getTrailerFilms = async () => {
        const res = await tmdbApi.getVideos(category, movieId);
        setSelectedtrailerFilms(res.results[0] || {});
        setTrailerFilms(res.results.slice(0, 4));
      };
      getTrailerFilms();

      const getSimilarFilms = async () => {
        try {
          const response = await tmdbApi.similar(category, movieId);
          setSimilarFilms(response.results.slice(0, 16));
          const timeout = setTimeout(() => {
            setDoneLoad(true);
          }, 2000);
          return () => clearTimeout(timeout);
        } catch (e) {
          console.log(e);
        }
      };
      getSimilarFilms();
      const getReviewFilms = async () => {
        try {
          const response = await tmdbApi.reviews(category, movieId);
          setReviewFilms(response.results.slice(0, 10));
          // console.log(response.results.author_details);
          // console.log(response.results.slice(0, 10).author_details.avatar_path);
        } catch (e) {
          console.log(e);
        }
      };
      getReviewFilms();
    }
  }, [movieId, category]);

  const handleSelectedVideo = (item) => {
    setSelectedtrailerFilms(item);
  };
  const handleChangeMovieId = (id) => {
    // onChangeMovieId(id);
    setDoneLoad(false);
    // setMovieId(id);
    // console.log("id: " + id);
    // onChangeMovieId(id);
    navigate(`/movies/detail/${id}`);
  };
  const executeOnClick = (isExpanded) => {};

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
        <div className="movie_info">
          <div className="movie_info_top">
            <div
              className="banner"
              style={{
                backgroundImage: `url('${process.env.REACT_APP_PATH_IMG}${movieInfos.backdrop_path}')`,
              }}
            >
              <div className="banner_bottom"></div>
            </div>
            <div className="shadow"></div>
            <div className="content">
              <div className="poster">
                <img
                  src={process.env.REACT_APP_PATH_IMG + movieInfos.poster_path}
                  alt={
                    category === "movie" ? movieInfos.title : movieInfos.name
                  }
                />
              </div>
              <div className="detail">
                <span className="title">
                  {category === "movie" ? movieInfos.title : movieInfos.name}
                </span>
                <div className="genres">
                  {movieInfos.genres?.map((item) => {
                    return (
                      <div className="genre" key={item.id}>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="plot">
                  <span>{movieInfos.overview.substring(0, 600)}</span>
                </div>
                <div className="casts">
                  {casts?.map((item) => {
                    return (
                      <div key={item.id} className="cast">
                        <img
                          src={
                            process.env.REACT_APP_PATH_IMG + item.profile_path
                          }
                          alt={item.original_name}
                        />
                        <span>{item.original_name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="movie_info_bottom">
            <div className="container">
              <div className="title">
                <span>Trailer</span>
              </div>
              <div className="content">
                <div className="player-wrapper">
                  <ReactPlayer
                    className="react-player"
                    width="100%"
                    height="97%"
                    muted={true}
                    controls={true}
                    url={`http://www.youtube.com/embed/${selectedtrailerFilms.key}`}
                    config={{
                      youtube: {
                        playerVars: { origin: "http://localhost:3002" },
                      },
                    }}
                  />
                </div>
                <div className="video_trainers">
                  {trailerFilms.map((item, index) => {
                    if (item.key === selectedtrailerFilms.key) {
                      return (
                        <div
                          className="cart_video"
                          key={index}
                          style={{ backgroundColor: " #2b54e6" }}
                        >
                          <ReactPlayer
                            className="react-player"
                            playIcon={<YouTubeIcon />}
                            url={`http://www.youtube.com/embed/${item.key}`}
                            config={{
                              youtube: {
                                playerVars: { origin: "http://localhost:3002" },
                              },
                            }}
                          />
                          <div className="shadow_video"></div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="cart_video" key={index}>
                          <ReactPlayer
                            className="react-player"
                            url={`http://www.youtube.com/embed/${item.key}`}
                            config={{
                              youtube: {
                                playerVars: { origin: "http://localhost:3002" },
                              },
                            }}
                          />
                          <div className="shadow_video">
                            <YouTubeIcon
                              className="youtube_icon"
                              onClick={() => handleSelectedVideo(item)}
                            />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="movie_info_similar">
            <div className="container">
              <div style={{ margin: "50px 0px" }}>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  Similar
                </span>
              </div>
              <div className="content">
                <Slider {...settings}>
                  {similarFilms.map((item, index) => {
                    return (
                      <div key={index} className="item">
                        <div>
                          <img
                            className="backdrop_path"
                            src={
                              process.env.REACT_APP_PATH_IMG +
                              item.backdrop_path
                            }
                            alt=""
                          />
                          <div className="shadow_backdrop" title={item.title}>
                            <PlayCircleFilledWhite
                              className="icon_play"
                              onClick={() => handleChangeMovieId(item.id)}
                            />
                          </div>
                        </div>

                        <div
                          // to={`/movies/detail/${item.id}`}
                          onClick={() => handleChangeMovieId(item.id)}
                          className="title"
                          title={category === "movie" ? item.title : item.name}
                        >
                          {category === "movie" ? item.title : item.name}
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
          <div className="movie_info_review">
            <div className="container">
              <span className="title">Review</span>
              <div className="content">
                {reviewFilms.map((item, index) => {
                  let path =
                    item.author_details.avatar_path !== null
                      ? item.author_details.avatar_path.replace(
                          "/https",
                          "https"
                        )
                      : "https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png";
                  if (!path.includes("https")) {
                    path =
                      "https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png";
                  }
                  return (
                    <div>
                      <div className="item" key={index}>
                        <div className="avatar">
                          <img src={path} alt="" />
                        </div>
                        <div className="desc">
                          <div className="name">
                            <span>{item.author.toUpperCase()}</span>
                            <div
                              style={{ display: "flex", alignItem: "center" }}
                            >
                              <StarRateIcon
                                style={{ fontSize: "28px", color: "gold" }}
                              />
                              <span style={{ color: "#F0CD41" }}>
                                {item.author_details.rating === null
                                  ? 7
                                  : item.author_details.rating}{" "}
                                / 10
                              </span>
                            </div>
                          </div>
                          {/* <div style={{margin: "0", padding: "0"}}>
                          <div style={{color: "white", fontSize: "18px"}}>
                            <StarRateIcon  style={{fontSize: "28px", color: "gold"}}/> / 10
                          </div>
                        </div> */}
                          <div className="desc_review">
                            <ShowMoreText
                              lines={3}
                              more="Show more"
                              less="Show less"
                              className="content_css"
                              anchorClass="my-anchor-css-class"
                              onClick={executeOnClick}
                              expanded={false}
                              // width={100%}
                              truncatedEndingComponent={"... "}
                            >
                              {item.content}
                            </ShowMoreText>
                          </div>
                        </div>
                      </div>{" "}
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieInfo;
