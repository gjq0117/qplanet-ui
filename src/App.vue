<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { saveWebVisitInfo } from "@/api/visitor";
export default {
  name: "App",
  mounted() {
    saveWebVisitInfo()
      .then()
      .catch((error) => {
        this.$message({
          type: "error",
          message: error.errMsg,
        });
      });
  },
};
</script>

<style>
#app {
  font-family: planet-font, serif;
}
</style>
