import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('Refresh-Token');
    if (token) {
        config.headers.Authorization = token;
    } else if (token == null && !config.data.url.includes('/member')) {
        alert('토큰이 만료되었습니다.');
        window.location.href = '/member/login';
        return config;
    }
    if (refreshToken) {
        config.headers['Refresh-Token'] = refreshToken;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const errorCode = error.response.status;
        if (errorCode === 403) {
            alert('토큰이 만료되었습니다.');
            localStorage.clear();
            window.location.href = '/member/login';
            return;
        }
    },
);

export default axiosInstance;
