<template>
  <!-- 会话列表 -->
  <div class="session-class">
    <div
      class="content-class"
      v-infinite-scroll="loadSession"
      infinite-scroll-immediate="false"
      :infinite-scroll-disabled="isLast"
    >
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
import { getContactListPage, getContactResp } from "@/api/contact";
import { loadUserSummerCache } from "@/utils/storage";

export default {
  components: { sessionItem },
  data() {
    return {
      sessionList: [],
      isLast: false,
      cursorPageParam: {
        pageSize: 15,
        cursor: "",
      },
      currSession: {},
    };
  },
  mounted() {
    // 初始化 获取会话列表
    this.sendContactListPage();
    this.registerNewContactListener();
    this.registerNewMsgListener();
  },
  beforeDestroy() {
    // 取消事件
    this.$EventBus.$off("newMsg");
    this.$EventBus.$off("newContact");
  },
  methods: {
    // 注册新会话监听器
    registerNewContactListener() {
      this.$EventBus.$on("newContact", (msg) => {
        // 将新会话放到第一位
        this.sessionList.unshift(msg.contactResp);
      });
    },
    //注册新消息监听器
    registerNewMsgListener() {
      // 新消息监听事件
      this.$EventBus.$on("newMsg", (msg) => {
        let roomId = msg.messageInfo.roomId;
        let user = loadUserSummerCache(msg.fromUser.uid);
        console.log(user);
        // 找到对应的会话，并移到第一位
        for (let i = 0; i < this.sessionList.length; i++) {
          if (this.sessionList[i].roomId === roomId) {
            let item = this.sessionList.splice(i, 1)[0];
            this.$nextTick(() => {
              item.activeTime = msg.messageInfo.sendTime;
              item.lastMsg = msg.messageInfo.body.content;
              item.lastMsgSendName = user[0].nickname;
              this.sessionList.unshift(item);
            });
            return;
          }
        }
        // 如果在列表中没找到当前会话，就去后端主动拉取会话信息
        getContactResp(roomId)
          .then((res) => {
            this.sessionList.unshift(res.data);
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: error.errMsg,
            });
          });
      });
    },
    // 游标翻页加载列表
    loadSession() {
      this.sendContactListPage();
    },
    // 切换会话列表
    selectSession(roomId) {
      if (this.currSession.roomId === roomId) {
        // 相同的就跳过
        return;
      }
      this.sessionList.forEach((session) => {
        if (session.roomId === roomId) {
          this.currSession = session;
        }
      });
      this.$EventBus.$emit("sendRoomInfo", this.currSession, false);
    },
    sendContactListPage() {
      getContactListPage(this.cursorPageParam)
        .then((res) => {
          this.sessionList = this.sessionList.concat(res.data.list);
          this.cursorPageParam.cursor = res.data.cursor;
          this.isLast = res.data.isLast;
          if (this.$common.isEmpty(this.currSession)) {
            // 默认展现第一个会话中的消息
            this.currSession = this.sessionList[0];
            // 发送
            this.$EventBus.$emit("sendRoomInfo", this.currSession, true);
          }
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
