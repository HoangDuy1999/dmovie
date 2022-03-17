import React, { useState, useEffect } from "react";
import "./watchListInfo.scss";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import watchlistApi from "../../api/dmovie/watchlist";
import CardWatchList from "../CardWatchList/CardWatchList";
import Button from "@mui/material/Button";
import { success, error } from "../Toastify/Toastify";

const WatchListInfo = ({ id }) => {
  const [watchList, setWatchList] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);
  const [count, setCount] = useState(20);

  useEffect(() => {
    const getWatchList = async () => {
      const rs = await watchlistApi.getListByAccountId(id);
      if (rs.code === 200) {
        setDoneLoad(true);
        setWatchList(rs.data);
      } else {
        setDoneLoad(true);
      }
    };
    getWatchList();
  }, [id]);

  const handleRemoveMovieToWatchList = async (item) => {
    setDoneLoad(false);
    const rs = await watchlistApi.update({
      account_id: item.account_id,
      movie_id: item.movie_id,
      status: 0,
    });
    if (rs.code === 200) {
      success("Remove movie to watchlist successfully");
      const arr_temp = watchList.map((i) => {
        if (i.movie_id === item.movie_id) {
          i.status = 0;
        }
        return i;
      });
      setWatchList(arr_temp);
      setDoneLoad(true);
    } else {
      error("Remove movie to watchlist unsuccessfully");
      setDoneLoad(true);
    }
  };
  const handleAddMovieToWatchList = async (item) => {
    setDoneLoad(false);
    const rs = await watchlistApi.add({
      account_id: item.account_id,
      movie_id: item.movie_id,
      movie_name: item.movie_name,
      movie_backdrop: item.movie_backdrop,
      movie_type: item.movie_type,
      status: 1,
    });
    console.log(rs);
    if (rs.code === 200) {
      const arr_temp = watchList.map((i) => {
        if (i.movie_id === item.movie_id) {
          i.status = 1;
        }
        return i;
      });
      setWatchList(arr_temp);
      success("Add movie to watchlist successfully");
      setDoneLoad(true);
    } else {
      error("Add movie to watchlist unsuccessfully");
      setDoneLoad(true);
    }
  };
  console.log(watchList);
  console.log(count);
  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="watchlist_container">
        <div className="title">
          <span>Watch List</span>
        </div>
        <div className="card_watch_list">
          {watchList?.slice(0, count).map((item) => (
            <>
              <CardWatchList
                item={item}
                key={item._id}
                handleAddMovieToWatchList={handleAddMovieToWatchList}
                handleRemoveMovieToWatchList={handleRemoveMovieToWatchList}
              />
            </>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25px",
          }}
        >
          {count < watchList?.length ? (
            <Button
              variant="outlined"
              onClick={() => setCount((prev) => prev + 20)}
            >
              Load more...
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default WatchListInfo;
