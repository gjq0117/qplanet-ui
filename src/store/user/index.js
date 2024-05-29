const USER_INFO = "USER_INFO";

const user = {
  namespaced: true,
  state: {
    currentUser: localStorage.getItem(USER_INFO)
      ? JSON.parse(localStorage.getItem(USER_INFO))
      : {},
  },
  mutations: {
    SET_CURRENT_USER(state, userInfo) {
      state.currentUser = userInfo;
      localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
    },
    REMOVE_CURRENT_USER(state) {
      state.currentUser = {};
      localStorage.removeItem(USER_INFO);
    },
  },
  actions: {},
  getter: {},
};

export default user;
