/**
 *  房间模块
 */
import request from "./index";

const LABEL_BASEURL = "/room";

export function getRoomOnlineNum(roomId) {
  return request({
    url: LABEL_BASEURL + "/getRoomOnlineNum/" + roomId,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
