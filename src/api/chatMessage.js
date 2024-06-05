/**
 *  聊天模块
 */
import request from "./index";

const CHAT_BASEURL = "/chat/message";

export function pageMsg(pageReq) {
  return request({
    url: CHAT_BASEURL + "/pageMsg",
    method: "post",
    headers: {
      isToken: true,
    },
    data: pageReq,
  });
}

export function sendMsg(req) {
  return request({
    url: CHAT_BASEURL + "/sendMsg",
    method: "post",
    headers: {
      isToken: true,
    },
    data: req,
  });
}
