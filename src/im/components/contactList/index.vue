<template>
  <!-- 联系人列表 -->
  <div class="contact-list-class">
    <div class="content-class">
      <el-collapse class="collapse-class" accordion @change="changeCollapse">
        <el-collapse-item title="新的朋友" name="1">
          <div
            class="scrollable-content"
            v-infinite-scroll="applyListLoad"
            infinite-scroll-immediate="false"
            :infinite-scroll-disabled="applyListIsLast"
          >
            <div v-for="apply in applyList" :key="apply.id">
              <friend-apply :apply-user="apply" />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="特别关心" name="2">
          <div
            class="scrollable-content"
            v-infinite-scroll="careListLoad"
            infinite-scroll-immediate="false"
            :infinite-scroll-disabled="careListIsLast"
          >
            <div v-for="care in careList" :key="care.id">
              <contact-item :user-info="care" />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="联系人" name="3">
          <div
            class="scrollable-content"
            v-infinite-scroll="friendListLoad"
            infinite-scroll-immediate="false"
            :infinite-scroll-disabled="friendListIsLast"
          >
            <div v-for="friend in friendList" :key="friend.id">
              <contact-item :user-info="friend" />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import contactItem from "@/im/components/contactList/contactItem.vue";
import friendApply from "@/im/components/contactList/friendApply.vue";
import { getFriendApplyList } from "@/api/userApply";
import { loadUserSummerListCache } from "@/utils/storage";
import { pageCareFriendInfo, pageFriendInfo } from "@/api/userFriend";

export default {
  components: { contactItem, friendApply },
  data() {
    return {
      // 好友申请列表
      applyList: [],
      applyListIsLast: false,
      applyListReq: {
        pageSize: 10,
        cursor: undefined,
        currUid: this.$store.state.user.currentUser.uid,
      },
      // 好友列表
      friendList: [],
      friendListIsLast: false,
      friendListReq: {
        pageSize: 10,
        cursor: undefined,
        currUid: this.$store.state.user.currentUser.uid,
      },
      // 特别关系列表
      careList: [],
      careListIsLast: false,
      careListReq: {
        pageSize: 10,
        cursor: undefined,
        currUid: this.$store.state.user.currentUser.uid,
      },
    };
  },
  mounted() {},
  methods: {
    changeCollapse(value) {
      if (Number(value) === 1) {
        if (this.applyList.length === 0) {
          // 只有第一次才去后端查找
          this.openNewFriend();
        }
      } else if (Number(value) === 2) {
        if (this.careList.length === 0) {
          this.openCare();
        }
      } else if (Number(value) === 3) {
        if (this.friendList.length === 0) {
          this.openContact();
        }
      }
      this.$EventBus.$emit("closeInfo");
    },
    // 打开新的朋友
    openNewFriend() {
      getFriendApplyList(this.applyListReq)
        .then((res) => {
          if (res.data.list && res.data.list.length > 0) {
            this.applyListIsLast = res.data.isLast;
            this.buildResp(this.applyListReq, res.data).then((data) => {
              this.applyList = this.applyList.concat(data);
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    // 申请列表滚动加载
    applyListLoad() {
      this.openNewFriend();
    },
    // 打开特别关心
    openCare() {
      pageCareFriendInfo(this.careListReq)
        .then((res) => {
          if (res.data.list && res.data.list.length > 0) {
            this.careListIsLast = res.data.isLast;
            this.buildResp(this.careListReq, res.data).then((data) => {
              this.careList = this.careList.concat(data);
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    careListLoad() {
      this.openCare();
    },
    // 打开联系人
    openContact() {
      pageFriendInfo(this.friendListReq)
        .then((res) => {
          if (res.data.list && res.data.list.length > 0) {
            this.friendListIsLast = res.data.isLast;
            this.buildResp(this.friendListReq, res.data).then((data) => {
              this.friendList = this.friendList.concat(data);
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    friendListLoad() {
      this.openContact();
    },
    async buildResp(req, resp) {
      req.cursor = resp.cursor;
      let uidList = [];
      resp.list.forEach((data) => {
        uidList.push(data.uid);
      });
      let respList;
      await loadUserSummerListCache(uidList).then((data) => {
        respList = resp.list;
        this.$common.assignForList(respList, data);
      });
      return respList;
    },
  },
};
</script>

<style scoped>
.contact-list-class {
  width: 300px;
  height: 100%;
  margin-left: 15px;
}

.content-class {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  height: 96%;
  overflow-y: hidden;
}

.scrollable-content {
  height: 550px; /* 设置一个固定的高度 */
  overflow-y: auto; /* 允许 Y 轴方向滚动 */
}

::v-deep .collapse-class {
  border: none;
}

::v-deep .collapse-class .el-collapse-item__header {
  background-color: #474b5f;
  color: white;
}

::v-deep .collapse-class .el-collapse-item__content {
  background-color: #474b5f;
}

::v-deep .collapse-class .el-collapse-item__wrap {
  border-bottom: 1px white solid;
}
</style>
