<template>
  <div class="card-content1 shadow-box background-opacity">
    <el-avatar
      style="margin-top: 20px"
      class="user-avatar"
      :size="120"
      :src="avatar"
    ></el-avatar>
    <div class="web-name">{{ webName }}</div>
    <div class="web-info">
      <div class="blog-info-box">
        <span>文章</span>
        <span class="blog-info-num">{{ statisticsInfo.articleCount }}</span>
      </div>
      <div class="blog-info-box">
        <span>分类</span>
        <span class="blog-info-num">{{ statisticsInfo.sortCount }}</span>
      </div>
      <div class="blog-info-box">
        <span>访问量</span>
        <span class="blog-info-num">{{ statisticsInfo.visitCount }}</span>
      </div>
    </div>
    <a class="collection-btn" @click.prevent="openFriend">
      <i class="el-icon-star-off" style="margin-right: 2px"></i>朋友圈
    </a>
  </div>
</template>

<script>
import { getWebStatisticsInfo } from "@/api/webinfo";
export default {
  data() {
    return {
      statisticsInfo: {
        sortCount: 0,
        articleCount: 0,
        visitCount: 0,
      },
    };
  },
  created() {
    getWebStatisticsInfo()
      .then((res) => {
        this.statisticsInfo = res.data;
      })
      .catch((error) => {
        this.$message({
          type: "error",
          message: error.errMsg,
        });
      });
  },
  computed: {
    avatar() {
      return this.$store.state.system.webInfo.avatar;
    },
    webName() {
      return this.$store.state.system.webInfo.webName;
    },
  },
  methods: {
    // 打开朋友圈
    openFriend() {
      this.$notify({
        type: "warning",
        title: "抱歉",
        message: "此功能还未开放噢~敬请期待😘",
      });
    },
  },
};
</script>

<style scoped>
.card-content1 {
  background: linear-gradient(
    -45deg,
    #e8d8b9,
    #eccec5,
    #a3e9eb,
    #bdbdf0,
    #eec1ea
  );
  background-size: 400% 400%;
  animation: gradientBG 10s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.card-content1 :not(:first-child) {
  z-index: 10;
}

.web-name {
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
}

.web-info {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.blog-info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.blog-info-num {
  margin-top: 12px;
}

.collection-btn {
  position: relative;
  margin-top: 12px;
  background: var(--lightGreen);
  cursor: pointer;
  width: 65%;
  height: 35px;
  border-radius: 1rem;
  text-align: center;
  line-height: 35px;
  color: var(--white);
  overflow: hidden;
  z-index: 1;
  margin-bottom: 25px;
}
</style>
