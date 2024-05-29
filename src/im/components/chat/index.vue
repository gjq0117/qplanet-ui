<template>
  <!-- 聊天框 -->
  <div class="chat-class">
    <div class="content-class">
      <!-- 群信息 -->
      <div class="info-class">
        <!--  群头像 -->
        <el-avatar
          :size="40"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <!-- 群名 -->
        <span style="color: white; margin-left: 10px">一千万只是第一步</span>
      </div>
      <!-- 聊天框 -->
      <div class="chat-box-class">
        <chat-item :msg-info="receive1" />
        <chat-item :msg-info="send" />
        <chat-item :msg-info="receive2" />
        <chat-item :msg-info="receive2" />
        <chat-item :msg-info="receive2" />
        <chat-item :msg-info="receive2" />
        <chat-item :msg-info="receive2" />
        <chat-item :msg-info="receive2" />
        <chat-item :msg-info="receive2" />
        <chat-item :msg-info="receive2" />
        <chat-item :msg-info="receive2" />
      </div>
      <!-- 输入框 -->
      <div class="input-class">
        <input placeholder="来聊点什么吧~" />
        <div><i class="iconfont ren-04"></i></div>
        <div><i class="iconfont aite"></i></div>
        <div><i class="iconfont tupian"></i></div>
        <div><i class="iconfont wenjian-"></i></div>
        <div style="margin-left: 10px">
          <i class="iconfont fasong"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chatItem from "@/im/components/chat/chatItem.vue";
export default {
  components: {
    chatItem,
  },
  data() {
    return {
      receive1: {
        type: 0,
        name: "雷某",
        city: "广州",
        msg: "啊啊啊啊啊啊啊啊啊啊",
      },
      receive2: {
        type: 0,
        name: "姜某",
        city: "长沙",
        msg: "6666677776666666",
      },
      send: {
        type: 1,
        name: "彭某",
        city: "长沙",
        msg: "发什么骚1111111111111111111111",
        showTime: "昨天18:36",
      },
    };
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
