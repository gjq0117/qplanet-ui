<template>
  <!-- 气泡消息 -->
  <div>
    <!-- 文本消息 -->
    <text-msg
      v-if="msgInfo.type === $msgUtils.TEXT_MSG"
      :msgBody="msgInfo.body"
      :self="self"
    />
    <!-- 图片消息 -->
    <img-msg
      v-if="msgInfo.type === $msgUtils.IMG_MSG"
      :msgBody="msgInfo.body"
      :self="self"
    />
    <!-- 文件消息 -->
    <file-msg
      v-if="msgInfo.type === $msgUtils.FILE_MSG"
      :msgBody="msgInfo.body"
      :self="self"
    />
    <!-- 表情包消息 -->
    <img-emoji
      v-if="msgInfo.type === $msgUtils.EMOJI_MSG"
      :msgBody="msgInfo.body"
      :self="self"
    />
  </div>
</template>

<script>
import FileMsg from "@/im/components/chat/chatBox/showContent/fileMsg.vue";
import TextMsg from "@/im/components/chat/chatBox/showContent/textMsg.vue";
import ImgMsg from "@/im/components/chat/chatBox/showContent/imgMsg.vue";
import ImgEmoji from "@/im/components/chat/chatBox/showContent/imgEmoji.vue";

export default {
  components: { ImgEmoji, TextMsg, ImgMsg, FileMsg },
  props: {
    self: {
      type: Boolean,
      require: true,
    },
    msgInfo: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped></style>
