<template>
  <!-- 分页组件 -->
  <div>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :tableList="tableList"
      :total="tableList.length"
      @current-change="currentChange"
      @prev-click="prevClick"
      @nextClick="nextClick"
      :page-size="pageSize"
      :current-page="currentPage"
      :page-sizes="[1, 5, 10, 20]"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: [],
    },
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      // 当前页面数据
      currentPageData: [],
      // 总数据
      totalData: [],
    };
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
    },

    prevClick(currentPage) {
      this.currentPage = currentPage;
    },
    nextClick(currentPage) {
      this.currentPage = currentPage;
    },
    parentChange() {
      this.currentPageData = this.totalData.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      );
      this.$emit("changeCurrentPage", this.currentPageData);
    },
  },
  watch: {
    tableList: {
      immediate: true,
      handler(newVal) {
        this.totalData = newVal;
        if (
          this.totalData.length % this.pageSize === 0 &&
          this.currentPage > this.totalData.length / this.pageSize
        ) {
          // 如果因删除到这当前页面数据清空了，那当前也就跳到第一页
          this.currentPage = 1;
        }
        this.parentChange();
      },
    },
    currentPage: {
      immediate: true,
      handler(newVal) {
        this.currentPage = newVal;
        this.parentChange();
      },
    },
    pageSize: {
      immediate: true,
      handler(newVal) {
        this.pageSize = newVal;
        this.parentChange();
      },
    },
  },
};
</script>

<style scoped></style>
