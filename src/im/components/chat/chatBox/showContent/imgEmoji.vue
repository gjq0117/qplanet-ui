<template>
  <!-- 图片表情包 -->
  <div>
    <div class="img-emoji-class">
      <el-image fit="fill" :style="imgSize" :src="msgBody.url"> </el-image>
    </div>
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
    return {
      width: 0,
      height: 300,
    };
  },
  mounted() {
    this.getImgSize();
  },
  methods: {
    getImgSize() {
      this.getImageSize(this.msgBody.url, (size) => {
        this.width = size.width;
        this.height = size.height;
      });
    },
    getImageSize(url, callback) {
      let img = new Image();
      img.onload = function () {
        callback({ width: img.width, height: img.height });
      };
      img.onerror = function () {
        callback(null);
      };
      img.src = url;
    },
  },
  computed: {
    imgSize() {
      return {
        width: this.width + "px",
        height: this.height + "px",
      };
    },
  },
};
</script>

<style scoped>
.img-emoji-class {
}
</style>
