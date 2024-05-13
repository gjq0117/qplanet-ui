/**
 *  文章模块
 */
import request from "./index";

const ARTICLE_BASEURL = "/article";

export function saveArticle(article) {
  return request({
    url: ARTICLE_BASEURL + "/saveArticle",
    method: "post",
    headers: {
      isToken: true,
    },
    data: article,
  });
}

export function publishArticle(article) {
  return request({
    url: ARTICLE_BASEURL + "/publishArticle",
    method: "post",
    headers: {
      isToken: true,
    },
    data: article,
  });
}

export function getArticleList() {
  return request({
    url: ARTICLE_BASEURL + "/getArticleList",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function searchArticleList(searchReq) {
  return request({
    url: ARTICLE_BASEURL + "/searchArticleList",
    method: "post",
    headers: {
      isToken: true,
    },
    data: searchReq,
  });
}

export function changeArticleStatus(articleId, status, type) {
  return request({
    url: ARTICLE_BASEURL + "/changeStatus",
    method: "put",
    headers: {
      isToken: true,
    },
    data: { articleId, status, type },
  });
}

export function removeShelves(articleId) {
  return request({
    url: ARTICLE_BASEURL + "/removeShelves/" + articleId,
    method: "put",
    headers: {
      isToken: true,
    },
  });
}

export function getEditArticleById(articleId) {
  return request({
    url: ARTICLE_BASEURL + "/getEditArticleById/" + articleId,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function recommendArticleList() {
  return request({
    url: ARTICLE_BASEURL + "/recommendArticleList",
    method: "get",
  });
}

export function getArticleById(articleId) {
  return request({
    url: ARTICLE_BASEURL + "/getArticleById/" + articleId,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
