<template>
  <div class="announcement background-opacity">
    <i class="fa fa-volume-up" aria-hidden="true"></i>
    <div>
      <div v-for="(notice, index) in notices" :key="index">
        {{ notice }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // notices: ["我是一条网站通知", "这个网站还在还在继续努力构建哦"],
    };
  },
  computed: {
    notices() {
      let noticeList = this.$store.state.system.webInfo.noticeList;
      let notices = [];
      for (let i = 0; i < noticeList.length; i++) {
        notices.push(noticeList[i].value);
      }
      return notices;
    },
  },
};
</script>

<style scoped>
.announcement {
  padding: 22px;
  border: 1px dashed var(--lightGray);
  color: var(--greyFont);
  border-radius: 10px;
  display: flex;
  margin: 40px auto 40px;
}

.announcement i {
  color: var(--themeBackground);
  font-size: 22px;
  margin: auto 0;
  animation: scale 0.8s ease-in-out infinite;
}

.announcement div div {
  margin-left: 20px;
  line-height: 30px;
}
</style>
