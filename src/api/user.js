/**
 *  用户模块Api
 */
import request from "./index";

const USER_BASEURL = "/user";

export function adminLogin(data) {
  return request({
    method: "post",
    url: USER_BASEURL + "/adminLogin",
    data: data,
  });
}

export function logout() {
  return request({
    method: "post",
    url: USER_BASEURL + "/logout",
    headers: {
      isToken: true,
    },
  });
}
