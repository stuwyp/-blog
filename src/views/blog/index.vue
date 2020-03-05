<template>
  <div class="article-detail">
    <div class="panel"></div>
    <div class="article-main">
      <section class="top-info">
        <h3>{{title}}</h3>
        <span>
        发布于{{friendlyDate(createdAt)}}
      </span>
      </section>
      <section class="article" v-html="markdown"></section>
      <section class="comment-panel">
        <v-comments
          :blogId="blog_id"
          :blogComments="blogComments"
          @update="updateComments"
          @changeCommentsPage="changeCommentsPage">
        </v-comments>
      </section>
    </div>
    <div class="anchor"></div>
  </div>
</template>

<script>
import marked from 'marked'
import blog from '@/api/blog'
import comment from '@/api/comment'
import VComments from '../comment/index.vue'

export default {
  components: {
    VComments
  },

  data() {
    return {
      blog_id: '',
      uuid: '',
      title: '',
      rawContent: '',
      user: {},
      createdAt: '',
      blogComments: {}
    }
  },

  created() {
    this.uuid = this.$route.params.uuid
    blog.getBlogDetail({uuid: this.uuid}).then(res => {
      this.title = res.data.title
      this.rawContent = res.data.content
      this.createdAt = res.data.created_at
      this.user = res.data.user
      this.blog_id = res.data.id

      comment.getCommentsByBlogId({
        blogId: this.blog_id
      }).then(res => {
        this.blogComments = res.data
      })
    })


  },

  computed: {
    markdown() {
      return marked(this.rawContent)
    }
  },

  methods: {
    async updateComments() {
      const res = await comment.getCommentsByBlogId({
        blogId: this.blog_id
      })
      this.blogComments = res.data
    },

    // 切换评论页面
    async changeCommentsPage(page) {
      const res = await comment.getCommentsByBlogId({
        blogId: this.blog_id,
        page: page
      });
      this.blogComments = res.data;
    }
  }
}

</script>

<style lang="less">
  @import "~@/assets/base.less";
  @import "~@/assets/article.less";

  .article-detail {
    margin: 40px 15% 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .panel {
      width: 40px;
      margin: 0 10px;
    }

    .article-main {
      background-color: white;
      flex: 1;
      padding: 20px;

      .article {
        padding: 20px;
        min-height: 400px;
      }

      .top-info {
        display: grid;
        grid-template-columns: 1fr 180px;

        margin: 0 10px;
        padding: 0 10px 10px;
        border-bottom: 1px solid #ebebeb;

        h3 {
          font-size: 18px;
          font-weight: 600;
          grid-column: 1;
          grid-row: 1;
          margin: 5px 0;
        }

        span {
          text-align: right;
          grid-column: 2;
          grid-row: 1;
          margin: 5px 0;
          font-size: 15px;
          color: @textLighterColor;
        }
      }

      .comment-panel {
        padding: 10px;
      }

    }

  }

</style>
