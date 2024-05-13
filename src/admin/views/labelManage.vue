<template>
  <!-- 标签管理 -->
  <div>
    <div class="operation-class">
      <el-input
        v-model="searchKey"
        placeholder="请输入要查询内容..."
        style="width: 300px; margin-right: 50px"
      ></el-input>
      <el-button type="primary" @click="dialogVisible = true"
        >新增标签</el-button
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
        <el-table-column label="标签所属分类">
          <template slot-scope="scope">
            <el-popover placement="top-start" trigger="hover">
              <p>分类描述：{{ scope.row.sortResp.sortDescription }}</p>
              <p>分类文章数：{{ scope.row.sortResp.articleNum }}</p>
              <div slot="reference" style="width: 100px">
                <el-tag size="medium">{{ scope.row.sortResp.sortName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="标签名">
          <template slot-scope="scope">
            <el-tag type="warning"
              ><span>{{ scope.row.labelName }}</span></el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="标签描述">
          <template slot-scope="scope">
            <span>{{ scope.row.labelDescription }}</span>
          </template>
        </el-table-column>
        <el-table-column label="此标签下的文章数">
          <template slot-scope="scope">
            <span>{{ scope.row.articleNum }}</span>
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
        :tableList="totalList"
      ></my-pagination>
    </div>
    <el-dialog
      :title="isEdit ? '编辑标签' : '新增标签'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form ref="form" :model="labelInfo" label-width="130px">
        <el-form-item label="标签名">
          <el-input v-model="labelInfo.labelName"></el-input>
        </el-form-item>
        <el-form-item label="标签描述">
          <el-input v-model="labelInfo.labelDescription"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select
            v-model="labelInfo.sortId"
            placeholder="请选择..."
            @change="$set(labelInfo, 'sortId', $event)"
          >
            <el-option
              v-for="sort in sortList"
              :key="sort.id"
              :label="sort.sortName"
              :value="sort.id"
            >
            </el-option>
          </el-select>
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
import {
  insertOne,
  getLabelList,
  update,
  getById,
  deleteById,
  searchByKey,
} from "@/api/label";
import { list } from "@/api/sort";
import myPagination from "@/admin/components/myPagination/index.vue";

export default {
  components: { myPagination },
  data() {
    return {
      dialogVisible: false,
      searchKey: "",
      loading: false,
      totalList: [],
      currentPage: [],
      sortList: [],
      isEdit: false,
      labelInfo: {
        id: undefined,
        sortId: undefined,
        labelName: "",
        labelDescription: "",
        articleNum: 0,
      },
    };
  },
  created() {
    // 获取分类列表
    this.getSortList();
    this.getList();
  },
  methods: {
    getSortList() {
      list().then((res) => {
        this.sortList = res.data;
      });
    },
    getList() {
      // 获取标签列表
      this.loading = true;
      getLabelList().then((res) => {
        this.totalList = res.data;
        this.loading = false;
      });
    },
    handleEdit(row) {
      getById(row.id).then((res) => {
        res.data.sortId = res.data.sortResp.id;
        this.labelInfo = res.data;
      });
      this.dialogVisible = true;
      this.isEdit = true;
    },
    handleDelete(row) {
      deleteById(row.id).then(() => {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getList();
      });
    },
    // 分页操作
    changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },
    submit() {
      if (this.isEdit) {
        // 修改
        update(this.labelInfo).then(() => {
          this.getList();
        });
      } else {
        // 新增
        insertOne(this.labelInfo).then(() => {
          this.$message({
            type: "success",
            message: "新增成功",
          });
          this.getList();
        });
      }
      this.init();
    },
    init() {
      this.labelInfo = {
        id: undefined,
        sortId: undefined,
        labelName: "",
        labelDescription: "",
        articleNum: 0,
      };
      this.isEdit = false;
      this.dialogVisible = false;
      this.loading = false;
    },
  },
  watch: {
    searchKey(newVal) {
      searchByKey(newVal).then((res) => {
        this.totalList = res.data;
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
</style>
