import { loadUserSummerCache } from "./storage";

export default {
  // 消息类型
  TEXT_MSG: 1,
  RECALL_MSG: 2,
  EMOJI_MSG: 3,
  IMG_MSG: 4,
  FILE_MSG: 5,
  SOUND_MSG: 6,
  VIDEO_MSG: 7,

  /**
   *  构建文本消息请求体
   *
   * @param roomId 房间号
   * @param content 消息内容
   * @param replyMsgId 回复消息的ID
   * @param atUidList at列表
   */
  buildTextMsgReqBody(roomId, content, replyMsgId, atUidList) {
    return {
      roomId,
      msgType: this.TEXT_MSG,
      body: {
        content,
        replyMsgId,
        atUidList,
      },
    };
  },

  /**
   *  构建消息响应体
   *
   * @param msgBody
   * @param type
   */
  buildMsgRespBody(msgBody, type) {
    let body = null;
    switch (type) {
      case this.TEXT_MSG:
        body = this.buildTextMsgRespBody(msgBody);
        break;
    }
    return body;
  },

  /**
   *  构建文本消息响应体
   *
   * @param msgBody
   */
  buildTextMsgRespBody(msgBody) {
    let body = null;
    if (msgBody.reply) {
      // 有回复消息,构建回复体用户信息
      let userInfo = loadUserSummerCache(msgBody.reply.uid);
      body = msgBody.reply.body;
      Object.assign(body, userInfo);
      msgBody.reply.body = body;
    }

    return msgBody;
  },
};
