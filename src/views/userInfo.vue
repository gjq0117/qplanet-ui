<template>
  <!-- 个人中心 -->
  <div class="user-container myCenter my-animation-hideToShow">
    <!-- 背景图片 -->
    <el-image
      class="my-el-image"
      style="position: absolute"
      :src="require('@/assets/login.jpg')"
      fit="cover"
    >
      <div slot="error" class="image-slot"></div>
    </el-image>
    <div class="shadow-box-mini user-info" style="display: flex">
      <div class="user-left">
        <div>
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadAvatar"
            ><el-avatar
              class="user-avatar"
              :size="60"
              :src="
                this.currentUser.avatar
                  ? this.currentUser.avatar
                  : defaultAvatar
              "
            ></el-avatar
          ></el-upload>
        </div>
        <div class="myCenter" style="margin-top: 12px">
          <div class="user-title">
            <div>用户名：</div>
            <div>昵称：</div>
            <div>手机号：</div>
            <div>邮箱：</div>
            <div>性别：</div>
            <div>简介：</div>
          </div>
          <div class="user-content">
            <div>
              <el-input
                maxlength="30"
                v-model="currentUser.username"
                placeholder="输入用户名"
              ></el-input>
            </div>
            <div>
              <el-input
                maxlength="30"
                v-model="currentUser.nickname"
                placeholder="输入昵称"
              ></el-input>
            </div>
            <div>
              <div>
                <el-input
                  placeholder="绑定手机号"
                  maxlength="20"
                  v-model="currentUser.phone"
                ></el-input>
              </div>
            </div>
            <div>
              <div v-if="!$common.isEmpty(currentUser.email)">
                {{ currentUser.email }}
              </div>
              <div v-else>
                <el-input
                  placeholder="绑定邮箱"
                  maxlength="20"
                  v-model="currentUser.email"
                ></el-input>
              </div>
            </div>
            <div>
              <el-radio-group v-model="currentUser.gender">
                <el-radio :label="0" style="margin-right: 10px"
                  >薛定谔的猫</el-radio
                >
                <el-radio :label="1" style="margin-right: 10px">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </div>
            <div>
              <el-input
                v-model="currentUser.introduction"
                maxlength="60"
                type="textarea"
                show-word-limit
              ></el-input>
            </div>
          </div>
        </div>
        <div>
          <el-button
            type="primary"
            style="margin-top: 20px"
            @click="submitUserInfo"
            >提交</el-button
          >
        </div>
      </div>
      <div class="user-right"></div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, modifyUserInfo } from "@/api/user";

export default {
  data() {
    return {
      defaultAvatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      currentUser: this.$store.state.user.currentUser,
    };
  },
  methods: {
    // 提交用户信息
    submitUserInfo() {
      modifyUserInfo(this.currentUser)
        .then(() => {
          this.$message({
            type: "success",
            message: "修改用户信息成功",
          });
          getUserInfo().then((res) => {
            this.$store.commit("user/SET_CURRENT_USER", res.data);
          });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    // 上传头像
    async uploadAvatar(params) {
      this.currentUser.avatar = await this.$common.uploadFile(
        params.file,
        this.$constant.FILE_UPLOAD_SCENE_USER
      );
    },
  },
};
</script>

<style scoped>
.user-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.user-info {
  width: 80%;
  z-index: 10;
  margin-top: 70px;
  height: calc(100vh - 90px);
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.user-left {
  width: 50%;
  background: var(--maxMaxWhiteMask);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 20px;
}

.user-right {
  width: 50%;
  background: var(--maxWhiteMask);
  padding: 20px;
}

.user-title {
  text-align: right;
  user-select: none;
}

.user-content {
  text-align: left;
}

.user-title div {
  height: 55px;
  line-height: 55px;
  text-align: center;
}

.user-content > div {
  height: 55px;
  display: flex;
  align-items: center;
}

.user-content >>> .el-input__inner,
.user-content >>> .el-textarea__inner {
  border: none;
  background: var(--whiteMask);
}

.user-content >>> .el-input__count {
  background: var(--transparent);
  user-select: none;
}

.changeInfo {
  color: var(--white);
  font-size: 0.75rem;
  cursor: pointer;
  background: var(--themeBackground);
  padding: 3px;
  border-radius: 0.2rem;
  user-select: none;
}

@media screen and (max-width: 920px) {
  .user-info {
    width: 90%;
  }

  .user-left {
    width: 100%;
  }

  .user-right {
    display: none;
  }
}
</style>
