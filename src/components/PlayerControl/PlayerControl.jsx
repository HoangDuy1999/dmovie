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
import { VscRunErrors } from "react-icons/vsc";
import VolumeUpIcons from "@mui/icons-material/VolumeUp";
import VolumeOffIcons from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import Popover from "@mui/material/Popover";
import "./playerControl.scss";
import PropTypes from "prop-types";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import ClosedCaptionDisabledIcon from "@mui/icons-material/ClosedCaptionDisabled";
import CircularProgress from "@mui/material/CircularProgress";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons//bs";

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
    onLoaded,
    handleOnClickHideSubTile,
    hideSub,
    onToggleFullScreen,
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsedTime,
    totalDuration,
    onChangeDisplayFormat,
    onErrorLoaded,
    isShowRightMenu,
    handleClickShowRightMenu,
  },
  ref
) => {
  function ValueLabelComponent(props) {
    let { children } = props;
    // value = elapsedTime;
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={elapsedTime}>
        {children}
      </Tooltip>
    );
  }

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };
  // console.log(played);
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
        {onErrorLoaded ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <VscRunErrors
              style={{
                color: "red",
                fontSize: "60px",
                width: "60px",
                height: "60px",
              }}
            />
            <h4 style={{ color: "red", wordBreak: "break-all" }}>
              Please change server to reload video
            </h4>
          </div>
        ) : onLoaded ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <CircularProgress
              style={{ color: "#1976d2", width: "50px", height: "50px" }}
            />
          </div>
        ) : (
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
        )}

        {/* BOTTOM */}
        <Grid
          key="keybottom"
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} key="bottom1" style={{ padding: "0px 8px" }}>
            <Slider1
              className="slider_seek_root"
              min={0}
              max={100}
              value={played * 100}
              onChange={onSeek}
              // onMouseOver={(e, value) => {
              //   handleSliderMouseOver(e, value);
              // }}
              // getAriaValueText={handleSliderMouseOver}
              onMouseDown={onSeekMouseDown}
              onChangeCommitted={onSeekMouseUp}
              // valueLabelDisplay="auto"
              components={{
                ValueLabel: ValueLabelComponent,
              }}
            />
          </Grid>

          <Grid item key="bottom2" style={{ paddingLeft: "5px" }}>
            <Grid container direction="row" alignItems="center">
              {/* <IconButton
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
              </IconButton> */}
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
                size="small"
                valueLabelDisplay="auto"
                onChange={onVolumechange}
                onChangeCommitted={onVolumeSeekDown}
                value={volume * 100}
                className="volume_slider"
                style={{ marginLeft: "15px" }}
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
            {hideSub ? (
              <IconButton
                onClick={handleOnClickHideSubTile}
                className="bottom_icons"
                key="bottom10"
                size="large"
                style={{ marginRight: "10px" }}
                title="hide sub on video"
              >
                <ClosedCaptionDisabledIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleOnClickHideSubTile}
                className="bottom_icons"
                key="bottom11"
                size="large"
                style={{ marginRight: "10px" }}
                title="show sub on video"
              >
                <ClosedCaptionIcon fontSize="inherit" />
              </IconButton>
            )}

            <IconButton className="bottom_icons" key="bottom4" size="large">
              {isShowRightMenu ? (
                <BsFillEyeFill
                  title="show menu sub right"
                  onClick={() => handleClickShowRightMenu(false)}
                />
              ) : (
                <BsFillEyeSlashFill
                  title="hide menu sub right"
                  onClick={() => handleClickShowRightMenu(true)}
                />
              )}
            </IconButton>
            <IconButton
              onClick={onToggleFullScreen}
              className="bottom_icons"
              key="bottom8"
              size="large"
              style={{ paddingRight: "5px", marginLeft: "10px" }}
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
