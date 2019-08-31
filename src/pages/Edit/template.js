import blog from '@/api/blog'

export default {
  data () {
    return {
      blogId: null,
      title: '',
      description: '',
      content: '',
      atIndex: false,
      labels: [],
      inputVisible: false,
      inputValue: '',
    }
  },

  created() {
    this.blogId = this.$route.params.blogId
    blog.getBlogDetail({ blogId: this.blogId }).then(res => {
      this.title = res.data.title
      this.description = res.data.description
      this.content = res.data.content
      this.atIndex = res.data.atIndex
    })
  },

  methods: {
    onEdit() {
      blog.updateBlog({ blogId: this.blogId }, { title: this.title, content: this.content, description: this.description, atIndex: this.atIndex})
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push({ path: `/blog/${res.data.id}`})
        })
    },
    goBack: function () {
      this.$router.go(-1)
    },
    // element标签组件
    handleClose: function (tag) {
      this.labels.splice(this.labels.indexOf(tag), 1)
    },
    handleInputConfirm: function () {
      let inputValue = this.inputValue
      if (inputValue) this.labels.push(inputValue)
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput: function () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
  }
}
