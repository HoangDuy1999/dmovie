import axiosClient from "./axiosClient";

const accountApi = {
  gellAllAccount(params) {
    const url = `account`;
    return axiosClient.get(url, {});
  },
  addAccount(params) {
    const url = `account/register`;
    return axiosClient.post(url, params);
  },
  loginAccount(params) {
    const url = `account/login`;
    return axiosClient.post(url, params);
  },
  updateInfomationAccount(params) {
    const url = `account`;
    return axiosClient.patch(url, params);
  },
};

export default accountApi;
