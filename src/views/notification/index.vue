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

<script>
import blog from '@/api/blog.js'
import tag from '@/api/tag.js'

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
  created() {
    this.page = parseInt(this.$route.query.page) || 1
    blog.getBlogs({page: this.page, sortBy: this.sortBy}).then(res => {
      // console.log(res)
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
      blog.getBlogs({page: newPage}).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({path: '/', query: {page: newPage}})
      })
    },

    getBlogsByTags(tag_id) {

      blog.getBlogs({page: this.page, sortBy: this.sortBy, tag: tag_id}).then(res => {
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
    display: grid;
    grid-template-columns: 1fr 27%;

    h3 {
      margin: 5px 0;
    }
    span {
      text-align: right;
      margin: 5px 0;
      font-size: 15px;
      color: @textLighterColor;

      a {
        color: @themeColor;
        text-decoration: none;
      }
    }

    #left-blogs {
      grid-column: 1;
      grid-row: 1;
      margin: 20px 2%;

      .el-timeline {
        padding-left: 20px;
      }

      .item {
        background-color: #fff;
        border-radius: 3px;
        padding: 12px;
        margin: 0 0 1px;
        border: 1px solid #efefef;
        border-bottom: 0;
      }

      .blog-sort {
        background-color: #fff;
        padding-right: 20px;
        cursor: pointer;

      }
      .blog-item :hover {
        background-color: #efefef;
      }
    }

    #right-nav {
      grid-column: 2;
      grid-row: 1;

      margin: 22px 8%;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      border-radius: 3px;

      height: 500px;

      .right-nav-top {
        background-color: #fff;
        padding: 12px 6px;
        margin: 0 5%;
        border-bottom: 1px solid #efefef;
        color: @textLighterColor;
      }

      .right-tags {
        margin: 0 10px;
        .el-button {
          color: #999;
          :hover, :active {
            color: #2dc1c2;
          }
        }
        .tag-item {
          cursor: pointer;
          margin: 10px 8px;
          padding: 10px 8px;
          border-radius: 3px;
          border: 0;
          font-size: 18px;

        }
      }

    }
    //p {
    //  padding-bottom: 20px;
    //}
  }

  .el-pagination .el-pager li,
  .el-pagination button {
    background-color: #fbfbfb !important;
  }
</style>
