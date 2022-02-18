import axiosClient from "./axiosClient";
// import apiConfig from "./apiConfig";
export const category = {
  movie: "movie",
  tv: "tv",
  person: "person",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getTrending: async (
    mediaType = "movie",
    time_window = "week",
    number = 10
  ) => {
    const params = { page: 1 };
    const url = `trending/${mediaType}/${time_window}`;
    let response = await axiosClient.get(url, { params });
    // get 8 items
    response = response.results.slice(0, number);
    // get info movies
    response = response.map(async (item) => {
      // get info genres
      const movie_detail_url =
        "/movie/" +
        item.id +
        "?api_key=506a7a4b7f25d45cc0f3d4d9351442ed&language=en-US";
      const movie_detail = await axiosClient.get(movie_detail_url, {});
      let genres_name = movie_detail.genres.map((item) => {
        return item["name"];
      });
      genres_name = genres_name.join(" / ");
      // console.log(genres_name);
      return { ...item, genres_name };
    });
    return Promise.all(response).then(function (results) {
      // console.log(results);
      return results ? results : [];
    });
  },
  getNowPlaying: async (params) => {
    const url = `movie/now_playing`;
    let response = await axiosClient.get(url, { params });
    return response;
  },
  getTvAiring: async (params) => {
    const url = `tv/airing_today`;
    let response = await axiosClient.get(url, { params });
    return response;
  },
  getMovieUpcoming: async (params) => {
    const url = `movie/upcoming`;
    let response = await axiosClient.get(url, { params });
    return response;
  },
  getHighestRatingTvShow: async (params) => {
    const url = `tv/top_rated`;
    let response = await axiosClient.get(url, { params });
    return response;
  },
  getHighestRatingMovie: async (params) => {
    const url = `movie/top_rated`;
    let response = await axiosClient.get(url, { params });
    return response;
  },
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    console.log(axiosClient.get(url, params));
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  reviews: (cate, id) => {
    const url = category[cate] + "/" + id + "/reviews";
    return axiosClient.get(url, { params: { page: 1 } });
  },
  discover: (cate, params) => {
    const url = "discover/" + category[cate];
    return axiosClient.get(url, { params: params });
  },
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
  genresList: (cate) => {
    const url = "/genre/" + category[cate] + "/list";
    return axiosClient.get(url, { params: {} });
  },
  getDetailPerson: (id) => {
    const url = "/person/" + id;
    return axiosClient.get(url, { params: {} });
  },
  getPopularPeople: (page=1) => {
    const url = "/person/popular";
    return axiosClient.get(url, { params: {page: page} });
  },
  getCombineCreditsPerson: (id) => {
    const url = "/person/" + id +"/combined_credits";
    return axiosClient.get(url, { params: {} });
  },
  searchMulties: (txtSearch) => {
    const url = "/search/multi";
    return axiosClient.get(url, { params: { query: txtSearch, page: 1} });
  },
};

export default tmdbApi;
