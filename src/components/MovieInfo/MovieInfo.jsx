import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
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
import { BsFillHeartFill } from "react-icons/bs";
import YouTube from "react-youtube";
import watchlistApi from "../../api/dmovie/watchlist";
import { success, error } from "../Toastify/Toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import defaultImage from "../../images/default_image.jpg";

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

  const [isLogin, setIsLogin] = useState();
  const [accountInfo, setAccountInfo] = useState({});
  const [isWatchList, setIsWatchList] = useState(false);

  // If exist data films
  const [isWatchFilm, setIsWatchFilm] = useState(false);
  const [movieInfoLoklok, setMoviesInfoLokLok] = useState([]);
  const { innerWidth: width } = window;

  const headers = {
    lang: "en",
    versioncode: 11,
    clienttype: "ios_jike_default",
  };
  // console.log(id);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsLogin(true);
    }
    if (localStorage.getItem("account_info") !== null) {
      setAccountInfo(JSON.parse(localStorage.getItem("account_info")));
    }
  }, []);

  useEffect(() => {
    setMovieId(id);
    if (isLogin && accountInfo._id !== undefined) {
      const findMoiveWatchList = async () => {
        try {
          const rs = await watchlistApi.findMovieByAccountId({
            _id: accountInfo._id + "",
            movie_id: parseInt(id),
          });
          // console.log(rs);
          if (rs.code === 200) {
            if (rs.data.movie !== null) {
              setIsWatchList(true);
            } else {
              setIsWatchList(false);
            }
          } else {
          }
        } catch (e) {}
      };
      findMoiveWatchList();
    }
  }, [id, accountInfo]);

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
      let keysearch = movieInfos.title
        ? movieInfos.title
        : movieInfos.name || "";
      keysearch = keysearch.replace("&", "and");
      if (keysearch !== "") {
        const body = {
          searchKeyWord:
            keysearch.toLowerCase() +
            "" /*+ (movieInfos?.release_date?.split("-")[0] || "")*/,
          size: 1,
          sort: "",
          searchType: "",
        };
        console.log(body);
        axios
          .post(
            "https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchWithKeyWord",
            body,
            { headers }
          )
          .then((response) => {
            console.log(response);
            if (response.data.data.searchResults.length > 0) {
              setIsWatchFilm(() => true);
              setMoviesInfoLokLok(response.data.data.searchResults);
            }
          })
          .catch(function (error) {
            console.log("search error" + error);
          });
      }
    }
  }, [movieInfos]);

  const handleSelectedVideo = (item) => {
    setSelectedtrailerFilms(item);
  };

  console.log(movieInfos);

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

  const handleAddWatchList = async () => {
    setDoneLoad(false);
    if (isWatchList) {
      const rs = await watchlistApi.update({
        account_id: accountInfo._id,
        movie_id: id,
        status: 0,
      });
      if (rs.code === 200) {
        success("Remove movie to watchlist successfully");
        setDoneLoad(true);
      } else {
        error("Remove movie to watchlist unsuccessfully");
        setDoneLoad(true);
      }
      console.log("hủy thích");
      console.log(movieInfos);
      setIsWatchList(false);
    } else {
      const rs = await watchlistApi.add({
        account_id: accountInfo._id,
        movie_id: id,
        movie_name: movieInfos.name || movieInfos.title,
        movie_backdrop: movieInfos.backdrop_path,
        movie_type: category,
        status: 1,
      });
      console.log(rs);
      if (rs.code === 200) {
        success("Add movie to watchlist successfully");
        setDoneLoad(true);
      } else {
        error("Add movie to watchlist unsuccessfully");
        setDoneLoad(true);
      }
      console.log("đã thích");
      setIsWatchList(true);
    }
  };

  const [opts, setOpts] = useState({
    height: parseInt(width / 2.5),
    width: parseInt(width * 0.8),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  });
  useEffect(() => {
    setOpts(() => ({
      height: parseInt(width / 2.5),
      width: parseInt(width * 0.8),
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        // autoplay: 1,
      },
    }));
  }, [width]);
  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="movie_info">
        <div
          className="movie_info_top"
          style={
            movieInfos?.overview?.length < 200 && width < 480
              ? { minHeight: "45vh" }
              : {}
          }
        >
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
                  {category === "movie" ? movieInfos.title : movieInfos.name}{" "}
                  {movieInfos?.release_date
                    ? `(${movieInfos?.release_date.split("-")[0]})`
                    : ""}
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    marginTop: "10px",
                    marginBottom: "-5px",
                  }}
                >
                  <div>
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
                  </div>
                  <div>
                    {isLogin ? (
                      <>
                        <BsFillHeartFill
                          className="heart_icon"
                          onClick={handleAddWatchList}
                          style={
                            isWatchList
                              ? {
                                  color: "red",
                                  marginLeft: "15px",
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }
                              : {
                                  color: "black",
                                  marginLeft: "15px",
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }
                          }
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
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
                            margin: 0,
                            padding: 0,
                            minHeight: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                          to={"/person/detail/" + item.id}
                        >
                          <LazyLoadImage
                            className="cast_img"
                            title={item.original_name}
                            onError={(event) => {
                              event.target.src = { defaultImage };
                              event.onerror = null;
                            }}
                            effect="blur"
                            src={
                              process.env.REACT_APP_PATH_IMG + item.profile_path
                            }
                          />
                          <span style={{ textAlign: "center" }}>
                            {item.original_name}
                          </span>
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
                {/* <ReactPlayer
                  // className="react-player"
                  url={`http://www.youtube.com/embed/${selectedtrailerFilms.key}`}
                  controls
                /> */}
                <YouTube
                  style={{ minWidth: "100%" }}
                  opts={opts}
                  videoId={selectedtrailerFilms.key}
                />
              </div>

              <div className="video_trainers">
                {trailerFilms.map((item, index) => {
                  if (item.key === selectedtrailerFilms.key) {
                    return (
                      <div
                        className="card_video"
                        key={index}
                        style={{ backgroundColor: " rgb(3, 169, 244)" }}
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
                      <div className="card_video" key={index}>
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
