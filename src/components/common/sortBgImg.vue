<template>
  <!--  分类背景图  -->
  <div class="poem-container myCenter my-animation-hideToShow">
    <!-- 背景图片 -->
    <el-image
      v-if="sortInfo.sortImg"
      class="my-el-image poem-image"
      style="position: absolute; margin-top: -50px"
      :src="sortInfo.sortImg"
      fit="cover"
    >
      <div slot="error" class="image-slot"></div>
    </el-image>
    <div class="poem-wrap">
      <div>
        <span>{{ sortInfo.sortName }}</span>
      </div>
      <p class="poem">Tips: {{ sortInfo.sortDescription }}</p>
      <p class="info">💕{{ sortInfo.motto }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sortInfo: {
      type: Object,
    },
  },
  data() {
    return {
      bgImg: require("@/assets/bg.png"),
    };
  },
};
</script>
<style scoped>
.poem-container {
  padding: 90px 0 40px;
  position: relative;
}

.poem-wrap {
  border-radius: 10px;
  z-index: 10;
  text-align: center;
  letter-spacing: 4px;
  font-weight: 300;
  width: 100%;
  max-width: 800px;
}

.poem-wrap div span {
  padding: 5px 10px;
  color: var(--white);
  font-size: 2em;
  border-radius: 5px;
}

.poem-wrap p {
  width: 100%;
  max-width: 800px;
  color: var(--white);
}

.poem-wrap p.poem {
  margin: 40px auto;
  font-size: 1.5em;
}

.poem-wrap p.info {
  margin: 20px auto 40px;
  font-size: 1.1em;
}
</style>
