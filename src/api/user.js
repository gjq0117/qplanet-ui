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

export async function logout() {
  return await request({
    method: "post",
    url: USER_BASEURL + "/logout",
    headers: {
      isToken: true,
    },
  });
}

export function getRegisterCode(data) {
  return request({
    url: USER_BASEURL + "/getRegisterCode",
    method: "post",
    data: data,
  });
}

export function register(data) {
  return request({
    url: USER_BASEURL + "/register",
    method: "post",
    data: data,
  });
}

export function userLogin(data) {
  return request({
    url: USER_BASEURL + "/userLogin",
    method: "post",
    data: data,
  });
}

export function getUserInfo() {
  return request({
    url: USER_BASEURL + "/getUserInfo",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function getModifyPwdCode(data) {
  return request({
    url: USER_BASEURL + "/getModifyPwdCode",
    method: "post",
    data: data,
  });
}

export function modifyPwd(data) {
  return request({
    url: USER_BASEURL + "/modifyPwd",
    method: "put",
    data: data,
  });
}

export function modifyUserInfo(data) {
  return request({
    url: USER_BASEURL + "/modifyUserInfo",
    method: "put",
    data: data,
    headers: {
      isToken: true,
    },
  });
}

export function getUserList(data) {
  return request({
    url: USER_BASEURL + "/getUserList",
    method: "post",
    headers: {
      isToken: true,
    },
    data: data,
  });
}

export function changeUserStatus(uid, status) {
  return request({
    url: USER_BASEURL + "/changeUserStatus",
    method: "put",
    headers: {
      isToken: true,
    },
    params: { uid, status },
  });
}

export function logoutByUid(uid) {
  return request({
    url: USER_BASEURL + "/logoutByUid/" + uid,
    method: "put",
    headers: {
      isToken: true,
    },
  });
}

export function batchRefreshUserSummerInfo(reqList) {
  return request({
    url: USER_BASEURL + "/batchRefreshUserSummerInfo",
    method: "post",
    headers: {
      isToken: true,
    },
    data: { reqList },
  });
}
