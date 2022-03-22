import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { AiFillGoogleSquare } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import "./login.scss";
import accountApi from "../../api/dmovie/accounts";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { success, error } from "../Toastify/Toastify";
import PageLoadingEffeect from "../PageLoadingEffect/PageLoadingEffeect";

const Login = () => {
  const navigate = useNavigate();
  const [activeFormBx, setActiveFormBx] = useState("");
  const [activeBody, setActiveBody] = useState("");
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [doneLoad, setDoneLoad] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log("handle route change here", location);
  }, [location]);
  
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
    const timeout = setTimeout(() => {
      setDoneLoad(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchParams]);

  const responseGoogleSuccessedLogin = async (response) => {
    const rs = response.profileObj;
    try {
      setDoneLoad(false);
      const response = await accountApi.loginAccount({
        email: rs.email,
        // pass_word: event.target.pass_word.value,
      });
      console.log(response);
      if (response.code === 400) {
        error(response.message.message);
        setDoneLoad(true);
        return;
      } else {
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem(
          "account_info",
          JSON.stringify(response.data.account)
        );
        success("Login successfull");
        setDoneLoad(true);

        // navigate(`/`);
        navigate(-1);
      }
    } catch (e) {
      console.log(e);
    }
    // navigate(`/`);
  };

  const responseGoogleSuccessedSignUp = async (response) => {
    const rs = response.profileObj;
    try {
      setDoneLoad(false);
      console.log({
        email: rs.email,
        full_name: rs.full_name || "Anonymous",
        pass_word: "123456",
      });
      const response = await accountApi.addAccount({
        email: rs.email,
        full_name: rs.full_name,
        pass_word: "123456",
      });
      // console.log(response);
      if (response.code === 400) {
        error(response.message.message);
        setDoneLoad(true);
        return;
      } else {
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem(
          "account_info",
          JSON.stringify(response.data.account)
        );
        success("Login successfull");
        setDoneLoad(true);
        // console.log(response);
        navigate(`/`);
      }
    } catch (e) {
      console.log(e);
    }
    // navigate(`/`);
  };
  const responseGoogleFailed = (response) => {
    // const rs = JSON.stringify(response);
    error("Login with google unsuccessfull");
    // console.log(JSON.stringify(response));
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setDoneLoad(false);
    if (
      event.target.pass_word.value.localeCompare(
        event.target.confirm_password.value
      ) !== 0
    ) {
      error("Confirm password incorrect");
      setDoneLoad(true);
      return;
    }
    if (!isChecked) {
      error("Please checked checkbox i accept the Terms of Services");
      setDoneLoad(true);
      return;
    }
    const params = {
      // _id: "623015f8f44350f03413a368",
      full_name: event.target.full_name.value,
      email: event.target.email.value,
      pass_word: event.target.pass_word.value,
    };

    const response = await accountApi.addAccount({
      // _id: "623015f8f44350f03413a368",
      full_name: event.target.full_name.value,
      email: event.target.email.value,
      pass_word: event.target.pass_word.value,
    });
    if (response.code === 400) {
      error(response.message.message);
      setDoneLoad(true);
      return;
    } else {
      localStorage.setItem("access_token", response.data.accessToken);
      localStorage.setItem(
        "account_info",
        JSON.stringify(response.data.account)
      );
      success("Login successfull");
      setDoneLoad(true);
      console.log(response);
      navigate(`/`);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      setDoneLoad(false);
      const response = await accountApi.loginAccount({
        email: event.target.email.value,
        pass_word: event.target.pass_word.value,
      });
      // console.log(response);
      if (response.code === 400) {
        error(response.message.message);
        setDoneLoad(true);
        return;
      } else {
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem(
          "account_info",
          JSON.stringify(response.data.account)
        );
        success("Login successfull");
        setDoneLoad(true);
        // console.log(response);
        navigate(`/`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <PageLoadingEffeect doneLoad={doneLoad} />
      <div
        className={"login_container"}
        style={activeBody === "active" ? {} : {}}
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
                  <form onSubmit={handleLoginSubmit}>
                    <input
                      name="email"
                      style={
                        isFocusEmail ? { border: "2px solid #03a9f4" } : {}
                      }
                      onFocus={() => setIsFocusEmail(true)}
                      onBlur={() => setIsFocusEmail(false)}
                      type="email"
                      placeholder="Email"
                      required
                    />
                    <input
                      style={
                        isFocusPassword ? { border: "2px solid #03a9f4" } : {}
                      }
                      name="pass_word"
                      onFocus={() => setIsFocusPassword(true)}
                      onBlur={() => setIsFocusPassword(false)}
                      type="password"
                      placeholder="Password"
                      required
                      minLength="6"
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#03a9f4",
                        color: "white",
                        width: "100%",
                      }}
                    >
                      Sign in
                    </button>
                  </form>
                  <Link
                    style={{ color: "#333", marginTop: "10px" }}
                    to="/forgot"
                  >
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
                    <GoogleLogin
                      clientId="95480366861-a4kg4dt3g884igtaqqton490lg00ccfm.apps.googleusercontent.com"
                      buttonText=""
                      render={(renderProps) => (
                        <div
                          style={{
                            marginRight: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          <AiFillGoogleSquare
                            color={"#d34836"}
                            size={40}
                            title={"login with google"}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      )}
                      style={{ justifyContent: "center" }}
                      onSuccess={responseGoogleSuccessedLogin}
                      onFailure={responseGoogleFailed}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="form signupForm">
                <div className="form_login_info">
                  <h3>Sign Up</h3>
                  <form onSubmit={handleRegisterSubmit}>
                    <input
                      name="full_name"
                      type="text"
                      placeholder="Full name"
                      required
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Email address"
                    />
                    <input
                      name="pass_word"
                      type="password"
                      placeholder="Password"
                      required
                      minLength="6"
                    />
                    <input
                      name="confirm_password"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      minLength="6"
                    />
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
                        checked={isChecked}
                        onChange={() => {
                          setIsChecked(!isChecked);
                        }}
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
                      type="submit"
                      style={{
                        backgroundColor: "#3b00f0",
                        color: "white",
                        width: "100% !important",
                      }}
                    >
                      Sign up
                    </button>
                  </form>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "15px",
                    }}
                  >
                    <GoogleLogin
                      clientId="95480366861-a4kg4dt3g884igtaqqton490lg00ccfm.apps.googleusercontent.com"
                      buttonText=""
                      render={(renderProps) => (
                        <div
                          style={{
                            marginRight: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          <AiFillGoogleSquare
                            color={"#d34836"}
                            size={40}
                            title={"login with google"}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      )}
                      style={{ justifyContent: "center" }}
                      onSuccess={responseGoogleSuccessedSignUp}
                      onFailure={responseGoogleFailed}
                      cookiePolicy={"single_host_origin"}
                    />

                    {/* <FaFacebookSquare
                    color={"#3b5998"}
                    size={36}
                    title={"login with facebook"}
                    style={{ cursor: "pointer" }}
                  /> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
