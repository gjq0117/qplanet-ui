<template>
  <!-- 好友申请 -->
  <div class="apply-class" @click="openDetailedInfo">
    <div class="avatar-class">
      <el-avatar :size="40" :src="applyUser.avatar"></el-avatar>
    </div>
    <div class="info-class">
      <div class="info-text" style="font-size: 12px; font-weight: bold">
        <el-tooltip
          effect="dark"
          :content="applyUser.nickname"
          placement="left-start"
          ><span>{{ applyUser.nickname }}</span>
        </el-tooltip>
      </div>
      <div class="info-text" style="font-size: 11px">
        <el-tooltip
          effect="dark"
          :content="applyUser.remark"
          placement="left-start"
        >
          <span>{{ applyUser.remark }}</span>
        </el-tooltip>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="operation-class">
      <el-button
        v-if="applyUser.status === 0"
        class="operation-button-class"
        type="primary"
        size="mini"
        @click.stop="agree(applyUser.uid)"
        >同意</el-button
      >
      <el-button
        v-if="applyUser.status === 0"
        class="operation-button-class"
        type="danger"
        size="mini"
        @click.stop="reject(applyUser.uid)"
        >拒绝</el-button
      >
      <span v-if="applyUser.status === 1">已同意</span>
      <span v-if="applyUser.status === 2">已拒绝</span>
    </div>
  </div>
</template>

<script>
import { agreeFriendApply, rejectFriendApply } from "@/api/userApply";

export default {
  props: {
    applyUser: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    openDetailedInfo() {},
    agree(uid) {
      agreeFriendApply(uid)
        .then((res) => {
          this.$props.applyUser.status = 1;
          this.$forceUpdate();
          this.$message({
            type: "success",
            message: "已同意",
          });
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: error.errMsg,
          });
        });
    },
    reject(uid) {
      rejectFriendApply(uid)
        .then((res) => {
          this.$props.applyUser.status = 2;
          this.$forceUpdate();
          this.$message({
            type: "success",
            message: "已拒绝",
          });
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: error.errMsg,
          });
        });
    },
  },
};
</script>

<style scoped>
.apply-class {
  display: flex;
  align-items: center; /* 垂直居中 */
  width: 100%;
  padding: 5px;
}

.apply-class :hover {
  cursor: pointer;
}

.info-class {
  width: 75px;
  margin-left: 5px;
  color: white;
}

.info-text {
  white-space: nowrap; /* 强制文本不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号代替溢出内容 */
}
.info-text :hover {
  cursor: pointer;
}
.operation-class {
  margin-left: 5px;
}
.operation-class span {
  margin-left: 35px;
  color: lightgray;
}
.operation-button-class {
  height: 20px;
  width: 35px;
  padding: 0;
}
</style>
