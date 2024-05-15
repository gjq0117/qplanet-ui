<template>
  <div>
    <!-- 导航栏 -->
    <navigation />
    <!-- 回到顶部按钮 -->
    <totopbut />
    <!-- 内容 -->
    <router-view />
    <!-- 图片预览 -->
    <div id="outerImg">
      <div id="innerImg" style="position: absolute">
        <img id="bigImg" src="" />
      </div>
    </div>
    <!-- 页脚 -->
    <myFooter :show-footer="true" />
  </div>
</template>

<script>
import navigation from "@/components/navigation/index.vue";
import totopbut from "@/components/common/totopbutton.vue";
import myFooter from "@/components/common/footer.vue";

import { getWebInfo } from "@/api/webinfo";
import { saveWebVisitInfo } from "@/api/visitor";
export default {
  components: {
    myFooter,
    navigation,
    totopbut,
  },
  data() {
    return {};
  },
  mounted() {
    // 保存网站访问信息
    saveWebVisitInfo()
      .then()
      .catch((error) => {
        this.$message({
          type: "error",
          message: error.errMsg,
        });
      });
  },
  created() {
    this.getWebInfo();
  },
  methods: {
    // 获取网站信息
    getWebInfo() {
      getWebInfo()
        .then((res) => {
          if (!this.$common.isEmpty(res.data)) {
            // 保存到store
            this.$store.commit("system/SET_WEB_INFO", res.data);
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
  },
};
</script>

<style scope>
#outerImg {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: none;
}
</style>
