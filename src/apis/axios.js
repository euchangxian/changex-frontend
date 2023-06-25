import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://changex-backend.icydune-9110cd73.southeastasia.azurecontainerapps.io", // Set your API base URL
  withCredentials: true, // Include credentials in all requests
});

export default axiosInstance;
