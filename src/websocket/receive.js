// ======================== 接收类型
import Vue from "vue";

//1、登录成功通知
const LOGIN_SUCCESS = 1;
//2、token验证失败
const TOKEN_VALID_FAIL = 2;
//3、上下线通知
const ONLINE_OFFLINE_NOTIFY = 3;
//4、新消息通知
const NEW_MESSAGE = 4;

/**
 *  接收新消息
 */
export function receiveNewMsg(msg) {
  switch (msg.type) {
    case LOGIN_SUCCESS:
      break;
    case TOKEN_VALID_FAIL:
      break;
    case ONLINE_OFFLINE_NOTIFY:
      break;
    case NEW_MESSAGE:
      // 发布新消息
      Vue.prototype.$EventBus.$emit("newMsg", msg.data.msgBody);
      break;
  }
}
