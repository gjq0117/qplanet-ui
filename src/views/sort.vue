<template>
  <!-- 分类 -->
  <div>
    <!--背景图-->
    <div class="my-animation-slide-top">
      <sort-bg-img></sort-bg-img>
    </div>
    <!-- 内容 -->
    <div
      style="background: var(--background); padding-top: 40px"
      class="my-animation-slide-bottom"
    >
      <!-- 标签 -->
      <div class="sort-warp shadow-box" v-if="sortInfo && sortInfo.labels">
        <div
          v-for="(label, index) in sortInfo.labels"
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
                Math.floor(Math.random() * $constant.tag_color_list.length)
              ]
            "
            style="margin: 12px"
          >
          </my-tag>
        </div>
      </div>
      <!-- 文章 -->
      <div class="article-wrap">
        <articleList :articleList="articles"></articleList>
        <div class="pagination-wrap">
          <div
            @click="pageArticles()"
            class="pagination"
            v-if="pagination.total !== articles.length"
          >
            下一页
          </div>
          <div v-else style="user-select: none">~~到底啦~~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sortBgImg from "@/components/common/sortBgImg.vue";
import myTag from "@/components/common/myTag.vue";
import articleList from "@/components/articleList/index.vue";

export default {
  components: {
    sortBgImg,
    myTag,
    articleList,
  },
  data() {
    return {
      sortId: this.$route.params.sortId,
      labelId: null,
      sortInfo: {
        labels: [
          {
            id: 0,
            labelName: "java",
          },
          {
            id: 1,
            labelName: "mysql",
          },
          {
            id: 2,
            labelName: "redis",
          },
        ],
      },
      articles: [
        {
          id: 0,
          articleCover: require("@/assets/bg.png"),
          hasVideo: false,
          createTime: "2024-04-12",
          articleTitle: "母猪产后护理",
          viewCount: 999,
          commentCount: 155,
          likeCount: 666,
          articleContent:
            "这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
          sortId: 1,
          sort: {
            name: "分类1",
          },
          labelId: 1,
          label: {
            id: 1,
            labelName: "labelName",
          },
        },
        {
          id: 0,
          articleCover: require("@/assets/bg.png"),
          hasVideo: false,
          createTime: "2024-04-12",
          articleTitle: "母猪产后护理",
          viewCount: 999,
          commentCount: 155,
          likeCount: 666,
          articleContent:
            "这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
          sortId: 1,
          sort: {
            name: "分类1",
          },
          labelId: 1,
          label: {
            id: 1,
            labelName: "labelName",
          },
        },
        {
          id: 0,
          articleCover: require("@/assets/bg.png"),
          hasVideo: false,
          createTime: "2024-04-12",
          articleTitle: "母猪产后护理",
          viewCount: 999,
          commentCount: 155,
          likeCount: 666,
          articleContent:
            "这是文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
          sortId: 1,
          sort: {
            name: "分类1",
          },
          labelId: 1,
          label: {
            id: 1,
            labelName: "labelName",
          },
        },
      ],
      pagination: {
        page: 0,
        size: 10,
        total: 100,
      },
    };
  },
  methods: {
    changeLabel(label) {
      this.labelId = label.id;
      console.log(this.labelId);
      console.log(label.id);
    },
    // 点击下一页
    pageArticles() {},
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
