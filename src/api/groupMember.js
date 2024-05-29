/**
 *  群成员模块
 */
import request from "./index";

const GROUP_MEMBER_BASEURL = "/groupMember";

export function getGroupMemberPage(params) {
  return request({
    url: GROUP_MEMBER_BASEURL + "/getGroupMemberPage",
    method: "get",
    headers: {
      isToken: true,
    },
    params: params,
  });
}
