import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('Authorization');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

axiosInstance.interceptors.response.use(async (response) => {
    return response;
});

export default axiosInstance;
