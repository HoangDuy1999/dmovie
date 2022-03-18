import React, { useEffect, useState, useRef } from "react";
import "./watch.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import _ from "lodash";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";
import PlayerControl from "../PlayerControl/PlayerControl";
import screenfull from "screenfull";
import AddIcon from "@mui/icons-material/Add";
import SubIcon from "@mui/icons-material/Remove";
import Select from "react-select";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
import { useNavigate } from "react-router-dom";
import useEventListener from "@use-it/event-listener";
import VideoSlider from "../VideoSlider/VidieoSlider";
import FBComment from "../FBComment/FBComment";
import SubTitleList from "../SubTitleList/SubTitleList";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { useBeforeunload } from "react-beforeunload";

var { default: srtParser2 } = require("srt-parser-2");

const Watch = ({ cate, ep, onFocus }) => {
  const navigate = useNavigate();
  const { id } = useParams() || undefined;
  const [movieInfo, setMovieInfor] = useState({});
  const [videoUrl, setVideoUrl] = useState("");
  const [episodeId, setEpisodeId] = useState("0");
  const [doneLoad, setDoneLoad] = useState(true);
  const [displayResolution, setDisPlayResoluton] = useState("SD");
  const [subTextSize, setSubTextSize] = useState("27px");
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [subText1, setSubText1] = useState("");
  const [countHiddenText, setCountHiddenText] = useState(0);
  const [arrSub, setArrSub] = useState([
    {
      value: "",
      label: "Off",
    },
  ]);
  const [isDoneLoad, setIsDoneLoad] = useState(false);
  const [listSubTitle, setListSubTitle] = useState({});
  const { innerWidth: width, innerHeight: height } = window;
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

  let playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const [count, setCount] = useState(0);
  const [hideSub, setHideSub] = useState(false);
  const [currentTimeBefore, setCurrentTimeBefore] = useState(null);

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
          // console.log(res.data.data);
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
        } else {
          setDoneLoad(false);
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
      return 0;
    });
  };
  // leave tab browser
  const onBlur = () => {
    console.log(
      `Blur: movie_id: ${id} - episode: ${episodeId}second: ${playerRef.current.getCurrentTime()}`
    );
    if (
      playerRef.current.getCurrentTime() !== null &&
      playerRef.current.getCurrentTime() !== undefined &&
      playerRef.current.getCurrentTime() > 0
    ) {
      localStorage.setItem(
        `${id}^^^${episodeId}`,
        playerRef.current.getCurrentTime().toString()
      );
    }
  };
  // forcus tab browser
  const onFocusWindow = () => {
    console.log(
      `Focus: movie_id: ${id} - episode: ${episodeId}second: ${playerRef.current.getCurrentTime()}`
    );
    if (
      playerRef.current.getCurrentTime() !== null &&
      playerRef.current.getCurrentTime() !== undefined &&
      playerRef.current.getCurrentTime() > 0
    ) {
      localStorage.setItem(
        `${id}^^^${episodeId}`,
        playerRef.current.getCurrentTime().toString()
      );
    }
  };
  // get current timeBefore
  const getCurrentTimeBefore = () => {
    let timeBefore = localStorage.getItem(`${id}^^^${episodeId}`);
    if (timeBefore !== undefined && timeBefore !== null) {
      timeBefore = parseInt(timeBefore);
      // timeBefore = formatTimeVideo(timeBefore);
      setCurrentTimeBefore(timeBefore);
    } else {
      setCurrentTimeBefore(null);
    }
  };
  const handleConfirm = () => {
    playerRef.current.seekTo(currentTimeBefore);
    setPlayerStates(() => ({
      ...playerStates,
      playing: true,
      // played: parseFloat(newValue / 100),
      //seeking: false,
    }));
  };

  //tab close
  useBeforeunload((event) => {
    if (
      playerRef.current.getCurrentTime() !== null &&
      playerRef.current.getCurrentTime() !== undefined &&
      playerRef.current.getCurrentTime() > 0
    ) {
      localStorage.setItem(
        `${id}^^^${episodeId}`,
        playerRef.current.getCurrentTime().toString()
      );
    }
    console.log(
      `CloseTab: movie_id: ${id} - episode: ${episodeId}second: ${playerRef.current.getCurrentTime()}`
    );
  });

  useEffect(() => {
    getDetailMovies();
    setEpisodeId(ep);

    // // set time start
    // getCurrentTimeBefore();

    window.scrollTo(0, 0);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocusWindow);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocusWindow);
    };
  }, [id, cate, ep]);

  useEffect(() => {
    setDoneLoad(false);

    // set time start
    getCurrentTimeBefore();

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
    if (e.keyCode === 32 && onFocus === false) {
      e.preventDefault();
      setPlayerStates(() => ({
        ...playerStates,
        playing: !playerStates.playing,
      }));
    }
  };
  useEventListener("keydown", handleKeyBoard);

  const handleClickChangeEpisode = (value) => {
    setIsDoneLoad(false);
    playerRef = null;
    setPlayerStates({
      playing: false,
      muted: false,
      volume: 1,
      playbackRate: 1.0,
      played: 0,
      seeking: false,
    });
    setDoneLoad(false);
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 5000);
    // getVideos(movieInfo.episodeVo[value].id);
    setSelectedSub1({
      value: "",
      label: "Off",
    });
    setSelectedSub2({
      value: "",
      label: "Off",
    });
    navigate(`/watch/${id}?type=${cate}&ep=${value}`);
    // setEpisodeId(value);
    return () => clearTimeout(timeout);
  };

  const onClickChangeServer = (val) => {
    setIsDoneLoad(false);
    setPlayerStates({
      playing: false,
      muted: false,
      volume: 1,
      playbackRate: 1.0,
      played: 0,
      seeking: false,
    });
    if (val !== displayResolution) {
      setDisPlayResoluton(() => val);
    }
  };

  // PROCESS ....................
  const handleProgressReactPlayer = (progress) => {
    const secondRoot = parseInt(progress.playedSeconds);
    const arr = [secondRoot, secondRoot - 1, secondRoot - 2];
    for (const val of arr) {
      try {
        if (
          hideSub === false &&
          (selectedSub1.value !== "" || selectedSub2.value !== "")
        ) {
          if (listSubTitle[selectedSub1.value][val] !== undefined) {
            if (selectedSub2.value === "" && selectedSub1.value !== "") {
              if (subText1 !== "") {
                if (
                  listSubTitle[selectedSub1.value][val] !==
                  subText1.split("$$$$$$")[0]
                ) {
                  setSubText1(listSubTitle[selectedSub1.value][val] + "$$$$$$");
                  setCountHiddenText(0);
                }
              } else {
                setSubText1(listSubTitle[selectedSub1.value][val] + "$$$$$$");
                setCountHiddenText(0);
              }
            } else {
              if (subText1 !== "") {
                if (
                  listSubTitle[selectedSub1.value][val] !==
                  subText1.split("$$$$$$")[0]
                ) {
                  setSubText1(
                    listSubTitle[selectedSub1.value][val] +
                      "$$$$$$" +
                      listSubTitle[selectedSub2.value][val]
                  );
                  setCountHiddenText(0);
                }
              } else {
                setSubText1(
                  listSubTitle[selectedSub1.value][val] +
                    "$$$$$$" +
                    listSubTitle[selectedSub2.value][val]
                );
                setCountHiddenText(0);
              }
            }
            break;
          }
        }
      } catch (e) {}
    }
    try {
      if (countHiddenText <= 5) setCountHiddenText(() => countHiddenText + 1);
      if (countHiddenText === 5) {
        setSubText1(" $$$$$$ ");
      }
      if (count >= 3) {
        controlsRef.current.style.visibility = "hidden";
      }
      if (controlsRef.current.style.visibility === "visible") {
        setCount(() => count + 1);
      }
      if (!playerStates.seeking) {
        setPlayerStates({ ...playerStates, ...progress });
      }
    } catch (e) {}
  };

  const handleRewind = (e) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = (e) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleSetStart = (val) => {
    if (playerStates.playing) {
      playerRef.current.seekTo(val);
    }
    // setPlayerStates({ ...playerStates, seeking: false });
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

  if (screenfull.isFullscreen && subTextSize !== "34px" && width > 978) {
    setSubTextSize("34px");
  } else if (
    screenfull.isFullscreen === false &&
    subTextSize !== "27px" &&
    width > 978
  ) {
    setSubTextSize("27px");
  } else if (width < 978 && width > 758 && subTextSize !== "24px") {
    setSubTextSize("24px");
  } else if (width < 650 && subTextSize !== "16px") {
    setSubTextSize("16px");
  }

  const handleSeekChange = (e, newValue) => {
    setPlayerStates(() => ({
      ...playerStates,
      played: parseFloat(newValue / 100),
      playing: true,
      seeking: true,
    }));
    if (count !== 0) setCount(0);
  };

  const handleSeekMouseDown = (e, newValue) => {
    setPlayerStates(() => ({
      ...playerStates,
      // played: parseFloat(newValue / 100),
      playing: true,
      seeking: true,
    }));
    if (count !== 0) setCount(0);
  };

  const handleSeekMoveUp = (e, newValue) => {
    playerRef.current.seekTo(newValue / 100);
    setPlayerStates(() => ({
      ...playerStates,
      playing: true,
      // played: parseFloat(newValue / 100),
      seeking: false,
    }));
    if (count !== 0) setCount(0);
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

  const handleChangeMovieId = (_id, category) => {
    setIsDoneLoad(false);
    setPlayerStates({
      playing: false,
      muted: false,
      volume: 1,
      playbackRate: 1.0,
      played: 0,
      seeking: false,
    });
    navigate(`/watch/${_id}?type=${category}&ep=0`);
    setArrSub([]);
    setSelectedSub1({
      value: "",
      label: "Off",
    });
    setSelectedSub2({
      value: "",
      label: "Off",
    });
  };

  const handleOnClickHideSubTile = () => {
    setHideSub(!hideSub);
  };
  const handleOnEndedReactPlayer = () => {
    console.log("chạy xong");
  };

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
    <div
      className="watch_movie_container"
      // onKeyDown={(e) => handlePlayControlClick(e)}
    >
      {isDoneLoad && currentTimeBefore !== null ? (
        <ModalConfirm
          handleConfirm={handleConfirm}
          title="Notification"
          message={`
<div>The system records the state as stopping watching this movie at<b style='backgroundColor: yellow'> 
${formatTimeVideo(currentTimeBefore)}</b>. 
Do you want to continue watching?</div>`}
          isOpen={isDoneLoad}
        />
      ) : (
        ""
      )}

      <PageLoadingEffeect doneLoad={doneLoad} />

      <div className="watch_movie_wrapper">
        <div className="group">
          <div
            className="player-wrapper"
            onMouseMove={handleMouseMove}
            ref={playerContainerRef}
          >
            <ReactPlayer
              onReady={(e) => setIsDoneLoad(true)}
              onProgress={(progress) => {
                handleProgressReactPlayer(progress);
              }}
              className="react-player"
              width="100%"
              height="100%"
              onEnded={handleOnEndedReactPlayer}
              playing={playerStates.playing}
              muted={playerStates.muted}
              onError={(error, data, hlsInstance, hlsGlobal) => {
                setIsDoneLoad(false);
              }}
              url={videoUrl}
              ref={playerRef}
              volume={playerStates.volume}
              playbackRate={playerStates.playbackRate}
            />

            {/* play control */}
            <div
              className="player_control"
              style={{ backgroundColor: "yellow" }}
            >
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
                hideSub={hideSub}
                handleOnClickHideSubTile={handleOnClickHideSubTile}
                onToggleFullScreen={handleToggleFullScreen}
                played={playerStates.played}
                onSeek={handleSeekChange}
                onSeekMouseDown={handleSeekMouseDown}
                onSeekMouseUp={handleSeekMoveUp}
                elapsedTime={elapsedTime}
                totalDuration={totalDuration}
                onChangeDisplayFormat={handleChangeDisplayTimeFormat}
              />
            </div>

            <div className="sub_title">
              <div className="wrapper">
                <span style={{ fontSize: subTextSize }}>
                  {subText1?.split("$$$$$$")[0]}
                </span>
                <span style={{ color: "white", fontSize: subTextSize }}>
                  {subText1?.split("$$$$$$")[1]}
                  {/* {subText1} */}
                </span>
              </div>
            </div>
          </div>

          <div className="sub_list">
            <SubTitleList
              listSubTitle={listSubTitle}
              selectedSub1={selectedSub1}
              selectedSub2={selectedSub2}
              handleSetStart={(val) => handleSetStart(val)}
              second={
                playerRef.current
                  ? parseInt(playerRef.current.getCurrentTime())
                  : 0
              }
            />
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
          <h2 style={{ color: "white" }}>RECOMMENDED MOVIES</h2>
          <VideoSlider
            videoList={movieInfo?.likeList}
            onHandleChangeMovieId={handleChangeMovieId}
          />
        </div>

        <div className="fb_comment">
          <FBComment width={100} dataHref={window.location.href} />
          {/* <h5>{videoUrl}</h5> */}
        </div>
      </div>
    </div>
  );
};

export default Watch;
