<template>
  <!-- at列表容器 -->
  <div>
    <el-popover
      ref="popover"
      placement="top-start"
      width="150"
      trigger="manual"
      v-model="atListVisual"
      popper-class="chat-input-popover-warpper"
    >
      <div
        class="atUserList-div-class"
        v-infinite-scroll="load"
        infinite-scroll-immediate="false"
        :infinite-scroll-disabled="isLast"
      >
        <div
          class="atUser-item-class"
          v-for="user in atUserList"
          :key="user.uid"
          @mousedown="atUser(user.uid, user.nickname)"
        >
          <el-avatar :size="30" :src="user.avatar"></el-avatar>
          <span class="nickname-class">{{ user.nickname }}</span>
        </div>
      </div>
      <div slot="reference">&nbsp;</div>
    </el-popover>
  </div>
</template>

<script>
import { loadUserSummerListCache } from "@/utils/storage";
import { getGroupMemberAtPage } from "@/api/groupMember";

export default {
  data() {
    return {
      // at列表窗口显示控制
      atListVisual: false,
      // at列表游标分页请求参数
      atPageReq: {
        pageSize: 10,
        cursor: "",
        roomId: 0,
        isFirst: true,
      },
      isLast: false,
      // at列表展示框的数据
      atUserList: [],
    };
  },
  created() {
    this.openAtListListener();
    this.closeAtListListener();
  },
  beforeDestroy() {
    this.$EventBus.$off("openAtList");
    this.$EventBus.$off("closeAtList");
  },
  methods: {
    // 选择at的用户
    atUser(uid, nickname) {
      this.$EventBus.$emit("atUser", uid, nickname);
    },
    // 翻页
    load() {
      this.atPageReq.isFirst = false;
      this.sendUserAtList();
    },
    // 打开at列表
    openAtListListener() {
      this.$EventBus.$on("openAtList", (roomId) => {
        this.atListVisual = true;
        if (this.atUserList.length === 0) {
          this.atPageReq.roomId = roomId;
          this.atPageReq.isFirst = true;
          this.sendUserAtList();
        }
      });
    },
    // 关闭at列表
    closeAtListListener() {
      this.$EventBus.$on("closeAtList", () => {
        this.init();
      });
    },
    sendUserAtList() {
      if (this.atPageReq.roomId === 0) return;
      getGroupMemberAtPage(this.atPageReq)
        .then((res) => {
          this.atPageReq.cursor = res.data.cursor;
          this.isLast = res.data.isLast;
          // 本地查找到对应的用户信息
          loadUserSummerListCache(res.data.list, true).then((data) => {
            this.$nextTick(() => {
              this.atUserList = this.atUserList.concat(data);
            });
          });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "@列表请求失败" + error.errMsg,
          });
        });
    },
    init() {
      this.atListVisual = false;
      this.atUserList = [];
      this.atPageReq = {
        pageSize: 10,
        cursor: "",
        roomId: 0,
        isFirst: true,
      };
      this.isLast = false;
    },
  },
};
</script>

<style scoped>
.atUserList-div-class {
  height: 250px;
  overflow-y: scroll;
}
.atUser-item-class {
  display: flex;
  align-items: center;
  height: 35px;
  width: 110px;
}
.atUser-item-class :hover {
  cursor: pointer;
}
.atUser-item-class .nickname-class {
  color: white;
  margin-left: 5px;
  white-space: nowrap; /* 确保文本在一行内显示 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 使用省略号表示文字被截断 */
}
</style>
