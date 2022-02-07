// import tmdbApi, { category, movieType } from "./api/tmdbApi";
// import apiConfig from "./api/tmdbApi";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./app.scss";
import Movie from "./pages/Movie";
import MovieDetail from "./pages/MovieDetail";
const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/*MOVIES */}
          <Route path="movies" element={<Movie />} />
          <Route path="movies/detail/:movieId" element={<MovieDetail />} />
          {/*HOME */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
