import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

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

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  NProgress.done();
  return response && response.data ? response.data : response;
}, function (error) {
  NProgress.done();
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log(error);
  return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;

