<template>
  <!-- 统计 -->
  <div>
    <!-- 关键字 -->
    <div class="keyBoard">
      <!-- 用户量 -->
      <div class="key shadow-box background-opacity wow">
        <i class="iconfont yonghu"></i>
        <el-statistic
          style="margin-top: 30px; margin-left: 100px"
          title="用户量"
        >
          <template slot="formatter"> {{ keyData.userCount }} </template>
        </el-statistic>
      </div>
      <!-- 文章数 -->
      <div class="key shadow-box background-opacity wow">
        <i class="iconfont wenzhang"></i>
        <el-statistic
          style="margin-top: 30px; margin-left: 100px"
          title="文章数"
        >
          <template slot="formatter"> {{ keyData.articleCount }} </template>
        </el-statistic>
      </div>
      <!-- 网站总浏览量 -->
      <div class="key shadow-box background-opacity wow">
        <i class="iconfont liulanliang"></i>
        <el-statistic
          style="margin-top: 30px; margin-left: 100px"
          title="网站总浏览量"
        >
          <template slot="formatter"> {{ keyData.viewCount }} </template>
        </el-statistic>
      </div>
      <!-- 点赞数量 -->
      <div class="key shadow-box background-opacity wow">
        <i class="iconfont huodedianzanshu"></i>
        <el-statistic
          style="margin-top: 30px; margin-left: 100px"
          title="累计点赞量"
        >
          <template slot="formatter"> {{ keyData.likeCount }} </template>
        </el-statistic>
      </div>
    </div>
  </div>
</template>

<script>
import { getKeyBroadData } from "@/api/statistics";

export default {
  data() {
    return {
      keyData: {
        userCount: 0,
        articleCount: 0,
        viewCount: 0,
        likeCount: 0,
      },
    };
  },
  mounted() {
    getKeyBroadData()
      .then((res) => {
        this.keyData = res.data;
      })
      .catch((error) => {
        this.$message({
          type: "error",
          message: error.errMsg,
        });
      });
  },
};
</script>

<style scoped>
.keyBoard {
  display: flex;
  height: 150px;
  width: 100%;
}
.key {
  display: flex;
  margin-left: 4%;
  margin-top: 15px;
  height: 75%;
  width: 20%;
  border-radius: 10px;
  flex-shrink: 0;
  animation: zoomIn 0.8s ease-in-out;
}
.key i {
  display: inline-block;
  margin: 30px;
  font-size: 50px;
}
</style>
