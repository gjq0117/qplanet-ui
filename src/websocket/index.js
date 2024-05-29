import { getToken } from "@/utils/tokenUtil";
import { sendHeartBeat } from "./send";

let CURRENT_SOCKET = null;

/**
 *  连接websocket
 */
export function openWebSocket() {
  const token = getToken();
  // 连接
  CURRENT_SOCKET = new WebSocket("ws://127.0.0.1:8010?token=" + token);

  // 连接事件
  CURRENT_SOCKET.onopen = (event) => {
    // 开始心跳
    heartBeat.start();
    console.log("websocket连接上了..." + event);
  };

  // 收到服务器响应事件
  CURRENT_SOCKET.onmessage = (event) => {
    console.log("收到服务器响应" + event.data);
  };

  CURRENT_SOCKET.onclose = (event) => {
    console.log("websocket关闭了..." + event);
  };

  // 监听窗口关闭事件
  window.onbeforeunload = () => {
    CURRENT_SOCKET.close();
    CURRENT_SOCKET = null;
  };
}

/**
 *  获取当前连接
 *
 * @return {null}
 */
export function getCurrentSocket() {
  return CURRENT_SOCKET;
}

/**
 *  心跳检查机制
 * @type {{checkTime: number, start: heartBeat.start}}
 */
let heartBeat = {
  // 心跳间隔（秒）
  checkTime: 10000,

  start: function () {
    let self = this;
    setInterval(function () {
      // 发送心跳
      sendHeartBeat(getCurrentSocket());
    }, self.checkTime);
  },
};
