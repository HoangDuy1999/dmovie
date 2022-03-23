import React from "react";
import "./pageNotFoundInfo.scss";
import { Link } from "react-router-dom";
const PageNotFoundInfo = () => {
  return (
    <div className="page_not_found_container">
      <div className="content">
        <svg
          viewBox="100% 100% 100% 100%"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="100%">
              404
            </text>
          </symbol>
          <g className="g-ants">
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
          </g>
        </svg>
        <div className="bottom">
          <h1>Page Not Found</h1>
          <Link className="link" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFoundInfo;
