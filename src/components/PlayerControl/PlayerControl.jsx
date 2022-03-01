import React, { forwardRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "@mui/material/IconButton";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Slider1 from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
// import { styled } from "@mui/material/styles";
import VolumeUpIcons from "@mui/icons-material/VolumeUp";
import VolumeOffIcons from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import Popover from "@mui/material/Popover";
import "./playerControl.scss";
import PropTypes from "prop-types";

const PlayerControl = (
  {
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
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsedTime,
    totalDuration,
    onChangeDisplayFormat,
  },
  ref
) => {
  function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };
  //posterHover
  function valuetext(value) {
    return `${value}°C`;
  }
  const open = Boolean(anchorEl);
  // const popoverId = open ? "simple-popover" : undefined;
  // console.log("update");
  // console.log(played);
  const handleSliderMouseOver = (e, value) => {
    // console.log(e);
    // console.log(value);
  };
  return (
    <>
      <div className="controler_wrapper" ref={ref}>
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
            size="large"
          >
            <FastRewindIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={(e) => onPlayPause(e)}
            className="controlIcons"
            aria-label="requind"
            size="large"
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
            size="large"
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
        >
          <Grid item xs={12} key="bottom1" style={{ padding: "0px 16px" }}>
            <Slider1
              className="slider_seek_root"
              min={10}
              max={100}
              value={played * 100}
              onChange={onSeek}
              onMouseOver={(e, value) => {
                handleSliderMouseOver(e, value);
              }}
              // getAriaValueText={handleSliderMouseOver}
              onMouseDown={onSeekMouseDown}
              onChangeCommitted={onSeekMouseUp}
              valueLabelDisplay="auto"
              components={{
                ValueLabel: ValueLabelComponent,
              }}
              // components={{
              //   ValueLabel: (
              //     <ValueLabelComponent {...props} value={elapsedTime} />
              //   ),
              // }}
            />
          </Grid>

          <Grid item key="bottom2">
            <Grid container direction="row" alignItems="center">
              <IconButton
                className="bottom_icons"
                key="icon1"
                onClick={(e) => onPlayPause()}
                size="large"
              >
                {playing ? (
                  <PauseIcon fontSize="inherit" />
                ) : (
                  <PlayArrowIcon fontSize="inherit" />
                )}
              </IconButton>
              <IconButton
                onClick={onMuted}
                className="bottom_icons"
                key="icon2"
                size="large"
              >
                {muted ? (
                  <VolumeOffIcons fontSize="inherit" />
                ) : (
                  <VolumeUpIcons fontSize="inherit" />
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
              <Button
                onClick={onChangeDisplayFormat}
                variant="text"
                style={{ color: "#fff", marginLeft: 16 }}
              >
                <Typography className="time_line">
                  {elapsedTime} / {totalDuration}
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid>
            {/* <Button
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
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
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
          </Popover> */}
            <IconButton
              onClick={onToggleFullScreen}
              className="bottom_icons"
              key="bottom4"
              size="large"
            >
              <FullscreenIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default forwardRef(PlayerControl);
