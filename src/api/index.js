// axios二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { getToken, removeToken } from "@/utils/tokenUtil";
import { Message } from "element-ui";
import router from "@/router";

const requests = axios.create({
  //发请求的时候，路径当中会出现api
  baseURL: "/api",
  // TODO  开发阶段注释
  // timeout: 5000,
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
      Message.error({
        type: "error",
        message: data.errMsg,
      });
    }
    return data;
  },
  (error) => {
    if (error.response.data.errCode === 401) {
      // 清空cookie
      removeToken();
      router.push({
        path: "/adminLogin",
        query: {
          redirect: "/welcome",
        },
      });
    }
    // 失败的回调函数
    return Promise.reject(error.response.data);
  }
);
//对外暴露
export default requests;
