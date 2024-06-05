<template>
  <!-- 在线列表 -->
  <div class="online-class" v-if="onlineNum">
    <div class="content-class">
      <!-- 在线人数 -->
      <div class="online-count-class">
        <span style="color: white">在线人数：{{ onlineNum }}</span>
      </div>
      <!-- 成员列表 -->
      <div
        class="member-list"
        v-infinite-scroll="load"
        infinite-scroll-immediate="false"
        :infinite-scroll-disabled="isLast"
      >
        <!-- 第一个显示自己 -->
        <online-item :user-info="userInfo"></online-item>
        <span v-for="userInfoItem in userInfoList" :key="userInfoItem.id">
          <online-item :user-info="userInfoItem" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import onlineItem from "@/im/components/onlineList/onlineItem.vue";
import { getGroupMemberPage } from "@/api/groupMember";
import { loadUserSummerListCache } from "@/utils/storage";
import { getRoomOnlineNum } from "@/api/room";

export default {
  components: {
    onlineItem,
  },
  data() {
    return {
      // 本人
      userInfo: this.$store.state.user.currentUser,
      // 用户列表
      userInfoList: [],
      // 在线人数
      onlineNum: 0,
      // 分页请求参数
      cursorPageParam: {
        pageSize: 25,
        cursor: null,
        roomId: null,
      },
      isLast: false,
    };
  },
  mounted() {
    this.$EventBus.$on("sendRoomInfo", (room) => {
      // 初始化分页参数
      this.cursorPageParam = {
        pageSize: 25,
        cursor: null,
        roomId: null,
      };
      // 获取在线人数
      getRoomOnlineNum(room.roomId).then((res) => {
        this.onlineNum = res.data;
      });
      this.cursorPageParam.roomId = room.roomId;
      // 第一次分页请求
      this.sendGroupMemberPage(this.cursorPageParam);
    });
  },
  beforeDestroy() {
    // 取消事件
    this.$EventBus.$off("sendRoomInfo");
  },
  methods: {
    sendGroupMemberPage(params) {
      getGroupMemberPage(params)
        .then((res) => {
          if (res.data) {
            this.cursorPageParam.cursor = res.data.cursor;
            this.isLast = res.data.isLast;
            let uidList = [];
            res.data.list.forEach((resp) => {
              uidList.push(resp.uid);
            });
            loadUserSummerListCache(uidList).then((data) => {
              let respList = res.data.list;
              this.$common.assignForList(respList, data);
              this.userInfoList = this.userInfoList.concat(respList);
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    load() {
      this.sendGroupMemberPage(this.cursorPageParam);
    },
  },
};
</script>

<style scoped>
.online-class {
  display: flex;
  width: 300px;
  height: 100%;
  padding: 10px;
}

.online-count-class {
  display: flex;
  height: 5%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
  background-color: #3c4152;
  align-items: center; /* 垂直居中 */
}

.content-class {
  height: 98%;
  background-color: #585e74;
  border-radius: 10px;
}

.member-list {
  height: 95%;
  overflow-y: auto; /* 当内容溢出时显示垂直滚动条 */
  overflow-x: hidden;
}
</style>
