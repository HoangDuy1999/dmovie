import React, { useState, useEffect } from "react";
import "./navbar.scss";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import MenuMui from "@mui/material/Menu";
import MenuMuiItem from "@mui/material/MenuItem";
import tmdbApi from "../../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { RiArrowDownSFill } from "react-icons/ri";
import { VscSearch } from "react-icons/vsc";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import dmovieLogo from "../../images/dmovie_logo.png";
const Navbar = ({ handleOnFocus = (e) => {}, home }) => {
  const navigate = useNavigate();
  const [isCloseIcon, setIsCloseIcon] = useState(false);
  const [ancho, setAncho] = React.useState(null);
  const [anchorProfile, setAnchorProfile] = React.useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [wordEntered, setWordEntered] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [isOpenMenuProfile, setIsOpenMenuProfile] = useState(false);

  // const handleMouseClick = (e) => {
  //   console.log(e);
  //   console.log(isOpenMenuProfile);
  //   // if (e.keyCode === 90) {
  //   if (isOpenMenuProfile) {
  //     setIsOpenMenuProfile(() => false);
  //   }
  //   // }
  // };
  // useEventListener("keydown", handleKeyBoard);

  useEffect(() => {
    // console.log(localStorage.getItem("access_token"));
    // window.addEventListener("click", handleMouseClick);
    if (localStorage.getItem("access_token") !== null) {
      setIsLogin(true);
    }
    if (localStorage.getItem("account_info") !== null) {
      setAccountInfo(JSON.parse(localStorage.getItem("account_info")));
    }
    // return () => {
    //   window.removeEventListener("click", handleMouseClick);
    // };
  }, []);
  // console.log(accountInfo);

  const openMenu = (event) => {
    setAncho(event.currentTarget);
    // console.log(event.currentTarget);
  };

  const openMenuProfile = (event) => {
    setAnchorProfile(event.currentTarget);
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

  const handClickSearch = () => {
    // console.log("clicked");
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
    if (response?.results) {
      //response?.results?.overview = response?.results?.overview.splice(0, 300) || "";
      setSearchResult(response.results || []);
    }
    // console.log(response.results);
    setIsCloseIcon(true);
  };

  const handleClickCloseSearchShow = () => {
    setSearchResult([]);
    setWordEntered("");
    setIsSearchShow(false);
  };
  const handleOpenShowSearch = () => {
    setIsSearchShow(true);
  };
  const handClickCloseIcon = () => {
    // console.log("closeIconRun");
    setSearchResult([]);
    setWordEntered("");
    setIsCloseIcon(false);
  };
  const handBlurCloseIcon = () => {
    handleOnFocus(false);
    const timeout = setTimeout(() => {
      setSearchResult([]);
    }, 200);
    setWordEntered("");
    setIsCloseIcon(false);
    return () => clearTimeout(timeout);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("account_info");
    setIsLogin(false);
    handleProfileMenuClose();
  };
  return (
    <>
      <div
        className="navbar"
        style={home ? { position: "absolute" } : { position: "relative" }}
      >
        <div
          className="navbar_container"
          style={
            home
              ? { backgroundColor: "rgba(0,0,0,0.2)" }
              : { backgroundColor: "#2d2d2d" }
          }
        >
          <div className="logoContainer">
            <Link to="/" className="logo_link">
              <img src={dmovieLogo} alt="dmovie_logo" className="dmovie_logo" />
            </Link>
          </div>

          <div className="search">
            <div className="search_wrapper">
              <input
                type="text"
                style={home ? {} : { backgroundColor: "#37474f" }}
                className="inputSearch"
                placeholder="Search for movies, tv show and people..."
                value={wordEntered}
                onKeyUp={(e) => handleOnkeyUpSearch(e)}
                onChange={(e) => handleOnChangeUpSearch(e)}
                onBlur={(e) => handBlurCloseIcon(e)}
                onFocus={(e) => handleOnFocus(true)}
              />
              {isCloseIcon ? (
                <CloseIcon
                  style={{ color: "red" }}
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
            {searchResult.length > 0 && isSearchShow === false ? (
              <div className="data_results">
                {searchResult.map((item, index) => {
                  const arrDate = item.release_date
                    ? item.release_date.split("-")
                    : [];
                  return (
                    <Link
                      key={index}
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
                        zIndex: 99999999999999999999999999999,
                        backgrroundColor: "red",
                      }}
                    >
                      <div key={index} className="data_result">
                        <div className="data_result_backdrop">
                          <LazyLoadImage
                            effect="blur"
                            className="backdrop_img_rs"
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
              <MenuMui
                open={Boolean(ancho)}
                anchorEl={ancho}
                onClose={handleClose}
                keepMounted
              >
                <MenuMuiItem>
                  <Link
                    to="/browse?type=movie"
                    style={{ textDecoration: "none", color: "#263238" }}
                  >
                    Movies
                  </Link>
                </MenuMuiItem>
                <MenuMuiItem>
                  <Link
                    to="/browse?type=series"
                    style={{ textDecoration: "none", color: "#263238" }}
                  >
                    Series
                  </Link>
                </MenuMuiItem>
                <MenuMuiItem>
                  <Link
                    to="/person"
                    style={{ textDecoration: "none", color: "#263238" }}
                  >
                    People
                  </Link>
                </MenuMuiItem>
                <MenuMuiItem>
                  <Link
                    to="/news"
                    style={{ textDecoration: "none", color: "#263238" }}
                  >
                    News
                  </Link>
                </MenuMuiItem>
              </MenuMui>
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
            {isLogin ? (
              <>
                <div className="nav_bar_profile_login">
                  <div className="tiltle_menu">
                    <div
                      style={{
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setIsOpenMenuProfile(!isOpenMenuProfile)}
                    >
                      <img
                        src={accountInfo.avatar}
                        alt=""
                        style={{ width: "35px", height: "35px" }}
                      />
                      <RiArrowDownSFill
                        style={{
                          color: "white",
                          fontSize: "25px",
                          marginLeft: "-5px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="profile_items">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/account?type=register"
                  >
                    <span className="register">Register</span>
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/account?type=login"
                  >
                    <button className="login">Login</button>
                  </Link>
                </div>

                <div className="nav_bar_profile" style={{ marginLeft: "10px" }}>
                  <PersonIcon
                    onClick={openMenuProfile}
                    className="nav_bar_profile_icon"
                  />
                  <MenuMui
                    open={Boolean(anchorProfile)}
                    anchorEl={anchorProfile}
                    onClose={handleProfileMenuClose}
                    keepMounted
                  >
                    <MenuMuiItem style={{ zIndex: 3 }}>
                      <Link
                        to="/account?type=register"
                        style={{ textDecoration: "none", color: "#263238" }}
                      >
                        Register
                      </Link>
                    </MenuMuiItem>
                    <MenuMuiItem>
                      <Link
                        to="/account?type=login"
                        style={{ textDecoration: "none", color: "#263238" }}
                      >
                        Login
                      </Link>
                    </MenuMuiItem>
                  </MenuMui>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className="content_menu"
        style={isOpenMenuProfile ? { display: "flex" } : { display: "none" }}
      >
        <div className="menu_item" onClick={() => setIsOpenMenuProfile(false)}>
          <Link
            to={`/vip-search`}
            style={{ textDecoration: "none", color: "#263238" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <VscSearch style={{ marginRight: "5px" }} />
              <span className="menu_item_title">Vip search</span>
            </div>
          </Link>
        </div>
        <div className="menu_item" onClick={() => setIsOpenMenuProfile(false)}>
          <Link
            to={`/favorite-list/${accountInfo._id}`}
            style={{ textDecoration: "none", color: "#263238" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <AiOutlineUnorderedList style={{ marginRight: "5px" }} />
              <span className="menu_item_title">Favorite list</span>
            </div>
          </Link>
        </div>
        <div
          className="menu_item"
          onClick={() => {
            handleLogout();
            setIsOpenMenuProfile(false);
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IoIosLogOut style={{ marginRight: "5px" }} />
            <span className="menu_item_title">Log out</span>
          </div>
        </div>
      </div>
      {isSearchShow ? (
        <>
          <CloseIcon
            className="icon_close"
            onClick={handleClickCloseSearchShow}
          />
          <input
            autoFocus
            value={wordEntered}
            placeholder="Search for movies, tv show and people..."
            className="input_search"
            onKeyUp={(e) => handleOnkeyUpSearch(e)}
            onChange={(e) => handleOnChangeUpSearch(e)}
            onFocus={(e) => handleOnFocus(true)}
            onBlur={(e) => handleOnFocus(false)}
          />
          <div
            className="list_box_result"
            style={
              searchResult.length > 0
                ? {}
                : { display: "none", width: 0, height: 0 }
            }
          >
            {searchResult.map((item, index) => {
              const arrDate = item.release_date
                ? item.release_date.split("-")
                : [];
              return (
                <>
                  <Link
                    className="list_box_row"
                    key={index}
                    onClick={() => setIsSearchShow(false)}
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
                    }}
                  >
                    <div className="left_row">
                      <LazyLoadImage
                        effect="blur"
                        className="left_row_backdrop"
                        src={
                          item.media_type === "person"
                            ? process.env.REACT_APP_PATH_IMG + item.profile_path
                            : process.env.REACT_APP_PATH_IMG + item.poster_path
                        }
                        onError={(event) => {
                          event.target.src =
                            "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                          event.onerror = null;
                        }}
                        alt={item.name ? item.name : item.title}
                      />
                    </div>
                    <div className="right_row">
                      <div className="right_row_title">
                        {(item.name ? item.name : item.title) +
                          (arrDate[0] ? " (" + arrDate[0] + ")" : "")}
                      </div>

                      <div className="right_row_description">
                        {item.overview
                          ? item.overview
                          : item.known_for_department}
                      </div>
                    </div>
                  </Link>
                  <div>
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
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
