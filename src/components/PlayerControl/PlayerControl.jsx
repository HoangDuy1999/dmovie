import React, { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider1 from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import { styled } from "@material-ui/core/styles";
import VolumeUpIcons from "@material-ui/icons/VolumeUp";
import VolumeOffIcons from "@material-ui/icons/VolumeOff";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import "./playerControl.scss";

const PlayerControl = ({
  onPlayPause,
  playing,
  onRewind,
  onFastForward,
  onMuted,
  muted,
  onVolumechange,
  onVolumeSeekDown,
  volume,
  playbackRate,
  onPlayBackRate,
  onHandleOpenPopover,
  onHandleClosePopover,
  anchorEl,
  onToggleFullScreen,
}) => {
  // Thanh progressbar
  const PrettoSlider = styled(Slider1)({
    // color: "#52af77",
    minHeight: 4,
    maxHeight: 4,
    paddingBottom: 0,
    marginBottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiSlider-rail": {
      height: 8,
    },
    "& .MuiSlider-track": {
      border: "none",
      height: 8,
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      marginTop: 1.1,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: "auto",
      height: "auto",
      borderRadius: "50% 50% 50% 50%",
      backgroundColor: "#52af77",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(0deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-0deg) scale(2)",
      },
      "& > *": {
        // transform: "rotate(45deg)",
      },
    },
  });
  // hiện thời gian progressbar
  function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  //posterHover

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  console.log(playing);
  return (
    <>
      <div className="controler_wrapper">
        {/* TOP   */}
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          //   key="keytop"
          style={{ padding: 16, opacity: 0 }}
        >
          <Grid item key="top1">
            <Typography variant="h5" style={{ color: "#fff" }}>
              Video title
            </Typography>
          </Grid>
          <Grid item key="top2">
            <Button
              variant="contained"
              color="primary"
              startIcon={<BookmarkIcon />}
            >
              Bookmark
            </Button>
          </Grid>
        </Grid>
        {/* MIDDLE */}
        <Grid
          key="keymiddle"
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            onClick={onRewind}
            className="controlIcons"
            aria-label="requind"
          >
            <FastRewindIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={(e) => onPlayPause(e)}
            className="controlIcons"
            aria-label="requind"
          >
            {playing ? (
              <PauseIcon fontSize="inherit" />
            ) : (
              <PlayArrowIcon fontSize="inherit" />
            )}
          </IconButton>
          <IconButton
            onClick={onFastForward}
            className="controlIcons"
            aria-label="requind"
          >
            <FastForwardIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        {/* BOTTOM */}
        <Grid
          key="keybottom"
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          style={{ padding: "0px 16px" }}
        >
          <Grid item xs={12} key="bottom1">
            <PrettoSlider
              min={0}
              max={1000000}
              // valueLabelDisplay="auto"
              ValueLabelComponent={ValueLabelComponent}
              aria-label="pretto slider"
              defaultValue={20}
            />
          </Grid>

          <Grid item key="bottom2">
            <Grid container direction="row" alignItems="center">
              <IconButton
                className="bottom_icons"
                key="icon1"
                onClick={(e) => onPlayPause()}
              >
                {playing ? (
                  <PauseIcon fontSize="large" />
                ) : (
                  <PlayArrowIcon fontSize="large" />
                )}
              </IconButton>
              <IconButton
                onClick={onMuted}
                className="bottom_icons"
                key="icon2"
              >
                {muted ? (
                  <VolumeOffIcons fontSize="large" />
                ) : (
                  <VolumeUpIcons fontSize="large" />
                )}
              </IconButton>
              <Slider1
                min={0}
                max={100}
                // ValueLabelComponent={ValueLabelComponent}
                onChange={onVolumechange}
                onChangeCommitted={onVolumeSeekDown}
                value={volume * 100}
                className="volume_slider"
              />
              <Button variant="text" style={{ color: "#fff", marginLeft: 16 }}>
                <Typography>05:05:05</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid>
            <Button
              variant="text"
              key="bottom3"
              aria-describedby={popoverId}
              className="bottom_icons"
              onClick={onHandleOpenPopover}
            >
              <Typography>{playbackRate}X</Typography>
            </Button>
            <Popover
              id={popoverId}
              open={open}
              anchorEl={anchorEl}
              onClose={onHandleClosePopover}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Grid container direction="column-reverse">
                {[0.5, 1, 1.5, 2].map((item, index) => (
                  <Button
                    key={item}
                    variant="text"
                    onClick={() => onPlayBackRate(item)}
                  >
                    <Typography
                      color={playbackRate === item ? "primary" : "secondary"}
                    >
                      {item}x
                    </Typography>
                  </Button>
                ))}
              </Grid>
            </Popover>
            <IconButton onClick={onToggleFullScreen} className="bottom_icons" key="bottom4">
              <FullscreenIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PlayerControl;
