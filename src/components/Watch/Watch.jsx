import React, { useEffect, useState, useRef } from "react";
import "./watch.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
// import sample from "../../Data/sub1.vtt";
import _ from "lodash";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import PlayerControl from "../PlayerControl/PlayerControl";
import screenfull from "screenfull";

var { default: srtParser2 } = require("srt-parser-2");

const Watch = ({ cate }) => {
  const { id } = useParams() || undefined;
  const [movieInfo, setMovieInfor] = useState({});
  const [videoUrl, setVideoUrl] = useState("");
  const [episodeId, setEpisodeId] = useState("0");
  const [doneLoad, setDoneLoad] = useState(true);
  const [displayResolution, setDisPlayResoluton] = useState("SD");
  // const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState([]);
  const [engSub, setEnglishSub] = useState("");
  const [arrengSub, setArrEngSub] = useState({});
  // rate video 2x
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickClosePopover = () => {
    setAnchorEl(null);
  };

  const [playerStates, setPlayerStates] = useState({
    playing: false,
    muted: false,
    volume: 1,
    playbackRate: 1.0,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

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
  // player control
  const handleProgressReactPlayer = (progress) => {
    //setPlayed([...played, progress.playedSeconds]);
    // console.log(arrengSub[(progress.playedSeconds + 0.2).toFixed()]);
    // console.log((progress.playedSeconds + 0.2).toFixed());
    // if (arrengSub[(progress.playedSeconds + 0.2).toFixed()] !== undefined) {
    //   setEnglishSub(arrengSub[(progress.playedSeconds + 0.2).toFixed()]);
    // }
    //if(sub_temp[(progress.playedSeconds + 0.2).toFixed()] !== undefined){
    // console.log(sub_temp[(progress.playedSeconds + 0.2).toFixed().toString()]);
    //}
    console.log(progress);
    setPlayerStates({ ...playerStates, ...progress });
  };
  const handleRewind = (e) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFastForward = (e) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };
  const handlePlayPause = (e) => {
    setPlayerStates(() => ({
      ...playerStates,
      playing: !playerStates.playing,
    }));
  };
  const handleMuted = (e) => {
    setPlayerStates(() => ({
      ...playerStates,
      muted: !playerStates.muted,
      volume: !playerStates.muted ? 0 : 1,
    }));
  };

  const handleVolumeChange = (e, newValue) => {
    setPlayerStates({
      ...playerStates,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setPlayerStates({
      ...playerStates,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handlePlayBackRateChange = (rate) => {
    setPlayerStates({
      ...playerStates,
      playbackRate: rate,
    });
    setAnchorEl(null);
  };

  const handleToggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };
  // if (!_.isEmpty(movieInfo)) {
  //   console.log(movieInfo);
  //   console.log(videoUrl);
  // }
  return (
    <div className="watch_movie_container">
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div className="watch_movie_wrapper">
        <div className="player-wrapper" ref={playerContainerRef}>
          <ReactPlayer
            onProgress={(progress) => {
              handleProgressReactPlayer(progress);
            }}
            className="react-player"
            width="100%"
            height="100%"
            playing={playerStates.playing}
            muted={playerStates.muted}
            url="https://ali-cdn-play.loklok.tv/8e2b5b09ecef496bb6a2f4b009db360f/525f1205ac0f43949fdde3ecc3fbcc26-3adb176bafea7be6978ee0391ebf84d5-ld.m3u8?auth_key=1645605910-5244e55613724548b5ac40440cb8209f-0-7a9e2ab6366995161740f58eab9c2f70"
            ref={playerRef}
            volume={playerStates.volume}
            playbackRate={playerStates.playbackRate}
          />

          {/* play control */}
          <PlayerControl
            onPlayPause={(e) => handlePlayPause(e)}
            playing={playerStates.playing}
            onRewind={(e) => handleRewind(e)}
            onFastForward={(e) => handleFastForward(e)}
            onMuted={handleMuted}
            muted={playerStates.muted}
            onVolumechange={handleVolumeChange}
            onVolumeSeekDown={handleVolumeSeekDown}
            volume={playerStates.volume}
            playbackRate={playerStates.playbackRate}
            onPlayBackRate={(e) => handlePlayBackRateChange(e)}
            onHandleOpenPopover={handleClickOpenPopover}
            onHandleClosePopover={handleClickClosePopover}
            anchorEl={anchorEl}
            onToggleFullScreen={handleToggleFullScreen}
          />

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
                        episodeId === index.toString()
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
