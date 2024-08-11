<template>
  <!-- 发送文件消息 -->
  <div>
    <el-upload
      action=""
      ::on-error="handleError"
      :http-request="uploadFile"
      :show-file-list="false"
    >
      <i class="iconfont wenjian-"></i
    ></el-upload>
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
  methods: {
    async uploadFile(params) {
      const url = await this.$common.uploadFile(
        params.file,
        this.$constant.FILE_UPLOAD_SCENE_CHAT
      );
      // 文件大小 文件名
      let req = this.$msgUtils.buildFileMsgReqBody(
        this.roomId,
        url,
        params.file.name,
        params.file.size
      );
      // 发送消息
      sendMsg(req).catch((error) => {
        this.$message({
          type: "error",
          message: error.errMsg,
        });
      });
    },
    handleError() {
      this.$message({
        type: "error",
        message: "文件上传错误",
      });
    },
  },
};
</script>

<style scoped>
.iconfont {
  font-size: 25px;
}
</style>
