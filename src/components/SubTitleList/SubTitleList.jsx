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
        itemsRef.current[second.toString()].scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
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

  const messagesEndRef = useRef(null);

  return (
    <div ref={messagesEndRef} className="list_sub_container">
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
                {arrSub2[key] || ""}
              </div>
              <hr />
            </div>
          ))
        : Object.keys(arrSub1).map((key) => (
            <div
            onClick={()=> handleSetStart(parseInt(key))}
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
                {arrSub2[key] || ""}
              </div>
              <hr />
            </div>
          ))}
    </div>
  );
};
export default SubTitleList;
