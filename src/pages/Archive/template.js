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
