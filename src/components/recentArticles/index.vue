<template>
  <div>
    <!-- 网站通知 -->
    <my-notice v-if="noticeFlag"></my-notice>
    <!-- 遍历所有的栏目 -->
    <div v-for="(sort, index) in sortInfo" :key="index">
      <div class="sort-article-first">
        <div>
          <svg
            viewBox="0 0 1024 1024"
            width="20"
            height="20"
            style="vertical-align: -2px; margin-bottom: -2px"
          >
            <path
              d="M367.36 482.304H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3536 114.688-114.688 114.688zM367.36 938.752H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3536 114.6368-114.688 114.6368zM828.672 938.752h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3024 114.6368-114.6368 114.6368zM828.672 482.304h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3024 114.688-114.6368 114.688z"
              fill="#FF623E"
            ></path>
          </svg>
          {{ sort.sortName }}
        </div>
        <div
          class="article-more"
          @click="$router.push({ path: `/sort/${sort.id}` })"
        >
          <svg
            viewBox="0 0 1024 1024"
            width="20"
            height="20"
            style="vertical-align: -2px; margin-bottom: -2px"
          >
            <path
              d="M347.3 897.3H142.2c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L103.3 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L386.3 872.1c-6.9 15.3-22.1 25.2-39 25.2z"
              fill="#009F72"
            ></path>
            <path
              d="M730.4 897.3H525.3c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L486.4 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L769.3 872.1c-6.8 15.3-22.1 25.2-38.9 25.2z"
              fill="#F9DB88"
            ></path>
          </svg>
          更多
        </div>
      </div>
      <!-- 文章详情 -->
      <recent-article-card
        :articleList="sortArticles[sort.id]"
      ></recent-article-card>
    </div>
  </div>
</template>

<script>
import myNotice from "./notice.vue";
import recentArticleCard from "@/components/common/recentArticleCard.vue";

export default {
  components: {
    myNotice,
    recentArticleCard,
  },
  data() {
    return {
      noticeFlag: true,
      //分类信息
      sortInfo: [
        {
          id: 0,
          sortName: "sortName1",
        },
        {
          id: 1,
          sortName: "sortName2",
        },
        {
          id: 2,
          sortName: "sortName3",
        },
      ],
      // 分类文章详情
      sortArticles: [
        [
          {
            id: 0,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: false,
            createTime: "2024-04-10",
            articleTitle: "我是文章标题",
            viewCount: 666,
            commentCount: 12,
            likeCount: 10,
            articleContent:
              "母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 1,
              sortName: "sortName1",
            },
            sortId: 1,
            labelId: 1,
            label: {
              labelName: "标签名",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
        ],
        [
          {
            id: 0,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: false,
            createTime: "2024-04-10",
            articleTitle: "我是文章标题",
            viewCount: 666,
            commentCount: 12,
            likeCount: 10,
            articleContent:
              "母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 1,
              sortName: "sortName1",
            },
            sortId: 1,
            labelId: 1,
            label: {
              labelName: "标签名",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
        ],
        [
          {
            id: 0,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: false,
            createTime: "2024-04-10",
            articleTitle: "我是文章标题",
            viewCount: 666,
            commentCount: 12,
            likeCount: 10,
            articleContent:
              "母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 1,
              sortName: "sortName1",
            },
            sortId: 1,
            labelId: 1,
            label: {
              labelName: "标签名",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
          {
            id: 1,
            // 封面
            articleCover: require("@/assets/bg.png"),
            hasVideo: true,
            createTime: "2024-04-11",
            articleTitle: "我是文章标题111",
            viewCount: 223,
            commentCount: 321,
            likeCount: 43,
            articleContent:
              "11111母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理母猪产后护理",
            sort: {
              id: 2,
              sortName: "sortName2",
            },
            sortId: 2,
            labelId: 2,
            label: {
              labelName: "标签名2",
            },
          },
        ],
      ],
    };
  },
};
</script>

<style scoped>
.sort-article-first {
  margin: 40px auto 20px;
  display: flex;
  justify-content: space-between;
  color: var(--greyFont);
  border-bottom: 1px dashed var(--lightGray);
  padding-bottom: 5px;
}

.article-more {
  cursor: pointer;
  transition: all 0.3s;
}

.article-more:hover {
  color: var(--lightGreen);
  font-weight: 700;
  transform: scale(1.1);
}
</style>
