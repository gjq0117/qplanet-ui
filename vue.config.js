const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    host: "127.0.0.1",
    port: 80,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", // 后端地址
        ChangeOrigin: true, // 允许跨域
        pathRewrite: {
          "^/api": "", // 路径重写
        },
      },
    },
  },
  chainWebpack: (config) => {
    // 配置网页标题
    config.plugin("html").tap((args) => {
      args[0].title = "Q星球";
      return args;
    });
  },
});
