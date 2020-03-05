<template>
  <div class="index">
    <h3 class="title-text">回收站</h3>
    <div v-if="blogs.length > 0">
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
                <span v-for="tag in blog.tags" :key="tag.id">{{tag.name}}</span>
              </span>
              <div class="btn-group">
                <el-button type="mini" @click="handleRestore(blog.uuid)">恢复</el-button>
                <el-button type="mini" @click="handleDelete(blog.uuid)">删除</el-button>
              </div>
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
    </div>
    <div v-else class="nothing">Nothing</div>

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
    this.loadData()
  },
  methods: {
    loadData() {
      this.page = parseInt(this.$route.query.page) || 1
      blog.getRecycleBlogsByUserId({
        userId: this.user.id,
        page: this.page,
        sortBy: this.sortBy
      }).then(res => {
        // console.log(res)
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.pageCount = res.pageCount
      })
    },
    onPageChange(newPage) {
      blog.getRecycleBlogsByUserId({userId: this.user.id, page: newPage}).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({path: '/recycle_bin/', query: {page: newPage}})
      })
    },
    async handleRestore(uuid) {
      await blog.updateBlog({uuid, update_kind: 0})
      this.loadData()
    },
    async handleDelete(uuid) {
      await blog.deleteBlog({uuid})
      this.loadData()
    },
  }
}

</script>

<style scoped lang="less">
  @import "~@/assets/base.less";

  .index {
    height: 100%;
    width: 60%;
    margin: 32px 20% 20px;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 4px;

    .title-text {
      padding: 12px 8px;
      margin: 0 20px;
      border-bottom: 1px solid #eaeaea;
    }
    .nothing {
      margin: 20px 30px;
    }
    h3 {
      margin: 5px 0;
    }
    span {
      text-align: right;
      margin: 5px 0;
      font-size: 15px;
      color: @textLighterColor;
    }

    .el-timeline {
      padding: 20px 20px 20px 36px;

      .item :hover {
        background-color: #efefef;
      }
    }
    .btn-group {
      display: flex;
      justify-content: flex-end;
    }
    .el-timeline {
      padding-right: 42px;
    }
  }

  .el-pagination .el-pager li,
  .el-pagination button {
    background-color: #fbfbfb !important;
  }


</style>
