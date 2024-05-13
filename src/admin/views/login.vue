<template>
  <!-- 后台登录 -->
  <div class="myCenter verify-container">
    <div class="verify-content">
      <div>
        <el-avatar :size="50" :src="avatar"></el-avatar>
      </div>
      <div>
        <el-input v-model="account">
          <template slot="prepend">账号</template>
        </el-input>
      </div>
      <div>
        <el-input v-model="password" type="password">
          <template slot="prepend">密码</template>
        </el-input>
      </div>
      <div>
        <proButton
          :info="'登录'"
          @click.native="login()"
          before="rgb(131, 123, 199)"
          after="linear-gradient(45deg, #f43f3b, #ec008c)"
        >
        </proButton>
      </div>
    </div>
  </div>
</template>

<script>
import proButton from "@/components/common/proButton.vue";
import { adminLogin, getUserInfo, logout } from "@/api/user";
import { getToken, removeToken, setToken } from "@/utils/tokenUtil";

export default {
  components: {
    proButton,
  },
  data() {
    return {
      redirect: this.$route.query.redirect,
      avatar: require("@/assets/avatar.jpg"),
      account: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (
        this.$common.isEmpty(this.account) ||
        this.$common.isEmpty(this.password)
      ) {
        this.$message({
          message: "请输入账号或密码!!!不能偷懒噢",
          type: "error",
        });
        return;
      }
      let data = {
        account: this.account,
        password: this.$common.encrypt(this.password),
      };
      // 如果当前存在Token 就要给他下线
      if (getToken()) {
        await logout();
        this.$store.commit("user/REMOVE_CURRENT_USER");
        removeToken();
      }
      adminLogin(data)
        .then((res) => {
          // 添加token
          setToken(res.data.token);
          this.$notify({
            type: "success",
            title: "尊贵的PLANET管理员：",
            message: "欢迎回来！！！💕",
          });
          // 获取用户信息
          getUserInfo().then((res) => {
            this.$store.commit("user/SET_CURRENT_USER", res.data);
            // 重定向到界面
            this.$router.push({ path: this.redirect });
          });
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
.verify-container {
  height: 100vh;
  background: url("@/assets/bg.png") center center / cover repeat;
}

.verify-content {
  background: var(--maxWhiteMask);
  padding: 30px 40px 5px;
  position: relative;
}

.verify-content > div:first-child {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: -25px;
}

.verify-content > div:not(:first-child) {
  margin: 25px 0;
}

.verify-content > div:last-child > div {
  margin: 0 auto;
}
</style>
