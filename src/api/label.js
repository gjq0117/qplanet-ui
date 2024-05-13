/**
 *  标签模块
 */
import request from "./index";

const LABEL_BASEURL = "/label";

export function insertOne(labelInfo) {
  return request({
    url: LABEL_BASEURL + "/insertOne",
    method: "post",
    headers: {
      isToken: true,
    },
    data: labelInfo,
  });
}

export function getLabelList() {
  return request({
    url: LABEL_BASEURL + "/list",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function update(labelInfo) {
  return request({
    url: LABEL_BASEURL + "/update",
    method: "PUT",
    headers: {
      isToken: true,
    },
    data: labelInfo,
  });
}

export function deleteById(labelId) {
  return request({
    url: LABEL_BASEURL + "/deleteById/" + labelId,
    method: "delete",
    headers: {
      isToken: true,
    },
  });
}

export function searchByKey(searchKey) {
  return request({
    url: LABEL_BASEURL + "/searchByKey",
    method: "get",
    headers: {
      isToken: true,
    },
    params: { searchKey },
  });
}

export function getById(labelId) {
  return request({
    url: LABEL_BASEURL + "/getById/" + labelId,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function getListBySortId(sortId) {
  return request({
    url: LABEL_BASEURL + "/getListBySortId/" + sortId,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
