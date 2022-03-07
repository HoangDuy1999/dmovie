import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Slider from "react-slick";
// import defaultImage from "../../images/default_image.jpg";
import { useNavigate } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import ReactPlayer from "react-player";
import "./movieInfo.scss";
import YouTubeIcon from "@mui/icons-material/YouTube";
import StarRateIcon from "@mui/icons-material/StarRate";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoSlider from "../VideoSlider/VidieoSlider";
import axios from "axios";

const MovieInfo = ({ category }) => {
  // console.log(id);
  const navigate = useNavigate();
  const { id } = useParams();
  const [movieId, setMovieId] = useState(0);
  const [movieInfos, setMovieInfor] = useState([]);
  const [casts, setCasts] = useState([]);
  const [trailerFilms, setTrailerFilms] = useState([]);
  const [selectedtrailerFilms, setSelectedtrailerFilms] = useState({});
  const [similarFilms, setSimilarFilms] = useState([]);
  const [reviewFilms, setReviewFilms] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);
  // If exist data films
  const [isWatchFilm, setIsWatchFilm] = useState(false);
  const [movieInfoLoklok, setMoviesInfoLokLok] = useState([]);

  const headers = {
    lang: "en",
    versioncode: 11,
    clienttype: "ios_jike_default",
  };
  // console.log(id);

  useEffect(() => {
    setMovieId(id);
  }, [id]);

  useEffect(() => {
    setDoneLoad(false);
    setIsWatchFilm(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 5000);
    window.scrollTo(0, 0);
    if (movieId && category) {
      const getMovies = async () => {
        try {
          const params = {};
          const response = await tmdbApi.detail(category, movieId, { params });
          const { innerWidth: width } = window;
          if (width <= 768) {
            response.genres = response.genres
              ? response.genres.slice(0, 2)
              : [];
            response.overview = response.overview.substring(0, 380);
            if (response.overview.length >= 380) {
              response.overview = response.overview + " ...";
            }
          } else {
            response.genres = response.genres
              ? response.genres.slice(0, 3)
              : [];
            response.overview = response.overview.substring(0, 500);
            if (response.overview.length >= 500) {
              response.overview = response.overview + " ...";
            }
          }
          setMovieInfor(response);
        } catch (e) {
          console.log(e);
        }
      };
      getMovies();
      const getCredits = async () => {
        if (movieId !== 0) {
          const res = await tmdbApi.credits(category, movieId);
          const { innerWidth: width } = window;
          if (width <= 420) {
            setCasts(res.cast.slice(0, 4));
          } else {
            setCasts(res.cast.slice(0, 5));
          }
        }
      };

      getCredits();
      const getTrailerFilms = async () => {
        const res = await tmdbApi.getVideos(category, movieId);
        setSelectedtrailerFilms(res.results[0] || {});
        const { innerWidth: width } = window;
        if (width <= 420) {
          setTrailerFilms(res.results.slice(0, 3));
        } else {
          setTrailerFilms(res.results.slice(0, 4));
        }
      };
      getTrailerFilms();

      const getSimilarFilms = async () => {
        try {
          const response = await tmdbApi.similar(category, movieId);
          // const { innerWidth: width } = window;
          setSimilarFilms(response.results.slice(0, 16));
        } catch (e) {
          console.log(e);
        }
      };
      getSimilarFilms();
      const getReviewFilms = async () => {
        try {
          const response = await tmdbApi.reviews(category, movieId);
          setReviewFilms(response.results.slice(0, 10));
        } catch (e) {
          console.log(e);
        }
      };
      getReviewFilms();
    }

    return () => {
      clearTimeout(timeout);
      setMovieInfor([]);
      setSimilarFilms([]);
      setCasts([]);
      setTrailerFilms([]);
      setReviewFilms([]);
      setSelectedtrailerFilms([]);
    };
  }, [movieId, category]);

  useEffect(() => {
    if (movieInfos !== [] && movieInfos !== {}) {
      const body = {
        searchKeyWord: movieInfos.title ? movieInfos.title : movieInfos.name,
        size: 1,
        sort: "",
        searchType: "",
      };
      axios
        .post(
          "https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchWithKeyWord",
          body,
          { headers }
        )
        .then((response) => {
          if (response.data.data.searchResults.length > 0) {
            setIsWatchFilm(() => true);
            setMoviesInfoLokLok(response.data.data.searchResults);
          }
        });
    }
  }, [movieInfos]);

  const handleSelectedVideo = (item) => {
    setSelectedtrailerFilms(item);
  };

  const handleClickWatchFilm = (e) => {
    // console.log("click");
    // console.log(movieInfoLoklok);
    navigate(
      `/watch/${movieInfoLoklok[0].id}?type=${movieInfoLoklok[0].domainType}&ep=0`
    );
  };

  const handleChangeMovieId = (id) => {
    setDoneLoad(false);
    setSimilarFilms([]);
    setMovieInfor([]);
    setCasts([]);
    navigate(`/movies/detail/${id}`);
  };

  // console.log(casts);
  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="movie_info">
        <div className="movie_info_top">
          <div
            className="banner"
            style={
              movieInfos?.backdrop_path
                ? {
                    backgroundImage: `url('${process.env.REACT_APP_PATH_IMG}${movieInfos?.backdrop_path}')`,
                  }
                : {}
            }
          >
            <div className="banner_bottom"></div>
          </div>
          <div className="shadow"></div>
          <div className="content_container">
            <div className="content_wrapper">
              <div className="poster">
                <img
                  src={
                    movieInfos?.poster_path
                      ? process.env.REACT_APP_PATH_IMG + movieInfos?.poster_path
                      : ""
                  }
                  alt={
                    category === "movie" ? movieInfos.title : movieInfos.name
                  }
                  onError={(event) => {
                    event.target.src = process.env.REACT_APP_IMG_DEFAULT;
                    event.onerror = null;
                  }}
                />
              </div>
              <div className="detail">
                <span className="title">
                  {category === "movie" ? movieInfos.title : movieInfos.name}
                </span>
                <div className="genres">
                  {movieInfos.genres?.map((item, index) => {
                    return (
                      <div className="genre" key={index}>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
                {isWatchFilm ? (
                  <button
                    onClick={(e) => {
                      handleClickWatchFilm(e);
                    }}
                    className="btn_watch_film"
                  >
                    Watch film
                  </button>
                ) : (
                  <button
                    className="btn_watch_film"
                    style={{
                      backgroundColor: "#f1f1f1",
                    }}
                  >
                    Watch film
                  </button>
                )}

                <div className="plot">
                  <span>{movieInfos.overview}</span>
                </div>
                <div className="casts">
                  {casts?.map((item, index) => {
                    return (
                      <div key={index} className="cast">
                        <Link
                          style={{
                            textDecoration: "none",
                            minHeight: "100%",
                            width: "100%",
                          }}
                          to={"/person/detail/" + item.id}
                        >
                          <img
                            style={{ width: "100%", minHeight: "100%" }}
                            src={
                              item?.profile_path
                                ? process.env.REACT_APP_PATH_IMG +
                                  item.profile_path
                                : ""
                            }
                            onError={(event) => {
                              event.target.src =
                                "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                              event.onerror = null;
                            }}
                            // style={{ minWidth: "80px", minHeight: "100px" }}
                            alt={item.original_name}
                          />
                          <span>{item.original_name}</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
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
                  // width='100%'
                  // height='100%'
                  // muted={true}
                  // volume={1}
                  controls={true}
                  // url="https://ali-cdn-play.loklok.tv/b4dda15c655e4918a146e6961aa653ce/7d3e0d09c98a4dd5b15c2c5e5de0bc9c-80286400a5db0f65a99b17eeea8e339d-hd.m3u8?auth_key=1645371649-c6f9ba2e2c8a439790b160146fdc6753-0-327978a7afb5555a53c55400594d248b"
                  url={`http://www.youtube.com/embed/${selectedtrailerFilms.key}`}
                  // config={{
                  //   youtube: {
                  //     playerVars: {  modestbranding: 1 },
                  //   },
                  // }}
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
                        <img
                          className="react-player"
                          alt=""
                          src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
                        />
                        <div className="shadow_video"></div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="cart_video" key={index}>
                        <img
                          className="react-player"
                          alt=""
                          src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
                        />

                        <div className="shadow_video" key={index}>
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
              <VideoSlider
                videoList={similarFilms}
                onHandleChangeMovieId={handleChangeMovieId}
              />
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
                    ? item.author_details.avatar_path.replace("/https", "https")
                    : "https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png";
                if (!path.includes("https")) {
                  path =
                    "https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png";
                }
                return (
                  <div key={index}>
                    <div className="item">
                      <div className="avatar">
                        <img
                          src={path}
                          alt=""
                          onError={(event) => {
                            event.target.src =
                              "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                            event.onerror = null;
                          }}
                        />
                      </div>
                      <div className="desc">
                        <div className="info_name">
                          <div className="full_name">
                            {item.author.toUpperCase()}
                          </div>
                          <div className="evalute">
                            <StarRateIcon className="star_icon" />

                            <span style={{ color: "#F0CD41" }}>
                              {item.author_details.rating === null
                                ? 7
                                : item.author_details.rating}{" "}
                              / 10
                            </span>
                          </div>
                        </div>
                        <div className="desc_review">
                          <ShowMoreText
                            lines={3}
                            more="Show more"
                            less="Show less"
                            className="content_css"
                            anchorClass="my-anchor-css-class"
                            // onClick={executeOnClick}
                            expanded={false}
                            // width={100%}
                            truncatedEndingComponent={"... "}
                          >
                            {item.content}
                          </ShowMoreText>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
