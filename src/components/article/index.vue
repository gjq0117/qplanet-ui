<template>
  <!-- 文章详情 -->
  <div v-if="!$common.isEmpty(articleId)">
    <!-- 封面 -->
    <cover :articleInfo="articleInfo"></cover>
  </div>
</template>

<script>
import cover from "./cover.vue";
export default {
  components: {
    cover,
  },
  data() {
    return {
      articleId: this.$route.params.articleId,
      // 文章信息
      articleInfo: {
        articleCover: require("@/assets/bg.png"),
        articleTitle: "母猪场后护理",
        username: "子笙",
        createTime: "2024-04-12",
        viewCount: 999,
        commentCount: 666,
        likeCount: 888,
      },
    };
  },
};
</script>

<style scoped></style>
