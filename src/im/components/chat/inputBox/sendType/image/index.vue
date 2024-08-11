<template>
  <!-- 图片 -->
  <div class="images-div-class">
    <el-upload
      action=""
      accept=".png,.jpeg,.jpg"
      list-type="picture"
      :on-error="handleError"
      :http-request="uploadPicture"
      :show-file-list="false"
    >
      <i class="iconfont tupian"></i>
    </el-upload>
  </div>
</template>

<script>
import { sendMsg } from "@/api/chatMessage";

export default {
  props: {
    roomId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 上传图片
    async uploadPicture(params) {
      const url = await this.$common.uploadFile(
        params.file,
        this.$constant.FILE_UPLOAD_SCENE_CHAT
      );
      // 文件宽高
      const reader = new FileReader();
      reader.readAsDataURL(params.file);
      reader.onload = (e) => {
        const img = e.target.result;
        const image = new Image();
        image.src = img;
        image.onload = (_) => {
          // 发送消息 房间号  消息类型  消息体
          const req = this.$msgUtils.buildImgMsgReqBody(
            this.roomId,
            url,
            image.width,
            image.height,
            params.file.size
          );
          sendMsg(req).catch((error) => {
            this.$message({
              type: "error",
              message: error.errMsg,
            });
          });
        };
      };
    },
    handleError() {
      this.$message({
        type: "warning",
        message: "只能上传【.jpg, .jpeg, .png】后缀的文件",
      });
    },
  },
};
</script>

<style scoped>
.images-div-class {
}
.iconfont {
  font-size: 25px;
}
</style>
