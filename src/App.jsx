import { Helmet } from "react-helmet";
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
import FavoriteList from "./pages/FavoriteList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListMovie from "./pages/ListMovie";
import VipSearch from "./pages/VipSearch";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "./pages/PageNotFound";
import VipContent from "./pages/VipContent";
const App = () => {
  return (
    <div className="app">
      <Helmet>
        <title>Dmovie - Home</title>
        <meta name="description" content="Home dmovie" />
      </Helmet>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/*HOME */}
          <Route exact path="/" element={<Home />} />

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

          {/* Private Route */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/vip-search" element={<VipSearch />} />
            <Route path="/vip-content" element={<VipContent />} />
            <Route path="/favorite-list/:id" element={<FavoriteList />} />
          </Route>

          {/* watch movie*/}
          <Route path="/watch/:id" element={<WatchMovie />} />

          <Route path="/list" element={<ListMovie />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
