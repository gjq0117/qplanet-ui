<template>
  <!-- 在线信息 -->
  <div class="item-class">
    <div class="content-class">
      <!-- 头像 -->
      <el-tooltip effect="dark" placement="right-start">
        <div slot="content">
          <div class="tooltip-content-class">
            <div>
              <span>@ 艾特TA</span>
            </div>
            <div @click="dialogVisible = true">
              <span v-if="!friend">+ 加好友</span>
            </div>
          </div>
        </div>
        <div class="avatar-class" @mouseenter="operation(userInfo.uid)">
          <el-avatar :size="30" :src="userInfo.avatar"></el-avatar>
          <el-badge
            is-dot
            class="online-badge"
            :type="userInfo.isActive ? 'success' : 'info'"
          ></el-badge>
        </div>
      </el-tooltip>
      <!-- 姓名 -->
      <div class="name-class">{{ userInfo.nickname }}</div>
    </div>

    <!-- 添加好友弹出框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="15%"
      :modal="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="remark-class">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="留个申请问候吧..."
          v-model="friendApply.remark"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitApply()" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isFriend } from "@/api/userFriend";
import { friendApply } from "@/api/userApply";

export default {
  props: {
    userInfo: {
      type: Object,
    },
  },
  data() {
    return {
      dialogVisible: false,
      currentUser: this.$store.state.user.currentUser,
      friend: false,
      uid: undefined,
      friendApply: {
        // 申请人id
        uid: undefined,
        // 备注
        remark: "",
        // 申请目标id
        targetId: null,
      },
    };
  },
  methods: {
    operation(uid) {
      this.uid = uid;
      isFriend(uid)
        .then((res) => {
          this.friend = res.data;
        })
        .catch();
    },
    submitApply() {
      // 提交好友申请
      this.friendApply.uid = this.currentUser.uid;
      this.friendApply.targetId = this.uid;
      friendApply(this.friendApply)
        .then((res) => {
          this.$message({
            type: "success",
            message: "申请成功",
          });
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: error.errMsg,
          });
        });
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
.item-class {
  width: 200px;
}

.item-class :hover {
  cursor: pointer;
  background-color: lightslategray;
}

.content-class {
  display: flex;
  padding: 10px;
  align-items: center; /* 垂直居中 */
}

.avatar-class {
  position: relative;
}

.online-badge {
  position: absolute;
  bottom: 0;
  right: 0;
}

.name-class {
  margin-left: 10px;
  font-size: 15px;
  color: white;
  white-space: nowrap; /* 强制文本不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号代替溢出内容 */
}

.tooltip-content-class div {
  padding: 3px;
  font-size: 15px;
}

.tooltip-content-class div :hover {
  color: #56b6c2;
  cursor: pointer;
}

.remark-class >>> .el-textarea__inner {
  background-color: #2c3e50 !important;
  color: white;
}

/* 覆盖默认的背景颜色 */
.el-dialog__wrapper /deep/ .el-dialog {
  background-color: #333746;
}

/* 覆盖标题样式 */
::v-deep .el-dialog__header {
  display: none;
}

/* 覆盖内容区域样式 */
::v-deep .el-dialog__body {
  padding: 5px;
}

/* 覆盖脚部按钮区域样式 */
::v-deep .el-dialog__footer {
}
</style>
