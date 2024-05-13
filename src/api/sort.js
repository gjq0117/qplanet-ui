/**
 *  分类模块
 */
import request from "./index";

const SORT_BASEURL = "/sort";

export function insertOne(data) {
  return request({
    url: SORT_BASEURL + "/insertOne",
    method: "post",
    headers: {
      isToken: true,
    },
    data: data,
  });
}

export function list() {
  return request({
    url: SORT_BASEURL + "/list",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function deleteById(sortId) {
  return request({
    url: SORT_BASEURL + "/deleteById/" + sortId,
    method: "delete",
    headers: {
      isToken: true,
    },
  });
}

export function update(data) {
  return request({
    url: SORT_BASEURL + "/update",
    method: "put",
    headers: {
      isToken: true,
    },
    data: data,
  });
}

export function searchByKey(searchKey) {
  return request({
    url: SORT_BASEURL + "/searchByKey",
    method: "get",
    headers: {
      isToken: true,
    },
    params: { searchKey },
  });
}

export function getSortAndNewArticle() {
  return request({
    url: SORT_BASEURL + "/getSortAndNewArticle",
    method: "get",
  });
}

export function getSortPageResp(sortId, labelId) {
  return request({
    url: SORT_BASEURL + "/getSortPageResp",
    method: "get",
    params: { sortId, labelId },
  });
}
