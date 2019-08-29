import comment from '@/api/comment'
import {mapGetters} from 'vuex'

export default {
  props: ['blogId', 'blogComments'],
  data() {
    let validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入评论内容'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        content: ''
      },
      rules: {
        content: [
          {validator: validateContent, trigger: 'blur'}
        ],
      },
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'user'
    ])
  },
  created() {

  },
  methods: {
    /**
     * 切换页码
     * @page 页码
     */
    async changePage(page) {
      this.$emit('changeCommentsPage', page);
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 显示信息
    showMessage(message, type = 'success') {
      this.$message({
        message,
        type
      });
    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.createBlogComment();
        } else {
          this.showMessage('请完善表单', 'error');
          return false;
        }
      });
    },

    // 创建评论
    async createBlogComment() {
      console.log(this.isLogin)
      if (!this.isLogin) {
        this.showMessage('需要登录后才能评论', 'warning')
        return
      }

      let {content} = this.ruleForm;
      try {
        console.log(this.user)
        const res = await comment.createComment({
          content,
          blog_id: this.blogId,
          user_id: this.user.id
        });

        this.$message.success('评论成功');
        this.resetForm('ruleForm');
        this.$emit('update');
      }
      catch (err) {
        console.log(err)
        this.$message.error('评论失败');
      }
    }
  }
}
