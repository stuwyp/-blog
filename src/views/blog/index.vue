<template>
  <div id="detail">
    <section class="user-info">
      <h3>{{title}}</h3>
      <span>
        发布于{{friendlyDate(createdAt)}}
      </span>
    </section>
    <section class="article" v-html="markdown"></section>
    <section>
      <v-comments
        :blogId="blogId"
        :blogComments="blogComments"
        @update="updateComments"
        @changeCommentsPage="changeCommentsPage">
      </v-comments>
    </section>
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
      blogId: null,
      title: '',
      rawContent: '',
      user: {},
      createdAt: '',
      blogComments: {}
    }
  },

  created() {
    this.blogId = this.$route.params.blogId
    blog.getBlogDetail({blogId: this.blogId}).then(res => {
      this.title = res.data.title
      this.rawContent = res.data.content
      this.createdAt = res.data.created_at
      this.user = res.data.user
    })

    comment.getCommentsByBlogId({blogId: this.blogId}).then(res => {
      this.blogComments = res.data
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
        blogId: this.blogId
      })
      this.blogComments = res.data
    },


    // 切换评论页面
    async changeCommentsPage(page) {
      const res = await this.getCommentsByBlogId({
        blogId: this.blogId,
        page: page
      });
      this.detail.comments_list = res.data.data;
    }
  }
}

</script>

<style lang="less">
  @import "../../assets/base.less";
  @import "../../assets/article.less";

  #detail {
    .user-info {
      display: grid;
      grid-template-columns: 1fr 180px;

      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #ebebeb;

      //.avatar {
      //  grid-column: 1;
      //  grid-row: 1 / span 2;
      //
      //  width: 60px;
      //  height: 60px;
      //  border-radius: 50%;
      //}

      h3 {
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

        a {
          color: @themeColor;
          text-decoration: none;
        }
      }
    }

    .article {
      padding: 30px 0;
    }

  }

</style>
