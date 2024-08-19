<template>
  <!-- 机器人管理 -->
  <div>
    <!-- 操作 -->
    <div class="operation-class">
      <!--      <el-input-->
      <!--        v-model="searchKey"-->
      <!--        placeholder="请输入要查询内容..."-->
      <!--        style="width: 300px; margin-right: 50px"-->
      <!--      ></el-input>-->
      <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    </div>
    <!-- 表格 -->
    <div class="table-class">
      <el-table
        border
        v-loading="loading"
        element-loading-text="正在玩命加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="currentPage"
        style="width: 100%"
      >
        <el-table-column label="模型名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="150px">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.avatar"
              :src="scope.row.avatar"
              fit="fill"
            ></el-image>
            <span v-else>未上传</span>
          </template>
        </el-table-column>
        <el-table-column label="模型">
          <template slot-scope="scope">
            <span>{{ scope.row.model }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模型温度">
          <template slot-scope="scope">
            <span>{{ scope.row.temperature }}</span>
          </template>
        </el-table-column>
        <el-table-column label="api_key">
          <template slot-scope="scope">
            <span>{{ scope.row.apiKey }}</span>
          </template>
        </el-table-column>
        <el-table-column label="base_url">
          <template slot-scope="scope">
            <span>{{ scope.row.baseUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column label="今日调用次数">
          <template slot-scope="scope">
            <span>{{
              scope.row.todayReplyNum ? scope.row.todayReplyNum : 0
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总共调用次数">
          <template slot-scope="scope">
            <span>{{
              scope.row.totalReplyNum ? scope.row.totalReplyNum : 0
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="今日回答失败次数">
          <template slot-scope="scope">
            <span>{{
              scope.row.todayFailNum ? scope.row.todayFailNum : 0
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总共回答失败次数">
          <template slot-scope="scope">
            <span>{{
              scope.row.totalFailNum ? scope.row.totalFailNum : 0
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="今日剩余次数">
          <template slot-scope="scope">
            <span>{{
              scope.row.totalResidue ? scope.row.totalResidue : 0
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="响应成功率(%)">
          <template slot-scope="scope">
            <span>{{ scope.row.successRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-tag :type="scope.row.enabled === 1 ? 'success' : 'danger'"
              ><span>{{ scope.row.enabled === 1 ? "是" : "否" }}</span></el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后修改时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="130">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-class myCenter">
      <my-pagination
        @changeCurrentPage="changeCurrentPage"
        :tableList="aiList"
      ></my-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      :title="isEdit ? '编辑' : '新增'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form ref="form" :model="aiInfo" label-width="130px">
        <el-form-item label="模型昵称">
          <el-input v-model="aiInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="模型头像">
          <el-upload
            style="width: 100px"
            action=""
            :show-file-list="false"
            :http-request="uploadImg"
          >
            <el-image
              v-if="aiInfo.avatar"
              :src="aiInfo.avatar"
              fit="fill"
            ></el-image>
            <el-button v-else type="text">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="model">
          <el-input v-model="aiInfo.model"></el-input>
        </el-form-item>
        <el-form-item label="apiKey">
          <el-input v-model="aiInfo.apiKey"></el-input>
        </el-form-item>
        <el-form-item label="baseUrl">
          <el-input v-model="aiInfo.baseUrl"></el-input>
        </el-form-item>
        <el-form-item label="温度（0~1之间）">
          <el-input v-model="aiInfo.temperature"></el-input>
        </el-form-item>
        <el-form-item label="每日上限次数">
          <el-input v-model="aiInfo.dailyLimitNum"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="aiInfo.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="init">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myPagination from "@/admin/components/myPagination/index.vue";
import { getRobotList, update, deleteById, add } from "@/api/robot";

export default {
  components: { myPagination },
  data() {
    return {
      searchKey: "",
      dialogVisible: false,
      loading: false,
      currentPage: [],
      aiList: [],
      isEdit: false,
      aiInfo: {
        id: undefined,
        name: "",
        model: "",
        avatar: "",
        temperature: 0.7,
        apiKey: "",
        baseUrl: "",
        enabled: 1,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      getRobotList()
        .then((res) => {
          this.aiList = res.data;
          this.loading = false;
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "Ai列表请求错误：" + error.errMsg,
          });
        });
    },
    handleEdit(row) {
      this.isEdit = true;
      this.dialogVisible = true;
      this.aiInfo = row;
    },
    handleDelete(row) {
      this.$confirm("确定要删除吗", "危险操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          deleteById(row.id)
            .then((res) => {
              this.getList();
              this.$message({
                type: "success",
                message: "删除成功！",
              });
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message: "删除失败：" + error.errMsg,
              });
            });
        })
        .catch(() => {});
    },
    changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },
    async uploadImg(params) {
      this.aiInfo.avatar = await this.$common.uploadFile(
        params.file,
        this.$constant.FILE_UPLOAD_SCENE_USER
      );
    },
    submit() {
      if (this.isEdit) {
        // 修改
        update(this.aiInfo)
          .then(() => {
            this.$message({
              type: "success",
              message: "更新成功",
            });
            this.getList();
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: "更新机器人信息失败：" + error.errMsg,
            });
          });
      } else {
        //新增
        add(this.aiInfo)
          .then((res) => {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.getList();
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: "新增机器人信息失败：" + error.errMsg,
            });
          });
      }
      this.dialogVisible = false;
    },
    init() {
      this.dialogVisible = false;
      this.aiInfo = {
        id: undefined,
        name: "",
        avatar: "",
        temperature: 0,
        apiKey: "",
        baseUrl: "",
        enabled: 1,
      };
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
  margin-top: 50px;
}
</style>
