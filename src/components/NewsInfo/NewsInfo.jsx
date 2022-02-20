import React, { useEffect, useState } from "react";
import "./newsInfo.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
// import defaultImage from "../../images/default_image.jpg";

const NewsInfo = () => {
  const { id } = useParams();
  const [newsId, setNewId] = useState(id);
  console.log(id);
  const [newsInfo, setNewsInfo] = useState({});
  const [listNews, setListNews] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);

  useEffect(() => {
    setNewId(id);
  }, [id]);
  useEffect(() => {
    setDoneLoad(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 2000);
    const getInfoNews = () => {
      axios
        .get(`/secure/news/${newsId}`, {
          params: {},
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // const data = res.article;
          // // console.log(data)
          setNewsInfo(res.data.article);
        })
        .catch((error) => console.log(error));
    };
    getInfoNews();
    const getList = () => {
      axios
        .get(`/secure/news`, {
          params: {
            perPage: 10,
            page: 1,
            orderBy: "created_at",
            stripHtml: true,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const data = res.data;
          // console.log(data)
          const items = data.pagination;
          // setTotalPage(items.last_page);
          setListNews(items.data);
          window.scrollTo(0, 0);
        })
        .catch((error) => console.log(error));
    };
    getList();
    return () => clearTimeout(timeout);
  }, [newsId]);
  console.log(newsInfo);
  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="news_detail_container">
        <div className="news_detail_wrapper">
          {!_.isEmpty(newsInfo) ? (
            <div className="left_container">
              <div className="left">
                <div className="news_title">{newsInfo.title}</div>
                <div className="news_sub_title">
                  <div className="created_at">
                    {newsInfo.created_at.split("T")[0]}
                  </div>
                  <div className="type">{newsInfo.meta.source}</div>
                </div>
                <div className="new_poster">
                  <img
                    src={newsInfo.meta.image}
                    alt={newsInfo.title}
                    onError={(event) => {
                      event.target.src = "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                      event.onerror = null;
                    }}
                  />
                </div>
                {newsInfo.body.split("...")[0] + "..."}
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="other_news_container">
            <div className="label">
              Other news
              <hr
                style={{
                  borderTop: "thin solid lightgray",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  marginBottom: "15px",
                  // color: "gray",
                  // backgroundColor: "gray",
                  minHeight: "1px",
                  height: "1px",
                  maxHeight: "1px",
                  transform: "scale(1)",
                  marginTop: "15px",
                }}
              />
            </div>
            {listNews?.map((item, index) => {
              return (
                <div className="wrapper" key={index}>
                  <div className="poster">
                    <img
                      src={newsInfo.meta.image}
                      alt={newsInfo.title}
                      onError={(event) => {
                        event.target.src = "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                        event.onerror = null;
                      }}
                    />
                  </div>
                  <div className="desc">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/news/detail/" + item.id}
                    >
                      <div className="title">{item.title}</div>
                    </Link>
                    <div className="sub_title">
                      <div
                        style={{
                          paddingRight: "5px",
                          paddingTop: "0 !important",
                          paddingBottom: "0 !important",
                          borderRight: "1px solid gray",
                        }}
                      >
                        {item.created_at.split("T")[0]}
                      </div>
                      <div style={{ paddingLeft: "5px" }}>
                        {item.meta.source}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsInfo;
