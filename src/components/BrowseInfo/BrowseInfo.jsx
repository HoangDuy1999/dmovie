import React, { useState, useEffect } from "react";
import "./browseInfo.scss";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import CardItemBrowses from "../CardItemBrowses/CardItemBrowses";
import Button from "@mui/material/Button";
import { languages } from "../../Data/language";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
// import { CSSTransition } from "react-transition-group";
const BrowseInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sideBarLeft, setSideBarLeft] = useState(false);
  const [doneLoad, setDoneLoad] = useState(false);
  // const [subDoneLoad, setSubDoneLoad] = useState(true);
  const [dataLists, setDataLists] = useState([]);
  const [releaseIn, setReleaseIn] = useState([1880, 2029]);
  const [score, setScore] = useState([0, 10]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [genresLists, setGenresLists] = useState([]);
  const [selectMovieGenres, setSelectMovieGenres] = useState("");
  // const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(
    {
      value: searchParams.get("type") === "series" ? "tv" : "movie",
      label: searchParams.get("type") === "series" ? "Tv series" : "Movie",
    } || null
  );
  const [selectedLanguege, setselectedLanguege] = useState(
    {
      value: "",
      label: "All Languages",
    } || null
  );
  // const types = [
  //   { value: "movie", label: "Movie" },
  //   { value: "tv", label: "Tv series" },
  // ];

  // set type default
  useEffect(() => {
    const setType = () => {
      setSelectedType(() => ({
        value: searchParams.get("type") === "series" ? "tv" : "movie",
        label: searchParams.get("type") === "series" ? "Tv series" : "Movie",
      }));
    };
    setType();
    // setSelectMovieGenres("");
    setSelectMovieGenres("");
    setGenresLists([]);
  }, [searchParams]);

  // get list genres
  useEffect(() => {
    const getGenresLists = async () => {
      if (selectedType.value !== undefined) {
        // console.log(selectedType.value);
        const cate = selectedType.value;
        const response = await tmdbApi.genresList(cate);
        // console.log(response);
        setGenresLists(response.genres.slice(0, 8));
      }
    };
    getGenresLists();
  }, [selectedType]);

  // get data
  useEffect(() => {
    setDoneLoad(false);
    setSideBarLeft(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 5000);
    const params = {
      "release_date.gte": releaseIn[0] + "-01-01",
      "release_date.lte": releaseIn[1] + "-01-01",
      "first_air_date.gte": releaseIn[0] + "-01-01",
      "first_air_date.lte": releaseIn[1] + "-01-01",
      region: "US",
      with_original_language: selectedLanguege.value,
      "vote_average.gte": score[0],
      "vote_average.lte": score[1],
      with_genres: selectMovieGenres,
      language: "en-US",
      page: 1,
    };
    setPage(1);
    const getData = async () => {
      try {
        if (selectedType.value !== undefined) {
          // console.log("==========================");
          // console.log(selectedType.value);
          const response = await tmdbApi.discover(selectedType.value, params);
          setTotalPage(response.total_pages || 1);
          // console.log(response);
          setDataLists(response.results);
          // if(response.results !== undefined){

          // }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    return () => clearTimeout(timeout);
  }, [selectMovieGenres, selectedType, score, releaseIn, selectedLanguege]);

  // const handleChangeSetSelectedType = (e) => {
  //   // setSelectedType(e);
  //   // console.log(`/browse?type=${e.value}`);
  //   // console.log(e);
  //   // setSelectMovieGenres("");
  //   // setGenresLists([]);
  //   // setSearchParams({type: e.value});
  //   navigate(`/browse?type=${e.value}`);
  // };

  const handleChangeReleaseIn = (e) => {
    setReleaseIn(e);
  };

  const handleClickOpenMenuLeft = (e) => {
    setSideBarLeft(!sideBarLeft);
  };

  const handleChangeScore = (e) => {
    setScore(e);
  };

  const handleChangeGenres = (e) => {
    // console.log(e.target.value.toString());
    // console.log(e.target.checked);
    if (e.target.checked) {
      if (selectMovieGenres.length < 1) {
        setSelectMovieGenres(e.target.value.toString());
      } else {
        setSelectMovieGenres(
          selectMovieGenres + "," + e.target.value.toString()
        );
      }
    } else {
      let data = selectMovieGenres.replace("," + e.target.value.toString(), "");
      data = data.replace(e.target.value.toString() + ",", "");
      data = data.replace(e.target.value.toString(), "");
      setSelectMovieGenres(data);
      // console.log("đa chay");
      // console.log(data);
    }
  };

  const handleClickLoadMore = () => {
    setDoneLoad(!doneLoad);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 5000);
    // setSubDoneLoad(false);
    const params = {
      "release_date.gte": releaseIn[0] + "-01-01",
      "release_date.lte": releaseIn[1] + "-01-01",
      "first_air_date.gte": releaseIn[0] + "-01-01",
      "first_air_date.lte": releaseIn[1] + "-01-01",
      "vote_average.gte": score[0],
      "vote_average.lte": score[1],
      region: "US",
      with_original_language: selectedLanguege.value,
      with_genres: selectMovieGenres,
      language: "en-US",
      page: page + 1,
    };
    setPage(page + 1);
    // console.log("page: " + page);
    if (page + 1 <= totalPages) {
      const getData = async () => {
        try {
          if (selectedType.value !== undefined) {
            // console.log("==========================");
            // console.log(selectedType.value);
            // console.log(params);
            const response = await tmdbApi.discover(selectedType.value, params);
            setTotalPage(response.total_pages || 1);
            // console.log(response);
            setDataLists([...dataLists, ...response.results]);
          }
        } catch (e) {
          console.log(e);
        }
      };
      getData();
      return () => clearTimeout(timeout);
    }
  };

  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="browseInfoContainer">
        <div
          className="side_bar_left"
          style={sideBarLeft ? {} : { display: "none" }}
        >
          <div className="container">
            <div className="left">
              <div className="type">
                <div className="type_label">
                  <span>TITLE TYPE</span>
                </div>
                <div className="type_select">
                  <span style={{ fontSize: "20px", fontWeight: 600 }}>
                    {selectedType.label}
                  </span>
                </div>
                <hr
                  style={{
                    backgroundColor: "#e0e0e0",
                    height: "1px",
                    border: 0,
                  }}
                />
              </div>
              <div className="genres">
                <div className="genres_label">WITH SELECTED GENRES</div>
                {genresLists.map((item, index) => (
                  <div className="checkgroup" key={index}>
                    <input
                      type="checkbox"
                      id={item.name}
                      name={item.name}
                      value={item.id}
                      onChange={(e) => handleChangeGenres(e)}
                    />
                    <label> {item.name}</label>
                  </div>
                ))}
                <hr
                  style={{
                    backgroundColor: "#e0e0e0",
                    height: "1px",
                    border: 0,
                  }}
                />
              </div>
              <div className="release_in">
                <div className="release_in_title">
                  <span>RELEASE IN</span>
                </div>
                <mobiscroll.Slider
                  className="slider_release_in"
                  value={[1880, 2029]}
                  onChange={(e) => handleChangeReleaseIn(e)}
                  min={1880}
                  max={2029}
                  // data-step-labels="[1880, 1920, 1960, 2000, 2029]"
                  data-tooltip="true"
                ></mobiscroll.Slider>
                <div className="group_relase_in">
                  <div className="group_relase_in_left">{releaseIn[0]}</div>
                  <div className="group_relase_in_right">{releaseIn[1]}</div>
                </div>
                <hr
                  style={{
                    backgroundColor: "#e0e0e0",
                    height: "1px",
                    border: 0,
                  }}
                />
              </div>
              <div className="score">
                <div className="score_in_title">
                  <span>VOTE AVERAGE</span>
                </div>
                <mobiscroll.Slider
                  className="score_slider"
                  value={[0, 10]}
                  onChange={(e) => handleChangeScore(e)}
                  min={0}
                  max={10}
                  // data-step-labels="[1880, 1920, 1960, 2000, 2029]"
                  data-tooltip="true"
                ></mobiscroll.Slider>
                <div className="group_score">
                  <div className="group_score_in_left">{score[0]}</div>
                  <div className="group_score_in_right">{score[1]}</div>
                </div>
                <hr
                  style={{
                    backgroundColor: "#e0e0e0",
                    height: "1px",
                    border: 0,
                  }}
                />
                <div className="countries">
                  <div className="countries_label">LANGUAGES</div>
                  <div className="select_country">
                    <Select
                      options={languages}
                      value={selectedLanguege}
                      onChange={setselectedLanguege}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="right"
              onClick={(e) => handleClickOpenMenuLeft(e)}
            ></div>
          </div>
        </div>
        <div className="wrapper">
          <div className="left">
            <div className="type">
              <div className="type_label">
                <span>TITLE TYPE</span>
              </div>
              <div className="type_select">
                <span style={{ fontSize: "20px", fontWeight: 600 }}>
                  {selectedType.label}
                </span>
                {/* <span>{selectedType}</span> */}
                {/* <Select
                  options={types}
                  value={selectedType}
                  disabled={selectedType}
                  onChange={(e) => handleChangeSetSelectedType(e)}
                /> */}
              </div>
              <hr
                style={{
                  backgroundColor: "#e0e0e0",
                  height: "1px",
                  border: 0,
                }}
              />
            </div>
            <div className="genres">
              <div className="genres_label">WITH SELECTED GENRES</div>
              {genresLists.map((item, index) => (
                <div className="checkgroup" key={index}>
                  <input
                    type="checkbox"
                    id={item.name}
                    name={item.name}
                    value={item.id}
                    onChange={(e) => handleChangeGenres(e)}
                  />
                  <label> {item.name}</label>
                </div>
              ))}
              <hr
                style={{
                  backgroundColor: "#e0e0e0",
                  height: "1px",
                  border: 0,
                }}
              />
            </div>
            <div className="release_in">
              <div className="release_in_title">
                <span>RELEASE IN</span>
              </div>
              <mobiscroll.Slider
                className="slider_release_in"
                value={[1880, 2029]}
                onChange={(e) => handleChangeReleaseIn(e)}
                min={1880}
                max={2029}
                // data-step-labels="[1880, 1920, 1960, 2000, 2029]"
                data-tooltip="true"
              ></mobiscroll.Slider>
              <div className="group_relase_in">
                <div className="group_relase_in_left">{releaseIn[0]}</div>
                <div className="group_relase_in_right">{releaseIn[1]}</div>
              </div>
              <hr
                style={{
                  backgroundColor: "#e0e0e0",
                  height: "1px",
                  border: 0,
                }}
              />
            </div>
            <div className="score">
              <div className="score_in_title">
                <span>VOTE AVERAGE</span>
              </div>
              <mobiscroll.Slider
                className="score_release_in"
                value={[0, 10]}
                onChange={(e) => handleChangeScore(e)}
                min={0}
                max={10}
                // data-step-labels="[1880, 1920, 1960, 2000, 2029]"
                data-tooltip="true"
              ></mobiscroll.Slider>
              <div className="group_score_in">
                <div className="group_score_in_left">{score[0]}</div>
                <div className="group_score_in_right">{score[1]}</div>
              </div>
              <hr
                style={{
                  backgroundColor: "#e0e0e0",
                  height: "1px",
                  border: 0,
                }}
              />
              <div className="countries">
                <div className="countries_label">LANGUAGES</div>
                <div className="select_country">
                  <Select
                    options={languages}
                    value={selectedLanguege}
                    onChange={setselectedLanguege}
                  />
                </div>
              </div>
              <hr
                style={{
                  backgroundColor: "#e0e0e0",
                  height: "1px",
                  border: 0,
                }}
              />
            </div>
          </div>
          <div className="right">
            <div className="label_top">
              <div className="label_left">Browse</div>
              <div style={{display: "flex", alignItems: "center" }}>
                <AiOutlineMenuUnfold
                  className="filter_icon"
                  onClick={(e) => {
                    handleClickOpenMenuLeft(e);
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {dataLists.map((item) => (
                <CardItemBrowses
                  item={item}
                  key={item.id}
                  types={selectedType.label === "Tv series" ? "tv" : "movies"}
                  colorGroup={{}}
                />
              ))}
            </div>
            {/* <ButtonLoadMore
              page={page}
              totalPages={totalPages}
              onClick={() => handleClickLoadMore()}
            /> */}
            <div className="btn_load_more">
              {page + 1 <= totalPages ? (
                <Button
                  variant="outlined"
                  onClick={() => handleClickLoadMore()}
                >
                  Load more ...
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default BrowseInfo;
