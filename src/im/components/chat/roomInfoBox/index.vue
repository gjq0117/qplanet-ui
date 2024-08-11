<template>
  <!-- 聊天基础信息 -->
  <div class="info-class">
    <!--  群头像 -->
    <el-avatar :size="40" :src="roomInfo.avatar"></el-avatar>
    <!-- 群名 -->
    <span style="color: white; margin-left: 10px">{{ roomInfo.name }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 房间信息
      roomInfo: {
        roomId: 0,
        avatar: "",
        name: "",
      },
    };
  },
  created() {
    this.registerChangeRoomListener();
  },
  beforeDestroy() {
    this.$EventBus.$off("sendRoomInfo");
  },
  methods: {
    // 切换房间监听器
    registerChangeRoomListener() {
      this.$EventBus.$on("sendRoomInfo", (room, first) => {
        this.roomInfo.roomId = room.roomId;
        this.roomInfo.avatar = room.avatar;
        this.roomInfo.name = room.name;
      });
    },
  },
};
</script>

<style scoped>
.info-class {
  display: flex;
  align-items: center;
  width: 100%;
  height: 6%;
  padding: 20px;
  background-color: #3c4152;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
