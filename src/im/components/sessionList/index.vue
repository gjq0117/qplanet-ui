<template>
  <!-- 会话列表 -->
  <div class="session-class">
    <div class="content-class">
      <span v-for="sessionItem in sessionList" :key="sessionItem.id">
        <session-item :session="sessionItem" />
      </span>
    </div>
  </div>
</template>

<script>
import sessionItem from "@/im/components/sessionList/sessionItem.vue";
import { getContactListPage } from "@/api/contact";

export default {
  components: { sessionItem },
  data() {
    return {
      sessionList: [],
      isLast: false,
      cursorPageParam: {
        pageSize: 20,
        cursor: null,
      },
    };
  },
  mounted() {
    this.getContactListPage();
  },
  methods: {
    getContactListPage() {
      getContactListPage()
        .then((res) => {
          this.sessionList = res.data.list;
          const curr = this.sessionList[0].roomId;
          //发送
          this.$EventBus.$emit("sendRoomId", curr);
          this.cursorPageParam.cursor = res.data.cursor;
          this.isLast = res.data.isLast;
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
  },
};
</script>

<style scoped>
.session-class {
  width: 250px;
  height: 100%;
  margin-left: 25px;
}

.content-class {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 96%;
  overflow-y: auto; /* 当内容溢出时显示垂直滚动条 */
}
</style>
