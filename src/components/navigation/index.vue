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

            <!--            &lt;!&ndash; 家 &ndash;&gt;-->
            <!--            <li @click="$router.push({ path: '/love' })">-->
            <!--              <div class="my-menu">❤️‍🔥 <span>家</span></div>-->
            <!--            </li>-->

            <!--            &lt;!&ndash; 百宝箱 &ndash;&gt;-->
            <!--            <li @click="$router.push({ path: '/favorite' })">-->
            <!--              <div class="my-menu">🧰 <span>百宝箱</span></div>-->
            <!--            </li>-->

            <!--            &lt;!&ndash; 留言 &ndash;&gt;-->
            <!--            <li @click="$router.push({ path: '/message' })">-->
            <!--              <div class="my-menu">📪 <span>留言</span></div>-->
            <!--            </li>-->

            <!-- 聊天室 -->
            <li>
              <div class="my-menu" @click="toIm()">💬 <span>聊天室</span></div>
            </li>

            <!-- 后台 -->
            <li @click="goAdmin()">
              <div class="my-menu">💻️ <span>后台</span></div>
            </li>

            <!-- 个人中心 -->
            <li>
              <el-dropdown placement="bottom">
                <el-avatar
                  class="user-avatar"
                  :size="36"
                  style="margin-top: 12px"
                  :src="
                    !$common.isEmpty($store.state.user.currentUser.avatar)
                      ? $store.state.user.currentUser.avatar
                      : defaultAvatar
                  "
                >
                </el-avatar>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    @click.native="$router.push({ path: '/userInfo' })"
                    v-if="
                      getToken() &&
                      !$common.isEmpty($store.state.user.currentUser)
                    "
                  >
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                    <span>个人中心</span>
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click.native="logout()"
                    v-if="
                      getToken() &&
                      !$common.isEmpty($store.state.user.currentUser)
                    "
                  >
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                    <span>退出</span>
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click.native="$router.push({ path: '/login' })"
                    v-if="
                      !getToken() ||
                      $common.isEmpty($store.state.user.currentUser)
                    "
                  >
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                    <span>登陆</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { logout } from "@/api/user";
import { getToken, removeToken } from "@/utils/tokenUtil";

export default {
  data() {
    return {
      defaultAvatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      hoverEnter: false,
    };
  },
  computed: {
    toolbar() {
      return this.$store.state.system.toolbar;
    },
    webName() {
      return this.$store.state.system.webInfo.webName;
    },
  },
  methods: {
    getToken,
    // 去聊天室
    toIm() {
      window.open("http://" + window.location.host + "/im");
    },
    logout() {
      logout()
        .then(() => {
          removeToken();
          this.$store.commit("user/REMOVE_CURRENT_USER");
          this.$notify({
            type: "success",
            title: "提示",
            message: "你已退出登录！欢迎下次再来呀~~~😘",
          });
          this.$router.push({ path: "/" });
        })
        .catch(() => {});
    },
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
