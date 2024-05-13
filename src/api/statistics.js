/**
 *  统计模块
 */
import request from "./index";

const STATISTICS_BASEURL = "/statistics";

export function getKeyBroadData() {
  return request({
    url: STATISTICS_BASEURL + "/getKeyBroadData",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function sevenDayVisitCount() {
  return request({
    url: STATISTICS_BASEURL + "/sevenDayVisitCount",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function getGenderRate() {
  return request({
    url: STATISTICS_BASEURL + "/getGenderRate",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
