import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import "./vipContentInfo.scss";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import CardItem from "../CardItem/CardItem";
import Button from "@mui/material/Button";

const VipContentInfo = () => {
  //menu_item
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ padding: "5px !important" }}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);
  const [listData, setListData] = useState([]);
  const [count, setCount] = useState(20);
  const [totalCount, setTotalCount] = useState(20);
  const [listGroupKeySearch, setListGroupKeySearch] = useState([]);
  const [doneLoad, setDoneLoad] = useState(false);
  const [bodySearch, setBodySearch] = useState({
    size: 5000,
    params: "",
    area: "",
    category: "",
    year: "",
    subtitles: "",
    order: "up",
  });

  useEffect(() => {
    if (doneLoad) {
      setDoneLoad(false);
    }
    const getGroupKeySearch = () => {
      const headers = {
        lang: "en",
        versioncode: 11,
        clienttype: "ios_jike_default",
      };
      axios
        .get("https://ga-mobile-api.loklok.tv/cms/app/search/list", {
          headers,
        })
        .then((response) => {
          if (response?.data?.data) {
            setListGroupKeySearch(response.data.data);
            setBodySearch((pre) => ({
              ...pre,
              params: response.data.data[0].params,
            }));
            setDoneLoad(true);
          }
        })
        .catch(function (error) {
          console.log("search error" + error);
        });
    };
    getGroupKeySearch();
  }, []);

  useEffect(() => {
    // console.log(listGroupKeySearch);
  }, [listGroupKeySearch]);

  useEffect(() => {
    if (count > 20) {
      setCount(20);
    }
    const headers = {
      lang: "en",
      versioncode: 11,
      clienttype: "ios_jike_default",
    };
    const searchAdvantage = () => {
      axios
        .post(
          "https://ga-mobile-api.loklok.tv/cms/app/search/v1/search",
          bodySearch,
          {
            headers,
          }
        )
        .then((response) => {
          if (response?.data?.data) {
            console.log(response.data.data.searchResults.length);
            setListData(response.data.data.searchResults);
            setTotalCount(response.data.data.searchResults.length);
          }
        })
        .catch(function (error) {
          console.log("search error" + error);
        });
    };
    searchAdvantage();
  }, [bodySearch, setBodySearch]);

  //mui
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //event
  const handleClickChangeTab = (params) => {
    setBodySearch((pre) => ({ ...pre, params: params }));
  };
  const handleOnClickKeySearch = (value, screeningType) => {
    const preBodySearch = bodySearch;
    preBodySearch[screeningType] = value;
    setBodySearch(() => ({ ...preBodySearch }));
  };
  //   console.log(bodySearch);
  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />

      <div className="vip_content_container">
        <div className="title">Vip Content</div>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {listGroupKeySearch?.map((item) => (
                <Tab
                  onClick={() => handleClickChangeTab(item.params)}
                  label={item.name}
                  style={{ fontWeight: 600 }}
                  {...a11yProps(0)}
                  key={item.name}
                />
              ))}
            </Tabs>
          </Box>

          {listGroupKeySearch?.map((item, index) => {
            return (
              <TabPanel
                key={index}
                value={value}
                index={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "blue",
                }}
              >
                {/* {item.name} */}
                <div role="tabpanel">
                  {item?.screeningItems.map((group_key, index) => {
                    return (
                      <div className="group_key" key={index}>
                        {group_key.items.map((item, index) => {
                          return (
                            <div
                              className="key"
                              key={index}
                              style={
                                item.params === bodySearch[item.screeningType]
                                  ? {
                                      backgroundColor: "#fe7516",
                                      color: "white",
                                    }
                                  : {}
                              }
                            >
                              <span
                                onClick={() => {
                                  handleOnClickKeySearch(
                                    item.params,
                                    item.screeningType
                                  );
                                }}
                              >
                                {item.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </TabPanel>
            );
          })}
        </Box>
        <div className="content">
          {listData.slice(0, count).map((item) => {
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
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px 0",
        }}
      >
        {count <= totalCount && listData.length > 0 ? (
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
    </>
  );
};

export default VipContentInfo;
