<template>
  <div>
    <keybroad></keybroad>
    <linebroad></linebroad>
    <subcharts></subcharts>
  </div>
</template>

<script>
import keybroad from "@/admin/views/charts/keybroad.vue";
import linebroad from "@/admin/views/charts/linebroad.vue";
import subcharts from "@/admin/views/charts/subcharts/index.vue";
export default {
  components: { keybroad, linebroad, subcharts },
};
</script>

<style scoped></style>
