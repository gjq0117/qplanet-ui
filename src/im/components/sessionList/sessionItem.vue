<template>
  <!-- 会话项 -->
  <div class="item-class">
    <!-- 头像 -->
    <div class="avatar-class">
      <el-avatar :size="40" :src="session.avatar"> </el-avatar>
    </div>
    <!-- 内容 -->
    <div class="content-class">
      <div style="font-size: 15px; color: white">
        {{ session.name }}
      </div>
      <div style="font-size: 12px; color: #dddddd" v-if="session.lastMsg">
        {{ session.lastMsgSendName }} : {{ session.lastMsg }}
      </div>
    </div>
    <!-- 时间 -->
    <div class="time-class">
      <span>{{ session.activeTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    session: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped>
.item-class {
  display: flex;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  background-color: #585e74;
}

.item-class :hover {
  cursor: pointer;
}
.avatar-class {
  width: 50px;
}
.content-class {
  width: 120px;
}
.content-class div {
  margin-top: 2px;
  white-space: nowrap; /* 强制文本不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号代替溢出内容 */
}
.time-class {
  margin-left: 5px;
  width: 65px;
  color: #dddddd;
  font-size: 15px;
}
</style>
