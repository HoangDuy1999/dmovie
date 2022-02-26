import React, { useEffect, useState, useRef } from "react";
import "./watch.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import _ from "lodash";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import PlayerControl from "../PlayerControl/PlayerControl";
import screenfull from "screenfull";
import AddIcon from "@material-ui/icons/Add";
import SubIcon from "@material-ui/icons/Remove";
import Select from "react-select";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
import { useNavigate } from "react-router-dom";
import useEventListener from "@use-it/event-listener";
import VideoSlider from "../VideoSlider/VidieoSlider";

var { default: srtParser2 } = require("srt-parser-2");

const Watch = ({ cate, ep }) => {
  const navigate = useNavigate();
  const { id } = useParams() || undefined;
  const [movieInfo, setMovieInfor] = useState({});
  const [videoUrl, setVideoUrl] = useState("");
  const [episodeId, setEpisodeId] = useState("0");
  const [doneLoad, setDoneLoad] = useState(true);
  const [displayResolution, setDisPlayResoluton] = useState("SD");
  // const [arrengSub, setArrEngSub] = useState({});
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [subText1, setSubText1] = useState("");
  const [subText2, setSubText2] = useState("");
  const [countHiddenText, setCountHiddenText] = useState(0);

  const [arrSub, setArrSub] = useState([
    {
      value: "",
      label: "Off",
    },
  ]);
  const [listSubTitle, setListSubTitle] = useState({});
  const [selectedSub1, setSelectedSub1] = useState({
    value: "",
    label: "Off",
  });
  const [selectedSub2, setSelectedSub2] = useState({
    value: "",
    label: "Off",
  });

  //playercontrol
  const [playerStates, setPlayerStates] = useState({
    playing: false,
    muted: false,
    volume: 1,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const [count, setCount] = useState(0);

  const formatTimeVideo = (seconds) => {
    if (isNaN(seconds)) {
      return "00:00";
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}: ${mm.toString().padStart(2, "0")}: ${ss}`;
    }
    return `${mm}:${ss}`;
  };

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
          console.log(res.data.data);
          // if(res.data.data.episodeVo?.length > 0){

          // }
        })
        .catch((error) => console.log(error));
    }
  };

  const getVideos = (episode, resoluton = "SD") => {
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
          setVideoUrl(() => res.data.data.mediaUrl);
        }
      })
      .catch((error) => console.log(error));
  };

  const getSubtitle = (list) => {
    list.map((info, index) => {
      if (true) {
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
            var parser = new srtParser2();
            var result = parser.fromSrt(res.data);
            let sub_temp = {};
            result.map((item, index) => {
              let start = item.startTime.split(",");
              start = start[0].split(":");
              let seconds =
                parseInt(start[0]) * 60 * 60 +
                +parseInt(start[1]) * 60 +
                parseInt(start[2]);
              // seconds = seconds;
              sub_temp[seconds] = item.text;
              return sub_temp;
            });
            listSubTitle[info.languageAbbr] = sub_temp;
          })
          .catch((error) => console.log(error));
      }
    });
  };

  useEffect(() => {
    getDetailMovies();
    setEpisodeId(ep);
    window.scrollTo(0, 0);
  }, [id, cate, ep]);

  useEffect(() => {
    // setDoneLoad(true);
    // // lấy tạo mặc định : 1
    setDoneLoad(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 5000);
    if (!_.isEmpty(movieInfo)) {
      getVideos(movieInfo.episodeVo[episodeId].id, displayResolution);
      //lấy phiên dịch
      let list = movieInfo.episodeVo[episodeId]?.subtitlingList.map(
        (item, index) => {
          return { label: item.language, value: item.languageAbbr };
        }
      );
      list.push({ label: "Off", value: "" });
      // setListSubTitle(listCaption);
      setArrSub(list);
      // console.log(movieInfo.episodeVo[episodeId]?.subtitlingList);
      getSubtitle(movieInfo.episodeVo[episodeId]?.subtitlingList);
    }
    return () => clearTimeout(timeout);
  }, [movieInfo, displayResolution, episodeId]);

  const handleKeyBoard = (e) => {
    if (e.keyCode === 37) {
      e.preventDefault();
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    }
    if (e.keyCode === 39) {
      e.preventDefault();
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    }
    if (e.keyCode === 32) {
      e.preventDefault();
      setPlayerStates(() => ({
        ...playerStates,
        playing: !playerStates.playing,
      }));
    }
  };
  useEventListener("keydown", handleKeyBoard);
  const handleClickChangeEpisode = (value) => {
    setDoneLoad(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 5000);
    // getVideos(movieInfo.episodeVo[value].id);
    console.log("dmmmm");
    navigate(`/watch/${id}?type=${cate}&ep=${value}`);
    // setEpisodeId(value);
    return () => clearTimeout(timeout);
  };

  const onClickChangeServer = (val) => {
    if (val !== displayResolution) {
      setDisPlayResoluton(() => val);
    }
  };

  // PROCESS ....................
  const handleProgressReactPlayer = (progress) => {
    const secondRoot = parseInt(progress.playedSeconds);
    // console.log(secondRoot);
    const timeout = setTimeout(() => {
      if (selectedSub1.value !== "") {
        if (listSubTitle[selectedSub1.value][secondRoot] !== undefined) {
          if (selectedSub2.value === "") {
            setSubText1(
              listSubTitle[selectedSub1.value][secondRoot] + "$$$$$$"
            );
            setCountHiddenText(0);
          } else {
            setSubText1(
              listSubTitle[selectedSub1.value][secondRoot] +
                "$$$$$$" +
                listSubTitle[selectedSub2.value][secondRoot]
            );
            setCountHiddenText(0);
          }
        }
      }
      // if (selectedSub2.value !== "") {
      //   if (listSubTitle[selectedSub2.value][secondRoot] !== undefined) {
      //     setSubText2(listSubTitle[selectedSub2.value][secondRoot]);
      //     setCountHiddenText(0);
      //   }
      // }
    }, 0);
    if (countHiddenText <= 4) setCountHiddenText(() => countHiddenText + 1);
    // console.log(countHiddenText);
    if (countHiddenText === 4) {
      setSubText1("");
      setSubText2("");
    }
    if (count >= 1) {
      controlsRef.current.style.visibility = "hidden";
    }
    if (controlsRef.current.style.visibility === "visible") {
      setCount(() => count + 1);
    }
    if (!playerStates.seeking) {
      setPlayerStates({ ...playerStates, ...progress });
    }
    return () => clearTimeout(timeout);
  };

  const handleRewind = (e) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = (e) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handlePlayPause = (e) => {
    // console.log(listSubTitle["vi"]);
    // console.log(listSubTitle["en"]);
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
    let value =
      rate === "+"
        ? playerStates.playbackRate + 0.1
        : playerStates.playbackRate - 0.1;
    if (value > 0 && value <= 2)
      setPlayerStates({
        ...playerStates,
        playbackRate: Math.round(value * 10) / 10,
      });
    // setAnchorEl(null);
  };

  const handleToggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleSeekChange = (e, newValue) => {
    setPlayerStates(() => ({
      ...playerStates,
      played: parseFloat(newValue / 100),
      playing: false,
    }));
  };

  const handleSeekMouseDown = (e, newValue) => {
    setPlayerStates(() => ({
      ...playerStates,
      seeking: true,
    }));
  };

  const handleSeekMoveUp = (e, newValue) => {
    setPlayerStates(() => ({
      ...playerStates,
      playing: true,
      // played: parseFloat(newValue / 100),
      seeking: false,
    }));
    playerRef.current.seekTo(newValue / 100);
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    setCount(() => 0);
  };

  const handleChangeDisplayTimeFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "innormal" : "normal"
    );
  };
  
  const handleChangeMovieId = (_id, category)=>{
    // console.log(id);
    // console.log(cate);
    navigate(`/watch/${_id}?type=${category}&ep=0`);
    setArrSub([]);
  }

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  const elapsedTime =
    timeDisplayFormat === "normal"
      ? formatTimeVideo(currentTime)
      : `-${formatTimeVideo(duration - currentTime)}`;
  const totalDuration = formatTimeVideo(duration);

  return (
    <div className="watch_movie_container">
      <PageLoadingEffeect doneLoad={doneLoad} />

      <div className="watch_movie_wrapper">
        <div
          className="player-wrapper"
          onMouseMove={handleMouseMove}
          ref={playerContainerRef}
        >
          <ReactPlayer
            onProgress={(progress) => {
              handleProgressReactPlayer(progress);
            }}
            className="react-player"
            width="100%"
            height="100%"
            playing={playerStates.playing}
            muted={playerStates.muted}
            onError={(error, data, hlsInstance, hlsGlobal) => {}}
            url={videoUrl}
            ref={playerRef}
            volume={playerStates.volume}
            playbackRate={playerStates.playbackRate}
          />

          {/* play control */}
          <PlayerControl
            ref={controlsRef}
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
            // onHandleOpenPopover={handleClickOpenPopover}
            // onHandleClosePopover={handleClickClosePopover}
            // anchorEl={anchorEl}
            onToggleFullScreen={handleToggleFullScreen}
            played={playerStates.played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMoveUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onChangeDisplayFormat={handleChangeDisplayTimeFormat}
          />

          <div className="sub_title">
            <div className="wrapper">
              <span>{subText1?.split("$$$$$$")[0]}</span>
              <span style={{ color: "white" }}>
                {subText1?.split("$$$$$$")[1]}
              </span>
            </div>
          </div>
        </div>

        <div className="player_sub_controls">
          <div className="player_sub_controls_group">
            <div className="label">Speed</div>
            <button className="speed_sub_button">
              <SubIcon
                style={{ color: "red !important" }}
                onClick={() => handlePlayBackRateChange("-")}
              />
            </button>
            <input
              className="speed_input"
              disabled
              value={playerStates.playbackRate}
            />
            <button className="speed_add_button">
              <AddIcon
                style={{ color: "red !important" }}
                onClick={() => handlePlayBackRateChange("+")}
              />
            </button>
          </div>
          <div className="player_sub_controls_group">
            <div className="label">Subtitle 1</div>
            <div>
              <Select
                className="select_custom"
                options={arrSub}
                value={selectedSub1}
                onChange={setSelectedSub1}
              />
            </div>
          </div>
          <div className="player_sub_controls_group">
            <div className="label">Subtitle 2</div>
            <div>
              <Select
                className="select_custom"
                options={arrSub}
                value={selectedSub2}
                onChange={setSelectedSub2}
              />
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
            {movieInfo?.name} {"("} {movieInfo?.year} {")"}
          </div>
          {/* <div className="name_root">{movieInfo?.aliasName}</div> */}
          <div className="country">
            National: {movieInfo?.areaNameList?.join(", ")}
          </div>
          <div className="pilot">{movieInfo?.introduction}</div>
        </div>

        <div className="similar">
          <span>Maybe you want to see</span>
        <VideoSlider
                videoList={movieInfo?.likeList}
                onHandleChangeMovieId={handleChangeMovieId}
              />
        </div>
      </div>
    </div>
  );
};

export default Watch;
