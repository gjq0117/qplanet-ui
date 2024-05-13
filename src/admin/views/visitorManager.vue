<template>
  <!-- 网站访问管理 -->
  <div>
    <!-- 操作 -->
    <div class="operation-class">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-form-item label="省份">
          <el-select
            v-model="searchFrom.province"
            placeholder="选择省份"
            style="width: 200px; margin-right: 10px"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="访问类型">
          <el-select
            v-model="searchFrom.type"
            placeholder="选择类型"
            style="width: 200px; margin-right: 10px"
          >
            <el-option
              v-for="item in visitTypeList"
              :key="item.type"
              :label="item.desc"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            placeholder="用户名"
            v-model="searchFrom.username"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
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
        :data="currentList"
        style="width: 100%"
      >
        <el-table-column label="用户名" min-width="50px">
          <template slot-scope="scope">
            <el-tag type="info" v-if="!scope.row.username">匿名用户</el-tag>
            <el-tag type="success" v-else>{{ scope.row.username }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="IP" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column label="国家" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.nation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="省份" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.province }}</span>
          </template>
        </el-table-column>
        <el-table-column label="城市" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.city }}</span>
          </template>
        </el-table-column>
        <el-table-column label="访问资源类型" min-width="50px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.resourceType === 0" type="primary"
              >博客网</el-tag
            >
            <el-tag v-if="scope.row.resourceType === 1" type="success"
              >博客文章</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="访问资源名" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.resourceName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="访问时间" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-class myCenter">
      <my-pagination
        @changeCurrentPage="changeCurrentPage"
        :tableList="totalList"
      ></my-pagination>
    </div>
  </div>
</template>

<script>
import myPagination from "@/admin/components/myPagination/index.vue";
import { getProvinceList, getVisitorList } from "@/api/visitor";

export default {
  components: { myPagination },
  data() {
    return {
      searchFrom: {
        province: "",
        type: null,
        username: "",
      },
      loading: true,
      provinceList: [],
      visitTypeList: [],
      currentList: [],
      totalList: [],
    };
  },
  created() {
    this.init();
    this.getProvinceList();
    this.getVisitorList();
  },
  methods: {
    // 获取访问信息列表
    getVisitorList() {
      getVisitorList(this.searchFrom)
        .then((res) => {
          this.totalList = res.data;
          this.loading = false;
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    // 获取省份信息
    getProvinceList() {
      getProvinceList(this.searchFrom)
        .then((res) => {
          this.provinceList = res.data;
        })
        .catch();
    },
    // 查询
    search() {
      this.getVisitorList();
    },
    reset() {
      this.searchFrom = {
        province: "",
        type: null,
        username: "",
      };
      this.getVisitorList();
    },
    // 分页
    changeCurrentPage(currentList) {
      this.currentList = currentList;
    },
    init() {
      this.visitTypeList.push({
        type: 0,
        desc: "博客网",
      });
      this.visitTypeList.push({
        type: 1,
        desc: "博客文章",
      });
    },
  },
};
</script>

<style scoped>
.operation-class {
  height: 50px;
  margin-bottom: 20px;
}
.pagination-class {
  margin-top: 20px;
}
</style>
