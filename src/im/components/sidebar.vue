<template>
  <!-- 侧边选项 -->
  <div class="side-class">
    <!-- 头像 -->
    <el-avatar :size="50" class="avatar-class" :src="avatar"></el-avatar>
    <!-- 菜单区域 -->
    <div class="menu-class">
      <!-- 消息 -->
      <el-badge :value="0" :hidden="true" :max="99" class="item">
        <div
          class="menu-item-class"
          @click="clickMsg"
          :class="{ selected: curr === 0 }"
        >
          <i class="iconfont xiaoxi"></i>
        </div>
      </el-badge>

      <!-- 联系人 -->
      <el-badge :value="0" :hidden="true" :max="99" class="item">
        <div
          class="menu-item-class"
          @click="clickContact"
          :class="{ selected: curr === 1 }"
        >
          <i class="iconfont a-049_lianxiren"></i>
        </div>
      </el-badge>
      <!-- 首页 -->
      <div class="menu-item-class" @click="toIndex">
        <i class="iconfont shouye" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curr: this.$store.state.chat.imCurrOption,
      avatar: this.$store.state.user.currentUser.avatar,
    };
  },
  created() {},
  methods: {
    // 去首页
    toIndex() {
      this.$router.push({ path: "/" });
    },
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

.menu-class {
  margin-top: 10px;
}

.menu-item-class {
  margin-top: 10px;
}

.menu-item-class :hover {
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
