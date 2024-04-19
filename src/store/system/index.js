const system = {
  namespaced: true,
  state: {
    toolbar: {
      visible: true,
      enter: false,
    },
    // 网站信息
    webInfo: {
      webName: "",
      authorName: "",
      avatar: "",
      backgroundImage: "",
      mottoList: [
        {
          value: "",
        },
      ],
      noticeList: [
        {
          value: "",
        },
      ],
      footerList: [
        {
          value: "",
        },
      ],
    },
  },
  mutations: {
    CHANGE_TOOLBAR_STATUS(state, toolbarState) {
      state.toolbar = toolbarState;
      localStorage.setItem("toolbar", JSON.stringify(toolbarState));
    },
    SET_WEB_INFO(state, webInfo) {
      state.webInfo = webInfo;
    },
    REMOVE_WEB_INFO(state) {
      state.webInfo = {
        webName: "",
        authorName: "",
        avatar: "",
        backgroundImage: "",
        mottoList: [
          {
            value: "",
          },
        ],
        noticeList: [
          {
            value: "",
          },
        ],
        footerList: [
          {
            value: "",
          },
        ],
      };
    },
  },
  actions: {},
  getter: {},
};

export default system;
