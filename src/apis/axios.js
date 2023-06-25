import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Set your API base URL
  withCredentials: true, // Include credentials in all requests
});

export default axiosInstance;