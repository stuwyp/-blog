<template>
  <div id="index">
    <section id="left-blogs">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in blogs"
            :key="index"
            type="primary"
            size="large"
            :timestamp="friendlyDate(item.updated_at)">
            {{item.content}}
          </el-timeline-item>
        </el-timeline>
      </div>

      <el-pagination
        v-if="pageCount>1"
        layout="prev, pager, next"
        :total="total"
        :page-count="pageCount"
        :current-page="page"
        @current-change="onPageChange">
      </el-pagination>

    </section>
    <section id="right-nav">
      <div class="right-nav-top">XXX</div>


      <div class="right-tags">

      </div>

    </section>

  </div>
</template>

<script src="./template.js"></script>

<style scoped src="./template.less" lang="less"></style>
<style>
  .el-pagination .el-pager li,
  .el-pagination button {
    background-color: #fbfbfb !important;
  }
</style>
