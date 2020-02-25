<template>
  <div id="edit">
    <h2>创建文章</h2>
    <div class="return_button">
      <el-button icon="arrow-left" size="small" @click="goBack">返回</el-button>
    </div>
    <h4>文章标题</h4>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <p class="msg">限XXX个字</p>
    <div class="tag_wrap">
      <span class="tag_text">标签</span>
      <el-tag
        class="tag_margin"
        :key="tag"
        v-for="tag in labels"
        :closable="true"
        :close-trasition="true"
        @close="handleClose(tag)"
        type="primary"
      >{{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <h4>内容简介</h4>
    <el-input v-model="description" placeholder="请输入简介"></el-input>
    <p class="msg">限XXX个字</p>
    <h4>文章内容 (Markdown编辑器)</h4>
    <el-input type="textarea" v-model="content" :autosize="{ minRows: 8, maxRows: 40}"></el-input>
    <p class="msg">限XXX个字</p>
    <!--<p>-->
    <!--<label>是否展示到首页</label>-->
    <!--<el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>-->
    <!--</p>-->
    <el-button @click="onEdit">确定</el-button>
  </div>
</template>

<script>
import blog from '@/api/blog'

export default {
  data() {
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
    blog.getBlogDetail({blogId: this.blogId}).then(res => {
      this.title = res.data.title
      this.description = res.data.description
      this.content = res.data.content
      this.atIndex = res.data.atIndex
    })
  },

  methods: {
    onEdit() {
      blog.updateBlog({blogId: this.blogId}, {
        title: this.title,
        content: this.content,
        description: this.description,
        atIndex: this.atIndex
      })
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push({path: `/blog/${res.data.id}`})
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

</script>

<style lang="less">
  @import "../../assets/base.less";

  #edit, #create {
    padding-bottom: 30px;

    h2 {
      text-align: center;
    }

    .msg {
      text-align: right;
      font-size: 12px;
      color: @textLighterColor;
    }

    .tag_wrap {
      text-align: left;
      padding: 20px 0;
    }

    .tag_wrap .input-new-tag {
      width: 80px;
      height: 30px;
    }

    .tag_margin {
      margin: 3px;
    }

    .tag_text {
      font-weight: 700;
      padding-right: 10px;
    }

  }

</style>
