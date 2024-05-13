<template>
  <!-- 分类管理 -->
  <div>
    <!-- 操作 -->
    <div class="operation-class">
      <el-input
        v-model="searchKey"
        placeholder="请输入要查询内容..."
        style="width: 300px; margin-right: 50px"
      ></el-input>
      <el-button type="primary" @click="dialogVisible = true"
        >新增分类</el-button
      >
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
        <el-table-column label="分类名">
          <template slot-scope="scope">
            <el-tag
              ><span>{{ scope.row.sortName }}</span></el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="分类描述">
          <template slot-scope="scope">
            <span>{{ scope.row.sortDescription }}</span>
          </template>
        </el-table-column>
        <el-table-column label="背景图片" width="150px">
          <template slot-scope="scope">
            <el-image :src="scope.row.sortImg" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="格言">
          <template slot-scope="scope">
            <span>{{ scope.row.motto }}</span>
          </template>
        </el-table-column>
        <el-table-column label="此分类下的标签数">
          <template slot-scope="scope">
            <span>{{ scope.row.labelNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="此分类下的文章数">
          <template slot-scope="scope">
            <span>{{ scope.row.articleNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="优先级（数字越小的在前面）">
          <template slot-scope="scope">
            <span>{{ scope.row.priority }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
        :tableList="sortList"
      ></my-pagination>
    </div>
    <el-dialog
      :title="isEdit ? '编辑分类' : '新增分类'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form ref="form" :model="sortInfo" label-width="130px">
        <el-form-item label="分类名">
          <el-input v-model="sortInfo.sortName"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="sortInfo.sortDescription"></el-input>
        </el-form-item>
        <el-form-item label="背景图片">
          <el-upload
            style="width: 100px"
            action=""
            :show-file-list="false"
            :http-request="uploadImg"
          >
            <el-image :src="sortInfo.sortImg" fit="fill"> </el-image>
          </el-upload>
        </el-form-item>
        <el-form-item label="格言">
          <el-input v-model="sortInfo.motto"></el-input>
        </el-form-item>
        <el-form-item label="权重(不能小于0)">
          <el-input v-model="sortInfo.priority"></el-input>
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
import { insertOne, list, deleteById, update, searchByKey } from "@/api/sort";

export default {
  components: {
    myPagination,
  },
  data() {
    return {
      searchKey: "",
      dialogVisible: false,
      isEdit: false,
      loading: true,
      sortList: [],
      currentPage: [],
      sortInfo: {
        id: undefined,
        sortName: "",
        sortDescription: "",
        sortImg: "",
        motto: "",
        labelNum: 0,
        articleNum: 0,
        priority: 0,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 上传图片
    async uploadImg(params) {
      this.sortInfo.sortImg = await this.$common.uploadFile(
        params.file,
        this.$constant.FILE_UPLOAD_SCENE_BLOG
      );
    },
    // 改变当前也
    changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },
    // 获取列表信息
    getList() {
      this.loading = true;
      list().then((res) => {
        this.sortList = res.data;
        this.loading = false;
      });
    },
    // 修改
    handleEdit(row) {
      this.isEdit = true;
      this.dialogVisible = true;
      // 回显表体
      this.sortInfo = row;
    },
    // 删除
    handleDelete(row) {
      this.$confirm(
        "确定要删除名为：《" +
          row.sortName +
          "》的标签吗？在这样做的话会同时导致该分类下的所有标签都一并删除噢！！！",
        "危险提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      )
        .then(() => {
          deleteById(row.id)
            .then(() => {
              this.getList();
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message: error.errMsg,
              });
            });
        })
        .catch(() => {});
    },
    // 表单提交
    submit() {
      if (this.isEdit) {
        // 更新
        update(this.sortInfo)
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
              message: error.errMsg,
            });
          });
      } else {
        // 新增
        insertOne(this.sortInfo)
          .then(() => {
            this.$message({
              type: "success",
              message: "新增成功",
            });
            this.getList();
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: error.errMsg,
            });
          });
      }
      this.init();
    },
    // 初始化信息
    init() {
      this.dialogVisible = false;
      this.sortInfo = {
        id: undefined,
        sortName: "",
        sortDescription: "",
        articleNum: 0,
        priority: 0,
      };
      this.isEdit = false;
    },
  },
  watch: {
    searchKey(newVal) {
      searchByKey(newVal).then((res) => {
        this.sortList = res.data;
        this.loading = false;
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
.table-class {
}
.pagination-class {
  margin-top: 50px;
}
</style>
