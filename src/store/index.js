import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 导入模块
import system from "./system";
import user from "./user";

export default new Vuex.Store({
  modules: { system, user },
});
