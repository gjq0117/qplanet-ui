<template>
  <!-- 输入框 -->
  <div class="input-class">
    <!-- 操作区域 -->
    <div class="operate-div-class">
      <!-- 表情包弹窗 -->
      <el-popover
        ref="popover"
        placement="top"
        trigger="click"
        popper-class="chat-input-popover-warpper"
      >
        <emojis :roomId="roomId" />
        <div slot="reference">
          <i class="iconfont ren-04"></i>
        </div>
      </el-popover>
      <!-- 艾特操作 -->
      <!--      <div @click="clickAtIcon"><i class="iconfont aite"></i></div>-->
      <!-- 发送图片 -->
      <send-image-icon :roomId="roomId" />
      <!-- 发送文件 -->
      <send-file-icon :roomId="roomId" />
      <div style="margin-left: 10px" @click="sendTextMsg">
        <i class="iconfont fasong"></i>
      </div>
    </div>
    <!-- 输入框 -->
    <div
      id="editable-div"
      class="editable-div-class"
      contenteditable
      @input="onInput"
      @keyup.enter="sendTextMsg"
      @keydown.enter="(event) => event.preventDefault()"
      @blur="inputBlurListenerEvent"
      placeholder="聊点什么吧..."
      ref="textInput"
    ></div>
    <at-list-box style="width: 1px; height: auto"></at-list-box>
  </div>
</template>

<script>
import emojis from "@/im/components/chat/inputBox/sendType/emojis/index.vue";
import SendImageIcon from "@/im/components/chat/inputBox/sendType/image/index.vue";
import SendFileIcon from "@/im/components/chat/inputBox/sendType/file/index.vue";
import atListBox from "@/im/components/chat/inputBox/atListBox.vue";
import { sendMsg } from "@/api/chatMessage";

export default {
  components: { SendFileIcon, SendImageIcon, emojis, atListBox },
  data() {
    return {
      // 房间号
      roomId: 0,
      // 发送消息
      msg: "",
      // 回复消息的ID
      replyMsgId: undefined,
      // 发送的at列表
      atUidList: [],
    };
  },
  created() {
    this.registerAddTextEmojiListener();
    this.registerChangeRoomListener();
    this.registerImgEmojiSendSuccessListener();
    this.registerAtUserListener();
  },
  beforeDestroy() {
    this.$EventBus.$off("addTextEmoji");
    this.$EventBus.$off("sendRoomInfo");
    this.$EventBus.$off("imgEmojiSendSuccess");
    this.$EventBus.$off("atUser");
  },
  methods: {
    // 点击at图标
    clickAtIcon() {
      const input = document.getElementById("editable-div");
      // 触发input事件
      let event = new Event("input", { bubbles: true });
      event.data = "@";
      input.innerHTML = input.innerHTML + "@";
      input.dispatchEvent(event);
    },
    onInput(event) {
      // 控制at列表的出现
      console.log(event);
      if (event.data === "@") {
        this.$EventBus.$emit("openAtList");
      } else {
        this.$EventBus.$emit("closeAtList");
      }
      this.msg = this.$refs.textInput.innerHTML;
    },
    // at用户事件
    registerAtUserListener() {
      this.$EventBus.$on("atUser", (uid, nickname) => {
        const html_str = `<span class="at-class" contentEditable="false" uid="${uid}" style="padding: 3px">@${nickname}</span>`;
        // 去掉最后一个@符号
        if (this.msg.endsWith("@")) {
          // 去掉@符号
          this.msg = this.msg.substring(0, this.msg.length - 1);
          this.msg += html_str;
          // 添加html文本
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          const fragment = range.createContextualFragment(html_str);
          range.insertNode(fragment);
          range.collapse(true);
          range.deleteContents();
          selection.removeAllRanges();
          selection.addRange(range);
          this.$refs.textInput.innerHTML = this.msg;
          const element = document.getElementById("editable-div");
          element.focus();
        }
      });
    },
    // 输入框失去焦点事件
    inputBlurListenerEvent() {
      // 关闭at列表
      this.$EventBus.$emit("closeAtList");
    },

    // 表情包发送成功事件
    registerImgEmojiSendSuccessListener() {
      this.$EventBus.$on("imgEmojiSendSuccess", () => {
        this.$refs.popover.doClose();
      });
    },
    // 添加文本表情包
    registerAddTextEmojiListener() {
      this.$EventBus.$on("addTextEmoji", (emoji) => {
        this.msg = this.msg + emoji;
        this.$refs.textInput.innerHTML = this.msg;
      });
    },
    // 切换房间监听器
    registerChangeRoomListener() {
      this.$EventBus.$on("sendRoomInfo", (room) => {
        // 消息置空
        this.msg = "";
        this.roomId = room.roomId;
      });
    },
    // 发送文本消息
    sendTextMsg() {
      if (!this.$common.isEmpty(this.msg)) {
        // 解析at列表
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.msg, "text/html");
        const atElementList = doc.getElementsByClassName("at-class");
        for (let i = 0; i < atElementList.length; i++) {
          let uid = atElementList[i].attributes.uid.nodeValue;
          this.atUidList.push(uid);
        }
        let req = this.$msgUtils.buildTextMsgReqBody(
          this.roomId,
          this.msg,
          this.replyMsgId,
          this.atUidList
        );
        sendMsg(req)
          .then((res) => {
            // 置空信息
            this.msg = "";
            this.$refs.textInput.innerText = "";
            this.$refs.textInput.innerHTML = "";
            this.replyMsgId = undefined;
            this.atUidList = [];
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: "消息发送失败" + error.errMsg,
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.input-class {
  display: flex;
  flex-direction: row-reverse;
  align-items: center; /* 垂直居中 */
  border-radius: 10px;
  padding: 5px 10px;
  margin-left: 2%;
  margin-top: 1%;
  width: 96%;
  height: 4%;
  background-color: #373e54;
}

.operate-div-class {
  display: flex;
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

.input-class div {
  margin-left: 5px;
}

.input-class div :hover {
  cursor: pointer;
  background-color: gray;
}

.iconfont {
  font-size: 25px;
}

.editable-div-class {
  flex-grow: 1;
  outline: none; /* 去除默认的蓝色轮廓 */
  cursor: text; /* 保留文本输入时的鼠标样式 */
  color: white;
  overflow-y: auto;
  height: 100%;
}

.editable-div-class::before {
  content: attr(placeholder);
  color: #999;
  display: block;
  pointer-events: none; /* 防止伪元素影响鼠标事件 */
}

.editable-div-class:not(:empty)::before {
  content: none;
}
</style>
<style>
.at-class {
  color: #1d90f5;
  margin-right: 5px;
}

.chat-input-popover-warpper {
  background-color: #373e54 !important;
  border: none !important;
}

.chat-input-popover-warpper .popper__arrow {
  display: none;
}
</style>
