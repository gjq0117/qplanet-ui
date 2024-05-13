<template>
  <!-- 用户管理 -->
  <div>
    <!-- 操作 -->
    <div class="operation-class">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-form-item label="角色">
          <el-select
            v-model="searchFrom.userType"
            placeholder="选择角色"
            style="width: 200px; margin-right: 10px"
          >
            <el-option
              v-for="item in userTypeList"
              :key="item.type"
              :label="item.desc"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在线状态">
          <el-select
            v-model="searchFrom.isActive"
            placeholder="是否在线"
            style="width: 200px; margin-right: 10px"
          >
            <el-option
              v-for="item in ActiveStatusList"
              :key="item.status"
              :label="item.desc"
              :value="item.status"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select
            v-model="searchFrom.userStatus"
            placeholder="账号状态"
            style="width: 200px; margin-right: 10px"
          >
            <el-option
              v-for="item in userStatusList"
              :key="item.status"
              :label="item.desc"
              :value="item.status"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="searchFrom.gender"
            placeholder="选择性别"
            style="width: 200px; margin-right: 10px"
          >
            <el-option
              v-for="item in genderTypeList"
              :key="item.type"
              :label="item.desc"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            placeholder="请输入手机号"
            v-model="searchFrom.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            placeholder="请输入邮箱"
            v-model="searchFrom.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            placeholder="请输入用户名"
            v-model="searchFrom.username"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        border
        v-loading="loading"
        element-loading-text="正在玩命加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="currentPage"
        style="width: 100%"
      >
        <el-table-column label="用户名" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" min-width="90px">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" min-width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户类型">
          <template slot-scope="scope">
            <el-tag
              type="danger"
              v-if="scope.row.userType === $constant.userType.SUPER_ADMIN"
              >站长</el-tag
            >
            <el-tag
              type="success"
              v-if="scope.row.userType === $constant.userType.ADMIN"
              >管理员</el-tag
            >
            <el-tag v-if="scope.row.userType === $constant.userType.USER"
              >普通用户</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="性别" min-width="50px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.gender === 1">男</el-tag>
            <el-tag type="danger" v-if="scope.row.gender === 2">女</el-tag>
            <el-tag type="success" v-if="scope.row.gender === 0">未知</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-image :src="scope.row.avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="简介">
          <template slot-scope="scope">
            <span>{{ scope.row.introduction }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号创建时的IP" min-width="75px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <span style="font-size: 15px; margin-bottom: 10px"
                  >isp: {{ scope.row.ipInfo.createIpDetail.isp }}</span
                ><br />
                <span style="font-size: 15px"
                  >isp_id: {{ scope.row.ipInfo.createIpDetail.isp_id }}</span
                >
              </div>
              <span>{{ scope.row.ipInfo.createIp }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="账号创建时的地址" min-width="80px">
          <template slot-scope="scope">
            <span>{{
              scope.row.ipInfo.createIpDetail.country +
              "·" +
              scope.row.ipInfo.createIpDetail.region +
              "·" +
              scope.row.ipInfo.createIpDetail.city
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最新登录设备IP" min-width="75px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <span style="font-size: 15px; margin-bottom: 10px"
                  >isp: {{ scope.row.ipInfo.updateIpDetail.isp }}</span
                ><br />
                <span style="font-size: 15px"
                  >isp_id: {{ scope.row.ipInfo.updateIpDetail.isp_id }}</span
                >
              </div>
              <span>{{ scope.row.ipInfo.updateIp }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="最新登录的地址" min-width="80px">
          <template slot-scope="scope">
            <span>{{
              scope.row.ipInfo.updateIpDetail.country +
              "·" +
              scope.row.ipInfo.updateIpDetail.region +
              "·" +
              scope.row.ipInfo.updateIpDetail.city
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号状态" min-width="70px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.userStatus === 1 ? 'success' : 'danger'"
              ><span>{{
                scope.row.userStatus === 1 ? "正常" : "冻结"
              }}</span></el-tag
            >
            <el-switch
              style="margin-left: 5px"
              @change="changeUserStatus(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="scope.row.userStatus"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否在线" min-width="50px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isActive === 1 ? 'success' : 'info'"
              ><span>{{
                scope.row.isActive === 1 ? "在线" : "离线"
              }}</span></el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="最后的上线事件" min-width="90px">
          <template slot-scope="scope">
            <span>{{ scope.row.lastActiveTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号创建时间" min-width="90px">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isActive === 1"
              type="warning"
              size="mini"
              @click="forceOffline(scope.row)"
              >强制下线</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-class myCenter">
      <my-pagination
        @changeCurrentPage="changeCurrentPage"
        :tableList="totalData"
      ></my-pagination>
    </div>
  </div>
</template>

<script>
import { changeUserStatus, getUserList, logoutByUid } from "@/api/user";
import myPagination from "@/admin/components/myPagination/index.vue";

export default {
  components: { myPagination },
  data() {
    return {
      loading: true,
      currentPage: [],
      totalData: [],
      searchFrom: {
        userType: null,
        isActive: null,
        userStatus: null,
        gender: null,
        phone: "",
        email: "",
        username: "",
      },
      // 用户类型列表
      userTypeList: [],
      // 在线状态
      ActiveStatusList: [],
      // 账号状态
      userStatusList: [],
      // 性别
      genderTypeList: [],
    };
  },
  created() {
    this.init();
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      getUserList(this.searchFrom)
        .then((res) => {
          this.totalData = res.data;
          this.loading = false;
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    // 改变用户状态
    changeUserStatus(row) {
      if (row.userStatus === 0) {
        // 正常的
        this.$confirm(
          "尊贵的管理员，你确定要将用户名为【" +
            row.username +
            "】的账号【冻结】？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            changeUserStatus(row.id, row.userStatus).then(() => {
              this.$message({
                type: "success",
                message: "操作成功",
              });
            });
          })
          .catch(() => {
            row.userStatus = 1;
          });
      } else if (row.userStatus === 1) {
        // 冻结的
        this.$confirm(
          "尊贵的管理员，你确定要【解封】用户名为【" +
            row.username +
            "】的账号？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            changeUserStatus(row.id, row.userStatus).then(() => {
              this.$message({
                type: "success",
                message: "操作成功",
              });
            });
          })
          .catch(() => {
            row.userStatus = 0;
          });
      }
    },
    // 强制下线
    forceOffline(row) {
      this.$confirm(
        "尊贵的管理员，你确定要将用户名为【" +
          row.username +
          "】的账号【强制下线】？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        logoutByUid(row.id)
          .then(() => {
            this.$message({
              type: "success",
              message: "操作成功",
            });
          })
          .catch();
      });
    },
    // 分页
    changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },
    init() {
      // 用户类型
      this.userTypeList.push({
        type: this.$constant.userType.SUPER_ADMIN,
        desc: "站长",
      });
      this.userTypeList.push({
        type: this.$constant.userType.ADMIN,
        desc: "管理员",
      });
      this.userTypeList.push({
        type: this.$constant.userType.USER,
        desc: "普通用户",
      });
      // 在线状态
      this.ActiveStatusList.push({ status: 0, desc: "离线" });
      this.ActiveStatusList.push({ status: 1, desc: "在线" });
      // 账号状态
      this.userStatusList.push({ status: 0, desc: "冻结" });
      this.userStatusList.push({ status: 1, desc: "正常" });
      // 性别
      this.genderTypeList.push({ type: 0, desc: "薛定谔的猫" });
      this.genderTypeList.push({ type: 1, desc: "男" });
      this.genderTypeList.push({ type: 2, desc: "女" });
    },
  },
};
</script>

<style scoped>
.operation-class {
  display: flex;
  height: 50px;
  margin-bottom: 20px;
}
</style>
