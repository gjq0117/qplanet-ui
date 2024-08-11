<template>
  <!-- 聊天框 -->
  <div class="chat-class">
    <div class="content-class">
      <!-- 群信息 -->
      <room-info-box></room-info-box>
      <!-- 聊天框 -->
      <chat-box></chat-box>
      <!-- 输入框 -->
      <input-box></input-box>
    </div>
  </div>
</template>

<script>
import chatBox from "@/im/components/chat/chatBox/index.vue";
import roomInfoBox from "@/im/components/chat/roomInfoBox/index.vue";
import inputBox from "@/im/components/chat/inputBox/index.vue";

export default {
  components: {
    chatBox,
    roomInfoBox,
    inputBox,
  },
};
</script>

<style scoped>
.chat-class {
  width: 100%;
  height: 100%;
  padding: 10px;
}

.content-class {
  margin-top: 1px;
  height: 98%;
  border-radius: 10px;
  background-color: #585e74;
}
</style>
