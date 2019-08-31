import blog from '@/api/blog'
import {mapGetters} from 'vuex'

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
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {

    onCreate() {
      blog.createBlog({
        title: this.title,
        content: this.content,
        description: this.description,
        user_id: this.user.id,
        tags: this.labels
      })
        .then(res => {
          // console.log(res)
          this.$message.success("创建成功")
          this.$router.push({path: `/blog/${res.id}`})
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
      if (inputValue) {
        if (this.labels.indexOf(this.inputValue) === -1)
          this.labels.push(inputValue)
        else
          this.$message.warning("标签不能重复")
      }
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
