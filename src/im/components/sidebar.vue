<template>
  <!-- 侧边选项 -->
  <div class="side-class">
    <!-- 消息 -->
    <el-avatar
      :size="50"
      class="avatar-class"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    ></el-avatar>
    <!-- 消息 -->
    <el-badge :value="12" class="item">
      <div @click="clickMsg" :class="{ selected: curr === 0 }">
        <i class="iconfont xiaoxi"></i>
      </div>
    </el-badge>

    <!-- 联系人 -->
    <el-badge :value="12" class="item">
      <div @click="clickContact" :class="{ selected: curr === 1 }">
        <i class="iconfont a-049_lianxiren"></i></div
    ></el-badge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curr: this.$store.state.chat.imCurrOption,
    };
  },
  created() {},
  methods: {
    clickMsg() {
      this.curr = 0;
      this.$store.commit("chat/SET_IM_CURR_OPTION", this.curr);
      this.$router.push({ path: "/im/" });
    },
    clickContact() {
      this.curr = 1;
      this.$store.commit("chat/SET_IM_CURR_OPTION", this.curr);
      this.$router.push({ path: "/im/contact" });
    },
  },
};
</script>
<style scoped>
.side-class {
  height: 100%;
  padding: 10px;
}
.side-class div {
  margin-top: 10px;
}
.side-class div :hover {
  background-color: #dddddd;
  border-radius: 10px;
  cursor: pointer;
}
.selected {
  background-color: #dddddd;
  border-radius: 10px;
}
.iconfont {
  margin-top: 10px;
  font-size: 50px;
}
.avatar-class {
}
</style>
