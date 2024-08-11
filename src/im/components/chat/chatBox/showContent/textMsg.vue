<template>
  <!-- 文本消息 -->
  <div
    class="msg-bubble-class"
    :class="{
      'left-msg-bubble-class': !self,
      'right-msg-bubble-class': self,
    }"
  >
    <!--    {{ msgBody.content }}-->
    <span style="color: white" v-html="msgBody.content"></span>
  </div>
</template>

<script>
export default {
  props: {
    self: {
      type: Boolean,
      require: true,
    },
    msgBody: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      currUid: this.$store.state.user.currentUser.uid,
    };
  },
  mounted() {
    const atElementList = document.getElementsByClassName("at-class");
    for (let i = 0; i < atElementList.length; i++) {
      let uidNode = atElementList[i].attributes.uid;
      if (uidNode && Number(uidNode.nodeValue) === this.currUid) {
        // 添加高亮样式
        atElementList[i].style.background = "#6a6e7c";
      }
    }
  },
};
</script>

<style scoped>
.msg-bubble-class {
  max-width: 600px;
  background-color: #414141;
  padding: 10px;
}

.left-msg-bubble-class {
  float: left;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.right-msg-bubble-class {
  float: right;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>
