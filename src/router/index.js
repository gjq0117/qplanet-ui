import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { getToken } from "@/utils/tokenUtil";
import common from "@/utils/common";
import store from "@/store";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 聊天室
    if (to.path.startsWith("/im")) {
      if (
        common.isEmpty(getToken()) ||
        common.isEmpty(store.state.user.currentUser)
      ) {
        // 去登陆
        next({
          path: "/login",
          query: {
            redirect: to.path,
          },
        });
      } else {
        if (to.path === "/im") {
          store.commit("chat/SET_IM_CURR_OPTION", 0);
        }
        next();
      }
    } else {
      // 管理员规则
      if (
        common.isEmpty(getToken()) ||
        !common.isAdmin(store.state.user.currentUser.userType)
      ) {
        // 没有token或者没有管理员权限  跳转登录界面
        next({
          path: "/adminLogin",
          query: {
            redirect: to.fullPath,
          },
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
export default router;
