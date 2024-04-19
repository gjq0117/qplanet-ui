const routes = [
  {
    path: "/",
    component: () => import("../views/home.vue"),
    children: [
      {
        path: "/",
        name: "index",
        component: () => import("../views/index.vue"),
      },
      {
        path: "/sort/:sortId",
        name: "sort",
        component: () => import("../views/sort.vue"),
      },
      {
        path: "/article/:articleId",
        name: "article",
        component: () => import("../components/article/index.vue"),
      },
    ],
  },
  {
    path: "/admin",
    redirect: "/welcome",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/admin/views/index.vue"),
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("@/admin/views/welcome.vue"),
        meta: {
          title: "欢迎",
        },
      },
      {
        path: "/webInfo",
        name: "webInfo",
        component: () => import("@/admin/views/webInfo.vue"),
        meta: {
          title: "网站管理",
          icon: "el-icon-monitor",
        },
      },
    ],
  },
  {
    path: "/adminLogin",
    name: "adminLogin",
    component: () => import("@/admin/views/login.vue"),
  },
];

export default routes;
