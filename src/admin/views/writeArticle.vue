<template>
  <!-- 写文章 -->
  <div>
    <el-tag effect="dark" class="my-tag">
      <svg
        viewBox="0 0 1024 1024"
        width="20"
        height="20"
        style="vertical-align: -3px"
      >
        <path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01"></path>
        <path
          d="M682.666667 204.8h238.933333a34.133333 34.133333 0 0 1 34.133333 34.133333v648.533334a68.266667 68.266667 0 0 1-68.266666 68.266666h-204.8V204.8z"
          fill="#FFAA44"
        ></path>
        <path
          d="M68.266667 921.6a34.133333 34.133333 0 0 0 34.133333 34.133333h785.066667a68.266667 68.266667 0 0 1-68.266667-68.266666V102.4a34.133333 34.133333 0 0 0-34.133333-34.133333H102.4a34.133333 34.133333 0 0 0-34.133333 34.133333v819.2z"
          fill="#11AA66"
        ></path>
        <path
          d="M238.933333 307.2a34.133333 34.133333 0 0 0 0 68.266667h136.533334a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h409.6a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h204.8a34.133333 34.133333 0 1 0 0-68.266667H238.933333z"
          fill="#FFFFFF"
        ></path>
      </svg>
      文章信息
    </el-tag>
    <el-form
      :model="article"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="articleTitle">
        <el-input v-model="article.articleTitle"></el-input>
      </el-form-item>
      <el-form-item label="视频链接" prop="videoUrl">
        <el-input v-model="article.videoUrl"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="articleContent">
        <mavon-editor
          ref="md"
          @imgAdd="imgAdd"
          v-model="article.articleContent"
        />
      </el-form-item>
      <el-form-item label="是否可见" prop="viewStatus">
        <el-tag
          :type="article.viewStatus ? 'success' : 'danger'"
          disable-transitions
          style="margin-right: 10px"
        >
          {{ article.viewStatus ? "是" : "否" }}
        </el-tag>
        <el-switch v-model="article.viewStatus"></el-switch>
      </el-form-item>
      <el-form-item label="是否启用评论" prop="commentStatus">
        <el-tag
          :type="article.commentStatus ? 'success' : 'danger'"
          disable-transitions
          style="margin-right: 10px"
        >
          {{ article.commentStatus ? "是" : "否" }}
        </el-tag>
        <el-switch v-model="article.commentStatus"></el-switch>
      </el-form-item>
      <el-form-item label="是否推荐" prop="recommendStatus">
        <el-tag
          :type="article.recommendStatus ? 'success' : 'danger'"
          disable-transitions
          style="margin-right: 10px"
        >
          {{ article.recommendStatus ? "是" : "否" }}
        </el-tag>
        <el-switch v-model="article.recommendStatus"></el-switch>
      </el-form-item>
      <el-form-item label="封面" prop="articleCover">
        <el-tooltip effect="dark" content="点击上传封面" placement="right">
          <el-upload
            :show-file-list="false"
            style="width: 200px"
            action=""
            :http-request="uploadCover"
          >
            <el-image style="margin-left: 10px" :src="article.articleCover">
            </el-image>
          </el-upload>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="分类" prop="sortId">
        <el-select
          style="width: 300px"
          v-model="article.sortId"
          placeholder="请选择分类"
          @change="sortChange"
        >
          <el-option
            v-for="item in sortList"
            :key="item.id"
            :label="item.sortName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="labelId">
        <el-select
          style="width: 300px"
          v-model="article.labelIdList"
          multiple
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in labelList"
            :key="item.id"
            :label="item.labelName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="myCenter" style="margin-bottom: 22px">
      <el-button type="info" @click="save()">保存</el-button>
      <el-button type="primary" @click="publish()">发布</el-button>
    </div>
  </div>
</template>

<script>
import { list } from "@/api/sort";
import { getListBySortId } from "@/api/label";
import { saveArticle, publishArticle, getEditArticleById } from "@/api/article";

export default {
  data() {
    return {
      articleId: this.$route.query.articleId,
      article: {
        id: undefined,
        articleTitle: "",
        videoUrl: "",
        articleContent: "",
        //是否启用评论 0:否  1:是
        commentStatus: true,
        recommendStatus: false,
        viewStatus: true,
        // 封面
        articleCover: "",
        sortId: undefined,
        labelIdList: [],
      },
      sortList: [],
      labelList: [],
    };
  },
  created() {
    list().then((res) => {
      this.sortList = res.data;
    });
    // 获取文章信息
    if (!this.$common.isEmpty(this.articleId)) {
      getEditArticleById(this.articleId).then((res) => {
        this.article = res.data;
        if (!this.$common.isEmpty(this.article.sortId)) {
          getListBySortId(this.article.sortId).then((res) => {
            this.labelList = res.data;
          });
        }
      });
    }
  },
  methods: {
    // 文章保存
    save() {
      saveArticle(this.article)
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.$router.push({ path: "/articleManage" });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    // 文章发布
    publish() {
      publishArticle(this.article)
        .then(() => {
          this.$message({
            type: "success",
            message: "发布成功",
          });
          this.$router.push({ path: "/articleManage" });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    // 选择分类
    sortChange() {
      this.article.labelIdList = [];
      getListBySortId(this.article.sortId).then((res) => {
        this.labelList = res.data;
      });
    },
    // 笔记上传图片
    async imgAdd(pos, file) {
      const url = await this.$common.uploadFile(
        file,
        this.$constant.FILE_UPLOAD_SCENE_BLOG
      );
      this.$refs.md.$img2Url(pos, url);
    },
    // 上传封面
    async uploadCover(params) {
      this.article.articleCover = await this.$common.uploadFile(
        params.file,
        this.$constant.FILE_UPLOAD_SCENE_BLOG
      );
    },
  },
};
</script>

<style scoped>
.my-tag {
  margin-bottom: 20px !important;
  width: 100%;
  text-align: left;
  background: var(--lightYellow);
  border: none;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: var(--black);
}
</style>
