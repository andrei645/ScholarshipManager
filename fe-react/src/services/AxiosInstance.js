import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8085",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('auth_code');
        if(token)
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
