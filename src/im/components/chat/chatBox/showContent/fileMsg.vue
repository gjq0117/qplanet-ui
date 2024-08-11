<template>
  <div
    class="msg-bubble-class"
    :class="{
      'left-msg-bubble-class': !self,
      'right-msg-bubble-class': self,
    }"
  >
    <div class="file-div-class" @click="downloadFile(msgBody.url)">
      <!-- 展示图标 -->
      <div>
        <!-- txt -->
        <i v-if="isCurrType(msgBody.fileName, 'TXT')" class="iconfont txt" />
        <!-- ppt -->
        <i
          v-else-if="isCurrType(msgBody.fileName, 'PPT')"
          class="iconfont PPTwenjian"
        />
        <!-- word -->
        <i
          v-else-if="isCurrType(msgBody.fileName, 'WORD')"
          class="iconfont word"
        />
        <!-- EXCEL -->
        <i
          v-else-if="isCurrType(msgBody.fileName, 'EXCEL')"
          class="iconfont excel"
        />
        <!-- PDF -->
        <i
          v-else-if="isCurrType(msgBody.fileName, 'PDF')"
          class="iconfont PDF"
        />
        <!-- ZIP -->
        <i
          v-else-if="isCurrType(msgBody.fileName, 'ZIP')"
          class="iconfont yasuobao"
        />
        <!-- SQL -->
        <i
          v-else-if="isCurrType(msgBody.fileName, 'SQL')"
          class="iconfont sqlwenjian"
        />
        <!-- JAVA -->
        <i
          v-else-if="isCurrType(msgBody.fileName, 'JAVA')"
          class="iconfont java"
        />
        <!-- JS -->
        <i
          v-else-if="isCurrType(msgBody.fileName, 'JS')"
          class="iconfont jswenjian"
        />
        <!-- VUE -->
        <i
          v-else-if="isCurrType(msgBody.fileName, 'VUE')"
          class="iconfont vue"
        />
        <!-- 未知文件 -->
        <i v-else class="iconfont unknownfile" />
      </div>
      <div class="file-info-class">
        <!--文件名 -->
        <div class="fileName-class">{{ msgBody.fileName }}</div>
        <!-- 文件大小 -->
        <div class="file-size-class">{{ fileSize }}</div>
      </div>
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
      file_type: this.$constant.file_type,
    };
  },
  methods: {
    // 下载文件
    async downloadFile(url) {
      let nameArr = url.split(":");
      let fileName = nameArr[nameArr.length - 1];
      // download(url, fileName);
      let response = await fetch(url);
      let blob = await response.blob();

      // 创建一个新的blob URL，并创建一个<a>标签来模拟点击下载
      let blobUrl = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName; // 下载的文件名
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // 释放blob URL资源
      window.URL.revokeObjectURL(blobUrl);
    },
    //  判断是指定类型的文件
    isCurrType(fileName, type) {
      let result = false;
      this.file_type[type].forEach((suffix) => {
        result = fileName.endsWith(suffix);
      });
      return result;
    },
    // 取小数点后面一位
    removeDecimalPlaces(num) {
      return Math.floor(num * 10) / 10;
    },
  },
  computed: {
    fileSize() {
      let num;
      if (this.msgBody.size / 1024 < 1024) {
        // KB
        num = this.removeDecimalPlaces(this.msgBody.size / 1024) + " KB";
      } else if (this.msgBody.size / 1024 / 1024 < 1024) {
        // MB
        num = this.removeDecimalPlaces(this.msgBody.size / 1024 / 1024) + " MB";
      } else if (this.msgBody.size / 1024 / 1024 / 1024 < 1024) {
        // GB
        num =
          this.removeDecimalPlaces(this.msgBody.size / 1024 / 1024 / 1024) +
          " GB";
      } else {
        // TB
        num =
          this.removeDecimalPlaces(
            this.msgBody.size / 1024 / 1024 / 1024 / 1024
          ) + " TB";
      }
      return num;
    },
  },
};
</script>

<style scoped>
.msg-bubble-class {
  max-width: 600px;
  background-color: white;
  padding: 10px;
}
.left-msg-bubble-class {
  float: left;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.right-msg-bubble-class {
  float: right;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.file-div-class {
  display: flex;
  height: 60px;
  width: 250px;
}
.file-div-class :hover {
  cursor: pointer;
}

.file-div-class .iconfont {
  font-size: 60px;
}

.file-info-class {
  height: 60px;
  width: 180px;
  margin-left: 10px;
}

.fileName-class {
  white-space: nowrap; /* 强制文本不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号代替溢出内容 */
}

.file-size-class {
  margin-top: 20px;
}
</style>
