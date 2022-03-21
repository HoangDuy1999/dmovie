import React, { useEffect, useState } from "react";
import "./peopleList.scss";
// import ReactLoading from "react-loading";
import Button from "@mui/material/Button";
// import Select from "react-select";
// import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import tmdbApi from "../../api/tmdbApi";
import defaultImage from "../../images/default_image.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PeopleList = () => {
  const [doneLoad, setDoneLoad] = useState(false);
  const [totalPages, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [listPeople, setListPeople] = useState([]);
  // let beforeDirection = "desc";

  // const [selectedDirection, setSelectedDirection] = useState({
  //   value: "desc",
  //   label: "Descending",
  // });
  // const [selectedSortBy, setSelectedSortBy] = useState({
  //   value: "popularity",
  //   label: "Popularity",
  // });
  // const customStyles = {
  //   control: (base) => ({
  //     ...base,
  //     // height: 30,
  //     // minHeight: 30,
  //     width: 150,
  //     minWidth: 150,
  //   }),
  // };
  // const direction = [
  //   {
  //     value: "desc",
  //     label: "Descending",
  //   },
  //   {
  //     value: "asc",
  //     label: "Ascending",
  //   },
  // ];
  // const sortBy = [
  //   {
  //     value: "popularity",
  //     label: "Popularity",
  //   },
  //   {
  //     value: "birth_date",
  //     label: "Birthday",
  //   },
  //   {
  //     value: "created_at",
  //     label: "Date Added",
  //   },
  //   {
  //     value: "name",
  //     label: "Name",
  //   },
  // ];
  const getDetailPerson = async (p_id) => {
    const rs = await tmdbApi.getDetailPerson(p_id);
    // console.log(rs.biography);
    if (rs) {
      return rs.biography;
    }
    return "";
  };
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setDoneLoad(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
      // window.scrollTo(0, 0);
    }, 3000);
    // const getInfoPeople = () => {
    //   axios
    //     .get(`/secure/people`, {
    //       params: {
    //         perPage: 10,
    //         page: page,
    //         mostPopular: true,
    //         order: `${selectedSortBy.value}:${selectedDirection.value}`,
    //       },
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then((res) => {
    //       // const data = res.article;
    //       // // console.log(data)
    //       setListPeople([...listPeople, ...res.data.pagination.data]);
    //       setTotalPage(res.data.pagination.total || 1);
    //     })
    //     .catch((error) => console.log(error));
    // };
    // getInfoPeople();
    const getPopularPeople = async () => {
      let rs = await tmdbApi.getPopularPeople(page);
      if (rs.total_pages !== totalPages) {
        setTotalPage(rs.total_pages);
      }
      if (rs?.results.length > 0) {
        rs = rs.results.map(async (item) => {
          const overview = await getDetailPerson(item.id);
          // console.log(overview);
          return { ...item, overview: overview };
        });
        Promise.all(rs).then(function (results) {
          console.log(results);
          setListPeople(() => [...listPeople, ...results]);
        });
        // return tem;
      }
    };
    getPopularPeople();
    // .then((res) => {
    //   console.log(res);
    // })
    // .then((res) => {
    //   console.log(res);
    // });
    return () => clearTimeout(timeout);
  }, [page]);
  // console.log(listPeople);
  // console.log(selectedDirection);
  // console.log(selectedSortBy);
  const handleClickLoadMore = () => {
    if (page + 1 <= totalPages) {
      setPage(page + 1);
    }
  };
  // const handleChangeSortBy = (e) => {
  //   setSelectedSortBy(e);
  //   setListPeople([]);
  //   setPage(1);
  // };
  // const handleChangeDirection = (e) => {
  //   setSelectedDirection(e);
  //   setListPeople([]);
  //   setPage(1);
  // };
  // if (listPeople) {
  //   console.log("========================");
  //   console.log(listPeople);
  //   console.log(totalPages);
  // }
  useEffect(() => {}, [page]);

  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="people_list_container">
        <div className="people_list_container_label">Popular People</div>
        {/* <div className="people_list_container_sort">
          <div className="direction">
            <span className="direction_title">Direction</span>
            <div className="direction_select">
              <Select
                styles={customStyles}
                defaultValue={direction[0]}
                options={direction}
                // value={selectedDirection}
                onChange={(e) => {
                  handleChangeDirection(e);
                }}
              />
            </div>
          </div>
          <div className="sort_by">
            <span className="sort_by_title">Sort by</span>
            <div className="sort_by_select">
              <Select
                styles={customStyles}
                options={sortBy}
                // value={selectedSortBy}
                defaultValue={sortBy[0]}
                onChange={(e) => {
                  handleChangeSortBy(e);
                }}
              />
            </div>
          </div>
        </div> */}
        <hr
          style={{
            borderTop: "thin solid #f5f5f5",
            marginTop: "15px",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none",
            minHeight: "2px",
            height: "2px",
            maxHeight: "1px",
            transform: "scale(1)",
            marginBottom: "25px",
          }}
        />
        <div className="people_list_container_content">
          {!_.isEmpty(listPeople)
            ? listPeople.map((item, index) => {
                let date = item?.known_for[0]?.release_date
                  ? item?.known_for[0]?.release_date.split("-")
                  : [];
                if (date.length < 1) {
                  date = item?.known_for[0]?.first_air_date
                    ? item?.known_for[0]?.first_air_date.split("-")
                    : [];
                }
                return (
                  <div
                    key={index}
                    className="people_list_container_wrapper"
                    style={
                      index % 2 !== 0 ? { backgroundColor: "#f5f5f5" } : {}
                    }
                  >
                    <div className="poster">
                      <LazyLoadImage
                        src={process.env.REACT_APP_PATH_IMG + item.profile_path}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = { defaultImage };
                        }}
                        effect="blur"
                        // onError={(event) => {
                        //   event.target.src =
                        //     "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                        //   event.onerror = null;
                        // }}
                        alt={item.name}
                      />
                    </div>
                    <div className="description_people">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/person/detail/" + item.id}
                      >
                        <div className="name">{item.name}</div>
                      </Link>
                      <div
                        className="type"
                        style={{ marginBottom: "10px", marginTop: "5px" }}
                      >
                        <span>{item.known_for_department}</span>
                        {item.known_for.length > 0 ? (
                          <span
                            style={{
                              borderLeft: "1px solid gray",
                              color: "black",
                              marginLeft: "10px",
                              paddingLeft: "10px",
                            }}
                          >
                            {item.known_for[0].title || item.known_for[0].name}
                            {" ("}
                            {date[0] || "Unknown"}
                            {")"}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="describe">{item.overview}</div>
                    </div>
                  </div>
                );
              })
            : ""}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {page > totalPages ? (
              ""
            ) : (
              <Button
                style={{ width: "200px", height: "50px" }}
                variant="outlined"
                onClick={() => {
                  handleClickLoadMore();
                }}
              >
                Load more...
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleList;
