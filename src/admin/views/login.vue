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
          :info="'提交'"
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
import { adminLogin } from "@/api/user";
import { setToken } from "@/utils/tokenUtil";

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
    login() {
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
      adminLogin(data)
        .then((res) => {
          // 重定向去欢迎界面
          if (res.success) {
            // 添加token
            setToken(res.data);
            this.$router.push({ path: this.redirect });
          }
        })
        .catch((error) => {
          console.log(error);
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
