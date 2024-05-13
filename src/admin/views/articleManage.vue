<template>
  <!-- 文章管理 -->
  <div>
    <!-- 操作 -->
    <div class="operation-class">
      <el-select
        v-model="searchFrom.sortId"
        placeholder="选择分类"
        style="width: 200px; margin-right: 10px"
      >
        <el-option
          v-for="sort in sortList"
          :key="sort.id"
          :label="sort.sortName"
          :value="sort.id"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="searchFrom.viewStatus"
        placeholder="是否可见"
        style="width: 150px; margin-right: 10px"
      >
        <el-option
          v-for="item in ViewOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="searchFrom.commentStatus"
        placeholder="是否启用评论"
        style="width: 150px; margin-right: 10px"
      >
        <el-option
          v-for="item in commentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="searchFrom.recommendStatus"
        placeholder="是否推荐"
        style="width: 150px; margin-right: 10px"
      >
        <el-option
          v-for="item in recommendOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入文章名或作者名等信息..."
        style="width: 300px; margin-right: 10px"
        v-model="searchFrom.searchKey"
      ></el-input>
      <el-button
        icon="el-icon-search"
        type="primary"
        size="medium"
        style="height: 40px; width: 100px; margin-right: 10px"
        @click="search"
        >搜索</el-button
      >
      <el-button
        icon="el-icon-delete-solid"
        size="medium"
        style="height: 40px; width: 100px"
        @click="resetSearch"
        >重置</el-button
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
        <el-table-column label="作者">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章标题">
          <template slot-scope="scope">
            <span>{{ scope.row.articleTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.sortResp.sortDescription"
              placement="top"
            >
              <el-tag v-if="scope.row.sortResp.sortName" type="success">{{
                scope.row.sortResp.sortName
              }}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            <span v-for="label in scope.row.labelList" :key="label.id">
              <el-tooltip
                class="item"
                effect="dark"
                :content="label.labelDescription"
                placement="top"
              >
                <el-tag style="margin-right: 5px">
                  {{ label.labelName }}
                </el-tag>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量">
          <template slot-scope="scope">
            <span>{{ scope.row.viewCount ? scope.row.viewCount : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点赞数">
          <template slot-scope="scope">
            <span>{{ scope.row.likeCount ? scope.row.likeCount : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论数">
          <template slot-scope="scope">
            <span>{{
              scope.row.commentCount ? scope.row.commentCount : 0
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === $constant.articleStatus.SAVE">
              已保存
            </el-tag>
            <el-tag
              v-if="scope.row.status === $constant.articleStatus.PUBLISH"
              type="success"
            >
              已发布
            </el-tag>
            <el-tag
              v-if="scope.row.status === $constant.articleStatus.REMOVE_SHELVES"
              type="warning"
            >
              已下架
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.articleCover"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="是否可见">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.viewStatus ? 'success' : 'danger'"
              style="margin-right: 5px"
            >
              <span>{{ scope.row.viewStatus ? "是" : "否" }}</span>
            </el-tag>
            <el-switch
              @change="
                changeViewStatus(
                  scope.row,
                  $constant.articleAttrStatus.VIEW_STATUS
                )
              "
              v-model="scope.row.viewStatus"
              :disabled="
                scope.row.status === $constant.articleStatus.REMOVE_SHELVES
              "
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否启用评论">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.commentStatus ? 'success' : 'danger'"
              style="margin-right: 5px"
            >
              <span>{{ scope.row.commentStatus ? "是" : "否" }}</span>
            </el-tag>
            <el-switch
              @change="
                changeCommentStatus(
                  scope.row,
                  $constant.articleAttrStatus.COMMENT_STATUS
                )
              "
              v-model="scope.row.commentStatus"
              :disabled="
                scope.row.status === $constant.articleStatus.REMOVE_SHELVES
              "
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.recommendStatus ? 'success' : 'danger'"
              style="margin-right: 5px"
            >
              <span>{{ scope.row.recommendStatus ? "是" : "否" }}</span>
            </el-tag>
            <el-switch
              @change="
                changeRecommendStatus(
                  scope.row,
                  $constant.articleAttrStatus.RECOMMEND_STATUS
                )
              "
              v-model="scope.row.recommendStatus"
              :disabled="
                scope.row.status === $constant.articleStatus.REMOVE_SHELVES
              "
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后更新时间">
          <template slot-scope="scope">
            <span>{{
              !$common.isEmpty(scope.row.updateTime)
                ? scope.row.updateTime
                : scope.row.createTime
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间">
          <template slot-scope="scope">
            <span v-if="scope.row.status === $constant.articleStatus.PUBLISH">{{
              scope.row.publishTime
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              type="warning"
              size="mini"
              @click="removeShelves(scope.row)"
              >下架
            </el-button>
            <el-button
              v-if="scope.row.status === 0"
              type="primary"
              size="mini"
              plain
              @click="goEdit(scope.row)"
              >去编辑
            </el-button>
            <el-button
              v-if="scope.row.status === 2"
              type="primary"
              size="mini"
              plain
              @click="goEdit(scope.row)"
              >重新编辑
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
  </div>
</template>

<script>
import myPagination from "@/admin/components/myPagination/index.vue";
import { list } from "@/api/sort";
import {
  getArticleList,
  changeArticleStatus,
  removeShelves,
  searchArticleList,
} from "@/api/article";

export default {
  components: { myPagination },
  data() {
    return {
      loading: true,
      // 当前页面数据
      currentPage: [],
      totalList: [],
      // 查询表单
      searchFrom: {
        viewStatus: undefined,
        commentStatus: undefined,
        recommendStatus: undefined,
        sortId: undefined,
        searchKey: "",
      },
      // 分类列表
      sortList: [],
      // 可见参数
      ViewOptions: [
        {
          value: true,
          label: "可见",
        },
        {
          value: false,
          label: "不可见",
        },
      ],
      // 是否启用评论
      commentOptions: [
        {
          value: true,
          label: "启用评论",
        },
        {
          value: false,
          label: "不启用评论",
        },
      ],
      recommendOptions: [
        {
          value: true,
          label: "推荐",
        },
        {
          value: false,
          label: "不推荐",
        },
      ],
    };
  },
  created() {
    this.getArticleList();
    this.getSortList();
  },
  methods: {
    // 跳转编辑页面
    goEdit(row) {
      this.$router.push({
        path: "/writeArticle",
        query: { articleId: row.id },
      });
    },
    // 获取分类列表
    getSortList() {
      list().then((res) => {
        this.sortList = res.data;
      });
    },
    // 搜索
    search() {
      this.loading = true;
      searchArticleList(this.searchFrom).then((res) => {
        this.totalList = res.data;
        this.loading = false;
      });
    },
    // 重置输入框内容
    resetSearch() {
      this.searchFrom = {
        viewStatus: undefined,
        commentStatus: undefined,
        recommendStatus: undefined,
        sortId: undefined,
        searchKey: "",
      };
      this.getArticleList();
    },
    // 改变可见状态
    changeViewStatus(row, type) {
      const msg =
        "确定要修改可见状态为：" + (row.viewStatus ? "可见" : "不可见");
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          changeArticleStatus(row.id, row.viewStatus, type).then(
            this.$message({
              type: "success",
              message: "修改成功",
            })
          );
        })
        .catch(() => {
          row.viewStatus = !row.viewStatus;
        });
    },
    // 改变评论状态
    changeCommentStatus(row, type) {
      const msg =
        "确定要修改评论状态为：" + (row.commentStatus ? "可评论" : "不可评论");
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          changeArticleStatus(row.id, row.commentStatus, type).then(
            this.$message({
              type: "success",
              message: "修改成功",
            })
          );
        })
        .catch(() => {
          row.commentStatus = !row.commentStatus;
        });
    },
    // 改变推荐状态
    changeRecommendStatus(row, type) {
      const msg =
        "确定要修改评论状态为：" + (row.recommendStatus ? "推荐" : "不推荐");
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          changeArticleStatus(row.id, row.recommendStatus, type).then(
            this.$message({
              type: "success",
              message: "修改成功",
            })
          );
        })
        .catch(() => {
          row.recommendStatus = !row.recommendStatus;
        });
    },
    // 获取文章列表
    getArticleList() {
      getArticleList().then((res) => {
        this.totalList = res.data;
        this.loading = false;
      });
    },
    // 下架
    removeShelves(row) {
      this.$confirm(
        "确定要下架名为《" + row.articleTitle + "》的文章吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          removeShelves(row.id).then(() => {
            this.$message({
              type: "success",
              message: "下架成功",
            });
            this.getArticleList();
          });
        })
        .catch(() => {});
    },
    // 分页响应
    changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
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
