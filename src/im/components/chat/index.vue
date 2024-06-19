<template>
  <!-- 聊天框 -->
  <div class="chat-class">
    <div class="content-class">
      <!-- 群信息 -->
      <div class="info-class">
        <!--  群头像 -->
        <el-avatar :size="40" :src="roomInfo.avatar"></el-avatar>
        <!-- 群名 -->
        <span style="color: white; margin-left: 10px">{{ roomInfo.name }}</span>
      </div>
      <!-- 聊天框 -->
      <div class="chat-box-class">
        <infinite-loading
          :key="refresh"
          ref="infiniteLoading"
          direction="top"
          @infinite="infiniteHandler"
        >
          <div slot="no-more" style="color: #1a252f"></div>
          <div slot="no-results" style="color: #1a252f">还没有消息噢~</div>
        </infinite-loading>
        <span v-for="msg in msgList" :key="msg.id">
          <chat-item :msg-info="msg" />
        </span>
      </div>
      <!-- 输入框 -->
      <div class="input-class">
        <input
          placeholder="来聊点什么吧~"
          v-model="msg"
          @keyup.enter="sendTextMsg"
        />
        <div><i class="iconfont ren-04"></i></div>
        <div><i class="iconfont aite"></i></div>
        <div><i class="iconfont tupian"></i></div>
        <div><i class="iconfont wenjian-"></i></div>
        <div style="margin-left: 10px" @click="sendTextMsg">
          <i class="iconfont fasong"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import chatItem from "@/im/components/chat/chatItem.vue";
import { pageMsg, sendMsg } from "@/api/chatMessage";
import { loadUserSummerListCache } from "@/utils/storage";

