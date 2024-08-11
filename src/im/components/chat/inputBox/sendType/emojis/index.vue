<template>
  <div class="emoji-content-class">
    <div class="emoji-panel">
      <!-- 文本表情包 -->
      <text-emoji v-if="type === 0"></text-emoji>
      <!-- 图片表情包 -->
      <img-emoji v-if="type === 1" :roomId="roomId"></img-emoji>
    </div>
    <!-- 操作界面 -->
    <div class="option-panel">
      <!-- 文本表情 -->
      <div @click="type = 0">
        <i
          class="iconfont emoji"
          :class="type === 0 ? 'selected-class' : ''"
        ></i>
      </div>
      <!-- 图片表情 -->
      <div @click="type = 1">
        <i
          class="iconfont aixin"
          :class="type === 1 ? 'selected-class' : ''"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import TextEmoji from "@/im/components/chat/inputBox/sendType/emojis/text-emoji.vue";
import ImgEmoji from "@/im/components/chat/inputBox/sendType/emojis/img-emoji.vue";

export default {
  components: { TextEmoji, ImgEmoji },
  props: {
    roomId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      // 表情包类型  0：文本表情  1：图片表情
      type: 0,
    };
  },
};
</script>

<style scoped>
.emoji-content-class {
  width: 310px;
  height: 200px;
}

.emoji-panel {
  height: 175px;
  font-size: 20px;
  overflow-y: auto;
  border-bottom: 1px #3e5871 solid;
}

.option-panel {
  display: flex;
  align-items: center;
  height: 25px;
}

.option-panel div {
  height: 20px;
  width: 20px;
  padding: 2px;
  margin-right: 10px;
}
.option-panel div :hover {
  cursor: pointer;
  background-color: gray;
}
.option-panel .iconfont {
  font-size: 22px;
}
.selected-class {
  background-color: gray;
}
</style>
