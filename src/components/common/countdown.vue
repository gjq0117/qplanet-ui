<template>
  <!-- 倒计时 -->
  <div>{{ remainingTime }}</div>
</template>

<script>
export default {
  props: {
    second: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      endTime: 0,
      remainingTime: this.second,
      timer: null,
    };
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.remainingTime = Math.ceil((this.endTime - Date.now()) / 1000);
      }, 1000);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  created() {
    this.endTime = Date.now() + 1000 * this.second;
    this.startTimer();
  },
  watch: {
    remainingTime(newVal) {
      if (newVal <= 0) {
        this.clearTimer();
        this.$emit("clearTimer");
      }
    },
  },
  beforeDestroy() {
    this.clearTimer();
  },
};
</script>

<style scoped></style>
