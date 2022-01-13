import axios from 'axios';
import NProgress from '../utils/nprogress';
import { ElMessage as message } from 'element-plus';
import router from '../router';

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8089/api' : 'http://' + window.location.host + '/api',
    timeout: 5000,
});

export const storekey = 'access-token';
service.defaults.headers.common[storekey] = localStorage.getItem(storekey);
service.defaults.withCredentials = true;

service.interceptors.request.use(
    (config) => {
        NProgress.start();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        NProgress.done();
        return response.data.data;
    },
    (error) => {
        NProgress.done();

        if (error.response.status === 401) {
            router.push('/404');
        } else {
            switch (error.response.data.code) {
                case 400:
                case 500:
                    message.error(error.response.data.message);
                    break;
                default:
                    message.error(error.message);
            }
        }

        return Promise.reject(error);
    }
);

export default service;
