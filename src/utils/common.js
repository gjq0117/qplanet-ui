import CryptoJS from "crypto-js";
import constant from "@/utils/constant";

export default {
  /**
   * 判断是否为空
   */
  isEmpty(value) {
    if (
      typeof value === "undefined" ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.prototype.isPrototypeOf(value) && value.length === 0) ||
      (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)
    ) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 加密
   */
  encrypt(plaintText) {
    let options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    };
    let key = CryptoJS.enc.Utf8.parse(constant.AES_KEY);
    let encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
    return encryptedData.toString().replace(/\//g, "_").replace(/\+/g, "-");
  },

  /**
   * 解密
   */
  decrypt(encryptedBase64Str) {
    let val = encryptedBase64Str.replace(/\-/g, "+").replace(/_/g, "/");
    let options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    };
    let key = CryptoJS.enc.Utf8.parse(constant.AES_KEY);
    let decryptedData = CryptoJS.AES.decrypt(val, key, options);
    return CryptoJS.enc.Utf8.stringify(decryptedData);
  },

  /**
   *  格式化列表成字符串
   *
   * @param list
   * @param rule 规则
   * @returns {string}
   */
  formatListToStr(list, rule) {
    let result = "";
    for (let i = 0; i < list.length; i++) {
      let data = list[i];
      if (this.isEmpty(data.vaule)) {
        result += data.value;
        if (i < list.length - 1) {
          result += rule;
        }
      }
    }
    return result;
  },
};
