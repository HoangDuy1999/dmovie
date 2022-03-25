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
import { useNavigate } from "react-router-dom";
import useEventListener from "@use-it/event-listener";
import VideoSlider from "../VideoSlider/VidieoSlider";
import FBComment from "../FBComment/FBComment";
import SubTitleList from "../SubTitleList/SubTitleList";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { useBeforeunload } from "react-beforeunload";
import TokenLokLokApi from "../../api/dmovie/tokenLoklok";

var { default: srtParser2 } = require("srt-parser-2");

const Watch = ({ cate, ep, onFocus }) => {
  const navigate = useNavigate();
  const { id } = useParams() || undefined;
  const [movieInfo, setMovieInfor] = useState({});
  const [videoUrl, setVideoUrl] = useState("");
  const [episodeId, setEpisodeId] = useState("0");
  const [contentId, setContenId] = useState(-1);
  const [doneLoad, setDoneLoad] = useState(true);
  const [displayResolution, setDisPlayResoluton] = useState("SD");
  const [subTextSize, setSubTextSize] = useState("27px");
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [subText1, setSubText1] = useState("");
  const [countHiddenText, setCountHiddenText] = useState(0);
  const [onLoaded, setOnLoaded] = useState(false);
  const [errorLoaded, setErrorLoaded] = useState(false);
  const [isShowRightMenu, setIsShowRightMenu] = useState(true);
  const [arrSub, setArrSub] = useState([
    {
      value: "",
      label: "Off",
    },
  ]);
  const [isDoneLoad, setIsDoneLoad] = useState(false);
  const [listSubTitle, setListSubTitle] = useState({});
  const { innerWidth: width } = window;
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
  const [tokenLokLok, setTokenLokLok] = useState(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnb29nbGVJZCI6IjExNzA3MzcyNDg0MDAxNDkzNTk0MCIsIm5pY2tOYW1lIjoiVGl0dGlrOTEyNzA5MjQiLCJjdXJyZW50VGltZU1pbGxpcyI6MTY0ODAzNjAzNjM2MCwiZXhwIjoxNjUwNjI4MDM2LCJ1c2VySWQiOjMwMzYwNTN9.1JDOIVrxpeZoWfKwAV2NmunN9i_1f8T7RlSQVqZ5qEM"
  );

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

  const getVipVideo = async (_token) => {
    console.log("vip run");
    if (count > 0) {
      setCount(0);
    }
    controlsRef.current.style.visibility = "visible";
    console.log(tokenLokLok ? tokenLokLok : _token);
    console.log(movieInfo);
    console.log(`
    https://web-api.netpop.app/cms/web/pc/movieDrama/getPlayInfo?category=${cate}&contentId=${id}&definition=GROOT_${
      displayResolution || "SD"
    }&episodeId=${
      contentId === -1 ? movieInfo?.episodeVo["0"]?.id : contentId
    }`);
    axios
      .get(
        `
        https://web-api.netpop.app/cms/web/pc/movieDrama/getPlayInfo?category=${cate}&contentId=${id}&definition=GROOT_${
          displayResolution || "SD"
        }&episodeId=${
          contentId === -1 ? movieInfo?.episodeVo[0]?.id : contentId
        }`,
        {
          params: {},
          headers: {
            lang: "en",
            token: tokenLokLok ? tokenLokLok : _token,
          },
        }
      )
      .then((res) => {
        console.log("ket qua vip");
        console.log(res.data?.data?.mediaUrl);
        setVideoUrl(res.data?.data?.mediaUrl || "");
        // setOnLoaded(false);
      })
      .catch((error) => {
        console.log("LỖI");
        console.log(error);
      });
  };

  const handleClickShowRightMenu = (value) => {
    setIsShowRightMenu(value);
  };

  const getDetailMovies = () => {
    if (count > 0) {
      setCount(0);
    }
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
          if (res.data?.data) {
            setContenId(res.data?.data?.episodeVo[ep].id);
            setMovieInfor(res.data.data);
          } else {
            console.log("get detail error");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const getTokenLokLok = async () => {
    const rs = await TokenLokLokApi.get();
    if (rs.code === 200) {
      setTokenLokLok(rs.data.l_token);
      // getVideos();
      // console.log("LÂY ĐƯỢC TOKEN");
      // console.log("DMMMMMMMMMMMMMMMMMMMM");
    } else {
      console.log("KHÔNG LẤY ĐƯỢC TOKEN DATA");
    }
  };

  const getVideos = async (episode, resoluton = "SD") => {
    if (count > 0) {
      setCount(0);
    }
    console.log("GET VIDEO");
    let i = 0;
    for (const item of ["SD", "LD", "HD", "SD", "LD", "HD"]) {
      i += 1;
      console.log(item);
      const rs = await axios
        .get(
          `https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${cate}&contentId=${id}&episodeId=${episode}&definition=GROOT_${item}`,
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
            if (res.data.data.mediaUrl.includes("https")) {
              setVideoUrl(res.data.data.mediaUrl || "");
              return true;
            } else {
              return false;
            }
          }
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
      console.log(rs);
      if (rs) {
        controlsRef.current.style.visibility = "visible";
        break;
      }
      if (i === 6) {
        setOnLoaded(false);
        controlsRef.current.style.visibility = "visible";
        setErrorLoaded(true);
      }
    }
  };

  const getSubtitle = (list) => {
    if (list?.length < 1) {
      setListSubTitle({});
      setSelectedSub1({
        value: "",
        label: "Off",
      });
      setSelectedSub2({
        value: "",
        label: "Off",
      });
      return;
    }
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
            // listSubTitle[info.languageAbbr] = sub_temp;
            const obj = {};
            obj[info.languageAbbr] = sub_temp;
            setListSubTitle((pre) => ({ ...pre, ...obj }));
          })
          .catch((error) => console.log(error));
      }
      return 0;
    });
  };

  const screenfullPlayer = () => {
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
  };

  // leave tab browser
  const onBlur = () => {
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
  const onGoBackPage = () => {
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
    navigate(2);
  };

  // get current timeBefore
  const getCurrentTimeBefore = (ep) => {
    let timeBefore = localStorage.getItem(`${id}^^^${ep}`);
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
    setIsDoneLoad(true);
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
  });

  useEffect(() => {
    getTokenLokLok();
    if (doneLoad) {
      setDoneLoad(false);
    }
    setErrorLoaded(false);
    getDetailMovies();
    setEpisodeId(ep);
    getCurrentTimeBefore(ep);
    window.scrollTo(0, 0);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocusWindow);
    window.addEventListener("popstate", onGoBackPage);

    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocusWindow);
      window.removeEventListener("popstate", onGoBackPage);
    };
  }, [id, cate, ep]);

  useEffect(() => {
    setDoneLoad(false);
    setErrorLoaded(false);
    const timeout2 = setTimeout(() => {
      if (!_.isEmpty(movieInfo)) {
        // getVipVideo();
        getVideos(movieInfo.episodeVo[episodeId].id, displayResolution);
        setOnLoaded(true);
      }
    }, 4000);

    const timeout3 = setTimeout(() => {
      if (!_.isEmpty(movieInfo)) {
        setOnLoaded(true);
        //lấy phiên dịch
        let list = movieInfo.episodeVo[episodeId]?.subtitlingList.map(
          (item, index) => {
            return { label: item.language, value: item.languageAbbr };
          }
        );
        list.push({ label: "Off", value: "" });
        setArrSub(list);
        getSubtitle(movieInfo.episodeVo[episodeId]?.subtitlingList);
      } else {
        console.log("get subtitle none");
      }
    }, 2500);

    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 4000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [movieInfo, displayResolution, episodeId]);

  // PROCESS ....................
  const handleProgressReactPlayer = (progress) => {
    const secondRoot = parseInt(progress.playedSeconds);
    if (errorLoaded) {
      setErrorLoaded(false);
    }
    // hide loading
    const loaded = playerRef?.current?.getSecondsLoaded();
    if (loaded >= secondRoot && onLoaded === true) {
      setOnLoaded(false);
    }

    //setTextSub size
    screenfullPlayer();

    const arr = [secondRoot, secondRoot - 1, secondRoot - 2];
    for (const val of arr) {
      try {
        if (hideSub === false) {
          //CASE: SUB1 TURN ON
          if (selectedSub1.value !== "" && selectedSub2.value === "") {
            let txtSub1 = "!@#%^&*";
            //check exist data
            if (listSubTitle[selectedSub1.value] !== undefined) {
              if (listSubTitle[selectedSub1.value][val] !== undefined) {
                txtSub1 = listSubTitle[selectedSub1.value][val];
              }
            }
            const isSameText1 = subText1
              .toLowerCase()
              .includes(txtSub1.toLowerCase());
            if (!isSameText1 && txtSub1 !== "!@#%^&*" && txtSub1.length > 0) {
              setSubText1(txtSub1 + "$$$$$$");
              setCountHiddenText(0);
              break;
            }
          }

          //CASE: SUB2 TURN ON
          if (selectedSub1.value === "" && selectedSub2.value !== "") {
            let txtSub2 = "!@#$%^&*";
            //check exist data
            if (listSubTitle[selectedSub2.value] !== undefined) {
              if (listSubTitle[selectedSub2.value][val] !== undefined) {
                txtSub2 = listSubTitle[selectedSub2.value][val];
              }
            }
            const isSameText2 = subText1
              .toLowerCase()
              .includes(txtSub2.toLowerCase());
            if (!isSameText2 && txtSub2 !== "!@#$%^&*" && txtSub2.length > 0) {
              setSubText1("$$$$$$" + txtSub2);
              setCountHiddenText(0);
              break;
            }
          }
          // SUB1 AND SUB 2
          if (selectedSub1.value !== "" && selectedSub2.value !== "") {
            // let txtSpecial = "!@#$%^&*";
            let txtSub = "";
            //check sub 1
            if (listSubTitle[selectedSub1.value] !== undefined) {
              if (listSubTitle[selectedSub1.value][val] !== undefined) {
                txtSub += listSubTitle[selectedSub1.value][val] + "$$$$$$";
              } else {
                txtSub += (subText1.split("$$$$$$")[0] || "") + "$$$$$$";
              }
            }
            //check sub 2
            if (listSubTitle[selectedSub2.value] !== undefined) {
              if (listSubTitle[selectedSub2.value][val] !== undefined) {
                if (txtSub.includes("$$$$$$")) {
                  txtSub +=
                    listSubTitle[selectedSub2.value][val] ||
                    listSubTitle[selectedSub2.value][val - 1];
                }
              } else {
                txtSub += subText1.split("$$$$$$")[1] || "";
              }
            }
            const isSameText = subText1
              .toLowerCase()
              .includes(txtSub.toLowerCase());
            if (txtSub.length > 0 && isSameText === false) {
              setSubText1(txtSub);
              setCountHiddenText(0);
              break;
            }
          }
        }
      } catch (e) {
        console.log(e);
        break;
      }
    }
    try {
      if (countHiddenText <= 10) setCountHiddenText((pre) => pre + 1);
      if (countHiddenText === 10) {
        setSubText1("");
      }
      if (count >= 3) {
        controlsRef.current.style.visibility = "hidden";
      }
      if (controlsRef.current.style.visibility === "visible") {
        if (count <= 3) {
          setCount(() => count + 1);
        }
      }
      if (!playerStates.seeking) {
        setPlayerStates({ ...playerStates, ...progress });
      }
    } catch (e) {}
  };

  const handleKeyBoard = (e) => {
    if (onFocus === false) {
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
    }
  };

  // useEventListener
  useEventListener("keydown", handleKeyBoard);

  const handleClickChangeEpisode = (value) => {
    setIsDoneLoad(false);
    setVideoUrl("");
    // setConte
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
    setSubText1("");
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
    }, 4000);

    navigate(`/watch/${id}?type=${cate}&ep=${value}`);
    // setEpisodeId(value);
    return () => clearTimeout(timeout);
  };

  const onClickChangeServer = (val) => {
    setIsDoneLoad(false);
    setVideoUrl("");
    if (
      playerRef?.current.getCurrentTime() !== null &&
      playerRef?.current.getCurrentTime() !== undefined &&
      playerRef?.current.getCurrentTime() > 0
    ) {
      localStorage.setItem(
        `${id}^^^${episodeId}`,
        playerRef.current.getCurrentTime().toString()
      );
    }
    setSubText1("");
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

  const handleChangeMovieId = (_id, category) => {
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
    setPlayerStates({
      playing: false,
      muted: false,
      volume: 1,
      playbackRate: 1.0,
      played: 0,
      seeking: false,
    });
    setVideoUrl("");
    setArrSub([]);
    setIsDoneLoad(false);
    setSubText1("");
    navigate(`/watch/${_id}?type=${category}&ep=0`);
  };

  const handleRewind = (e) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = (e) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleSetStart = (val) => {
    if (playerStates.playing) {
      setIsDoneLoad(false);
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

  //screenfullPlayer();

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
    if (onLoaded === false) {
      setOnLoaded(true);
    }
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
    setCount(0);
  };

  const handleChangeDisplayTimeFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "innormal" : "normal"
    );
  };

  const handleOnClickHideSubTile = () => {
    setSubText1("");
    setHideSub(!hideSub);
  };

  const handleOnEndedReactPlayer = () => {
    localStorage.removeItem(`${id}^^^${episodeId}`);
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
        <div
          className="group"
          style={
            width < 600 && isShowRightMenu === false
              ? { minHeight: "300px", maxHeight: "300px" }
              : width >= 1024 && isShowRightMenu === false
              ? {
                  width: "90%",
                  minHeight: "80vh",
                  marginLeft: "auto",
                  marginRight: "auto",
                  transition: "all 1.5s ease-in-out",
                }
              : {}
          }
        >
          <div
            className="player-wrapper"
            onMouseMove={handleMouseMove}
            ref={playerContainerRef}
          >
            <ReactPlayer
              onReady={(e) => {
                console.log("Ready");
                setErrorLoaded(false);
                setIsDoneLoad(true);
                setOnLoaded(false);
                controlsRef.current.style.visibility = "visible";
              }}
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
                console.log("tải phim lỗi");
                setErrorLoaded(true);
                setOnLoaded(false);
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
              // style={isDoneLoad ? {} : { display: "none", width: 0, height: 0 }}
            >
              <PlayerControl
                onErrorLoaded={errorLoaded}
                onLoaded={onLoaded}
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
                isShowRightMenu={isShowRightMenu}
                handleClickShowRightMenu={handleClickShowRightMenu}
              />
            </div>

            <div className="sub_title">
              <div className="wrapper">
                <span style={{ fontSize: subTextSize }}>
                  {subText1?.split("$$$$$$")[0] || ""}
                </span>
                <span style={{ color: "white", fontSize: subTextSize }}>
                  {subText1?.split("$$$$$$")[1] || ""}
                  {/* {subText1} */}
                </span>
              </div>
            </div>
          </div>

          <div
            className="sub_list"
            style={
              isShowRightMenu
                ? {}
                : {
                    display: "none",
                    // width: 0,
                    // height: 0,
                    transition: "all 1.5s ease-in-out",
                  }
            }
            // style={
            //   width < 600 &&
            //   selectedSub1.value === "" &&
            //   selectedSub2.value === ""
            //     ? { display: "none", width: 0, height: 0 }
            //     : {}
            // }
          >
            <SubTitleList
              style={
                width < 600 &&
                selectedSub1.value === "" &&
                selectedSub2.value === ""
                  ? { display: "none", width: 0, height: 0 }
                  : {}
              }
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
            {movieInfo?.name} {"("}
            {movieInfo?.year}
            {")"}
          </div>
          {/* <div className="name_root">{movieInfo?.aliasName}</div> */}
          <div className="country">
            National: {movieInfo?.areaNameList?.join(", ")}
          </div>
          <div className="pilot">{movieInfo?.introduction}</div>
        </div>

        <div className="similar">
          <h2 style={{ color: "white" }}>Recommend Movies</h2>
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
