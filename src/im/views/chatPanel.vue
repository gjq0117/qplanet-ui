<template>
  <!-- 聊天面板 -->
  <div class="chat-panel">
    <sessionList />
    <chat />
    <onlineList />
  </div>
</template>
<script>
import chat from "@/im/components/chat/index.vue";
import sessionList from "@/im/components/sessionList/index.vue";
import onlineList from "@/im/components/onlineList/index.vue";

export default {
  components: { onlineList, sessionList, chat },
};
</script>

<style scoped>
.chat-panel {
  display: flex;
  width: 100%;
}
</style>
