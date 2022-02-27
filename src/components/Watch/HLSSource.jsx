import React, { useState, useEffect } from "react";
import Hls from "hls.js";

const HLSSource = ({ src, video }) => {
  const hls = new Hls();
  useEffect(() => {
    hls.loadSource(src);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      // video.play();
    });
    
  }, [src, video]);
  return (
    <>
      <source
        src={src}
        type={"application/x-mpegURL"}
      />
    </>
  );
};

export default HLSSource;
