<template>
  <div id="index">
    <section id="left-blogs">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-if="blogs.length > 0"
            v-for="blog in blogs"
            :key="blog.id"
            :timestamp="friendlyDate(blog.updated_at)"
            placement="top">
            <el-card>
              <router-link :to="`/blog/${blog.id}`">
                <h3>{{blog.title}}</h3>
                <div>{{blog.description}}</div>
                <span v-if="blog.tags.length > 0" v-for="tag in blog.tags">{{tag.name}}</span>
              </router-link>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            v-else
            :timestamp="friendlyDate(new Date())"
            placement="top">
            <el-card>
              暂无文章
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            v-else
            :timestamp="friendlyDate(new Date())"
            placement="top">
            <el-card>
              <router-link to="/create">开始我的第一篇博客</router-link>
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
    <section id="right-nav">
      <div class="right-nav-top">热门标签</div>


      <div class="right-tags">
        <el-button
          type="text"
          class="tag-item"
          v-for="item in tagList"
          :key="item.name"
          @click="getBlogsByTags(item.id)"
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
