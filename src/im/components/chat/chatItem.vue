<template>
  <!-- 消息项 -->
  <div
    class="item-class"
    :class="{ 'left-msg': msgInfo.type === 0, 'right-msg': msgInfo.type === 1 }"
  >
    <div>
      <!-- 头像 -->
      <div
        :class="{
          'left-msg': msgInfo.type === 0,
          'right-msg': msgInfo.type === 1,
        }"
      >
        <el-tooltip effect="dark" placement="right-start">
          <div slot="content" style="width: 200px; height: 150px">
            <div class="tooltip-content-class">
              <div class="tooltip-image-class">
                <el-image
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-image>
              </div>
              <div>
                <div class="tooltip-info-class tooltip-info-name-class">
                  <span>昵称：姜某姜某姜某姜某姜某姜某</span>
                  <span>男</span>
                </div>
                <div class="tooltip-info-class">
                  <span>性别：<i class="iconfont nan"></i></span>
                </div>
                <div class="tooltip-info-class">
                  <span>地区：长沙</span>
                </div>
              </div>
            </div>
            <div class="tooltip-option-class">
              <!-- 发消息 -->
              <div class="icon-class">
                <i class="iconfont faxiaoxi"></i>
              </div>
              <!-- 加好友 -->
              <div class="icon-class">
                <i class="iconfont jiahaoyou"></i>
              </div>
              <!-- 艾特 -->
              <div class="icon-class">
                <i class="iconfont aite"></i>
              </div>
            </div>
          </div>
          <el-avatar
            class="avatar-class"
            :size="35"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </el-tooltip>
      </div>
      <!-- 内容 -->
      <div
        :class="{
          'left-content': msgInfo.type === 0,
          'right-content': msgInfo.type === 1,
        }"
      >
        <!-- 发送者信息 -->
        <div
          :class="{
            'left-info-class': msgInfo.type === 0,
            'right-info-class': msgInfo.type === 1,
          }"
        >
          <span
            style="font-size: 15px; color: lightgray"
            :class="{ 'right-name-class': msgInfo.type === 1 }"
            >{{ msgInfo.name }}(<span>{{ msgInfo.city }}</span
            >)</span
          >
        </div>
        <!-- 消息气泡 -->
        <div
          class="msg-bubble-class"
          :class="{
            'left-msg-bubble-class': msgInfo.type === 0,
            'right-msg-bubble-class': msgInfo.type === 1,
          }"
        >
          <!-- 消息内容 -->
          <span style="color: white">{{ msgInfo.msg }}</span>
        </div>
      </div>
    </div>
    <!-- 时间线 -->
    <div class="time-line-class" v-if="msgInfo.showTime">
      <span style="margin: 10px 0; font-size: 15px; color: lightgray">{{
        msgInfo.showTime
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msgInfo: {
      // 0:接受 1:发送
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.item-class {
  width: 100%;
  padding: 20px;
}

.left-info-class {
  margin-bottom: 5px;
}

.right-info-class {
  margin-bottom: 25px;
}

.right-name-class {
  float: right;
}

.msg-bubble-class {
  max-width: 600px;
  background-color: #868686;
  padding: 10px;
}

.left-msg-bubble-class {
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.right-msg-bubble-class {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.left-msg {
  float: left;
}

.right-msg {
  float: right;
}

.left-content {
  float: left;
  margin-left: 5px;
}

.right-content {
  float: right;
  margin-right: 5px;
}

.time-line-class {
  clear: both;
  display: flex;
  justify-content: center; /* 水平居中 */
}

.tooltip-content-class {
  display: flex;
  height: 80px;
  border-bottom: 1px lightslategray solid;
}

.tooltip-image-class {
  height: 60px;
  width: 60px;
}

.tooltip-info-class {
  margin-left: 5px;
  margin-top: 5px;
  font-size: 12px;
}

.tooltip-info-name-class {
  width: 100px;
  white-space: nowrap; /* 强制文本不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号代替溢出内容 */
}

.tooltip-option-class {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: 10px;
}
.tooltip-option-class .iconfont {
  font-size: 30px;
  padding: 15px;
}
.icon-class :hover {
  cursor: pointer;
}
.avatar-class :hover {
  cursor: pointer;
}
</style>
