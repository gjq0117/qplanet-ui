/**
 *  机器人模块
 */
import request from "./index";

const ROBOT_BASEURL = "/robot";

export function getRobotList() {
  return request({
    url: ROBOT_BASEURL + "/getRobotList",
    method: "post",
    headers: {
      isToken: true,
    },
  });
}

export function update(data) {
  return request({
    url: ROBOT_BASEURL + "/update",
    method: "post",
    headers: {
      isToken: true,
    },
    data: data,
  });
}

export function deleteById(robotId) {
  return request({
    url: ROBOT_BASEURL + "/delete/" + robotId,
    method: "delete",
    headers: {
      isToken: true,
    },
  });
}

export function add(data) {
  return request({
    url: ROBOT_BASEURL + "/add",
    method: "post",
    headers: {
      isToken: true,
    },
    data: data,
  });
}
