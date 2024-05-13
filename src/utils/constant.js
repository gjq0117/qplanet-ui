export default {
  // 网站地址
  host: "qplanet.cn",
  // 文件服务器上传场景(blog场景)
  FILE_UPLOAD_SCENE_BLOG: 1,
  // 用户场景
  FILE_UPLOAD_SCENE_USER: 2,

  // 前后端密码密钥 必须要16位 不多不少
  AES_KEY: "FtotqrK1ubTB23CZ",

  // 用户类型
  userType: {
    SUPER_ADMIN: 0,
    ADMIN: 1,
    USER: 2,
  },

  // 文章状态属性
  articleAttrStatus: {
    // 可见状态
    VIEW_STATUS: 1,
    // 评论状态
    COMMENT_STATUS: 2,
    // 推荐状态
    RECOMMEND_STATUS: 3,
  },

  // 文章状态
  articleStatus: {
    // 保存
    SAVE: 0,
    // 发布
    PUBLISH: 1,
    // 下架
    REMOVE_SHELVES: 2,
  },

  // 标签颜色列表
  tag_color_list: [
    "black",
    "rgb(131, 123, 199)",
    "#ee7752",
    "#e73c7e",
    "#23a6d5",
    "#23d5ab",
  ],

  tocbot: "https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.18.2/tocbot.min.js",
};
