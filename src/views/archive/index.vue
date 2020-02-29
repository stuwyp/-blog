<template>
  <div id="index">
    <section id="left-blogs">
      <div class="block">
        <el-timeline>
          <div v-if="blogs.length > 0">

            <el-timeline-item
              v-for="blog in blogs"
              :key="blog.id"
              :timestamp="friendlyDate(blog.updated_at)"
              placement="top">
              <el-card>
                <router-link :to="`/blog/${blog.id}`">
                  <h3>{{blog.title}}</h3>
                  <div>{{blog.description}}</div>
                  <div v-if="blog.tags.length > 0">
                    <span v-for="tag in blog.tags" :key="tag.id">{{tag.name}}</span>
                  </div>
                </router-link>
              </el-card>
            </el-timeline-item>
          </div>
          <el-timeline-item
            v-if="blogs.length === 0"
            :timestamp="friendlyDate(new Date())"
            placement="top">
            <el-card>
              <router-link to="/create">
                <i class="el-icon-edit"></i>
                <span style="padding: 0 10px">新建博客</span>
              </router-link>
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
          @click="getBlogsByFilter(item.id)"
          plain
        >
          {{ item.name }}
        </el-button>
      </div>

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
    this.getBlogsByFilter(this.filterTags)
    this.getTags()
  },
  methods: {
    onPageChange(newPage) {
      blog.getBlogsByUserId({userId: this.user.id, page: newPage}).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({path: '/archive/', query: {page: newPage}})
      })
    },

    getBlogsByFilter(tag_id = []) {
      blog.getBlogsByUserId({userId: this.user.id, page: this.page, sortBy: this.sortBy, tag: tag_id}).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.pageCount = res.pageCount
      })
    },

    getTags() {
      tag.getTags().then(res => {
        this.tagList = res.data
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
    margin: 20px 0;

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
      margin-right: 2%;

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
