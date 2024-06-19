<template>
  <!-- 联系人详情 -->
  <div class="contact-info-class">
    <div v-if="userInfo">
      <!-- 联系人信息 -->
      <div class="content-class">
        <div class="avatar-class">
          <!-- 头像 -->
          <el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
          <el-badge
            is-dot
            class="online-badge"
            :type="userInfo.isActive ? 'success' : 'info'"
          ></el-badge>
        </div>
        <!-- 基础信息 -->
        <div class="info-class">
          <!-- 姓名 -->
          <div class="name-class">
            <!-- 特别关心 -->
            <span v-if="userInfo.isCare"
              ><i class="iconfont guanzhugongzuo"
            /></span>
            <span v-if="userInfo.remark">({{ userInfo.remark }})</span>
            <span>{{ userInfo.nickname }}</span>
          </div>
          <!-- 其他信息 -->
          <div class="other-info-class">
            <div>
              uid:<span>{{ userInfo.uid }}</span>
            </div>
            <div>
              性别:
              <i
                v-if="!userInfo.gender || userInfo.gender === 0"
                class="iconfont xingbie-weizhi"
              />
              <i v-if="userInfo.gender === 1" class="iconfont nan" />
              <i v-if="userInfo.gender === 2" class="iconfont nanxing" />
            </div>
            <div>
              地区:<span>{{ userInfo.locPlace }}</span>
            </div>
          </div>
        </div>
        <div class="more-option-class">
          <el-tooltip effect="dark" placement="right-start">
            <div slot="content" class="tooltip-content-class">
              <div v-if="!userInfo.isCare" @click="toCare">
                <span>特别关心</span>
              </div>
              <div v-else @click="cancelCare">
                <span>取消关心</span>
              </div>
              <div @click="openDialog"><span>设置备注</span></div>
            </div>
            <span>...</span>
          </el-tooltip>
        </div>
      </div>

      <!-- 操作区域 -->
      <div class="option-class">
        <el-button type="primary">发消息</el-button>
        <el-button type="danger" @click="delFriend">删除联系人</el-button>
      </div>
    </div>

    <!-- 备注弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="10%"
      :modal="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      :show-close="false"
      top="25vh"
    >
      <div class="remark-class">
        <el-input placeholder="写下你给TA的备注..." v-model="remark" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="putRemark()" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  cancelFriendCare,
  deleteFriend,
  getFriendDetailed,
  putFriendRemark,
  putFriendToCare,
} from "@/api/userFriend";

export default {
  data() {
    return {
      dialogVisible: false,
      userInfo: undefined,
      remark: "",
    };
  },
  methods: {
    // 删除好友
    delFriend() {
      this.$confirm("你确定要将TA移除你的好友列表？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteFriend(this.userInfo.uid)
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.userInfo = undefined;
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message: error.errMsg,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    // 取消特别关心
    cancelCare() {
      this.$confirm("你确定不在继续关注TA？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cancelFriendCare(this.userInfo.uid)
            .then((res) => {
              this.$message({
                type: "success",
                message: "设置成功",
              });
              // 更新用户信息
              this.getFriend(this.userInfo.uid);
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message: error.errMsg,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    // 设置成特别关心
    toCare() {
      this.$confirm("你确定要将TA设置为特别关心？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
          putFriendToCare(this.userInfo.uid)
            .then((res) => {
              this.$message({
                type: "success",
                message: "设置成功",
              });
              // 更新用户信息
              this.getFriend(this.userInfo.uid);
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message: error.errMsg,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    // 打开弹出框
    openDialog() {
      this.dialogVisible = true;
      this.remark = this.userInfo.remark;
    },
    // 添加备注
    putRemark() {
      putFriendRemark({ uid: this.userInfo.uid, remark: this.remark })
        .then((res) => {
          this.$message({
            type: "success",
            message: "设置成功",
          });
          // 更新用户信息
          this.getFriend(this.userInfo.uid);
          // 关闭弹窗
          this.dialogVisible = false;
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    getFriend(uid) {
      getFriendDetailed(uid)
        .then((res) => {
          this.userInfo = res.data;
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: error.errMsg,
          });
        });
    },
  },
  mounted() {
    this.$EventBus.$on("openInfo", (userInfo) => {
      // 去后端查询好友详情信息
      this.getFriend(userInfo.uid);
    });
    this.$EventBus.$on("closeInfo", () => {
      this.userInfo = undefined;
    });
  },
  beforeDestroy() {
    this.$EventBus.$off("openInfo");
    this.$EventBus.$off("closeInfo");
  },
};
</script>

<style scoped>
.contact-info-class {
  width: 100%;
  background-color: #3c4152;
  display: table-cell;
  vertical-align: middle;
}

.content-class {
  margin: auto;
  margin-top: 30px;
  display: flex;
  padding: 10px;
  height: 120px;
  width: 450px;
  border-bottom: 1px #8c959d solid;
}

.avatar-class {
  position: relative;
}

.info-class {
  margin-left: 10px;
}

.name-class {
  color: white;
  padding-top: 5px;
  font-size: 20px;
  width: 220px;
  white-space: nowrap; /* 强制文本不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号代替溢出内容 */
}

.other-info-class {
  padding-top: 3px;
  color: #8c959d;
}

.other-info-class div {
  margin-top: 5px;
  display: flex;
}

.online-badge {
  bottom: 6px;
  right: 6px;
}

.more-option-class {
  position: absolute;
  color: white;
  margin-left: 415px;
}

.more-option-class :hover {
  cursor: pointer;
}

.tooltip-content-class div {
  padding: 5px;
  font-size: 15px;
}

.tooltip-content-class div :hover {
  cursor: pointer;
  color: #56b6c2;
}

.option-class {
  margin: auto;
  margin-top: 30px;
  padding-left: 100px;
  display: flex;
  width: 400px;
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
  //padding: 10px;
  //margin: 0 20%;
}
</style>
