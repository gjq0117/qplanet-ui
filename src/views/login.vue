<template>
  <!-- 用户登录/注册 -->
  <div>
    <!-- 登陆和注册 -->
    <div class="myCenter in-up-container my-animation-hideToShow">
      <!-- 背景图片 -->
      <el-image
        class="my-el-image"
        style="position: absolute"
        :src="require('@/assets/login.jpg')"
        fit="cover"
      >
        <div slot="error" class="image-slot"></div>
      </el-image>
      <div class="in-up" id="loginAndRegist">
        <div class="form-container sign-up-container">
          <div class="myCenter">
            <h1>注册</h1>
            <input
              v-model="registerForm.username"
              type="text"
              maxlength="30"
              placeholder="用户名"
            />
            <input
              v-model="registerForm.password"
              type="password"
              maxlength="30"
              placeholder="密码"
            />
            <input
              v-model="registerForm.email"
              type="email"
              placeholder="邮箱"
            />
            <input
              v-model="registerForm.code"
              type="text"
              placeholder="验证码"
            />
            <a v-if="!send" style="margin: 0" href="#" @click="getCode"
              >获取验证码</a
            >
            <span v-else style="display: flex"
              ><countdown
                :second="waitTime"
                @clearTimer="send = false"
                style="margin-right: -10px"
              />秒后，可重新发送</span
            >

            <button v-if="!loading" @click="register()">注册</button>
            <div
              style="width: 50px; height: 50px; margin-top: 10px"
              v-else
              class="loading"
            ></div>
          </div>
        </div>
        <div class="form-container sign-in-container">
          <div class="myCenter">
            <h1>登录</h1>
            <input
              v-model="loginForm.account"
              type="text"
              placeholder="用户名/邮箱/手机号"
            />
            <input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
            />
            <a href="#" @click="modifyPwdVisible = true">忘记密码？</a>
            <div
              style="width: 50px; height: 50px"
              v-if="loading"
              class="loading"
            ></div>
            <button v-else @click="login()">登录</button>
          </div>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel myCenter overlay-left">
              <h1>已有帐号？</h1>
              <p>请登录🚀</p>
              <button class="ghost" @click="signIn()">登录</button>
            </div>
            <div class="overlay-panel myCenter overlay-right">
              <h1>没有帐号？</h1>
              <p>立即注册吧😃</p>
              <button class="ghost" @click="signUp()">注册</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改密码弹出框 -->
    <el-dialog
      title="找回密码"
      :visible.sync="modifyPwdVisible"
      width="20%"
      :append-to-body="true"
      :close-on-click-modal="false"
      :before-close="clearModifyForm"
      center
    >
      <el-form ref="modifyPwdForm" :model="modifyPwdForm" label-width="80px">
        <el-form-item label="邮箱">
          <el-input
            v-model="modifyPwdForm.email"
            type="email"
            placeholder="邮箱"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            v-model="modifyPwdForm.newPwd"
            type="password"
            placeholder="密码"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input
            v-model="modifyPwdForm.code"
            style="width: 150px; margin-right: 10px"
          ></el-input>
          <a
            v-if="!send"
            style="margin: 0; color: var(--black)"
            href="#"
            @click="getModifyCode"
            >获取验证码</a
          >
          <span v-else style="display: flex; width: 200px"
            ><countdown
              :second="waitTime"
              @clearTimer="send = false"
            />秒后，可重新发送</span
          >
        </el-form-item>
      </el-form>
      <el-button
        @click="submitModifyForm"
        type="primary"
        class="myCenter"
        style="margin-left: 40%"
        >提交</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import {
  getRegisterCode,
  register,
  userLogin,
  logout,
  getUserInfo,
  getModifyPwdCode,
  modifyPwd,
} from "@/api/user";
import countdown from "@/components/common/countdown.vue";
import { getToken, removeToken, setToken } from "@/utils/tokenUtil";

