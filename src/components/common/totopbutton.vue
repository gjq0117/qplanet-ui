<template>
  <!-- 回到顶部按钮 -->
  <div href="#" class="cd-top" @click="toTop()"></div>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScrollPage);
  },
  watch: {
    scrollTop(scrollTop, oldScrollTop) {
      //如果滑动距离超过屏幕高度三分之一视为进入页面，背景改为白色
      let enter = scrollTop > window.innerHeight / 2;
      const top = scrollTop - oldScrollTop < 0;
      // 显示回到顶部按钮
      let isShow = scrollTop - window.innerHeight > 30;
      var element = document.querySelector(".cd-top");
      if (isShow) {
        if (window.innerHeight > 950) {
          element.style.top = "80vh";
        } else {
          element.style.top = window.innerHeight - 950 + "px";
        }
      } else {
        element.style.top = "-80vh";
      }
      //导航栏显示与颜色
      let toolbarStatus = {
        enter: enter,
        visible: top,
      };
      this.$store.commit("system/CHANGE_TOOLBAR_STATUS", toolbarStatus);
    },
  },
  methods: {
    onScrollPage() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    // 回到顶部
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.cd-top {
  background: url("@/assets/hook.png") no-repeat bottom;
  position: fixed;
  right: 5vh;
  top: -1000px;
  z-index: 99;
  width: 70px;
  height: 80px;
  background-size: contain;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
</style>
