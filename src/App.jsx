// import tmdbApi, { category, movieType } from "./api/tmdbApi";
// import apiConfig from "./api/tmdbApi";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./app.scss";
import MovieDetail from "./pages/MovieDetail";
import TvDetail from "./pages/TvDetail";
import Browse from "./pages/Browse";
const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/browse" element={<Browse />} />
          {/*MOVIES */}
          <Route path="movies/detail/:id" element={<MovieDetail />} />
          {/*TV */}
          <Route path="tv/detail/:id" element={<TvDetail />} />
          {/*HOME */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
