<template>
  <div>
    <loader :loading="loading">
      <!-- 加载页面 -->
      <template slot="loader">
        <div>
          <zombie></zombie>
        </div>
      </template>
      <!-- 内容页面 -->
      <template slot="body">
        <!-- 首页图片 -->
        <el-image
          style="animation: header-effect 2s"
          class="background-image-index"
          :src="backgroundImage"
          fit="cover"
        >
          <div
            slot="error"
            class="image-slot background-image-index-error"
          ></div>
        </el-image>
        <!-- 首页文字 -->
        <div class="signature-wall myCenter my-animation-hideToShow">
          <h1 class="playful">
            <span>{{ authorName }}</span>
          </h1>
          <div class="printer">
            <printer :printerInfo="printerInfo">
              <template slot="paper" slot-scope="scope">
                <h3>{{ scope.content }}<span class="cursor">|</span></h3>
              </template>
            </printer>
          </div>
          <div id="bannerWave1"></div>
          <div id="bannerWave2"></div>
          <i
            class="el-icon-arrow-down"
            @click="navigation('.page-container-wrap')"
          ></i>
        </div>
        <!-- 首页内容 -->
        <div class="page-container-wrap">
          <div class="page-container">
            <!-- 侧边栏 -->
            <myAside class="aside-content"></myAside>
            <!-- 最新文章 -->
            <recent-articles class="recent-articles"></recent-articles>
          </div>
        </div>
      </template>
    </loader>
  </div>
</template>

<script>
import loader from "@/components/common/loader.vue";
import zombie from "@/components/common/zombie.vue";
import printer from "@/components/common/printer.vue";
import myAside from "@/components/myAside/index.vue";
import recentArticles from "@/components/recentArticles/index.vue";

export default {
  components: {
    loader,
    zombie,
    printer,
    myAside,
    recentArticles,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {},
  computed: {
    printerInfo() {
      let mottoList = this.$store.state.system.webInfo.mottoList;
      return mottoList[Math.floor(Math.random() * mottoList.length)].value;
    },
    backgroundImage() {
      return this.$store.state.system.webInfo.backgroundImage;
    },
    authorName() {
      return this.$store.state.system.webInfo.authorName;
    },
  },
  methods: {
    navigation(selector) {
      let pageId = document.querySelector(selector);
      window.scrollTo({
        top: pageId.offsetTop,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.background-image-index {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
}

.background-image-index::before {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  content: "";
}

.background-image-index-error {
  background-color: var(--lightGreen);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
}

.signature-wall {
  /* 向下排列 */
  display: flex;
  flex-direction: column;
  position: relative;
  user-select: none;
  height: 100vh;
  overflow: hidden;
}

.playful {
  color: var(--white);
  font-size: 40px;
}

.printer {
  cursor: pointer;
  color: var(--white);
  background: var(--translucent);
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

#bannerWave1 {
  height: 84px;
  background: url("@/assets/bannerWave1.png") repeat-x;
  position: absolute;
  width: 200%;
  bottom: 0;
  z-index: 10;
  animation: gradientBG 120s linear infinite;
}

#bannerWave2 {
  height: 100px;
  background: url("@/assets/bannerWave2.png") repeat-x;
  position: absolute;
  width: 400%;
  bottom: 0;
  z-index: 5;
  animation: gradientBG 120s linear infinite;
}

/* 光标 */
.cursor {
  margin-left: 1px;
  animation: hideToShow 0.7s infinite;
  font-weight: 200;
}

.el-icon-arrow-down {
  font-size: 40px;
  font-weight: bold;
  color: var(--white);
  position: absolute;
  bottom: 60px;
  animation: my-shake 1.5s ease-out infinite;
  z-index: 15;
  cursor: pointer;
}

.page-container-wrap {
  background: var(--background);
  position: relative;
}

.page-container {
  display: flex;
  justify-content: center;
  width: 90%;
  padding: 0 20px 40px 20px;
  margin: 0 auto;
  flex-direction: row;
}

.recent-articles {
  width: 70%;
}

.aside-content {
  width: calc(30% - 40px);
  user-select: none;
  margin-top: 40px;
  margin-right: 40px;
  max-width: 300px;
  float: right;
}

@media screen and (max-width: 1100px) {
  .recent-articles {
    width: 100%;
  }

  .page-container {
    width: 100%;
  }
}

@media screen and (max-width: 1000px) {
  .page-container {
    /* 文章栏与侧标栏垂直排列 */
    flex-direction: column;
  }

  .aside-content {
    width: 100%;
    max-width: unset;
    float: unset;
    margin: 40px auto 0;
  }
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 35px;
  }
}
</style>
