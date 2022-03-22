import React, { useState, useEffect } from "react";
import "./vipSearchInfo.scss";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CardItem from "../CardItem/CardItem";

const VipSearchInfo = () => {
  const [keysearch, setKeySearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const headers = {
    lang: "en",
    versioncode: 11,
    clienttype: "ios_jike_default",
  };

  //function
  const handleOnchangeInputSearch = (e) => {
    setKeySearch(e.target.value || "");
  };

  const getDataSearch = () => {
    const txtSearch = keysearch.replace("&", "and");
    if (keysearch !== "") {
      const body = {
        searchKeyWord:
          txtSearch.toLowerCase() +
          "" /*+ (movieInfos?.release_date?.split("-")[0] || "")*/,
        size: 20,
        sort: "",
        searchType: "",
      };

      axios
        .post(
          "https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchWithKeyWord",
          body,
          { headers }
        )
        .then((response) => {
          console.log(response);
          if (response.data.data.searchResults.length > 0) {
            console.log(response.data.data.searchResults);
            setSearchList(response.data.data.searchResults);
          }
        })
        .catch(function (error) {
          console.log("search error" + error);
        });
    }
  };
  useEffect(() => {
    getDataSearch();
  }, [keysearch]);
  return (
    <>
      <div className="search_vip_container">
        <div className="top">
          <span>Vip Search</span>
        </div>

        <div className="middle">
          <Paper
            style={{
              width: "100%",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              name="input_search_vip"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Movies, Series, Entertainment show"
              autoFocus
              onSubmit={(e) => {
                e.preventDefault();
              }}
              onChange={(e) => handleOnchangeInputSearch(e)}
            />
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        <div className="bottom">
          {keysearch ? (
            <>
              {/* <div className="key_search_vip">
                {keysearch?.length > 0 ? `Key search: ${keysearch}` : ""}
              </div> */}
              <div className="content">
                {searchList.map((item) => {
                  item.vote_average = Math.random() * (9 - 6) + 6;
                  item.vote_average = Math.round(item.vote_average * 10) / 10;
                  return (
                    <CardItem
                      item={item}
                      key={item.id}
                      types="movies"
                      isWatch={true}
                      colorGroup={{}}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default VipSearchInfo;
