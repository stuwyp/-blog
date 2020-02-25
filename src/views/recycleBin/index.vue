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
              <span v-if="blog.tags.length > 0">
                <span  v-for="tag in blog.tags" :key="tag.id">{{tag.name}}</span>
              </span>
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

<script>
import blog from '@/api/blog.js'
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1,
      pageCount: 0,
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
    blog.getRecycleBlogsByUserId({userId: this.user.id, page: this.page, sortBy: this.sortBy}).then(res => {
      console.log(res)
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
      this.pageCount = res.pageCount
    })

  },
  methods: {
    onPageChange(newPage) {
      blog.getRecycleBlogsByUserId({userId: this.user.id, page: newPage}).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({path: '/recycle_bin/', query: {page: newPage}})
      })
    },

  }
}

</script>

<style scoped lang="less">
  @import "../../assets/base.less";

  #index {
    margin: 20px 0;
    background-color: @bgColor;

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

      margin: 0 16%;

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

  }

  .el-pagination .el-pager li,
  .el-pagination button {
    background-color: #fbfbfb !important;
  }
</style>
