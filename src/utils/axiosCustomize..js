import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";
import { doLogout, updateAccessToken } from "../redux/action/userAction";

const instance = axios.create({
  baseURL: 'http://localhost:8081/',
});

NProgress.configure({
  showSpinner: false,
  // easing: 'ease',
  // speed: 500,
  trickleSpeed: 100});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const access_token = store.getState()?.user?.account?.access_token;
  config.headers["Authorization"] = `Bearer ${access_token}`;
  // Do something before request is sent
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
let isRefreshing = false;
let refreshSubscribers = [];
// Function to add subscribers to pending requests
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Notify all subscribers when refresh token is done
const onRrefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Add a response interceptor
instance.interceptors.response.use(async function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  NProgress.done();

  return response && response.data ? response.data : response;
}, async function (error) {
  NProgress.done();
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const originalRequest = error.config;
  const response = error.response;
  //Token expired
  if (response && response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    // Nếu token đang được làm mới
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(instance(originalRequest));
        });
      });
    }

    // Bắt đầu làm mới token
    isRefreshing = true;

    try {
      const refresh_token = store.getState()?.user?.account?.refresh_token;
      const email = store.getState()?.user?.account?.email;

      const res = await instance.post('/api/v1/refresh-token', { refresh_token, email });
      console.log(res);
      if (res && res.EC === 0) {
        const newAccessToken = res.DT.access_token;
        const newRefreshToken = res.DT.refresh_token;

        // Cập nhật token trong Redux Store
        store.dispatch(updateAccessToken(newAccessToken, newRefreshToken));

        // Gọi lại các yêu cầu đang chờ
        onRrefreshed(newAccessToken);

        isRefreshing = false;

        // Gửi lại yêu cầu gốc với token mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } else {
        // Đăng xuất nếu không thể làm mới token
        store.dispatch(doLogout());
        isRefreshing = false;
        return Promise.reject(res);
      }
    } catch (refreshError) {
      // Xử lý lỗi làm mới token
      store.dispatch(doLogout());
      isRefreshing = false;
      return Promise.reject(refreshError);
    }
  }
  console.log(error);
  return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;

