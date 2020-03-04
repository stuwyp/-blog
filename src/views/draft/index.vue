<template>
  <div class="index">
    <h3 class="title-text">草稿箱</h3>
    <div v-if="drafts.length > 0">
      <div class="draft-item" v-for="draft in drafts" :key="draft.id">
        <router-link :to="`/editor/drafts/${draft.uuid}`" class="item">
          <h3>{{draft.title}}</h3>
          <!--<div>{{draft.description}}</div>-->
          <!--<div v-if="draft.tags.length > 0">-->
          <!--<span>v-for="tag in draft.tags">{{tag.name}}</span>-->
          <!--</div>-->
          <p class="update-time"> {{friendlyDate(draft.updated_at)}}</p>
          <!--<div class=""></div>-->
        </router-link>
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
    <div v-else>Nothing</div>
  </div>
</template>

<script>
import draft from '@/api/draft.js'
import tag from '@/api/tag.js'
import {mapGetters} from 'vuex'

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
  created() {
    this.page = parseInt(this.$route.query.page) || 1
    draft.getDraftsByUserId({userId: this.user.id, page: this.page, sortBy: this.sortBy}).then(res => {
      console.log(res)
      this.drafts = res.data
      this.total = res.total
      this.page = res.page
      this.pageCount = res.pageCount
    })
    // tag.getTags().then(res => {
    //   this.tagList = res.data
    // })
  },
  methods: {
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
      padding: 16px 8px;
      margin: 0 20px;
      border-bottom: 1px solid #dddddd;

    }

    .draft-item {
      margin: 0 20px;
      padding: 16px 8px;
      border-bottom: 1px solid #eeeeee;


      .update-time{

      }
    }
  }

  .el-pagination .el-pager li,
  .el-pagination button {
    background-color: #fbfbfb !important;
  }

  @media (max-width: 960px) {
    .index {
      width: 72%;
      margin: 32px 16% 20px;
    }
  }
</style>

