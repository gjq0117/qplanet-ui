<template>
  <!-- 联系人 -->
  <div class="item-class" @click="openDetailedInfo">
    <!-- 头像 -->
    <div class="avatar-class">
      <el-avatar :size="40" :src="userInfo.avatar"></el-avatar>
      <el-badge
        is-dot
        class="online-badge"
        :type="userInfo.isActive ? 'success' : 'info'"
      ></el-badge>
    </div>
    <!-- 姓名 -->
    <div class="name-class">
      <span>{{ userInfo.nickname }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      require: true,
    },
  },
  methods: {
    openDetailedInfo() {
      this.$EventBus.$emit("openInfo", this.userInfo);
    },
  },
};
</script>

<style scoped>
.item-class {
  display: flex;
  align-items: center; /* 垂直居中 */
  width: 100%;
  padding: 5px;
}
.item-class :hover {
  cursor: pointer;
}
.avatar-class {
  position: relative;
}
.name-class {
  margin-left: 5px;
  color: white;
  font-size: 12px;
  width: 120px;
  font-weight: bold;
  white-space: nowrap; /* 强制文本不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号代替溢出内容 */
}
.online-badge {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
