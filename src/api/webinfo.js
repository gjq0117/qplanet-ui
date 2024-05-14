/**
 *  网站信息模块Api
 */

import request from "./index";

const WEB_INFO_BASEURL = "/webInfo";

export function getWebInfo() {
  return request({
    url: WEB_INFO_BASEURL + "/getWebInfo",
    method: "get",
  });
}

export function update(webInfo) {
  return request({
    url: WEB_INFO_BASEURL + "/updateOrSave",
    method: "put",
    headers: {
      isToken: true,
    },
    data: webInfo,
  });
}

export function getWebStatisticsInfo() {
  return request({
    url: WEB_INFO_BASEURL + "/getWebStatisticsInfo",
    method: "get",
  });
}
