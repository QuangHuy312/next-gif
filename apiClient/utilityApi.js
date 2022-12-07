import axiosClient from "./axiosClient";

const UtilityApi = {
    searchPoint(params) {
        const url = "/v1/gifs/search/tags";
        return axiosClient.get(url, { params })
    },
    trendingPoint(params) {
        const url = "/v1/gifs/trending";
        return axiosClient.get(url, { params })
    },
    searchPoint(params) {
        const url = "/v1/gifs/search";
        return axiosClient.get(url, { params })
    },
    videoTrending(params) {
        const url = "/v1/videos/trending";
        return axiosClient.get(url, { params })
    }
}

export default UtilityApi;