export default {
  components: { countdown },
  data() {
    return {
      // 是否发送了
      send: false,
      // 发送验证码后等待的时间（s）
      waitTime: 60,
      // 注册表单
      registerForm: {
        username: "",
        email: "",
        password: "",
        // 验证码
        code: "",
        // 随机码（发送邮箱后返回的）
        key: "",
      },
      loginForm: {
        // 账户（手机号/邮箱）
        account: "",
        password: "",
      },
      // 修改密码弹窗是否可见
      modifyPwdVisible: false,
      modifyPwdForm: {
        email: "",
        code: "",
        newPwd: "",
        key: "",
      },
      // 加载动画
      loading: false,
      redirect: this.$common.isEmpty(this.$route.query.redirect)
        ? "/"
        : this.$route.query.redirect,
    };
  },
  methods: {
    // 注册
    register() {
      this.$nextTick(() => {
        this.loading = true;
      });
      register(this.registerForm)
        .then(() => {
          this.$notify({
            type: "success",
            title: "提示",
            message: "恭喜您，注册成功！成为PLANET尊贵的会员😘",
          });
          this.signIn();
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: error.errMsg,
          });
        });
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    async login() {
      if (
        this.$common.isEmpty(this.loginForm.account) ||
        this.$common.isEmpty(this.loginForm.password)
      ) {
        this.$message({
          type: "warning",
          message: "要先填写账号或密码噢",
        });
        return;
      }
      this.$nextTick(() => {
        this.loading = true;
      });
      this.loginForm.password = this.$common.encrypt(this.loginForm.password);
      // 如果当前存在Token 就要给他下线
      if (getToken()) {
        await logout();
        this.$store.commit("user/REMOVE_CURRENT_USER");
        removeToken();
      }
      userLogin(this.loginForm)
        .then((res) => {
          // 添加token
          setToken(res.data.token);
          this.$notify({
            type: "success",
            title: "尊贵的PLANET会员：",
            message: "欢迎回来！！！PLANET更多乐趣等你来探索💕",
          });
          // 查询用户基本信息放到store
          getUserInfo().then((res) => {
            this.$store.commit("user/SET_CURRENT_USER", res.data);
            // 路由
            this.$router.push({ path: this.redirect });
          });
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: error.errMsg,
          });
          this.$nextTick(() => {
            this.loading = false;
          });
        });
    },
    clearModifyForm() {
      this.modifyPwdForm = {
        email: "",
        code: "",
        newPwd: "",
        key: "",
      };
      this.modifyPwdVisible = false;
    },
    // 提交修改表单
    submitModifyForm() {
      modifyPwd(this.modifyPwdForm).then(() => {
        this.$notify({
          type: "success",
          title: "提示",
          message: "恭喜您，修改密码成功！！！快来畅游PLANET吧~😍",
        });
        this.modifyPwdVisible = false;
      });
    },
    // 获取修改密码验证码
    getModifyCode() {
      if (
        this.$common.isEmpty(this.modifyPwdForm.email) ||
        this.$common.isEmpty(this.modifyPwdForm.newPwd)
      ) {
        this.$message({
          type: "warning",
          message: "请先填写好邮箱、新密码等信息",
        });
        return;
      }
      this.send = true;
      getModifyPwdCode(this.modifyPwdForm)
        .then((res) => {
          this.modifyPwdForm.key = res.data;
          this.$message({
            type: "success",
            message: "验证码发送成功！请注意查收~",
          });
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: error.errMsg,
          });
        });
    },
    // 获取邮箱验证码
    getCode() {
      if (
        this.$common.isEmpty(this.registerForm.username) ||
        this.$common.isEmpty(this.registerForm.password) ||
        this.$common.isEmpty(this.registerForm.email)
      ) {
        this.$message({
          type: "warning",
          message: "请先填写好用户名、密码、邮箱等信息",
        });
        return;
      }
      this.send = true;
      getRegisterCode(this.registerForm)
        .then((res) => {
          this.registerForm.key = res.data;
          this.$message({
            type: "success",
            message: "验证码发送成功！请注意查收~",
          });
        })
        .catch((error) => {
          this.$message({
            type: "warning",
            message: error.errMsg,
          });
        });
    },
    signUp() {
      document
        .querySelector("#loginAndRegist")
        .classList.add("right-panel-active");
    },
    signIn() {
      document
        .querySelector("#loginAndRegist")
        .classList.remove("right-panel-active");
    },
  },
};
</script>

<style scoped>
.in-up-container {
  height: 100vh;
  position: relative;
}

.in-up {
  opacity: 0.9;
  border-radius: 10px;
  box-shadow: 0 15px 30px var(--miniMask), 0 10px 10px var(--miniMask);
  position: relative;
  overflow: hidden;
  width: 750px;
  max-width: 100%;
  min-height: 450px;
  margin: 10px;
}

.in-up p {
  font-size: 14px;
  letter-spacing: 1px;
  margin: 20px 0 30px 0;
}

.in-up a {
  color: var(--black);
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.form-container {
  position: absolute;
  height: 100%;
  transition: all 0.5s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
}

.form-container div {
  background: var(--white);
  flex-direction: column;
  padding: 0 20px;
  height: 100%;
}

.form-container input {
  background: var(--maxLightGray);
  border-radius: 2px;
  border: none;
  padding: 12px 15px;
  margin: 10px 0;
  width: 100%;
  outline: none;
}

.in-up button {
  border-radius: 2rem;
  border: none;
  background: var(--lightRed);
  color: var(--white);
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 2px;
  cursor: pointer;
}

.in-up button:hover {
  animation: scale 0.8s ease-in-out;
}

.in-up button.ghost {
  background: transparent;
  border: 1px solid var(--white);
}

.sign-up-container button {
  margin-top: 20px;
}

.overlay-container {
  position: absolute;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.overlay {
  background: var(--gradualRed);
  color: var(--white);
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
}

.overlay-panel {
  position: absolute;
  top: 0;
  flex-direction: column;
  height: 100%;
  width: 50%;
  transition: all 0.5s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

.in-up.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.in-up.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.in-up.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
}

.in-up.right-panel-active .overlay {
  transform: translateX(50%);
}

.in-up.right-panel-active .overlay-left {
  transform: translateY(0);
}

.in-up.right-panel-active .overlay-right {
  transform: translateY(20%);
}
.loading {
  width: 50px;
  height: 50px;
  /* background: red; */
  /* 并排放置两个带边框的框，令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中 */
  box-sizing: border-box;
  border-radius: 50%;
  border-top: 10px solid #ff9900;
  position: relative;
  /* 动画 */
  animation: a1 2s linear infinite;
}
/* before和after在元素前面和后面添加内容 */
.loading::before,
.loading::after {
  content: "";
  width: 50px;
  height: 50px;
  /* background: red; */
  position: absolute;
  left: 0;
  top: -10px;
  /* 形成另外两个颜色弧 */
  box-sizing: border-box;
  border-radius: 50%;
}

.loading::before {
  border-top: 10px solid #ff99cc;
  transform: rotate(120deg);
}

.loading::after {
  border-top: 10px solid #ccff99;
  transform: rotate(240deg);
}

/* 文字 */
.loading span {
  position: absolute;
  height: 50px;
  width: 50px;
  /* 文字居中 */
  text-align: center;
  line-height: 50px;
  color: lightgrey;
  font-size: 5px;
  /* 动画 */
  animation: a2 2s linear infinite;
}

@keyframes a1 {
  to {
    transform: rotate(360deg);
  }
}
@keyframes a2 {
  to {
    transform: rotate(-360deg);
  }
}
</style>
