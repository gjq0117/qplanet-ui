<template>
  <div
    class="img-emoji-list-class"
    v-infinite-scroll="load"
    infinite-scroll-immediate="false"
    :infinite-scroll-disabled="pageReq.isLast"
  >
    <div
      class="img-emoji-item-class"
      v-for="imgEmoji in imgEmojiList"
      @click="sendImgEmoji(imgEmoji.img)"
      :key="imgEmoji.id"
    >
      <el-image
        class="img-emoji-class"
        :src="imgEmoji.img"
        fit="fit"
      ></el-image>
    </div>

    <div v-if="pageReq.isLast" class="img-emoji-upload-class">
      <el-upload
        action=""
        accept=".png,.jpeg,.jpg,.gif"
        :http-request="uploadPicture"
        :on-error="handleError"
        :show-file-list="false"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { addImgEmoji, getImgEmojiPageByUid } from "@/api/userbackpack";
import Compressor from "compressorjs";
import { sendMsg } from "@/api/chatMessage";

export default {
  props: {
    roomId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      // 列表信息
      imgEmojiList: [],
      // 分页请求
      pageReq: {
        cursor: "",
        pageSize: 20,
        isLast: false,
      },
    };
  },
  created() {
    this.getImgEmojiPage();
  },
  methods: {
    // 发送表情包
    sendImgEmoji(imgUrl) {
      let req = this.$msgUtils.buildImgEmojiMsgReqBody(this.roomId, imgUrl);
      sendMsg(req)
        .then((res) => {
          // 发送成功
          this.$EventBus.$emit("imgEmojiSendSuccess");
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "表情包发送失败" + error.errMsg,
          });
        });
    },
    // 滑动加载列表
    load() {
      if (this.imgEmojiList.length > 0) {
        this.getImgEmojiPage();
      }
    },
    // 获取表情包分页信息
    getImgEmojiPage() {
      getImgEmojiPageByUid(this.pageReq)
        .then((res) => {
          this.imgEmojiList = this.imgEmojiList.concat(res.data.list);
          this.pageReq.cursor = res.data.cursor;
          this.pageReq.isLast = res.data.isLast;
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: "获取表情包信息失败",
          });
        });
    },
    // 上传图片并压缩成表情包
    uploadPicture(params) {
      const success = this.uploadSuccess;
      new Compressor(params.file, {
        quality: 0.3,
        maxWidth: 150,
        success(result) {
          success(result);
        },
        error(error) {
          this.$message({
            type: "warning",
            message: "添加表情包失败",
          });
        },
      });
    },
    async uploadSuccess(result) {
      const newFile = new File([result], result.name, {
        type: result.type,
      });
      // 上传压缩后的文件
      const url = await this.$common.uploadFile(
        newFile,
        this.$constant.FILE_UPLOAD_SCENE_USER
      );
      addImgEmoji(url)
        .then((res) => {
          // 重新获取表情包列表
          this.pageReq = {
            cursor: "",
            pageSize: 20,
            isLast: false,
          };
          this.imgEmojiList = [];
          this.getImgEmojiPage();
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: "添加表情包失败",
          });
        });
    },
    handleError() {
      this.$message({
        type: "warning",
        message: "只能上传【.jpg, .jpeg, .png, .gif】后缀的文件",
      });
    },
  },
};
</script>

<style scoped>
.img-emoji-list-class {
  height: 99%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
.img-emoji-item-class {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.img-emoji-item-class :hover {
  cursor: pointer;
}
.img-emoji-class {
  width: 50px;
  height: 50px;
  border-radius: 6px;
}

.img-emoji-upload-class {
  border: 1px #8c939d dashed;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  line-height: 50px;
  text-align: center;
}
</style>
