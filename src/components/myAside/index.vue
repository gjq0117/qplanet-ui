<template>
  <div class="myAside-container">
    <!-- 作者信息 -->
    <author-info></author-info>
    <!-- 推荐文章 -->
    <recommend></recommend>
  </div>
</template>

<script>
import authorInfo from "./authorInfo.vue";
import recommend from "./recommend.vue";

export default {
  components: {
    authorInfo,
    recommend,
  },
};
</script>

<style scoped>
.myAside-container > div:not(:last-child) {
  margin-bottom: 30px;
}
</style>
