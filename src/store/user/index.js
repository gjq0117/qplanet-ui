import Cookies from "js-cookie";

const USER_INFO = "USER_INFO";
const EXPIRES_DAYS = 7;

const user = {
  namespaced: true,
  state: {
    currentUser: Cookies.get(USER_INFO)
      ? JSON.parse(Cookies.get(USER_INFO))
      : {},
  },
  mutations: {
    SET_CURRENT_USER(state, userInfo) {
      state.currentUser = userInfo;
      Cookies.set(USER_INFO, JSON.stringify(userInfo), {
        expires: EXPIRES_DAYS,
      });
    },
    REMOVE_CURRENT_USER(state) {
      state.currentUser = {};
      Cookies.remove(USER_INFO);
    },
  },
  actions: {},
  getter: {},
};

export default user;
