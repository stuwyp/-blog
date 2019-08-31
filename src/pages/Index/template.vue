<template>
  <div id="index">
    <section id="left-blogs">
      <div class="item">
        <span class="blog-sort">热门</span>
        <span class="blog-sort">最新</span>
      </div>
      <router-link class="blog-item" v-for="blog in blogs" :key="blog.id" :to="`/blog/${blog.id}`">
        <div class="item">
          <h3>{{blog.title}}</h3>
          <div>{{blog.description}}</div>
          <span v-if="blog.tags.length > 0" v-for="tag in blog.tags">{{tag.name}}</span>

          <div> {{friendlyDate(blog.created_at)}}</div>
          <div class=""></div>
        </div>

      </router-link>
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
      <div class="right-nav-top">热门标签</div>


      <div class="right-tags">
        <el-button
          type="text"
          class="tag-item"
          v-for="item in tagList"
          :key="item.name"
          @click="getBlogsByFilter(item.id)"
          plain
        >
          {{ item.name }}
        </el-button>
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
