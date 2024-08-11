/**
 *  用户背包
 */
import request from "./index";

const USER_BACKPACK = "/userBackpack";

export function getImgEmojiPageByUid(pageReq) {
  return request({
    url: USER_BACKPACK + "/getImgEmojiPageByUid",
    method: "post",
    headers: {
      isToken: true,
    },
    data: pageReq,
  });
}

export function addImgEmoji(imgUrl) {
  return request({
    url: USER_BACKPACK + "/addImgEmoji",
    method: "post",
    headers: {
      isToken: true,
    },
    params: { imgUrl },
  });
}
