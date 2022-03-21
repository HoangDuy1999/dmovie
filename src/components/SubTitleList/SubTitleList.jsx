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
      const arr = [second, second - 1];
      for (const val of arr) {
        try {
          // itemsRef.current[val.toString()].scrollIntoView({
          //   behavior: "smooth",
          //   block: "center",
          // });
          messagesEndRef.current.scrollTo(
            0,
            itemsRef.current[val.toString()].offsetTop - 100
          );
          setSelectedSub(parseInt(val).toString());
          break;
        } catch (e) {
          // console.log(e);
        }
      }
    }
  }, [second]);

  useEffect(() => {
    if (arrSub1.length >= 0 || _.isEmpty(listSubTitle)) {
      setArrSub1([]);
    }
    if (arrSub2.length >= 0 || _.isEmpty(listSubTitle)) {
      setArrSub2([]);
    }
    messagesEndRef.current.scrollTo(0, 0);
    const timeout = setTimeout(() => {
      setArrSub1(listSubTitle[selectedSub1.value] || {});
      setArrSub2(listSubTitle[selectedSub2.value] || {});
    }, 200);
    return () => clearTimeout(timeout);
  }, [selectedSub1, selectedSub2, listSubTitle]);

  const handleOnWheel = (e) => {};
  return (
    <>
      <div
        ref={messagesEndRef}
        className="list_sub_container"
        onWheel={(e) => handleOnWheel(e)}
      >
        {_.isEmpty(arrSub1)
          ? Object.keys(arrSub2).map((key) => (
              <div
                onClick={() => handleSetStart(parseInt(key))}
                className="group_list"
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
                className="group_list"
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
                  {arrSub1[key] ||
                    arrSub1[(parseInt(key) - 1).toString()] ||
                    arrSub1[(parseInt(key) + 1).toString()] ||
                    ""}
                </div>
                <div
                  className="sub2"
                  style={key === selectedSub ? { color: "lightgray" } : {}}
                >
                  <div style={{}}>
                    {arrSub2[key] ||
                      arrSub2[(parseInt(key) - 1).toString()] ||
                      arrSub2[(parseInt(key) + 1).toString()] ||
                      ""}
                  </div>
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
    </>
  );
};
export default SubTitleList;
