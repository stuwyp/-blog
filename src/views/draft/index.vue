<template>
  <div class="index">
    <h3 class="title-text">草稿箱</h3>
    <div v-if="drafts.length > 0">
      <div class="draft-item" v-for="draft in drafts" :key="draft.id">
        <router-link :to="`/editor/drafts/${draft.uuid}`" class="item">
          <span class="blog-title">{{draft.title}}</span>
        </router-link>
        <div class="more-info">
          <span class="update-time">
            {{draft.updated_at | formatTime}}
          </span>

          <el-dropdown>
          <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="`/editor/drafts/${draft.uuid}`">编辑</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="onDelete(draft.uuid)">删除</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--<div class=""></div>-->
      </div>
      <!--<el-pagination-->
      <!--v-if="pageCount>1"-->
      <!--layout="prev, pager, next"-->
      <!--:total="total"-->
      <!--:page-count="pageCount"-->
      <!--:current-page="page"-->
      <!--@current-change="onPageChange">-->
      <!--</el-pagination>-->
    </div>
    <div v-else class="nothing">Nothing</div>
  </div>
</template>

<script>
import draft from '@/api/draft.js'
// import tag from '@/api/tag.js'
import {mapGetters} from 'vuex'
import {switchTime} from "../../utils"


export default {
  data() {
    return {
      drafts: [],
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
  filters: {
    formatTime(val) {
      return switchTime(val)
    }
  },
  created() {
    this.loadData()
    // tag.getTags().then(res => {
    //   this.tagList = res.data
    // })
  },
  methods: {
    loadData() {
      this.page = parseInt(this.$route.query.page) || 1
      draft.getDraftsByUserId({userId: this.user.id, page: this.page, sortBy: this.sortBy}).then(res => {
        console.log(res)
        this.drafts = res.data
        this.total = res.total
        this.page = res.page
        this.pageCount = res.pageCount
      })
    },
    async onDelete(uuid) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }
      catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        return
      }
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      try {
        await draft.updateDraft({uuid, update_kind: -1})
        this.loadData()
      }
      catch (e) {
        console.log(e)
      }
    },
    onPageChange(newPage) {
      draft.getBlogsByUserId({page: newPage}).then(res => {
        this.drafts = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({path: '/archive/', query: {page: newPage}})
      })
    },

    getBlogsByTags(tag_id) {

      draft.getBlogsByUserId({page: this.page, sortBy: this.sortBy, tag: tag_id}).then(res => {
        this.drafts = res.data
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

  .index {
    width: 60%;
    margin: 32px 20% 20px;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 4px;

    .title-text {
      padding: 12px 8px;
      margin: 0 20px;
      border-bottom: 1px solid #dddddd;
    }

    .draft-item {
      margin: 0 20px;
      padding: 12px 8px;
      border-bottom: 1px solid #eeeeee;

      .blog-title {
        font-size: 16px;
        cursor: pointer;
      }
      .more-info {
        margin: 8px 0;
        .update-time {
          font-size: 13px;
          color: #a1a1a1;
        }

        .el-icon-more {
          padding-left: 20px;
        }
      }

    }
    .nothing {
      margin: 20px 30px;
    }

  }

  .el-pagination .el-pager li,
  .el-pagination button {
    background-color: #fbfbfb !important;
  }

  /deep/ .el-dropdown-menu__item {
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
  }

  @media (max-width: 960px) {
    .index {
      width: 72%;
      margin: 32px 16% 20px;
    }
  }
</style>
<style lang="less">

</style>
