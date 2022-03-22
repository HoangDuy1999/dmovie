import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import VipSearch from "../components/VipSearch/VipSearch";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet";
const Login = () => {
  return (
    <div>
      <Helmet>
        <title>Dmovie - VipSearch</title>
        <meta name="description" content="Dmovie vip search" />
      </Helmet>
      <Navbar />
      <VipSearch />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Login;
