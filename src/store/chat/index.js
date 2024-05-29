const chat = {
  namespaced: true,
  state: {
    // 聊天室默认操作按钮
    imCurrOption: localStorage.getItem("curr_menu")
      ? Number(localStorage.getItem("curr_menu"))
      : 0,
    curr_session: 0,
  },
  mutations: {
    SET_CURR_SESSION(state, curr) {
      state.curr_session = curr;
    },
    SET_IM_CURR_OPTION(state, curr) {
      state.imCurrOption = curr;
      localStorage.setItem("curr_menu", curr);
    },
  },
  actions: {},
  getter: {},
};

export default chat;
