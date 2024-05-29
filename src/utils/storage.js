// 本地存储框架
import { batchRefreshUserSummerInfo } from "@/api/user";

import { Message } from "element-ui";

const IM_USER_INFO_LIST_CACHE = "im_user_info_list_cache";

/**
 *  加载用户聚合信息
 *
 * @return {any}
 */
export async function getUserSummerListCache(uidList) {
  if (!uidList || uidList.length === 0) {
    return;
  }
  // 去重
  uidList = Array.from(new Set(uidList));
  // 去本地找信息
  let userSummerInfo = getItem();
  // 尝试刷新的列表
  let tryRefreshList = uidList.map((uid) => {
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
  return getCacheInfo(uidList);
}

/**
 *  获取本地指定uidList的缓存信息
 *
 * @param uidList
 */
function getCacheInfo(uidList) {
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
