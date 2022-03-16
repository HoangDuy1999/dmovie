import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dmoviebe113.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

//Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem("access_token");
    config.headers["authorization"] = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Do something with response data
    return { code: 200, data: response.data, message: "" };
  },
  function (error) {
    const { config, status, data } = error.response;
    const URLs = [
      "/authentication/register",
      "/authentication/login",
      "/authentication/verification-email",
      "/authentication/forgot-password",
    ];
    //if (URLs.includes(config.url) && status === 400) {
    // throw new Error(error.response);
    // console.log(error);
    return { code: 400, message: error.response.data };
    //}

    //return Promise.reject(error);
  }
);

export default axiosClient;
