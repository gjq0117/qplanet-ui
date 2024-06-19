/**
 *  会话模块
 */
import request from "./index";

const CONTACT_BASEURL = "/contact";

export function getContactListPage(pageReq) {
  return request({
    url: CONTACT_BASEURL + "/getContactListPage",
    method: "post",
    headers: {
      isToken: true,
    },
    data: pageReq,
  });
}

export function getContactResp(roomId) {
  return request({
    url: CONTACT_BASEURL + "/getContactResp/" + roomId,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
