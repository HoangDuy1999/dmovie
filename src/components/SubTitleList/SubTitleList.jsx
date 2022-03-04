import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import "./subTitleList.scss";

const SubTitleList = ({
  second,
  listSubTitle,
  selectedSub1,
  selectedSub2,
  handleSetStart,
}) => {
  const messagesEndRef = useRef(null);
  const itemsRef = useRef([]);
  const [arrSub1, setArrSub1] = useState({});
  const [arrSub2, setArrSub2] = useState({});
  const [selectedSub, setSelectedSub] = useState(0);
  useEffect(() => {
    if (selectedSub1.value !== "" || selectedSub2.value !== "") {
      try {
        if (
          listSubTitle[selectedSub1.value][second] !== undefined ||
          listSubTitle[selectedSub2.value][second] !== undefined
        ) {
          setSelectedSub(parseInt(second).toString());
        }
        // itemsRef.current[second.toString()].scrollIntoViewIfNeeded(true);
        // messagesEndRef.scrollIntoView(false);
        itemsRef.current[second.toString()].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } catch (e) {}
    }
  }, [second]);

  useEffect(() => {
    setArrSub1(listSubTitle[selectedSub1.value] || {});
    setArrSub2(listSubTitle[selectedSub2.value] || {});
  }, [selectedSub1, selectedSub2, listSubTitle]);

  const items = [
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
    "Item ",
  ];

  const handleOnWheel = (e) => {
    // console.log(e);
  };
  return (
    <div
      ref={messagesEndRef}
      className="list_sub_container"
      onWheel={(e) => handleOnWheel(e)}
    >
      {_.isEmpty(arrSub1)
        ? Object.keys(arrSub2).map((key) => (
            <div
              onClick={handleSetStart(parseInt(key))}
              className="group"
              style={
                key === selectedSub
                  ? { backgroundColor: "#333333" }
                  : { backgroundColor: "white" }
              }
              //style={{ backgroundColor: "red" }}
              ref={(el) => (itemsRef.current[key] = el)}
              id={key}
              key={key}
            >
              <div
                className="sub1"
                style={key === selectedSub ? { color: "white" } : {}}
              >
                {arrSub1[key] || ""}
              </div>
              <div
                className="sub2"
                style={key === selectedSub ? { color: "lightgray" } : {}}
              >
                <div style={{}}>{arrSub2[key] || ""}</div>
                <div
                  style={{
                    color: "white",
                    fontStyle: "normal",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#333",
                      maxWidth: "50px",
                      padding: "1px 5px",
                      marginBottom: "3px",
                      fontSize: "14px",
                    }}
                  >
                    {second < 3600
                      ? new Date(parseInt(key) * 1000)
                          .toISOString()
                          .substr(14, 5)
                      : new Date(parseInt(key) * 1000)
                          .toISOString()
                          .substr(11, 8)}
                  </span>
                </div>
              </div>
              <hr />
            </div>
          ))
        : Object.keys(arrSub1).map((key) => (
            <div
              onClick={() => handleSetStart(parseInt(key))}
              className="group"
              style={
                key === selectedSub
                  ? { backgroundColor: "#333333" }
                  : { backgroundColor: "white" }
              }
              //style={{ backgroundColor: "red" }}
              ref={(el) => (itemsRef.current[key] = el)}
              id={key}
              key={key}
            >
              <div
                className="sub1"
                style={key === selectedSub ? { color: "white" } : {}}
              >
                {arrSub1[key] || ""}
              </div>
              <div
                className="sub2"
                style={key === selectedSub ? { color: "lightgray" } : {}}
              >
                <div style={{}}>{arrSub2[key] || ""}</div>
                <div
                  style={{
                    color: "white",
                    fontStyle: "normal",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#333",
                      maxWidth: "50px",
                      padding: "1px 5px",
                      marginBottom: "3px",
                      fontSize: "14px",
                    }}
                  >
                    {second < 3600
                      ? new Date(parseInt(key) * 1000)
                          .toISOString()
                          .substr(14, 5)
                      : new Date(parseInt(key) * 1000)
                          .toISOString()
                          .substr(11, 8)}
                  </span>
                </div>
              </div>
              <hr />
            </div>
          ))}
    </div>
  );
};
export default SubTitleList;
