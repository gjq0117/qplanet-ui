/**
 *  会话模块
 */
import request from "./index";

const CONTACT_BASEURL = "/contact";

export function getContactListPage() {
  return request({
    url: CONTACT_BASEURL + "/getContactListPage",
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
