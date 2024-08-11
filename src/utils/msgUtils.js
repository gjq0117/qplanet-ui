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
   *  构建图片消息请求实体
   *
   * @param roomId 房间号
   * @param url 图片url
   * @param width 图片宽度
   * @param height 高度
   * @param size 大小
   * @return {{msgType: number, body: {size, width, url, height}, roomId}}
   */
  buildImgMsgReqBody(roomId, url, width, height, size) {
    return {
      roomId,
      msgType: this.IMG_MSG,
      body: {
        url,
        width,
        height,
        size,
      },
    };
  },

  /**
   *  构建文件消息请求实体
   *
   * @param roomId 房间号
   * @param url 文件地址
   * @param fileName 文件名
   * @param size 文件大小
   * @return {{msgType: number, body: {fileName, size, url}, roomId}}
   */
  buildFileMsgReqBody(roomId, url, fileName, size) {
    return {
      roomId,
      msgType: this.FILE_MSG,
      body: {
        url,
        fileName,
        size,
      },
    };
  },

  buildImgEmojiMsgReqBody(roomId, url) {
    return {
      roomId,
      msgType: this.EMOJI_MSG,
      body: {
        url,
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
      case this.IMG_MSG:
        body = this.buildImgMsgRespBody(msgBody);
        break;
      case this.FILE_MSG:
        body = this.buildFileMsgRespBody(msgBody);
        break;
      case this.EMOJI_MSG:
        body = this.buildImgEmojiMsgRespBody(msgBody);
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

  /**
   *  构建图片消息
   *
   * @param msgBody
   */
  buildImgMsgRespBody(msgBody) {
    return msgBody;
  },

  /**
   * 构建文件消息响应实体
   *
   * @param msgBody
   * @return {*}
   */
  buildFileMsgRespBody(msgBody) {
    return msgBody;
  },

  buildImgEmojiMsgRespBody(msgBody) {
    return msgBody;
  },
};
