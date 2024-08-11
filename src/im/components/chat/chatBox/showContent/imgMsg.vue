<template>
  <!-- 图片消息 -->
  <div class="show-img-div-class">
    <el-image
      :style="imgSize"
      :src="msgBody.url"
      fit="fill"
      :preview-src-list="[msgBody.url]"
    >
    </el-image>
  </div>
</template>
<script>
export default {
  props: {
    self: {
      type: Boolean,
      require: true,
    },
    msgBody: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    // 等比缩小（最大高度宽度300px）
    imgSize() {
      let ratio = 300 / this.msgBody.width;
      return {
        width: this.msgBody.width * ratio + "px",
        height: this.msgBody.height * ratio + "px",
      };
    },
  },
};
</script>

<style scoped>
.show-img-div-class {
  display: inline-block;
}
</style>
