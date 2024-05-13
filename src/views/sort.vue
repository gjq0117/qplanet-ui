<template>
  <div>
    <loader :loading="loading">
      <!-- 加载页面 -->
      <template slot="loader">
        <div>
          <ring-loading></ring-loading>
        </div>
      </template>
      <template slot="body">
        <!-- 分类 -->
        <div>
          <!--背景图-->
          <div class="my-animation-slide-top">
            <sort-bg-img :sortInfo="sortPageInfo.sortResp"></sort-bg-img>
          </div>
          <!-- 内容 -->
          <div
            style="background: var(--background); padding-top: 40px"
            class="my-animation-slide-bottom"
          >
            <!-- 标签 -->
            <div
              class="sort-warp shadow-box"
              v-if="sortPageInfo && sortPageInfo.labelResp"
            >
              <div
                v-for="(label, index) in sortPageInfo.labelResp"
                :key="index"
                :class="{
                  isActive:
                    !$common.isEmpty(labelId) && parseInt(labelId) === label.id,
                }"
                @click="changeLabel(label)"
              >
                <my-tag
                  :info="label.labelName"
                  :color="
                    $constant.tag_color_list[
                      Math.floor(
                        Math.random() * $constant.tag_color_list.length
                      )
                    ]
                  "
                  style="margin: 12px"
                >
                </my-tag>
              </div>
            </div>
            <!-- 文章 -->
            <div class="article-wrap">
              <articleList :articleList="currentArticleList"></articleList>
              <div class="pagination-wrap">
                <div
                  @click="pageArticles()"
                  class="pagination"
                  v-if="pagination.total !== currentArticleList.length"
                >
                  下一页
                </div>
                <div v-else style="user-select: none">~~到底啦~~</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </loader>
  </div>
</template>

<script>
import sortBgImg from "@/components/common/sortBgImg.vue";
import myTag from "@/components/common/myTag.vue";
import articleList from "@/components/articleList/index.vue";

import { getSortPageResp } from "@/api/sort";
import loader from "@/components/common/loader.vue";
import ringLoading from "@/components/common/ringLoading.vue";

export default {
  components: {
    ringLoading,
    loader,
    sortBgImg,
    myTag,
    articleList,
  },
  data() {
    return {
      sortId: this.$route.query.sortId,
      labelId: this.$route.query.labelId,
      sortPageInfo: {
        sortResp: {},
        labelResp: [],
        articleRespList: [],
      },
      // 当前页内容
      currentArticleList: [],
      // 所有文章内容的副本
      tempArticleList: [],
      pagination: {
        page: 0,
        size: 5,
        total: 100,
      },
      loading: true,
    };
  },
  created() {
    this.getSortPage(this.sortId, this.labelId);
  },
  methods: {
    getSortPage(sortId, labelId) {
      getSortPageResp(sortId, labelId)
        .then((res) => {
          this.sortPageInfo = res.data;
          this.tempArticleList = this.sortPageInfo.articleRespList;
          // 初始化分页
          this.initPagination();
          this.loading = false;
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.errMsg,
          });
        });
    },
    initPagination() {
      this.pagination.page = 0;
      this.pagination.total = this.tempArticleList.length;
      this.currentArticleList = this.tempArticleList.slice(
        this.pagination.page * this.pagination.size,
        this.pagination.page * this.pagination.size + this.pagination.size
      );
    },
    changeLabel(label) {
      const labelId = label.id;
      // 过滤信息
      this.tempArticleList = this.sortPageInfo.articleRespList.filter((a) => {
        let label = a.labelList.find((value) => {
          return value.id === labelId;
        });
        return !this.$common.isEmpty(label);
      });
      this.initPagination();
    },
    // 点击下一页
    pageArticles() {
      this.pagination.page = this.pagination.page + 1;
      this.currentArticleList = this.tempArticleList.slice(
        0,
        this.pagination.page * this.pagination.size + this.pagination.size
      );
    },
  },
  watch: {
    $route(to, from) {
      this.getSortPage(to.query.sortId, to.query.labelId);
    },
  },
};
</script>

<style scoped>
.sort-warp {
  width: 70%;
  max-width: 780px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
}

.article-wrap {
  width: 70%;
  margin: 40px auto;
  min-height: 600px;
}

.isActive {
  animation: scale 1.5s ease-in-out infinite;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.pagination {
  padding: 13px 15px;
  border: 1px solid var(--lightGray);
  border-radius: 3rem;
  color: var(--greyFont);
  width: 100px;
  user-select: none;
  cursor: pointer;
  text-align: center;
}

.pagination:hover {
  border: 1px solid var(--themeBackground);
  color: var(--themeBackground);
  box-shadow: 0 0 5px var(--themeBackground);
}

@media screen and (max-width: 900px) {
  .sort-warp {
    width: 90%;
  }

  .article-wrap {
    width: 90%;
  }
}
</style>
