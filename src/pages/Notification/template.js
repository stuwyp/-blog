import blog from '@/api/blog.js'
import tag from '@/api/tag.js'

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
  created() {
    this.page = parseInt(this.$route.query.page) || 1
    blog.getBlogs({page: this.page, sortBy: this.sortBy}).then(res => {
      console.log(res)
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
      this.pageCount = res.pageCount
    })
    tag.getTags().then(res => {
      this.tagList = res.data
    })
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

    getBlogsByTags(tag_id){

      blog.getBlogs({page: this.page, sortBy: this.sortBy, tag: tag_id}).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.pageCount = res.pageCount
      })
    }
  }
}
