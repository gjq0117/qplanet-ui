<template>
  <div>
    <div class="emoji-item" v-for="(emoji, index) in emojis" :key="index">
      <span @click="sendEmoji(emoji)">{{ emoji }}</span>
    </div>
  </div>
</template>

<script>
import { emojis } from "@/utils/emojis";
import index from "vuex";
export default {
  computed: {
    index() {
      return index;
    },
  },
  data() {
    return {
      emojis,
    };
  },
  methods: {
    sendEmoji(emoji) {
      this.$EventBus.$emit("addTextEmoji", emoji);
    },
  },
  beforeDestroy() {
    this.$EventBus.$off("sendEmoji");
  },
};
</script>

<style scoped>
.emoji-item {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
}
.emoji-item :hover {
  cursor: pointer;
}
</style>
