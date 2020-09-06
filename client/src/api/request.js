import axios from 'axios';
import { SnackbarProgrammatic } from 'buefy';
import store from '@/store';
import { getToken, getIP } from '@/utils/auth';

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
    timeout: 300000 // request timeout
});

// request interceptor
service.interceptors.request.use(
    config => {
        config.headers['Network-Client-IP'] = getIP();

        const token = store.getters.token || getToken();

        if (token) {
            // 讓每個請求都帶 Bearer token, 使用 express-jwt 驗證資料
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        // Do something with request error
        console.error(error); // for debug
        Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xml-http-request 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        const { data } = response;
        if (data.StatusCode !== 0) {
            SnackbarProgrammatic.open({
                message: `${data.StatusCode}: ${data.StatusDescription}`,
                type: 'is-danger',
                queue: false
            });
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (
                data.StatusCode === 50008 ||
                data.StatusCode === 50012 ||
                data.StatusCode === 50014
            ) {
                //// Hide warning message went token Expired.
                // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or login again', 'Confirm logout', {
                //     confirmButtonText: 'Login',
                //     cancelButtonText: 'Cancel',
                //     type: 'warning'
                // }).then(() => {
                store.dispatch('app/userLogout').then(() => {
                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                });
                // });
            }

            if (typeof res === 'object') return Promise.reject(data);

            return Promise.reject('error');
        } else {
            return response;
        }
    },
    error => {
        SnackbarProgrammatic.open({
            message: `${error.message}`,
            type: 'is-danger',
            queue: false
        });
        return Promise.reject(error);
    }
);

export default service;
