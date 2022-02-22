import React, { useEffect, useState } from "react";
import "./watch.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import sample from "../../Data/sub1.vtt";
import _ from "lodash";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import { BsPlayFill } from "react-icons/bs";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BookmarkIcon from "@material-ui/icons/Bookmark";
var { default: srtParser2 } = require("srt-parser-2");

const Watch = ({ cate }) => {
  const { id } = useParams() || undefined;
  const [movieInfo, setMovieInfor] = useState({});
  const [videoUrl, setVideoUrl] = useState("");
  const [episodeId, setEpisodeId] = useState("0");
  const [doneLoad, setDoneLoad] = useState(true);
  const [displayResolution, setDisPlayResoluton] = useState("SD");
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState([]);
  const [engSub, setEnglishSub] = useState("");
  const [arrengSub, setArrEngSub] = useState({});
  const getDetailMovies = () => {
    if (id !== undefined) {
      axios
        .get(
          `https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${id}&category=${cate}`,
          {
            params: {},
            headers: {
              lang: "en",
              versioncode: 11,
              clienttype: "ios_jike_default",
            },
          }
        )
        .then((res) => {
          setMovieInfor(res.data.data);
          // if(res.data.data.episodeVo?.length > 0){

          // }
        })
        .catch((error) => console.log(error));
    }
  };

  const getVideos = (episode, resoluton = "SD") => {
    console.log(
      `1111https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${cate}&contentId=${id}&episodeId=${episode}&definition=GROOT_${resoluton}`
    );
    axios
      .get(
        `https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${cate}&contentId=${id}&episodeId=${episode}&definition=GROOT_${resoluton}`,
        {
          params: {},
          headers: {
            lang: "en",
            versioncode: 11,
            clienttype: "ios_jike_default",
          },
        }
      )
      .then((res) => {
        if (res.data?.data) {
          // console.log(res.data.data.mediaUrl);
          const timeout = setTimeout(() => {
            setVideoUrl(() => res.data.data.mediaUrl);
          }, 5000);
          return () => clearTimeout(timeout);
        }
      })
      .catch((error) => console.log(error));
  };

  const getSubtitle = (info) => {
    axios
      .get(`${info?.subtitlingUrl}`, {
        params: {},
        headers: {
          lang: "en",
          versioncode: 11,
          clienttype: "ios_jike_default",
        },
      })
      .then((res) => {
        // console.log(res.data);
        var parser = new srtParser2();
        var result = parser.fromSrt(res.data);
        // console.log(result[0]);
        console.log(result);
        let sub_temp = {};
        const temp = result.map((item, index) => {
          let start = item.startTime.split(",");
          start = start[0].split(":");
          let seconds =
            parseInt(start[0]) * 60 * 60 +
            +parseInt(start[1]) * 60 +
            parseInt(start[2]);
          sub_temp[seconds] = item.text;
          return sub_temp;
        });
        console.log("ngon");
        setArrEngSub(sub_temp);
        //   Promise.all(temp).then(function(results) {
        //     setArrEngSub(temp);
        // })
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDetailMovies();
    setEpisodeId("0");
  }, [id, cate]);

  // useEffect(() => {
  //   // setDoneLoad(true);
  //   // // lấy tạo mặc định : 1
  //   setDoneLoad(false);
  //   const timeout = setTimeout(() => {
  //     setDoneLoad(true);
  //   }, 5000);
  //   if (!_.isEmpty(movieInfo)) {
  //     getVideos(movieInfo.episodeVo[episodeId].id, displayResolution);
  //     //lấy phiên dịch
  //     console.log(movieInfo.episodeVo[episodeId]?.subtitlingList);
  //     console.log(movieInfo.episodeVo[episodeId]?.subtitlingList["0"]);
  //     getSubtitle(movieInfo.episodeVo[episodeId]?.subtitlingList["0"]);
  //   }
  //   return () => clearTimeout(timeout);
  // }, [movieInfo, displayResolution, episodeId]);

  const handleClickChangeEpisode = (value) => {
    setDoneLoad(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 5000);
    // getVideos(movieInfo.episodeVo[value].id);
    setEpisodeId(value);
    return () => clearTimeout(timeout);
  };

  const onClickChangeServer = (val) => {
    if (val !== displayResolution) {
      setDisPlayResoluton(() => val);
    }
  };

  const handleProgressReactPlayer = (progress) => {
    //setPlayed([...played, progress.playedSeconds]);
    console.log(arrengSub[(progress.playedSeconds + 0.2).toFixed()]);
    console.log((progress.playedSeconds + 0.2).toFixed());
    if (arrengSub[(progress.playedSeconds + 0.2).toFixed()] !== undefined) {
      setEnglishSub(arrengSub[(progress.playedSeconds + 0.2).toFixed()]);
    }
    //if(sub_temp[(progress.playedSeconds + 0.2).toFixed()] !== undefined){
    // console.log(sub_temp[(progress.playedSeconds + 0.2).toFixed().toString()]);

    //}
  };
  if (!_.isEmpty(movieInfo)) {
    console.log(movieInfo);
    console.log(videoUrl);
  }
  console.log(played);
  return (
    <div className="watch_movie_container">
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="watch_movie_wrapper">
        <div className="player-wrapper">
          <ReactPlayer
            onProgress={(progress) => {
              handleProgressReactPlayer(progress);
            }}
            className="react-player"
            width="100%"
            height="100%"
            playing={true}
            // control={true}
            // playIcon={
            //   <div
            //     style={{
            //       padding: "calc((100% - 60%)/2) ",
            //       backgroundColor: "rgba(0,0,0,0.5)",
            //       minWidth: "100%",
            //       display: "flex",
            //       alignItems: "center",
            //       justifyContent: "center",
            //     }}
            //   >
            //     <BsPlayFill
            //       onClick={(e) => {
            //         setPlaying(true);
            //       }}
            //       style={{
            //         color: "white",
            //         filter: "drop-shadow(0 0 10rem black)",
            //         fontSize: "80px",
            //       }}
            //     />
            //   </div>
            // }
            // controls={true}
            // url={videoUrl}
            url="https://ali-cdn-play.loklok.tv/88fc022074274d86b8d3c5773e74cb99/0fb2420a6f72438f93477716021aea6c-e098627e4471672f72db5041ecd0b6ca-sd.m3u8?auth_key=1645460527-5314a4487e114d5b92e9e6f109d01e11-0-0874ec1062bde96b0bee2620733b22f7"
            // light={movieInfo?.coverHorizontalUrl}
          />
          <div className="controler_wrapper">
            {/*   */}
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={{ padding: 16 }}
            >
              <Grid item>
                <Typography variant="h5" style={{ color: "#fff" }}>
                  Video title
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<BookmarkIcon />}
                >
                  Bookmark
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className="sub_title">
            <div className="wrapper">
              <span>{engSub}</span>
            </div>
          </div>
        </div>
        <div className="server">
          <div className="label">Server</div>
          <div className="list">
            <button
              onClick={(e) => {
                onClickChangeServer("SD");
              }}
              style={
                displayResolution === "SD" ? { backgroundColor: "#e62117" } : {}
              }
            >
              SD
            </button>
            <button
              onClick={(e) => {
                onClickChangeServer("LD");
              }}
              style={
                displayResolution === "LD" ? { backgroundColor: "#e62117" } : {}
              }
            >
              HD
            </button>
            <button
              onClick={(e) => {
                onClickChangeServer("HD");
              }}
              style={
                displayResolution === "HD" ? { backgroundColor: "#e62117" } : {}
              }
            >
              HD+
            </button>
          </div>
        </div>
        <div className="list_episode">
          {!_.isEmpty(movieInfo) ? (
            movieInfo?.episodeCount === null ? (
              <div className="episode">
                <button
                  style={{ backgroundColor: "#c58560" }}
                  onClick={(e) => handleClickChangeEpisode("0")}
                >
                  Full episode
                </button>
              </div>
            ) : (
              movieInfo.episodeVo?.map((item, index) => {
                return (
                  <div className="episode" key={index}>
                    <button
                      style={
                        episodeId == index.toString()
                          ? { backgroundColor: "#c58560" }
                          : {}
                      }
                      onClick={(e) => {
                        handleClickChangeEpisode(index.toString());
                      }}
                    >
                      {index + 1 < 10 ? 0 : ""}
                      {index + 1}
                    </button>
                  </div>
                );
              })
            )
          ) : (
            ""
          )}
        </div>
        <div className="desc">
          <div className="name">
            {movieInfo?.name} {"("} {movieInfo.year} {")"}
          </div>
          {/* <div className="name_root">{movieInfo?.aliasName}</div> */}
          <div className="country">
            National: {movieInfo?.areaNameList?.join(", ")}
          </div>
          <div className="pilot">{movieInfo.introduction}</div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
