import React, { useState } from "react";
import "./navbar.scss";
// import tmovie from "../../images/tmovie.png";
import { Link } from "react-router-dom";
import { Search, Menu } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
// import MenuItem  from "@material-ui/core/MenuItem ";
import { MenuItem} from "@material-ui/core";


const Navbar = () => {
  // const [searchFocusColor, setsearchFocusColor] = useState({ color: "black" });
  const { innerWidth: width } = window;
  const [widthWindow, setWidthWindow] = useState(width || 1280);
  const handClickSearch = () => {
    console.log("clicked");
  };
  // console.log(searchFocusColor);
  return (
    <div className="navbar">
      <div className="navbar_container">
        <div className="logoContainer">
          <Link to="/" className="logo_link">
            <span className="logoText">
              <span
              // style={{
              //   color: "#349abd",
              //   fontSize: "45px",
              // }}
              >
                D
              </span>
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
        <div className="nav_link">
          <MenuIcon className="nav_link_menu" />
          <div className="nav_link_item">
            <Link to="/browse?type=movie" className="link">
              Movies
            </Link>
            <Link to="/browse?type=series" className="link">
              Series
            </Link>
            <Link to="/people" className="link">
              People
            </Link>
            <Link to="/news" className="link">
              News
            </Link>
          </div>
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
