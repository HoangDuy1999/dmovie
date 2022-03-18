import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoginPage from "../components/Login/Login";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const Login = () => {
  return (
    <div>
      <Navbar home={true} />
      <LoginPage />
      <Footer />
      <ScrollToTop/>
    </div>
  );
};

export default Login;
