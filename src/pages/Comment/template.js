import blog from '@/api/blog.js'


import {mapState, mapActions} from 'vuex'

export default {
  props: ['id', 'commentsList'],
  data() {
    var validateEmail = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

      if (value === '') {
        callback(new Error('请输入邮箱'));

      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    var validateNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
      } else {
        callback();
      }
    };
    var validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入评论内容'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        nickname: '',
        email: '',
        content: ''
      },
      rules: {
        nickname: [
          {validator: validateNickname, trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        content: [
          {validator: validateContent, trigger: 'blur'}
        ],
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {

  },
  methods: {
    ...mapActions({
      createComments: 'comments/createComments'
    }),

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
          await this.createArticleComments();

        } else {
          this.showMessage('请完善表单', 'error');
          return false;
        }
      });
    },

    // 创建评论
    async createArticleComments() {
      let {content, nickname, email} = this.ruleForm;

      const res = await this.createComments({
        email,
        nickname,
        content,
        article_id: this.id,
      });

      this.$message({
        message: '评论成功',
        type: 'success'
      });

      this.resetForm('ruleForm');
      const newComments = res.data.data;
      this.$emit('updateComments', newComments);
    }
  }
}
