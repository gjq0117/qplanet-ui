<template>
  <!-- 扇形图（男女比例） -->
  <div>
    <div ref="rate" class="rate-class"></div>
  </div>
</template>

<script>
import { getGenderRate } from "@/api/statistics";

export default {
  async mounted() {
    let date = [];
    await getGenderRate().then((res) => {
      date = res.data;
    });
    let chart = this.$echarts.init(this.$refs.rate);
    chart.setOption({
      title: {
        text: "网站男女比例",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: date,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
.rate-class {
  margin-top: 40px;
  height: 500px;
  width: 500px;
}
</style>
