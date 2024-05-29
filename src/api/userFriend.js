/**
 *  好友模块
 */
import request from "./index";

const USER_FRIEND_BASEURL = "/userFriend";

export function isFriend(uid) {
  return request({
    url: USER_FRIEND_BASEURL + "/isFriend/" + uid,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function pageFriendInfo(pageReq) {
  return request({
    url: USER_FRIEND_BASEURL + "/pageFriendInfo",
    method: "post",
    headers: {
      isToken: true,
    },
    data: pageReq,
  });
}

export function pageCareFriendInfo(pageReq) {
  return request({
    url: USER_FRIEND_BASEURL + "/pageCareFriendInfo",
    method: "post",
    headers: {
      isToken: true,
    },
    data: pageReq,
  });
}

export function getFriendDetailed(friendUid) {
  return request({
    url: USER_FRIEND_BASEURL + "/getFriendDetailed/" + friendUid,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function putFriendRemark(req) {
  return request({
    url: USER_FRIEND_BASEURL + "/putFriendRemark",
    method: "put",
    headers: {
      isToken: true,
    },
    data: req,
  });
}

export function putFriendToCare(friendId) {
  return request({
    url: USER_FRIEND_BASEURL + "/putFriendToCare/" + friendId,
    method: "put",
    headers: {
      isToken: true,
    },
  });
}

export function cancelFriendCare(friendId) {
  return request({
    url: USER_FRIEND_BASEURL + "/cancelFriendCare/" + friendId,
    method: "put",
    headers: {
      isToken: true,
    },
  });
}

export function deleteFriend(friendId) {
  return request({
    url: USER_FRIEND_BASEURL + "/deleteFriend/" + friendId,
    method: "delete",
    headers: {
      isToken: true,
    },
  });
}
