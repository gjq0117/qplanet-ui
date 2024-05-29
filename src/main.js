import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import common from "./utils/common";
import constant from "./utils/constant";
import mavonEditor from "mavon-editor";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入自定义css
import "./assets/css/animation.css";
import "./assets/css/index.css";
import "./assets/css/tocbot.css";
import "./assets/css/color.css";
import "./assets/css/markdown-highlight.css";
import "./assets/css/font-awesome.min.css";
// 第三方css
import "mavon-editor/dist/css/index.css";
// echarts
import * as echarts from "echarts";

// 禁止右击
document.oncontextmenu = new Function("event.returnValue=false");
document.addEventListener("keydown", function (e) {
  // 如果按下键F12,阻止事件
  if (e.key == "F12") {
    e.preventDefault();
  }
});

Vue.prototype.$echarts = echarts;
Vue.prototype.$EventBus = new Vue();

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(mavonEditor);

Vue.prototype.$common = common;
Vue.prototype.$constant = constant;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
