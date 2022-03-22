import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoginPage from "../components/Login/Login";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet";
const Login = () => {
  return (
    <div>
      <Helmet>
        <title>Dmovie - Login</title>
        <meta name="description" content="Dmovie login page" />
      </Helmet>
      <Navbar home={true} />
      <LoginPage />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Login;
