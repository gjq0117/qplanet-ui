<template>
  <!-- 主面板 -->
  <div class="container-class">
    <div class="aside-class">
      <sidebar />
    </div>
    <div class="panel-class">
      <router-view />
    </div>
  </div>
</template>

<script>
import sidebar from "@/im/components/sidebar.vue";

export default {
  components: {
    sidebar,
  },
};
</script>

<style scoped>
.container-class {
  display: flex;
  width: 80%;
  height: 80%;
  background-color: #474b5f;
  border-radius: 10px;
}
.aside-class {
  width: 4%;
}
.panel-class {
  display: flex;
  width: 96%;
}
</style>
