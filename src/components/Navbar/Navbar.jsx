import React, { useState } from "react";
import "./navbar.scss";
import tmovie from "../../images/tmovie.png";
import { Link } from "react-router-dom";
import { Search } from "@material-ui/icons";
const Navbar = () => {
  // const [searchFocusColor, setsearchFocusColor] = useState({ color: "black" });
  const handClickSearch = () => {
    console.log("clicked");
  };
  // console.log(searchFocusColor);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logoContainer">
          <Link to="/" style={{textDecoration: "none"}}>
            <img src={tmovie} alt="logo" className="logo" />
            <span className="logoText">
              <span style={{ color: "#349abd", fontSize: "30px" }}>D</span>
              movie
            </span>
          </Link>
        </div>
        <div className="search">
          <input
            type="text"
            className="inputSearch"
            placeholder="Search for movies, tv show and people..."
            // onFocus={() => handChangeSearchColor("black")}
            // onBlur={() => handChangeSearchColor("white")}
          />
          <Search
            className="iconSearch"
            onClick={() => handClickSearch()}
            // style={
            //   searchFocusColor
            // } /*onMouseOver={()=> handChangeSearchColor("black")} */
          />
        </div>
        <div className="navlink">
          <Link to="movies" className="link">
            Movies
          </Link>
          <Link to="series" className="link">
            Series
          </Link>
          <Link to="people" className="link">
            People
          </Link>
          <Link to="news" className="link">
            News
          </Link>
        </div>
        <div className="profile">
          <span className="register">Register</span>
          <button className="login">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
