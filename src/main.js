import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import common from "./utils/common";
import constant from "./utils/constant";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入css
import "./assets/css/animation.css";
import "./assets/css/index.css";
import "./assets/css/tocbot.css";
import "./assets/css/color.css";
import "./assets/css/markdown-highlight.css";
import "./assets/css/font-awesome.min.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$common = common;
Vue.prototype.$constant = constant;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
