<template>
  <div>
    <!-- 头部 -->
    <my-header></my-header>
    <!-- 侧边栏 -->
    <my-sidebar></my-sidebar>
    <div class="content-box">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from "@/admin/components/header/index.vue";
import mySidebar from "@/admin/components/sidebar/index.vue";

export default {
  components: {
    myHeader,
    mySidebar,
  },
};
</script>

<style scoped>
.content-box {
  position: absolute;
  left: 200px;
  right: 0;
  top: 80px;
  bottom: 0;
  transition: left 0.3s ease-in-out;
}

.content {
  width: auto;
  height: 100%;
  padding: 30px;
  overflow-y: scroll;
}
</style>
