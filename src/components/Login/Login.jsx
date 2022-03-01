import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { AiFillGoogleSquare } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import "./login.scss";

const Login = () => {
  const [activeFormBx, setActiveFormBx] = useState("");
  const [activeBody, setActiveBody] = useState("");
  const handleClickSigUp = (e) => {
    setActiveFormBx("active");
    setActiveBody("active");
  };
  const handleClickSigIn = (e) => {
    setActiveFormBx("");
    setActiveBody("");
  };
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("type") === "register") {
      setActiveFormBx("active");
      setActiveBody("active");
    } else {
      setActiveFormBx("");
      setActiveBody("");
    }
  }, [searchParams]);
  return (
    <div
      className={"login_container"}
      style={activeBody === "active" ? { backgroundColor: "#9EC0E8" } : {}}
    >
      <div className="wrapper">
        <div className="blueBg">
          <div className="box signin">
            <h2>Already Have An Account?</h2>
            <button
              onClick={(e) => {
                handleClickSigIn();
              }}
              style={{
                backgroundColor: "#03a9f4",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Sign in
            </button>
          </div>
          <div className="box signup">
            <h2>Don't Have An Account?</h2>
            <button
              style={{
                backgroundColor: "#3b00f0",
                color: "white",
                borderRadius: "5px",
              }}
              onClick={(e) => {
                handleClickSigUp(e);
              }}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className={"formBx " + activeFormBx}>
          {activeFormBx !== "active" ? (
            <div
              className="form signinForm"
              // style={{
              //   animation: "linear 1"
              // }}
            >
              <div className="form_login_info">
                <h3>Sign In</h3>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button
                  style={{
                    backgroundColor: "#03a9f4",
                    color: "white",
                    width: "100%",
                  }}
                >
                  Sign in
                </button>
                <Link style={{ color: "#333", marginTop: "10px" }} to="/forgot">
                  Forgot Password
                </Link>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  <AiFillGoogleSquare
                    color={"#d34836"}
                    size={40}
                    title={"login with google"}
                    style={{ marginRight: "15px", cursor: "pointer" }}
                  />
                  <FaFacebookSquare
                    color={"#3b5998"}
                    size={36}
                    title={"login with facebook"}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="form signupForm">
              <div className="form_login_info">
                <h3>Sign Up</h3>
                <input type="text" placeholder="Full name" />
                <input type="email" placeholder="Email address" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: "15px",
                    marginTop: "-5px",
                    padding: 0,
                  }}
                >
                  <Checkbox
                    style={{
                      flex: 0,
                      margin: 0,
                      padding: 0,
                      marginLeft: "-2px",
                    }}
                  />
                  <span style={{ flex: 8, marginLeft: "15px" }}>
                    I accept the Terms of Services
                  </span>
                </div>
                <button
                  style={{
                    backgroundColor: "#3b00f0",
                    color: "white",
                    width: "100% !important",
                  }}
                >
                  Sign up
                </button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  <AiFillGoogleSquare
                    color={"#d34836"}
                    size={40}
                    title={"login with google"}
                    style={{ marginRight: "15px", cursor: "pointer" }}
                  />
                  <FaFacebookSquare
                    color={"#3b5998"}
                    size={36}
                    title={"login with facebook"}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
