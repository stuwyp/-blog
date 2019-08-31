import marked from 'marked'
import blog from '@/api/blog'
import comment from '@/api/comment'
import VComments from '../Comment/template.vue'

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
