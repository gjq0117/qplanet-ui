<template>
  <div>
    <!-- 导航栏 -->
    <navigation />
    <!-- 回到顶部按钮 -->
    <totopbut />
    <!-- 内容 -->
    <router-view />
    <!-- 页脚 -->
    <myFooter :show-footer="true" />
  </div>
</template>

<script>
import navigation from "@/components/navigation/index.vue";
import totopbut from "@/components/common/totopbutton.vue";
import myFooter from "@/components/common/footer.vue";

import { getWebInfo } from "@/api/webinfo";
export default {
  components: {
    myFooter,
    navigation,
    totopbut,
  },
  data() {
    return {};
  },
  created() {
    this.getWebInfo();
  },
  methods: {
    // 获取网站信息
    getWebInfo() {
      getWebInfo().then((res) => {
        if (!this.$common.isEmpty(res.data)) {
          // this.webInfo = res.data;
          // 保存到store
          this.$store.commit("system/SET_WEB_INFO", res.data);
        }
      });
    },
  },
};
</script>

<style scope></style>
