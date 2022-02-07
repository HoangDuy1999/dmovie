import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import "./movieInfo.scss";
const MovieInfo = ({ movieId }) => {
  const [movieInfos, setMovieInfo] = useState([]);
  const [casts, setCasts] = useState([]);
  // const [numItems, setNumItems] = useState(10);
  useEffect(() => {
    window.scrollTo(0, 0);
    const getMovies = async () => {
      try {
        const params = {};
        const response = await tmdbApi.detail("movie", movieId, { params });
        setMovieInfo(response);
      } catch (e) {
        console.log(e);
      }
    };
    getMovies();
    const getCredits = async () => {
      const res = await tmdbApi.credits("movie", movieId);
      setCasts(res.cast.slice(0, 5));
    };
    getCredits();
  }, []);
  console.log(movieInfos);
  console.log(
    `url(${process.env.REACT_APP_PATH_IMG}${movieInfos.backdrop_path})`
  );
  return (
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
              alt={movieInfos.title}
            />
          </div>
          <div className="detail">
            <span className="title">{movieInfos.title}</span>
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
              <span>{movieInfos.overview}</span>
            </div>
            <div class="casts">
              {casts?.map((item) => {
                return (
                  <div key={item.id} className="cast">
                    <img
                      src={process.env.REACT_APP_PATH_IMG + item.profile_path}
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
          <span>Trainler</span>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
