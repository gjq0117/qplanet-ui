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
        path: "/sort",
        name: "sort",
        component: () => import("../views/sort.vue"),
      },
      {
        path: "/article/:articleId",
        name: "article",
        component: () => import("../components/article/index.vue"),
      },

      {
        path: "/userInfo",
        name: "userInfo",
        component: () => import("../views/userInfo.vue"),
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
        path: "/statistics",
        name: "statistics",
        component: () => import("@/admin/views/charts/index.vue"),
        meta: {
          title: "统计",
          icon: "el-icon-pie-chart",
        },
      },
      {
        path: "/visitorManager",
        name: "visitorManager",
        component: () => import("@/admin/views/visitorManager.vue"),
        meta: {
          title: "网站访问管理",
          icon: "el-icon-location-information",
        },
      },
      {
        path: "/writeArticle",
        name: "writeArticle",
        component: () => import("@/admin/views/writeArticle.vue"),
        meta: {
          title: "写文章",
          icon: "el-icon-edit-outline",
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
      {
        path: "/articleManage",
        name: "articleManage",
        component: () => import("@/admin/views/articleManage.vue"),
        meta: {
          title: "文章管理",
          icon: "el-icon-document",
        },
      },
      {
        path: "/sortManage",
        name: "sortManage",
        component: () => import("@/admin/views/sortManage.vue"),
        meta: {
          title: "分类管理",
          icon: "el-icon-s-grid",
        },
      },
      {
        path: "/labelManage",
        name: "labelManage",
        component: () => import("@/admin/views/labelManage.vue"),
        meta: {
          title: "标签管理",
          icon: "el-icon-s-ticket",
        },
      },
      {
        path: "/userManager",
        name: "userManager",
        component: () => import("@/admin/views/userManager.vue"),
        meta: {
          title: "用户管理",
          icon: "el-icon-user-solid",
        },
      },
    ],
  },
  {
    path: "/im",
    name: "im",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/im/views/index.vue"),
    children: [
      {
        path: "/im",
        name: "chatPanel",
        component: () => import("@/im/views/chatPanel.vue"),
        meta: {
          title: "聊天面板",
        },
      },
      {
        path: "/im/contact",
        name: "contact",
        component: () => import("@/im/views/contactPanel.vue"),
        meta: {
          title: "联系人面板",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/adminLogin",
    name: "adminLogin",
    component: () => import("@/admin/views/login.vue"),
  },
];

export default routes;
