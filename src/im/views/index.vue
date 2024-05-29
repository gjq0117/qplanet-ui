<template>
  <!-- 聊天室首页 -->
  <div class="im-background">
    <container />
  </div>
</template>

<script>
import container from "@/im/views/container.vue";
import { openWebSocket } from "@/websocket";

export default {
  components: { container },
  mounted() {
    //TODO 测试 连接websocket
    openWebSocket();
  },
  methods() {},
};
</script>

<style scoped>
.im-background {
  height: 100vh;
  background: url("@/assets/login.jpg") center center / cover repeat;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>