export default {
  components: {
    chatItem,
    InfiniteLoading,
  },
  data() {
    return {
      currUid: this.$store.state.user.currentUser.uid,
      scroll: false,
      refresh: false,
      infiniteLoading: null,
      msgList: [],
      pageReq: {
        roomId: 0,
        pageSize: 15,
        cursor: "",
      },
      msg: "",
      // 回复消息的ID
      replyMsgId: undefined,
      // at列表
      atUidList: [],
      // 房间信息
      roomInfo: {
        avatar: "",
        name: "",
      },
    };
  },
  created() {
    this.registerNewMsgListener();
    this.registerChangeRoomListener();
  },
  updated() {
    if (this.scroll) {
      let div = document.querySelector(".chat-box-class");
      div.scrollTop = div.scrollHeight;
      this.scroll = false;
    }
  },
  beforeDestroy() {
    // 取消事件
    this.$EventBus.$off("sendRoomInfo");
    this.$EventBus.$off("newMsg");
  },
  methods: {
    // 切换房间监听器
    registerChangeRoomListener() {
      this.infiniteLoading = this.$refs.infiniteLoading;
      this.$EventBus.$on("sendRoomInfo", (room, first) => {
        this.initRoomInfo(room);
        // 消息置空
        this.msg = "";
        this.pageReq.roomId = room.roomId;
        if (!first) {
          this.refresh = !this.refresh;
          // 清空消息列表
          this.pageReq.cursor = "";
          this.msgList = [];
        }
      });
    },
    // 新消息监听器
    registerNewMsgListener() {
      this.$EventBus.$on("newMsg", (msg) => {
        this.buildMsgList([msg], false).then((data) => {
          this.addMsgToList(data);
        });
      });
    },
    /**
     *  添加消息到消息列表
     *
     * @param msgList
     */
    addMsgToList(msgList) {
      this.$nextTick(() => {
        msgList.forEach((item) => {
          if (item.roomId === this.pageReq.roomId) {
            this.msgList = this.msgList.concat([item]);
          }
        });
        // 发送接收到新消息需要将div滚动到最底部
        this.scroll = true;
      });
    },
    // 发送文本消息
    sendTextMsg() {
      if (!this.$common.isEmpty(this.msg)) {
        let req = this.$msgUtils.buildTextMsgReqBody(
          this.pageReq.roomId,
          this.msg,
          this.replyMsgId,
          this.atUidList
        );
        sendMsg(req)
          .then((res) => {
            // 置空信息
            this.msg = "";
            this.replyMsgId = undefined;
            this.atUidList = [];
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: error.errMsg,
            });
          });
      }
    },
    // 初始化房间信息
    initRoomInfo(roomInfo) {
      this.roomInfo.avatar = roomInfo.avatar;
      this.roomInfo.name = roomInfo.name;
    },
    // 滚动翻页
    infiniteHandler($state) {
      let _this = this;
      if (this.pageReq.roomId === 0) {
        setTimeout(() => {
          _this.infiniteHandler($state);
        }, 10);
      } else {
        this.sendPageMsg($state);
      }
    },
    sendPageMsg($state) {
      pageMsg(this.pageReq)
        .then((res) => {
          // 设置分页信息
          this.pageReq.cursor = res.data.cursor;
          // 组装消息列表
          this.buildMsgList(res.data.list).then((data) => {
            // 反转data
            data = data.reverse();
            this.msgList = data.concat(this.msgList);
            $state.loaded();
            if (res.data.isLast) {
              $state.complete();
            }
          });
        })
        .catch((error) => {
          $state.loaded();
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    /**
     * 构建当前用户消息
     *
     * @param msg
     */
    buildCurrUserMsg(msg) {
      let currUser = this.$store.state.user.currentUser;
      // 用户信息
      let userInfo = {
        uid: currUser.uid,
        avatar: currUser.avatar,
        nickname: currUser.nickname,
        locPlace: currUser.locPlace,
      };
      // 构建消息响应体
      let body = this.$msgUtils.buildMsgRespBody(
        msg.messageInfo.body,
        msg.messageInfo.type
      );
      let msgInfo = {
        id: msg.messageInfo.id,
        roomId: msg.messageInfo.roomId,
        sendTime: msg.messageInfo.sendTime,
        type: msg.messageInfo.type,
        body,
        uid: msg.fromUser.uid,
      };
      Object.assign(msgInfo, userInfo);
      return msgInfo;
    },

    /**
     * 构建消息列表
     *
     * @param list
     * @param needRefreshTime
     * @return {Promise<*[]>}
     */
    async buildMsgList(list, needRefreshTime = true) {
      // 收集uid
      let uidList = [];
      let msgList = [];
      list.forEach((item) => {
        uidList.push(item.fromUser.uid);
        // 构建消息响应体
        let body = this.$msgUtils.buildMsgRespBody(
          item.messageInfo.body,
          item.messageInfo.type
        );
        msgList.push({
          id: item.messageInfo.id,
          roomId: item.messageInfo.roomId,
          sendTime: item.messageInfo.sendTime,
          type: item.messageInfo.type,
          body,
          uid: item.fromUser.uid,
        });
      });
      await loadUserSummerListCache(uidList, needRefreshTime).then((data) => {
        this.$common.assignForList(msgList, data);
      });
      return msgList;
    },
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
.chat-box-class {
  overflow-y: auto; /* 当内容溢出时显示垂直滚动条 */
  overflow-x: hidden; /* 当内容溢出时显示垂直滚动条 */
  width: 100%;
  height: 88%;
}
.input-class {
  display: flex;
  align-items: center; /* 垂直居中 */
  border-radius: 10px;
  padding: 5px 10px;
  margin-left: 2%;
  margin-top: 1%;
  width: 96%;
  height: 4%;
  background-color: #373e54;
}
.input-class input {
  outline: none;
  border: none;
  width: 87%;
  height: 100%;
  color: white;
  background-color: #373e54;
}
.input-class input:focus {
  border-radius: 5px;
  border: 1px #88c3d5 solid;
}
.input-class div :hover {
  cursor: pointer;
  background-color: gray;
}
.iconfont {
  font-size: 25px;
  margin-left: 5px;
}
</style>
