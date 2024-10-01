
import axios from 'axios';
import { useEmployee } from '@/employee/stores';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090',
});

axiosInstance.interceptors.request.use(config => {
    const authStore = useEmployee();
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
});

export default axiosInstance;
