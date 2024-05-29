import CryptoJS from "crypto-js";
import constant from "@/utils/constant";

import { getUploadPutUrl, uploadFileByPut } from "@/api/oss";

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

  /**
   *  判断是否有管理员权限
   *
   * @param userType
   * @return flag
   */
  isAdmin(userType) {
    return (
      !this.isEmpty(userType) &&
      (userType === constant.userType.SUPER_ADMIN ||
        userType === constant.userType.ADMIN)
    );
  },

  /**
   *  上传文件
   *
   * @param file 文件
   * @param scene 场景
   * @return url 访问的url
   */
  async uploadFile(file, scene) {
    // 获取上传链接和访问地址
    const res = await getUploadPutUrl(file.name, scene);
    await uploadFileByPut(file, res.data.uploadUrl);
    return res.data.downloadUrl;
  },

  /**
   *  图片展示
   * @param select
   */
  imgShow(select) {
    $(select).click(function () {
      let src = $(this).attr("src");
      $("#bigImg").attr("src", src);
      /** 获取当前点击图片的真实大小，并显示弹出层及大图 */
      $("<img/>")
        .attr("src", src)
        .load(function () {
          let windowW = $(window).width(); //获取当前窗口宽度
          let windowH = $(window).height(); //获取当前窗口高度
          let realWidth = this.width; //获取图片真实宽度
          let realHeight = this.height; //获取图片真实高度
          let imgWidth, imgHeight;
          let scale = 0.8; //缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

          if (realHeight > windowH * scale) {
            //判断图片高度
            imgHeight = windowH * scale; //如大于窗口高度，图片高度进行缩放
            imgWidth = (imgHeight / realHeight) * realWidth; //等比例缩放宽度
            if (imgWidth > windowW * scale) {
              //如宽度仍大于窗口宽度
              imgWidth = windowW * scale; //再对宽度进行缩放
            }
          } else if (realWidth > windowW * scale) {
            //如图片高度合适，判断图片宽度
            imgWidth = windowW * scale; //如大于窗口宽度，图片宽度进行缩放
            imgHeight = (imgWidth / realWidth) * realHeight; //等比例缩放高度
          } else {
            //如果图片真实高度和宽度都符合要求，高宽不变
            imgWidth = realWidth;
            imgHeight = realHeight;
          }
          $("#bigImg").css("width", imgWidth); //以最终的宽度对图片缩放

          let w = (windowW - imgWidth) / 2; //计算图片与窗口左边距
          let h = (windowH - imgHeight) / 2; //计算图片与窗口上边距
          $("#innerImg").css({ top: h, left: w }); //设置top和left属性
          $("#outerImg").fadeIn("fast"); //淡入显示
        });
      $("#outerImg").click(function () {
        //再次点击淡出消失弹出层
        $(this).fadeOut("fast");
      });
    });
  },

  /**
   *  列表复制
   *
   * @param resultList
   * @param copyList 复制的列表
   */
  assignForList(resultList, copyList) {
    resultList.forEach((result) => {
      for (let i = 0; i < copyList.length; i++) {
        if (result.uid === copyList[i].uid) {
          Object.assign(result, copyList[i]);
          break;
        }
      }
    });
  },
};
