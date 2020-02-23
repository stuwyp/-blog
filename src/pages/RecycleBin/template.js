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
    this.page = parseInt(this.$route.query.page) || 1
    blog.getRecycleBlogsByUserId({userId: this.user.id, page: this.page, sortBy: this.sortBy}).then(res => {
      console.log(res)
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
      this.pageCount = res.pageCount
    })

  },
  methods: {
    onPageChange(newPage) {
      blog.getRecycleBlogsByUserId({userId: this.user.id, page: newPage}).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({path: '/recycle_bin/', query: {page: newPage}})
      })
    },

  }
}
