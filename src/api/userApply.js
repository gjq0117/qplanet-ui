/**
 *  用户申请Api
 */
import request from "./index";

const USER_APPLY_BASEURL = "/userApply";

export function friendApply(applyReq) {
  return request({
    url: USER_APPLY_BASEURL + "/friendApply",
    method: "post",
    headers: {
      isToken: true,
    },
    data: applyReq,
  });
}

export function getFriendApplyList(pageReq) {
  return request({
    url: USER_APPLY_BASEURL + "/getFriendApplyPage",
    method: "post",
    headers: {
      isToken: true,
    },
    data: pageReq,
  });
}

export function agreeFriendApply(targetId) {
  return request({
    url: USER_APPLY_BASEURL + "/agreeFriendApply/" + targetId,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function rejectFriendApply(targetId) {
  return request({
    url: USER_APPLY_BASEURL + "/rejectFriendApply/" + targetId,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
