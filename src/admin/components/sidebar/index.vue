<template>
  <!-- 侧边栏 -->
  <div class="my-sidebar">
    <el-menu
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
      :default-active="$router.currentRoute.path"
      router
    >
      <template v-for="menu in menus">
        <template v-if="menu.children">
          <el-submenu :key="menu.path" :index="menu.path">
            <template slot="title">
              <i :class="menu.meta.icon"></i>
              <span>{{ menu.meta.title }}</span>
            </template>
            <template v-for="children in menu.children">
              <el-menu-item :key="children.path" :index="children.path">
                <i :class="children.meta.icon"></i>
                <span slot="title">{{ children.meta.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="menu.path" :index="menu.path">
            <i :class="menu.meta.icon"></i>
            <span slot="title">{{ menu.meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import routes from "@/router/routes";
export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {
    menus() {
      return routes.filter((r) => r.path === "/admin")[0].children;
    },
  },
};
</script>

<style scoped>
.my-sidebar {
  display: block;
  top: 80px;
  left: 0;
  bottom: 0;
  position: absolute;
  width: 200px;
  user-select: none;
}
.my-sidebar::-webkit-scrollbar {
  width: 0;
}

.my-sidebar > ul {
  height: 100%;
}
</style>
