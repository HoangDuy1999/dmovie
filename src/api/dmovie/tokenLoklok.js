import axiosClient from "./axiosClient";

const TokenLokLokApi = {
  get() {
    const url = `auth_video/token_free`;
    return axiosClient.get(url);
  },
};

export default TokenLokLokApi;
