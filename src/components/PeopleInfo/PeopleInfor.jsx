import React, { useEffect, useState } from "react";
import "./peopleInfor.scss";
import { useParams } from "react-router-dom";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import axios from "axios";
import ShowMoreText from "react-show-more-text";
import CarItem from "../CartItem/CartItem";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import tmdbApi from "../../api/tmdbApi";
import { Link } from "react-router-dom";

const PeopleInfo = () => {
  const params = useParams();
  const [doneLoad, setDoneLoad] = useState(false);
  const [infos, setInfos] = useState([]);
  const [isShowCast, setIsShowCast] = useState(false);
  const [isShowArt, setIsShowArt] = useState(false);
  const [isShowCrew, setIsShowCrew] = useState(false);
  const [isShowDirection, setIsShowDirection] = useState(false);
  const [isShowProduction, setIsShowProduction] = useState(false);
  const [peopleInfo, setPeopleInfo] = useState({});
  const [combineCredits, setCombineCredits] = useState({});
  const [knownFor, setKnowFor] = useState([]);

  useEffect(() => {
    setDoneLoad(false);
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 4000);
    // api trả kết quả sai
    setKnowFor(() => []);
    setPeopleInfo(() => {});
    const getInfoPeople = () => {
      axios
        .get(`/secure/people/${params.id}`, {
          params: {},
          headers: {
            Content_Type: "application/json",
          },
        })
        .then((res) => {
          // const data = res.article;
          // // console.log(data);
          const date = res.data.person?.birth_date.split("-");
          if (date.length >= 2)
            res.data.person.birth_date =
              date[2] + "-" + date[1] + "-" + date[0];
          res.data.knownFor = res.data.knownFor.splice(0, 3);
          setInfos(res.data);
        })
        .catch((error) => console.log(error));
    };
    getInfoPeople();

    const getDetailPerson = async () => {
      const rs = await tmdbApi.getDetailPerson(params.id);
      if (rs) {
        const date = rs.birthday?.split("-") || [];
        if (date.length >= 2) {
          rs.birthday = date[2] + "-" + date[1] + "-" + date[0];
        }
      }
      setPeopleInfo(rs || {});
    };
    getDetailPerson();

    const getCombineCreditPeople = async () => {
      const rs = await tmdbApi.getCombineCreditsPerson(params.id);
      if (rs) {
        if (rs.cast) {
          const temp = [...rs.cast];
          temp.sort((a, b) => b.vote_average - a.vote_average);
          setKnowFor(temp.splice(0, 3));
        }
        //format data
        rs.cast = rs.cast.map((item, index) => {
          let year = "1";
          if (item.release_date !== "" || item.first_air_date !== "") {
            year =
              item.release_date?.split("-") ||
              item.first_air_date?.split("-") ||
              "1";
          }
          return { ...item, year: year[0] ? year[0] : "1" };
        });
        rs.crew = rs.crew.map((item, index) => {
          let year = "1";
          if (item.release_date !== "" || item.first_air_date !== "") {
            year =
              item.release_date?.split("-") ||
              item.first_air_date?.split("-") ||
              "1";
          }
          return { ...item, year: year[0] ? year[0] : "1" };
        });
        rs.cast.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        rs.crew.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        setCombineCredits(rs || {});
      }
    };
    getCombineCreditPeople();
  }, [params]);

  const handleClickShowCast = (e) => {
    setIsShowCast(() => !isShowCast);
  };

  const handleClickShowArt = (e) => {
    setIsShowArt(() => !isShowArt);
  };

  const handleClickShowCrew = (e) => {
    setIsShowCrew(() => !isShowCrew);
  };

  const handleClickShowDirection = (e) => {
    setIsShowDirection(() => !isShowDirection);
  };

  const handleClickShowProduction = (e) => {
    setIsShowProduction(() => !isShowProduction);
  };
  const handleImgaeLoadDone = (e) => {
    console.log(e);
  };
  // console.log(infos);
  console.log(combineCredits);
  return (
    <div>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="people_container">
        <div className="left">
          <div className="avatar">
            <img
              src={process.env.REACT_APP_PATH_IMG + peopleInfo?.profile_path}
              onError={(event) => {
                event.target.src =
                  "https://www.leadershipmartialartsct.com/wp_content/uploads/2017/04/default_image_620x600.jpg";
                event.onerror = null;
              }}
              onLoad={(e) => {
                handleImgaeLoadDone(e);
              }}
              alt=""
            />
          </div>
          <div className="person_info">
            <div className="label">Personal Info</div>
            <div className="person_info_wrapper">
              <div className="info_group">
                <h5>Known For</h5>
                <span>{peopleInfo?.known_for_department}</span>
              </div>
              <div className="info_group">
                <h5>Gender</h5>
                <span>{peopleInfo?.gender === 2 ? "Male" : "Female"}</span>
              </div>
              <div className="info_group">
                <h5>Home page</h5>
                <a href={peopleInfo?.homepage}>
                  <span style={{ textTransform: "lowercase" }}>
                    {peopleInfo?.homepage}
                  </span>
                </a>
              </div>
              <div className="info_group">
                <h5>Date of Birth</h5>
                <span>{peopleInfo?.birthday}</span>
              </div>
              <div className="info_group">
                <h5>Place of Birth</h5>
                <span>{peopleInfo?.place_of_birth}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="people_desc">
            <div className="full_name"> {peopleInfo?.name}</div>
            <div className="biography_group">
              <div className="label">Biography</div>
              <div className="desc">
                <ShowMoreText
                  lines={4}
                  more="Show more"
                  less="Show less"
                  className="content_css"
                  anchorClass="my-anchor-css-class"
                  // onClick={executeOnClick}
                  expanded={false}
                  // width={100%}
                  truncatedEndingComponent={"... "}
                >
                  {peopleInfo?.biography}
                </ShowMoreText>
              </div>
            </div>
          </div>
          <div className="known_for_wrapper">
            <div className="label">Known for</div>
            <div className="known_for_items">
              {knownFor?.length > 0
                ? knownFor?.map((item, index) => (
                    <CarItem
                      item={item}
                      key={index}
                      types={item.media_type === "movie" ? "movies" : "tv"}
                      person={true}
                      colorGroup={{ backgroundColor: "#fafafa" }}
                    />
                  ))
                : "No data"}
              {/* {infos.knownFor?.length} */}
            </div>
          </div>
          <div className="filmography">
            <div className="label">Filmography</div>
            <div className="filmography_wrapper">
              {/* art */}
              <div
                className="filmography_group"
                onClick={(e) => {
                  handleClickShowArt(e);
                }}
              >
                <div className="top">
                  <span className="label">
                    Art {" ("}
                    {infos.credits?.art
                      ? infos.credits?.art.length + " credits)"
                      : "0 credits)"}
                  </span>
                  <BsFillArrowDownSquareFill
                    className="arrow_icon"
                    style={isShowArt ? { transform: "rotate(180deg)" } : {}}
                  />
                </div>
                <div
                  className="bottom"
                  style={isShowArt ? {} : { display: "none" }}
                >
                  {infos.credits?.art?.map((item, index) => {
                    let isHr = false;
                    if (index + 1 < infos.credits?.art.length) {
                      isHr =
                        item.year > infos.credits?.art[index + 1].year
                          ? true
                          : false;
                    }
                    return (
                      <div className="items_wrapper" key={index}>
                        <div className="items">
                          <div className="left">
                            <div className="movie_name">
                              {item.name || "unknown"}
                            </div>
                            <div className="character">
                              {item.pivot?.character || "unknown"}
                            </div>
                          </div>
                          <div className="right">{item.year || "unknown"}</div>
                        </div>
                        {isHr ? (
                          <hr
                            style={{
                              borderTop: "thin solid gray",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "none",
                              minHeight: "1px",
                              height: "1px",
                              maxHeight: "1px",
                              transform: "scale(1)",
                              marginBottom: "25px",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* cast */}
              <div
                className="filmography_group"
                onClick={(e) => {
                  handleClickShowCast(e);
                }}
              >
                <div className="top">
                  <span className="label">
                    Cast {" ("}
                    {combineCredits.cast
                      ? combineCredits.cast.length + " credits)"
                      : "0 credits)"}
                  </span>
                  <BsFillArrowDownSquareFill
                    className="arrow_icon"
                    style={isShowCast ? { transform: "rotate(180deg)" } : {}}
                  />
                </div>
                <div
                  className="bottom"
                  style={isShowCast ? {} : { display: "none" }}
                >
                  {combineCredits?.cast?.map((item, index) => {
                    let isHr = false;
                    if (index + 1 < combineCredits?.cast?.length) {
                      isHr =
                        parseInt(item.year) >
                        parseInt(combineCredits.cast[index + 1].year)
                          ? true
                          : false;
                    }
                    return (
                      <div className="items_wrapper" key={index}>
                        <div className="items">
                          <div className="left">
                            <Link
                              style={{ textDecoration: "none" }}
                              to={
                                "/" +
                                (item.media_type === "movie"
                                  ? "movies/detail/"
                                  : "tv/detail") +
                                item.id
                              }
                            >
                              <div className="movie_name">
                                {item.title || item.name}
                              </div>
                            </Link>
                            <div className="character">
                              {item.character || "unknown"}
                            </div>
                          </div>
                          <div className="right">
                            {item.release_date
                              ? item.release_date === ""
                                ? "unknown"
                                : item.release_date
                              : item.first_air_date === ""
                              ? "unknown"
                              : item.first_air_date}
                            {item.year === "1" ? "unknown" : ""}
                          </div>
                        </div>
                        {isHr ? (
                          <hr
                            style={{
                              borderTop: "thin solid gray",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "none",
                              minHeight: "1px",
                              height: "1px",
                              maxHeight: "1px",
                              transform: "scale(1)",
                              marginBottom: "25px",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* crew */}
              <div
                className="filmography_group"
                onClick={(e) => {
                  handleClickShowCrew(e);
                }}
              >
                <div className="top">
                  <span className="label">
                    Crew {" ("}
                    {combineCredits?.crew
                      ? combineCredits?.crew.length + " credits)"
                      : "0 credits)"}
                  </span>
                  <BsFillArrowDownSquareFill
                    className="arrow_icon"
                    style={isShowCrew ? { transform: "rotate(180deg)" } : {}}
                  />
                </div>
                <div
                  className="bottom"
                  style={isShowCrew ? {} : { display: "none" }}
                >
                  {combineCredits?.crew?.map((item, index) => {
                    let isHr = false;
                    if (index + 1 < combineCredits?.crew?.length) {
                      isHr =
                        parseInt(item.year) >
                        parseInt(combineCredits.crew[index + 1].year)
                          ? true
                          : false;
                    }
                    return (
                      <div className="items_wrapper" key={index}>
                        <div className="items">
                          <div className="left">
                            <Link
                              style={{ textDecoration: "none" }}
                              to={
                                "/" +
                                (item.media_type === "movie"
                                  ? "movies/detail/"
                                  : "tv/detail") +
                                item.id
                              }
                            >
                              <div className="movie_name">
                                {item.title || item.name}
                              </div>
                            </Link>
                            <div className="character">
                              {item.job || "unknown"}
                            </div>
                          </div>
                          <div className="right">
                            {item.release_date
                              ? item.release_date?.trim() === ""
                                ? "unknown"
                                : item.release_date
                              : item.first_air_date?.trim() === ""
                              ? "unknown"
                              : item.first_air_date}
                            {item.year === "1" ? "unknown" : ""}
                          </div>
                        </div>
                        {isHr ? (
                          <hr
                            style={{
                              borderTop: "thin solid gray",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "none",
                              minHeight: "1px",
                              height: "1px",
                              maxHeight: "1px",
                              transform: "scale(1)",
                              marginBottom: "25px",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* directing */}
              <div
                className="filmography_group"
                onClick={(e) => {
                  handleClickShowDirection(e);
                }}
              >
                <div className="top">
                  <span className="label">
                    Direction {" ("}
                    {infos.credits?.directing
                      ? infos.credits?.directing.length + " credits)"
                      : "0 credits)"}
                  </span>
                  <BsFillArrowDownSquareFill
                    className="arrow_icon"
                    style={
                      isShowDirection ? { transform: "rotate(180deg)" } : {}
                    }
                  />
                </div>
                <div
                  className="bottom"
                  style={isShowDirection ? {} : { display: "none" }}
                >
                  {infos.credits?.directing?.map((item, index) => {
                    let isHr = false;
                    if (index + 1 < infos.credits?.directing.length) {
                      isHr =
                        item.year > infos.credits?.directing[index + 1].year
                          ? true
                          : false;
                    }
                    return (
                      <div className="items_wrapper" key={index}>
                        <div className="items">
                          <div className="left">
                            <div className="movie_name">
                              {item.name || "unknown"}
                            </div>
                            <div className="character">
                              {item.pivot?.character || "unknown"}
                            </div>
                          </div>
                          <div className="right">
                            {item.release_date
                              ? item.release_date
                              : item.first_air_date}
                          </div>
                        </div>
                        {isHr ? (
                          <hr
                            style={{
                              borderTop: "thin solid gray",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "none",
                              minHeight: "1px",
                              height: "1px",
                              maxHeight: "1px",
                              transform: "scale(1)",
                              marginBottom: "25px",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* production */}
              <div
                className="filmography_group"
                onClick={(e) => {
                  handleClickShowProduction(e);
                }}
              >
                <div className="top">
                  <span className="label">
                    Production {" ("}
                    {infos.credits?.production
                      ? infos.credits?.production.length + " credits)"
                      : "0 credits)"}
                  </span>
                  <BsFillArrowDownSquareFill
                    className="arrow_icon"
                    style={
                      isShowProduction ? { transform: "rotate(180deg)" } : {}
                    }
                  />
                </div>
                <div
                  className="bottom"
                  style={isShowProduction ? {} : { display: "none" }}
                >
                  {infos.credits?.production?.map((item, index) => {
                    let isHr = false;
                    if (index + 1 < infos.credits?.production.length) {
                      isHr =
                        item.year > infos.credits?.production[index + 1].year
                          ? true
                          : false;
                    }
                    return (
                      <div className="items_wrapper" key={index}>
                        <div className="items">
                          <div className="left">
                            <div className="movie_name">
                              {item.name || "unknown"}
                            </div>
                            <div className="character">
                              {item.pivot?.character || "unknown"}
                            </div>
                          </div>
                          <div className="right">{item.year || "unknown"}</div>
                        </div>
                        {isHr ? (
                          <hr
                            style={{
                              borderTop: "thin solid gray",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "none",
                              minHeight: "1px",
                              height: "1px",
                              maxHeight: "1px",
                              transform: "scale(1)",
                              marginBottom: "25px",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleInfo;
