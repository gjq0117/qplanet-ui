<template>
  <!--  分类背景图  -->
  <div class="poem-container myCenter my-animation-hideToShow">
    <!-- 背景图片 -->
    <el-image
      class="my-el-image poem-image"
      style="position: absolute; margin-top: -50px"
      v-once
      lazy
      :src="bgImg"
      fit="cover"
    >
      <div slot="error" class="image-slot"></div>
    </el-image>
    <div class="poem-wrap">
      <div>
        <span>标题</span>
      </div>
      <p class="poem">介绍1</p>
      <p class="info">介绍2</p>
    </div>
  </div>
</template>

<script>
export default {
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
