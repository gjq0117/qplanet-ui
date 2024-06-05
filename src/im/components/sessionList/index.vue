<template>
  <!-- 会话列表 -->
  <div class="session-class">
    <div class="content-class">
      <span v-for="sessionItem in sessionList" :key="sessionItem.id">
        <session-item
          :class="{
            'curr-session-class': currSession.roomId === sessionItem.roomId,
          }"
          :session="sessionItem"
          @click.native="selectSession(sessionItem.roomId)"
        />
      </span>
    </div>
  </div>
</template>

<script>
import sessionItem from "@/im/components/sessionList/sessionItem.vue";
import { getContactListPage } from "@/api/contact";
import { getUserCache } from "@/utils/storage";

export default {
  components: { sessionItem },
  data() {
    return {
      sessionList: [],
      isLast: false,
      cursorPageParam: {
        pageSize: 20,
        cursor: null,
      },
      currSession: {},
    };
  },
  mounted() {
    // 新消息监听事件
    this.$EventBus.$on("newMsg", (msg) => {
      let roomId = msg.messageInfo.roomId;
      let user = getUserCache(msg.fromUser.uid);
      // 找到对应的会话，并移到第一位
      for (let i = 0; i < this.sessionList.length; i++) {
        if (this.sessionList[i].roomId === roomId) {
          let item = this.sessionList.splice(i, 1)[0];
          item.activeTime = msg.messageInfo.sendTime;
          item.lastMsg = msg.messageInfo.body.content;
          item.lastMsgSendName = user.nickname;
          this.sessionList.unshift(item);
          return;
        }
      }
      //TODO 没找到会话信息，可能是新好友发来的招呼语
      this.sendContactListPage();
    });
    // 获取会话列表
    this.sendContactListPage();
  },
  beforeDestroy() {
    // 取消事件
    this.$EventBus.$off("newMsg");
  },
  methods: {
    // 切换会话列表
    selectSession(roomId) {
      this.sessionList.forEach((session) => {
        if (session.roomId === roomId) {
          this.currSession = session;
        }
      });
      this.$EventBus.$emit("sendRoomInfo", this.currSession, false);
    },
    sendContactListPage() {
      getContactListPage()
        .then((res) => {
          this.sessionList = res.data.list;
          // 默认展现第一个会话中的消息
          this.currSession = this.sessionList[0];
          //发送
          this.$EventBus.$emit("sendRoomInfo", this.currSession, true);
          this.cursorPageParam.cursor = res.data.cursor;
          this.isLast = res.data.isLast;
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
  },
};
</script>

<style scoped>
.session-class {
  width: 250px;
  height: 100%;
  margin-left: 25px;
}

.content-class {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 96%;
  overflow-y: auto; /* 当内容溢出时显示垂直滚动条 */
}

.curr-session-class {
  background-color: lightslategray;
}
</style>
