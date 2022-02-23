import React, { useState } from "react";
import "./navbar.scss";
// import tmovie from "../../images/tmovie.png";
import { Link } from "react-router-dom";
import { Search } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import tmdbApi from "../../api/tmdbApi";
import { useNavigate } from "react-router-dom";
// import defaultImage from "../../images/default_image.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Navbar = () => {
  // const [searchFocusColor, setsearchFocusColor] = useState({ color: "black" });
  // XỬ LÝ NAV_MENU_LINK
  // const options = ["Movies", "Series", "PeoPle", "News"];
  const navigate = useNavigate();
  const [isCloseIcon, setIsCloseIcon] = useState(false);
  const [ancho, setAncho] = React.useState(null);
  const [anchorProfile, setAnchorProfile] = React.useState(null);
  const openMenu = (event) => {
    setAncho(event.currentTarget);
    console.log(event.currentTarget);
  };
  const openMenuProfile = (event) => {
    setAnchorProfile(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAncho(null);
  };
  const handleProfileMenuClose = () => {
    setAnchorProfile(null);
  };
  //
  // const { innerWidth: width } = window;
  // const [widthWindow, setWidthWindow] = useState(width || 1280);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [wordEntered, setWordEntered] = useState("");
  const handClickSearch = () => {
    console.log("clicked");
  };
  const handleOnkeyUpSearch = async (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      setSearchResult([]);
      setWordEntered("");
      setIsCloseIcon(false);
      setIsSearchShow(false);
      navigate("/search?query=" + e.target.value.trim());
    }
  };
  const handleOnChangeUpSearch = async (e) => {
    setWordEntered(e.target.value.toString());
    const response = await tmdbApi.searchMulties(
      e.target.value.toString().trim()
    );
    setSearchResult(response.results || []);
    console.log(response.results);
    setIsCloseIcon(true);
  };
  const handleClickCloseSearchShow = () => {
    setIsSearchShow(false);
  };
  const handleOpenShowSearch = () => {
    setIsSearchShow(true);
  };
  const handClickCloseIcon = () => {
    console.log("closeIconRun");
    setSearchResult([]);
    setWordEntered("");
    setIsCloseIcon(false);
  };
  const handBlurCloseIcon = () => {
    const timeout = setTimeout(() => {
      setSearchResult([]);
    }, 200);
    setWordEntered("");
    setIsCloseIcon(false);
    return () => clearTimeout(timeout);
  };
  return (
    <div className="navbar">
      {/* responsive mobile */}
      {isSearchShow ? (
        <div>
          <input
            className="input_search"
            style={{ display: "block" }}
            onKeyUp={(e) => handleOnkeyUpSearch(e)}
          />
          <CloseIcon
            className="icon_close"
            onClick={handleClickCloseSearchShow}
          />
        </div>
      ) : (
        <div style={{ display: "none" }}>
          <input className="input_search" />
          <CloseIcon
            className="icon_close"
            onClick={handleClickCloseSearchShow}
          />
        </div>
      )}

      <div className="navbar_container">
        <div className="logoContainer">
          <Link to="/" className="logo_link">
            <span className="logoText">
              <span>D</span>
              movie
            </span>
          </Link>
        </div>
        <div className="search">
          <div className="search_wrapper">
            <input
              type="text"
              className="inputSearch"
              placeholder="Search for movies, tv show and people..."
              value={wordEntered}
              onKeyUp={(e) => handleOnkeyUpSearch(e)}
              onChange={(e) => handleOnChangeUpSearch(e)}
              onBlur={(e) => handBlurCloseIcon(e)}
            />
            {isCloseIcon ? (
              <CloseIcon
                className="iconSearch"
                onClick={() => handClickCloseIcon()}
              />
            ) : (
              <Search
                className="iconSearch"
                onClick={() => handClickSearch()}
              />
            )}
          </div>
          {searchResult.length > 0 ? (
            <div className="data_results">
              {searchResult.map((item, index) => {
                const arrDate = item.release_date
                  ? item.release_date.split("-")
                  : [];
                return (
                  <Link
                    to={
                      "/" +
                      (item.media_type === "movie"
                        ? item.media_type + "s"
                        : item.media_type) +
                      "/detail/" +
                      item.id
                    }
                    style={{
                      textDecoration: "none",
                      color: "#263238",
                      marginTop: "10px",
                    }}
                  >
                    <div key={index} className="data_result">
                      <div className="data_result_backdrop">
                        <LazyLoadImage
                          effect="blur"
                          src={
                            item.media_type === "person"
                              ? process.env.REACT_APP_PATH_IMG +
                                item.profile_path
                              : process.env.REACT_APP_PATH_IMG +
                                item.poster_path
                          }
                          onError={(event) => {
                            event.target.src =
                              "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                            event.onerror = null;
                          }}
                          alt={item.name ? item.name : item.title}
                        />
                      </div>
                      <div className="data_result_content">
                        <div className="data_result_title">
                          {(item.name ? item.name : item.title) +
                            (arrDate[0] ? " (" + arrDate[0] + ")" : "")}
                        </div>
                        <div className="data_result_description">
                          {item.overview
                            ? item.overview
                            : item.known_for_department}
                        </div>
                      </div>
                    </div>
                    <hr
                      style={{
                        borderTop: "thin solid gray",
                        borderLeft: "none",
                        borderRight: "none",
                        borderBottom: "none",
                        // color: "gray",
                        // backgroundColor: "gray",
                        minHeight: "1px",
                        height: "1px",
                        maxHeight: "1px",
                        transform: "scale(1)",
                        marginBottom: 0,
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <div className="search_navbar_icon">
            <Search className="icon_search" onClick={handleOpenShowSearch} />
          </div>
        </div>

        <div className="nav_link">
          <div className="nav_bar_menu">
            <MenuIcon onClick={openMenu} className="nav_bar_menu_icon" />
            <Menu
              open={Boolean(ancho)}
              anchorEl={ancho}
              onClose={handleClose}
              keepMounted
            >
              <MenuItem>
                <Link
                  to="/browse?type=movie"
                  style={{ textDecoration: "none", color: "#263238" }}
                >
                  Movies
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/browse?type=series"
                  style={{ textDecoration: "none", color: "#263238" }}
                >
                  Series
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/person"
                  style={{ textDecoration: "none", color: "#263238" }}
                >
                  People
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/news"
                  style={{ textDecoration: "none", color: "#263238" }}
                >
                  News
                </Link>
              </MenuItem>
            </Menu>
          </div>

          <div className="nav_link_item">
            <Link to="/browse?type=movie" className="link">
              Movies
            </Link>
            <Link to="/browse?type=series" className="link">
              Series
            </Link>
            <Link to="/person" className="link">
              People
            </Link>
            <Link to="/news" className="link">
              News
            </Link>
          </div>
        </div>
        <div className="profile">
          <div className="profile_items">
            <Link
              style={{ textDecoration: "none" }}
              to="/account?type=register"
            >
              {" "}
              <span className="register">Register</span>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/account?type=login">
              {" "}
              <button className="login">Login</button>
            </Link>
          </div>
          <div className="nav_bar_profile">
            <PersonIcon
              onClick={openMenuProfile}
              className="nav_bar_profile_icon"
            />
            <Menu
              open={Boolean(anchorProfile)}
              anchorEl={anchorProfile}
              onClose={handleProfileMenuClose}
              keepMounted
            >
              <MenuItem>
                <Link
                  to="/account?type=register"
                  style={{ textDecoration: "none", color: "#263238" }}
                >
                  Register
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/account?type=login"
                  style={{ textDecoration: "none", color: "#263238" }}
                >
                  Login
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
