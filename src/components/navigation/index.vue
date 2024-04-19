<template>
  <div>
    <!-- 导航栏 -->
    <transition name="el-fade-in-linear">
      <div
        v-show="toolbar.visible"
        @mouseenter="hoverEnter = true"
        @mouseleave="hoverEnter = false"
        class="toolbar-content myBetween"
        :class="[{ enter: toolbar.enter }, { hoverEnter: hoverEnter }]"
      >
        <!-- 网站名称 -->
        <div class="toolbar-title">
          <h2 @click="$router.push({ path: '/' })">{{ webName }}</h2>
        </div>

        <!-- 导航列表 -->
        <div>
          <ul class="scroll-menu">
            <li @click="$router.push({ path: '/' })">
              <div class="my-menu">🏡 <span>首页</span></div>
            </li>

            <!-- 家 -->
            <li @click="$router.push({ path: '/love' })">
              <div class="my-menu">❤️‍🔥 <span>家</span></div>
            </li>

            <!-- 百宝箱 -->
            <li @click="$router.push({ path: '/favorite' })">
              <div class="my-menu">🧰 <span>百宝箱</span></div>
            </li>

            <!-- 留言 -->
            <li @click="$router.push({ path: '/message' })">
              <div class="my-menu">📪 <span>留言</span></div>
            </li>

            <!-- 聊天室 -->
            <li @click="goIm()">
              <div class="my-menu">💬 <span>联系我</span></div>
            </li>

            <!-- 后台 -->
            <li @click="goAdmin()">
              <div class="my-menu">💻️ <span>后台</span></div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoverEnter: false,
    };
  },
  computed: {
    toolbar() {
      return {
        visible: true,
        enter: false,
      };
    },
    webName() {
      return this.$store.state.system.webInfo.webName;
    },
  },
  methods: {
    goAdmin() {
      window.open("http://" + window.location.host + "/admin");
    },
  },
};
</script>

<style scoped>
.toolbar-content {
  width: 100%;
  height: 60px;
  color: var(--white);
  /* 固定位置，不随滚动条滚动 */
  position: fixed;
  z-index: 100;
  /* 禁止选中文字 */
  user-select: none;
  transition: all 0.3s ease-in-out;
}

.toolbar-content.hoverEnter {
  background: var(--translucent);
  box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.05);
}

.toolbar-title {
  margin-left: 30px;
  cursor: pointer;
}

.scroll-menu {
  margin: 0 25px 0 0;
  display: flex;
  justify-content: flex-end;
  padding: 0;
}

.scroll-menu li {
  list-style: none;
  margin: 0 12px;
  font-size: 17px;
  height: 60px;
  line-height: 60px;
  position: relative;
  cursor: pointer;
}

.scroll-menu li:hover .my-menu span {
  color: var(--themeBackground);
}

.scroll-menu li:hover .my-menu i {
  color: var(--themeBackground);
  animation: scale 1.5s ease-in-out infinite;
}

.scroll-menu li .my-menu:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  height: 6px;
  background-color: var(--themeBackground);
  width: 100%;
  max-width: 0;
  transition: max-width 0.25s ease-in-out;
}

.scroll-menu li:hover .my-menu:after {
  max-width: 100%;
}
</style>
