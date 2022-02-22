import React from "react";
import ReactLoading from "react-loading";

const PageLoadingEffeect = ({ doneLoad }) => {
  return (
    <>
      {!doneLoad ? (
        <div
          style={{
            width: "100vw",
            minHeight: "100vh",
            maxHeight: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: 999999999,
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <ReactLoading
            type={"spinningBubbles"}
            color={"#283040"}
            height={100}
            width={100}
            className="react_loading"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PageLoadingEffeect;
