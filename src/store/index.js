import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 导入模块
import system from "./system";

export default new Vuex.Store({
  modules: { system },
});
