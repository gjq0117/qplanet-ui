<template>
  <!-- 折线图（网站访客量的每日变化） -->
  <div>
    <div ref="myLine" class="line-div"></div>
  </div>
</template>

<script>
import { sevenDayVisitCount } from "@/api/statistics";

export default {
  async mounted() {
    let dates = [];
    let visits = [];
    await sevenDayVisitCount().then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        dates.push(res.data[i].dates);
        visits.push(res.data[i].visits);
      }
    });
    let chart = this.$echarts.init(this.$refs.myLine);
    chart.setOption({
      legend: {
        data: ["网站七日访问量"],
      },
      xAxis: {
        type: "category",
        data: dates,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "网站七日访问量",
          data: visits,
          type: "line",
          smooth: true,
        },
      ],
    });
  },
};
</script>

<style scoped>
.line-div {
  height: 500px;
  margin-top: 30px;
  width: 100%;
  animation: zoomIn 0.8s ease-in-out;
}
</style>
