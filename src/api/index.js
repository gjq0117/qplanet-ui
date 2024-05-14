// axios二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { getToken, removeToken } from "@/utils/tokenUtil";
import router from "@/router";
import store from "@/store";
import { Message } from "element-ui";

const requests = axios.create({
  //发请求的时候，路径当中会出现api
  baseURL: process.env.VUE_APP_API_URL,
  // TODO  开发阶段注释
  timeout: 5000,
});

//请求拦截器
requests.interceptors.request.use((config) => {
  // 进度条开始动
  nprogress.start();
  // 是否需要设置token
  const isToken = (config.headers || {}).isToken;
  const token = getToken();
  if (token && isToken) {
    // 携带token
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数
    // 进度条结束
    nprogress.done();
    let data = res.data;
    // 业务异常
    if (data !== "" && !data.success) {
      Message({
        type: "error",
        message: data.errMsg,
      });
      if (data.errCode === 401) {
        // 认证异常
        removeToken();
        store.commit("user/REMOVE_CURRENT_USER");
        router.push({
          path: "/",
        });
      }
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    // 失败的回调函数
    return Promise.reject(error.response.data);
  }
);
//对外暴露
export default requests;
