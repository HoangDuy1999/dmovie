// import tmdbApi, { category, movieType } from "./api/tmdbApi";
// import apiConfig from "./api/tmdbApi";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./app.scss";
import MovieDetail from "./pages/MovieDetail";
import TvDetail from "./pages/TvDetail";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import People from "./pages/People";
import PeopleDetail from "./pages/PeopleDetail";
import Login from "./pages/Login";
import WatchMovie from "./pages/WatchMovie";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/browse" element={<Browse />} />
          {/*MOVIES */}
          <Route path="movies/detail/:id" element={<MovieDetail />} />
          {/*TV */}
          <Route path="tv/detail/:id" element={<TvDetail />} />
          {/* Search */}
          <Route path="/search" element={<Search />} />
          {/* People */}
          <Route path="/person" element={<People />} />
          {/*People detail */}
          <Route path="/person/detail/:id" element={<PeopleDetail />} />
          {/* News */}
          <Route path="/news" element={<News />} />
          {/* News Detail*/}
          <Route path="/news/detail/:id" element={<NewsDetail />} />
          {/* Login Detail*/}
          <Route path="/account" element={<Login />} />
          {/* watch movie*/}
          <Route path="/watch/:id" element={<WatchMovie />} />

          {/*HOME */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
