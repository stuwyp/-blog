<template>
  <div class="index">
    <section class="left-category">
      <div class="category-list">

      </div>
    </section>
    <section class="middle-blogs">
      <div class="create">
        <div class="edit">

        </div>
        <div class="tools">

        </div>
      </div>
      <router-link class="blog-item" v-for="blog in blogs" :key="blog.id" :to="`/blog/${blog.id}`">
        <div class="item">
          <h3>{{blog.title}}</h3>
          <div>{{blog.description}}</div>
          <div v-if="blog.tags.length > 0">
            <span v-for="tag in blog.tags" :key="tag.id">{{tag.name}}</span>
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
    <section class="right-nav">
      <div class="me">

      </div>

      <div class="recommend">

      </div>

      <div class="focus">

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
      sortBy: 'updated_at',
      tagList: [],
      filterTags: [],
    }
  },
  created() {
    this.page = parseInt(this.$route.query.page) || 1
    this.getBlogsByFilter(this.filterTags)
    this.getTags()
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
    getBlogsByFilter(tag_id = []) {
      blog.getBlogs({page: this.page, sortBy: this.sortBy, tag: tag_id}).then(res => {
        console.log(res)
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

  .index {
    display: grid;
    grid-template-columns: 12% 1fr 24%;
    padding: 30px 14%;

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

    .left-category {
      grid-column: 1;
      grid-row: 1;

      .category-list {
        background-color: #fff;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .1);
        border-radius: 3px;
        height: 500px;
        margin: 0 4px 0 16px;
      }
    }

    .middle-blogs {
      grid-column: 2;
      grid-row: 1;
      margin: 0 3%;
      border-radius: 3px;

      .create {
        border-radius: 3px;
        height: 160px;
        background-color: #fff;
        margin-bottom: 10px;
        padding: 10px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        border: 1px solid #efefef;

      }

      .edit {
        height: 100px;
        width: auto;
        background-color: #fcfcfc;
        margin: 10px;
        border: 1px solid #e7e7e7;
      }

      .item {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);

        background-color: #fff;
        border-radius: 3px;
        padding: 12px;
        margin: 0 0 1px;
        border: 1px solid #efefef;

        border-bottom: 0;
      }

      .blog-item :hover {
        background-color: #efefef;
      }

    }

    .right-nav {
      grid-column: 3;
      grid-row: 1;

      margin: 0 2%;
      height: 500px;

      .me {
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        border: 1px solid #efefef;
        height: 80px;
        margin-bottom: 10px;
      }

      .focus {
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        border: 1px solid #efefef;
        height: 240px;
      }
      .recommend {
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        border: 1px solid #efefef;
        height: 180px;
        margin-bottom: 10px;
      }

    }

  }

  .el-pagination .el-pager li,
  .el-pagination button {
    background-color: #fbfbfb !important;
  }

  @media (max-width: 960px) {
    .index{
      padding: 30px 10%;
    }
  }
</style>
