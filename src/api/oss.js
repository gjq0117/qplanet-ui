/**
 *  oss模块
 */

import request from "./index";

/**
 *  获取文件上传链接等信息（put方式）
 *
 * @param fileName
 * @param scene
 * @returns {*}
 */
export function getUploadPutUrl(fileName, scene) {
  return request({
    url: "/oss/getUploadPutUrl",
    method: "post",
    headers: {
      isToken: true,
    },
    data: { fileName, scene },
  });
}

export async function uploadFileByPut(file, url) {
  console.log(file);
  return request({
    url: url,
    method: "put",
    headers: {
      "Content-Type": file.type ? file.type : "application/octet-stream",
    },
    data: file,
  });
}
