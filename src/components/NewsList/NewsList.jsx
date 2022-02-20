import React, { useEffect, useState } from "react";
import "./newsList.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import ButtonLoad from "@material-ui/core/Button";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
// import defaultImage from "../../images/default_image.jpg";
const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);
  const [totalPages, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const handleClickLoadMore = () => {
    if (page + 1 <= totalPages) {
      setPage(page + 1);
    }
  };
  useEffect(() => {}, [page]);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    setDoneLoad(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 3000);
    axios
      .get(`/secure/news`, {
        params: {
          perPage: 10,
          page: page,
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
        setTotalPage(items.last_page);
        console.log(items.data);
        setNewsList([...newsList, ...items.data]);
      })
      .catch((error) => console.log(error));
    return () => clearTimeout(timeout);
  }, [page]);

  console.log(newsList);
  console.log(totalPages);
  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="news_list_container">
        <div className="news_list_container_label">
          Latest News{" "}
          <hr
            style={{
              borderTop: "thin solid #gray",
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
        </div>

        {newsList?.map((item, index) => {
          const dates = item.created_at ? item.created_at.split("T") : [""];
          return (
            <div key={index} className="news_list_container_content">
              <div className="news_list_container_content_poster">
                <img
                  src={item.meta.image}
                  alt={item.title}
                  // style={{width: "100px",height: "100px", borderRadius: "5px"}}
                  onError={(event) => {
                    event.target.src =
                      "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
                    event.onerror = null;
                  }}
                />
              </div>
              <div className="description">
                <Link
                  to={"/news/detail/" + item.id}
                  style={{ textDecoration: "none" }}
                >
                  <div className="title">{item.title}</div>
                </Link>
                <div className="content">{item.body}</div>
                <div className="bottom">
                  {item.meta.source +
                    " " +
                    (dates[0] ? dates[0] : "2020-02-02")}
                </div>
              </div>
            </div>
          );
        })}
        {page < totalPages ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonLoad
              variant="outlined"
              style={{ width: "200px", height: "50px" }}
              onClick={(e) => handleClickLoadMore(e)}
            >
              Load more...
            </ButtonLoad>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default NewsList;
