<template>
  <section>
    <section class="comments-create">
      <h3 class="comments-title">评论区</h3>

      <el-form :model="ruleForm" status-icon :rules="rules" label-position="left" ref="ruleForm" label-width="50px"
               class="demo-ruleForm">
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" placeholder="请输入评论内容" :autosize="{ minRows: 1, maxRows: 6}"
                    v-model="ruleForm.content"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" size="small" @click="resetForm('ruleForm')">重置</el-button>
          <el-button class="btn" size="small" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="comments-list" v-if="blogComments.list  && blogComments.list.length > 0">
      <h3 class="comments-title">评论列表</h3>
      <ul class="comments-box">
        <li v-for="(item, index) in blogComments.list"
            class="comments-item"
            :key="index">
          <div class="comments-item-username">
            <i class="icon el-icon-chat-dot-round"></i> 来自「 {{item.user.username}} 」的评论：
          </div>
          <div class="comments-item-content">
            {{item.content}}
          </div>
        </li>
      </ul>
      <section class="page" v-if="blogComments.list && blogComments.list.length">
        <el-pagination
          v-if="blogComments.pageCount>1"
          background
          layout="prev, pager, next"
          :page-count="blogComments.pageCount"
          :current-page="blogComments.page"
          @current-change="changePage"
          :total="blogComments.total">
        </el-pagination>
      </section>
    </section>
  </section>
</template>

<script>
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
      // console.log(this.isLogin)
      if (!this.isLogin) {
        this.showMessage('需要登录后才能评论', 'warning')
        return
      }

      let {content} = this.ruleForm;
      try {
        // console.log(this.user)
        await comment.createComment({
          content,
          blog_id: this.blogId,
          user_id: this.user.id
        });

        this.$message.success({
          duration: 1500,
          message: '评论成功'
        });
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

</script>

<style scoped lang="less">
  @import "~@/assets/base.less";

  .comments-title {
    padding: 16px 0;
    color: @themeLighterColor;
    font-size: 18px;
    font-weight: normal;
  }

  .comments-create {
    width: 100%;
  }

  .comments-list {
    width: 100%;
    box-sizing: border-box;

    .comments-box {
      list-style-type: none;
      padding: 0;
    }
    .comments-item {
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .comments-item-username {
      font-size: 16px;
      color: #5eafbb;
      font-weight: 500;
    }

    .comments-item-content {
      box-sizing: border-box;
      padding: 24px 24px 0 24px;
      font-size: 16px;
    }
  }

  .page {
    padding: 16px 0;
    text-align: left;
  }

  @media screen and (min-width: 200px) and (max-width: 768px) {
    .comments-create {
      width: 100%;
    }
  }

  .comments-item-content {
    width: 100%;
    box-sizing: border-box;
  }

  /deep/ .el-form-item__label {
    margin: 3px 0;
  }

  /deep/ .btn.el-button {
    width: 60px;
  }
</style>

<style lang="less">

</style>

