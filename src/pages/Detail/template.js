import marked from 'marked'
import blog from '@/api/blog'

import {mapState, mapActions} from 'vuex'
import VComments from '../Comment/template.vue'

export default {
  components: {
    VComments
  },
  data () {
    return {
      title: '',
      rawContent: '',
      user: {},
      createdAt: ''
    }
  },

  created() {
    this.blogId = this.$route.params.blogId
    blog.getDetail({ blogId: this.blogId}).then(res => {
      this.title = res.data.title
      this.rawContent = res.data.content
      this.createdAt= res.data.created_at
      this.user = res.data.user
    })
  },

  computed: {
    markdown() {
      return marked(this.rawContent)
    }
  },
  // method:{
  //   ...mapActions({
  //     getCommentsList: 'comments/getCommentsList',
  //     createComments: 'comments/createComments'
  //   }),
  //   updateComments(newComments) {
  //     // this.detail.comments_list.data.unshift(newComments);
  //   },
  //   // 切换评论页面
  //   async changeCommentsPage(page) {
  //     // const res = await this.getCommentsList({
  //     //   article_id: this.id,
  //     //   page
  //     // });
  //     // this.detail.comments_list = res.data.data;
  //   },
  // }
}
