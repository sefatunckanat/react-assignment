import axios from "axios";
import { HOST_API } from "../config";

const axiosInstance = axios.create({
	baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (typeof error.response.data === "string")
			return Promise.reject(error.response.data);
		return Promise.reject("Something went wrong");
	}
);

export default axiosInstance;
