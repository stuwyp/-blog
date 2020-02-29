<template>
  <div id="index">
    <section>
      <router-link class="blog-item" v-for="blog in blogs" :key="blog.id" :to="`/blog/${blog.id}`">
        <div class="item">
          <h3>{{blog.title}}000</h3>
          <div>{{blog.description}}</div>
          <div v-if="blog.tags.length > 0">
            <span>v-for="tag in blog.tags">{{tag.name}}</span>
          </div>
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
  </div>
</template>

<script>
import blog from '@/api/blog.js'
import tag from '@/api/tag.js'
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1,
      pageCount: 0,
      tagList: [],
      filterTags: [],
      sortBy: 'time'
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    this.page = parseInt(this.$route.query.page) || 1
    blog.getBlogsByUserId({userId: this.user.id, page: this.page, sortBy: this.sortBy}).then(res => {
      console.log(res)
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
      this.pageCount = res.pageCount
    })
    tag.getTags().then(res => {
      this.tagList = res.data
    })
  },
  methods: {
    onPageChange(newPage) {
      blog.getBlogsByUserId({page: newPage}).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({path: '/archive/', query: {page: newPage}})
      })
    },

    getBlogsByTags(tag_id) {

      blog.getBlogsByUserId({page: this.page, sortBy: this.sortBy, tag: tag_id}).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.pageCount = res.pageCount
      })
    }
  }
}

</script>

<style scoped lang="less">
  @import "~@/assets/base.less";

  #index {
    height: 100%;
    .list{
      margin: 20px auto;
      width: 200px;
      height: 100%;
    }
  }

  .el-pagination .el-pager li,
  .el-pagination button {
    background-color: #fbfbfb !important;
  }
</style>

