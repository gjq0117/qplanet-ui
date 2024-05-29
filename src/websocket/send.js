import { getToken } from "@/utils/tokenUtil";
// ========================= 与后端的传输协议
let req = {
  type: null,
  data: "",
};
// ======================== 传输类型
// 1、心跳包
const HEARTBEAT = 1;
// 2、认证请求
const AUTHORIZE = 2;

/**
 * 发送心跳包
 */
export function sendHeartBeat(socket) {
  req = {
    type: HEARTBEAT,
    data: "",
  };
  socket.send(JSON.stringify(req));
}

/**
 *  发送认证请求
 *
 * @param socket
 */
export function sendAuthorize(socket) {
  req = {
    type: AUTHORIZE,
    data: getToken(),
  };
}
