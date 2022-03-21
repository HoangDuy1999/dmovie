import axiosClient from "./axiosClient";

const favoriteListApi = {
  getListByAccountId(id) {
    const url = `watchlist?account_id=${id}`;
    return axiosClient.get(url);
  },
  findMovieByAccountId(params) {
    const url = `watchlist/find_movie?_id=${params._id}&movie_id=${params.movie_id}`;
    return axiosClient.get(url);
  },
  add(params) {
    const url = `watchlist`;
    return axiosClient.post(url, params);
  },
  update(params) {
    const url = `watchlist`;
    return axiosClient.patch(url, params);
  },
};

export default favoriteListApi;
