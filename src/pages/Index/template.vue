<template>
  <div id="index">
    <section class="blog-posts">
      <section class="blog-posts">
        <router-link v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
          <div class="item">
            <h3>{{blog.title}}</h3>
            <span> {{friendlyDate(blog.created_at)}}</span>
          </div>
          <p>{{blog.description}}</p>
        </router-link>
      </section>
    </section>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="onPageChange">
    </el-pagination>
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
