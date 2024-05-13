/**
 *  访问信息模块
 */
import request from "./index";

const VISITOR_BASEURL = "/visitor";

export function saveWebVisitInfo() {
  return request({
    url: VISITOR_BASEURL + "/saveWebVisitInfo",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function getProvinceList() {
  return request({
    url: VISITOR_BASEURL + "/getProvinceList",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function getVisitorList(data) {
  return request({
    url: VISITOR_BASEURL + "/getVisitorList",
    method: "post",
    headers: {
      isToken: true,
    },
    data: data,
  });
}
