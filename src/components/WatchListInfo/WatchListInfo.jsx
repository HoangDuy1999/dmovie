import React, { useState, useEffect } from "react";
import "./watchListInfo.scss";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import watchlistApi from "../../api/dmovie/watchlist";
import CardWatchList from "../CardWatchList/CardWatchList";

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
  console.log(watchList);
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
              <CardWatchList item={item} key={item._id} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default WatchListInfo;
