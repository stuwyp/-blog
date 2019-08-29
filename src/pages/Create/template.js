import blog from '@/api/blog'

export default {
  data() {
    return {
      title: '',
      description: '',
      content: '',
      atIndex: false,
      labels: [],
      inputVisible: false,
      inputValue: '',
    }
  },

  methods: {
    onCreate() {
      blog.createBlog({title: this.title, content: this.content, description: this.description, atIndex: this.atIndex})
        .then(res => {
          console.log(res)
          this.$message.success("创建成功")
          this.$router.push({path: `/detail/${res.id}`})
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
