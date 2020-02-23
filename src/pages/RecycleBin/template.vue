<template>
  <div id="index">
    <section id="left-blogs">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="blog in blogs"
            :key="blog.id"
            :timestamp="friendlyDate(blog.updated_at)"
            placement="top">
            <el-card>
              <h3>{{blog.title}}</h3>
              <div>{{blog.description}}</div>
              <span v-if="blog.tags.length > 0" v-for="tag in blog.tags">{{tag.name}}</span>
              <!--<el-button type="mini">恢复</el-button>-->
              <!--<el-button type="mini">删除</el-button>-->
            </el-card>
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
