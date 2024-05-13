<template>
  <!--推荐文章-->
  <div
    style="
      padding: 25px;
      border-radius: 10px;
      animation: hideToShow 1s ease-in-out;
    "
    class="shadow-box background-opacity wow"
  >
    <div class="card-content2-title">
      <span>🔥推荐文章</span>
    </div>
    <div
      v-for="(article, index) in recommendArticles"
      :key="index"
      @click="$router.push({ path: `/article/${article.id}` })"
    >
      <div class="aside-post-detail">
        <div class="aside-post-image">
          <el-image
            lazy
            class="my-el-image"
            :src="article.articleCover"
            fit="cover"
          >
            <div slot="error" class="image-slot">
              <div class="error-aside-image">
                {{ article.username }}
              </div>
            </div>
          </el-image>
          <div class="hasVideo transformCenter" v-if="article.hasVideo">
            <svg viewBox="0 0 1024 1024" width="30" height="30">
              <path
                d="M514 114.3c-219.9 0-398.9 178.9-398.9 398.9 0.1 219.9 179 398.8 398.9 398.8 219.9 0 398.8-178.9 398.8-398.8S733.9 114.3 514 114.3z m173 421.9L437.1 680.5c-17.7 10.2-39.8-2.6-39.8-23V368.9c0-20.4 22.1-33.2 39.8-23L687 490.2c17.7 10.2 17.7 35.8 0 46z"
                fill="#0C0C0C"
              ></path>
            </svg>
          </div>
        </div>
        <div class="aside-post-title">
          {{ article.articleTitle }}
        </div>
      </div>
      <div class="aside-post-date">
        <i class="el-icon-date" style="color: var(--greyFont)"></i
        >{{ article.publishTime }}
      </div>
    </div>
  </div>
</template>

<script>
import { recommendArticleList } from "@/api/article";
export default {
  data() {
    return {
      recommendArticles: [],
    };
  },
  created() {
    recommendArticleList()
      .then((res) => {
        this.recommendArticles = res.data;
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
.card-content2-title {
  font-size: 18px;
  margin-bottom: 20px;
  color: var(--lightGreen);
  font-weight: bold;
}
.aside-post-detail {
  display: flex;
  cursor: pointer;
}

.aside-post-image {
  width: 40%;
  min-height: 50px;
  border-radius: 6px;
  margin-right: 8px;
  overflow: hidden;
  position: relative;
}

.error-aside-image {
  background: var(--themeBackground);
  color: var(--white);
  padding: 10px;
  text-align: center;
  width: 100%;
  height: 100%;
}

.aside-post-title {
  width: 60%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.aside-post-date {
  margin-top: 8px;
  margin-bottom: 20px;
  color: var(--greyFont);
  font-size: 12px;
}
</style>
