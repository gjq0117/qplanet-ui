import Cookies from "js-cookie";

const TOKEN_KEY = "PLANET-TOKEN";
const EXPIRES_DAYS = 1;

/**
 *  获取token
 *
 * @returns {*}
 */
export function getToken() {
  let token = Cookies.get(TOKEN_KEY);
  if (token) {
    return token;
  }
}

/**
 *  设置Token 并设置有效期为
 * @param token
 * @returns {*}
 */
export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token, { expires: EXPIRES_DAYS });
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}
