// 本地存储框架
import { batchRefreshUserSummerInfo } from "@/api/user";

import { Message } from "element-ui";

const IM_USER_INFO_LIST_CACHE = "im_user_info_list_cache";

/**
 *  过期时间（5分钟）
 *
 * @type {number}
 */
const EXPIRE_TIME = 5 * 60 * 1000;

/**
 *  批量加载用户聚合信息
 *
 * @return {any}
 */
export async function loadUserSummerListCache(uidList, needFlushTime = true) {
  if (!uidList || uidList.length === 0) {
    return;
  }
  // 去重
  uidList = Array.from(new Set(uidList));
  // 去本地找信息
  let userSummerInfo = getItem();
  // 判断是否都能在本地查找，计算差集将本地没找到的去后端查找
  let diff_set = validCacheList(uidList, userSummerInfo, needFlushTime);
  if (diff_set.length === 0) {
    // 都能在本地找到
    return getUserCacheList(uidList);
  }
  // 尝试刷新的列表
  let tryRefreshList = diff_set.map((uid) => {
    const cacheUser = userSummerInfo[uid];
    return {
      uid,
      lastRefreshTime: cacheUser?.lastUpdateTime,
    };
  });
  // 去后端批量查询
  await batchRefreshUserSummerInfo(tryRefreshList)
    .then((res) => {
      if (res.data.length > 0) {
        // 设置或更新本地缓存
        setOrUpdateItem(res.data);
      }
    })
    .catch((error) => {
      Message({
        type: "error",
        message: error.errMsg,
      });
    });
  return getUserCacheList(uidList);
}

/**
 *  单个加载用户信息
 *
 * @param uid
 * @return {*}
 */
export function loadUserSummerCache(uid) {
  const userSummerInfo = getItem();
  if (!userSummerInfo[uid]) {
    // 去后台重新加载
    batchRefreshUserSummerInfo([{ uid }])
      .then((res) => {
        // 设置或更新本地缓存
        setOrUpdateItem(res.data);
      })
      .catch((error) => {
        Message({
          type: "error",
          message: error.errMsg,
        });
      });
  }
  return getUserCacheList([uid]);
}

/**
 *  删除本地缓存
 *
 */
export function removeUserSummerCache() {
  localStorage.removeItem(IM_USER_INFO_LIST_CACHE);
}

/**
 *  校验缓存列表，返回差集
 *
 * @param uidList
 * @param userSummerInfo
 * @param needFlushTime
 */
export function validCacheList(uidList, userSummerInfo, needFlushTime) {
  let diff_set = [];
  for (let i = 0; i < uidList.length; i++) {
    let uid = uidList[i];
    let userSummer = userSummerInfo[uid];
    if (!userSummer) {
      // 本地找不到的
      diff_set.push(uid);
    } else {
      // 过期的
      if (needFlushTime && isExpire(userSummer.lastRefreshTime)) {
        diff_set.push(uid);
      }
    }
  }
  return diff_set;
}

/**
 *  判断时间戳与现在相比是否超过指定时间
 */
export function isExpire(time) {
  return Date.parse(new Date()) - time > EXPIRE_TIME;
}

/**
 *  获取本地指定uidList的缓存信息
 *
 * @param uidList
 */
export function getUserCacheList(uidList) {
  const userSummerInfo = getItem();
  return uidList.map((uid) => {
    return userSummerInfo[uid];
  });
}

/**
 *  设置或者更新本地缓存
 *
 * @param userInfo
 */
function setOrUpdateItem(userInfo) {
  let userCacheList = getItem();
  userInfo.forEach((user) => {
    user.lastRefreshTime = Date.parse(new Date());
    userCacheList[user.uid] = user;
  });
  userCacheList = Object.entries(userCacheList).filter(
    ([_, value]) => value !== null
  );
  localStorage.setItem(
    IM_USER_INFO_LIST_CACHE,
    JSON.stringify(Object.fromEntries(userCacheList))
  );
}

/**
 *  获取本地缓存
 *
 * @return {any|*[]}
 */
function getItem() {
  const result = JSON.parse(localStorage.getItem(IM_USER_INFO_LIST_CACHE));
  return result ? result : [];
}
