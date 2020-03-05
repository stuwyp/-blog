<template>
  <div style="height: 100%">

    <div v-if="match === 0" class="container">
      <div class="top">
        <div class="title">
          <el-input v-model="draft_title"
                    class="input-title"
                    placeholder="输入文章标题..."
                    @keyup.enter="changeEditStatus"></el-input>
        </div>
        <div class="panel">
        <span class="save">
          <span v-if="!isAutoSaved"></span>
          <span v-else-if="!isEdited">文章将会自动保存至</span>
          <span v-else-if="isSaved">已保存至</span>
          <span v-else>正在保存中</span>

          <router-link class="draft-btn" to="/editor/drafts">草稿</router-link>
        </span>
          <i class="el-icon-picture" style="font-size: 22px;"></i>

          <el-popover v-model="visible" trigger="click">
            <div class="pop-box">
              <div class="publish-title">更新文章</div>
              <div class="panel">
                <div class="panel-title">分类</div>

                <div>
                  <el-select v-model="cate_id" placeholder="选择分类">
                    <el-option
                      v-for="item in categories"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>

              </div>
              <div class="panel">
                <div class="panel-title">标签 (最多三个)</div>
                <el-tag class="tag_margin"
                        :key="tag.id"
                        v-for="tag in tags"
                        :closable="true"
                        :close-trasition="true"
                        @close="handleTagClose(tag)"
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
                <el-button v-else size="mini" @click="showInput">+ New Tag</el-button>
              </div>
              <div class="publish-btn">
                <el-button type="small" @click="handlePublish">确定并更新</el-button>
              </div>
            </div>

            <el-button plain slot="reference" class="publish">
              更新
              <i v-if="!visible" class="el-icon-caret-bottom"/>
              <i v-else class="el-icon-caret-top"/>
            </el-button>
          </el-popover>

          <v-user class="user"/>

        </div>
      </div>
      <div class="middle">
        <mavon-editor
          class="mavon-editor--box"
          v-model="draft_content"
          :autofocus="false"
          placeholder="博客内容"
          :ishljs="true">
        </mavon-editor>
      </div>
      <div class="bottom">
      <span class="bottom-panel">
        <el-switch
          v-model="isAutoSaved"
          inactive-color="#ccc"
          active-text="自动保存">
        </el-switch>
      </span>
      </div>
    </div>
    <div v-else-if="match === -1">
      <no-match/>
    </div>
    <div v-else></div>

  </div>
</template>

<script>
import noMatch from "../404.vue"
import vUser from "../layout/components/user_tool.vue";
import {genRandomStr, debounce} from "../../utils"
import {mapGetters} from 'vuex'
import cate from '@/api/cate'
import blog from '@/api/blog'
import draft from '@/api/draft'

const OK = 0
const NOT_EXIST = -1
const NO_PERMISSION = -2
// const DRAFT = {
//   uuid: '',
//   title: '',
//   content: '',
//   category_id: 0,
//   tags: [],
//   user_id: 0,
//   description: ''
// }

export default {
  components: {
    vUser,
    noMatch
  },

  data() {
    return {
      skip_content_watch: false,
      skip_title_watch: false,
      match: OK,
      draft_title: '',
      draft_content: '',
      draft_desc: '',
      cate_id: 0,
      uuid: '',

      isSaved: false,
      isAutoSaved: true,
      inputVisible: false,
      inputValue: '',
      visible: false,
      isEdited: false,
      isEditing: false,
      categories: [],
      tags: []

    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
    this.fetch_data()
  },
  watch: {
    '$route'(to, from) {
      console.log(to)
      this.fetch_data(to, from)
    },

    draft_content() {
      if (this.skip_content_watch) {
        this.skip_content_watch = false
        return
      }
      if (this.$route.path === '/editor/drafts/new') {
        this.isEdited = true;
        this.uuid = genRandomStr()
        draft.createDraft({
          title: this.draft_title,
          content: this.draft_content,
          user_id: this.user.id,
          uuid: this.uuid
        }).then(() => {
          this.$message.success("创建成功")
          this.$router.push({path: `/editor/drafts/${this.uuid}`})
        })
      }
      if (this.isAutoSaved) {
        this.isSaved = false
        this.debounceUpdateDraft()
      }
    },
    draft_title() {
      if (this.skip_title_watch) {
        this.skip_title_watch = false
        return
      }
      if (this.$route.path === '/editor/drafts/new') {
        this.isEdited = true;
        this.uuid = genRandomStr()
        draft.createDraft({
          title: this.draft_title,
          content: this.draft_content,
          user_id: this.user.id,
          uuid: this.uuid
        }).then(() => {
          this.$message.success("创建成功")
          this.$router.push({path: `/editor/drafts/${this.uuid}`})
        })
      }
      if (this.isAutoSaved) {
        this.isSaved = false
        this.debounceUpdateDraft()
      }
    }
  },
  methods: {
    debounceUpdateDraft: debounce(async function () {
      let data = {
        title: this.draft_title,
        content: this.draft_content,
        description: this.draft_desc,
        uuid: this.uuid,
        category_id: this.cate_id,
        tags: this.tags,
      }
      console.log("?")
      await draft.updateDraft(data)
      this.isSaved = true
      this.isEdited = true;
    }, 1500),
    async getDraft() {
      try {
        console.log({uuid: this.$route.params.uuid, user_id: this.user.id})
        let resp = await
          draft.getDraftByUuid({uuid: this.$route.params.uuid, user_id: this.user.id})

        this.draft_title = resp.data.title
        this.draft_content = resp.data.content
        this.uuid = this.$route.params.uuid
        this.skip_title_watch = true
        this.skip_content_watch = true
        this.match = 0
      }
      catch (e) {
        let status = e.response.status
        if (status === 404) {
          this.$message.error("不存在该文章")
          this.match = NOT_EXIST
        }
        else if (status === 403) {
          this.$message.error("当前用户无权更改此文章")
          this.match = NO_PERMISSION
        }
      }
    },
    async fetch_data(to, from) {
      try {
        let res = await
          cate.getCates()
        this.categories = res.data
        this.cate_id = 8
        if (to.path === '/editor/drafts/new') {
          this.match = 0
          this.draft_title = ''
          this.draft_content = ''
          this.tags = []
          this.skip_content_watch = true
          this.skip_title_watch = true
          this.isEdited = false
          this.isEditing = false
        } else if (from.path === '/editor/drafts/new') {
          this.skip_content_watch = true
          this.skip_title_watch = true
        }
        this.getDraft()
      }
      catch (e) {
        console.log(e)
      }
    },

    changeEditStatus() {
      this.isEditing = true
    },
    checkValidation() {
      if (this.tags.length === 0) {
        this.$message.warning("请至少选择一个标签")
        return false
      }
      else if (this.draft_title.trim() === '') {
        this.$message.warning("博客标题不能为空")
        return false
      }
      else if (this.draft_content.trim() === '') {
        this.$message.warning("博客内容不能为空")
        return false
      }
      else
        return true
    },
    handlePublish() {
      if (!this.checkValidation())
        return

      blog.createBlog({
        title: this.draft_title,
        content: this.draft_content,
        description: '',
        user_id: this.user.id,
        tags: this.tags,
        category_id: this.cate_id,
        state: 1,
        uuid: this.uuid
      })
        .then(() => {
          // console.log(res)
          this.$message.success("创建成功")
          this.$router.push({path: `/published`})
        })
    },
    handleTagClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue.trim()) {

        if (this.tags.indexOf(inputValue) > -1)
          this.$message.error("标签重复，添加失败")
        else if (this.tags.length >= 3)
          this.$message.error("最多只能添加三个")
        else
          this.tags.push(inputValue)

      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },

  }
}

</script>

<style scoped lang="less">
  @import "~@/assets/base.less";
  /*  谷歌浏览器对于/deep/貌似不太友好，控制台提示/deep/将要被移除 */
  @deep: ~'>>>';

  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: hidden;

    .top {
      height: 60px;
      width: 100%;
      display: flex;
      background-color: white;

      .title {
        width: 50%;
        height: 100%;
      }

      .input-title @{deep} .el-input__inner {
        font-size: 23px;
        height: 60px;
        line-height: 60px;
        border-radius: 0;
        border: 0;
      }

      .panel {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 16px;
        color: #dbdbdb;

        .save {
          margin-right: 14px;
        }

        .draft-btn {
          margin: 0 4px;
          padding: 2px 4px;
          border: 1px solid #d3d3d3;
          color: #c5c5c5;
        }

        @{deep} .publish {
          font-size: 16px;
          border: 0;
          margin: 10px;
          padding: 0;

          :hover, :focus, :active {
            color: #128594;
            border: 0;
            background-color: #ffffff;
          }
        }

        .el-icon-picture {
          margin: 0 12px;
          cursor: pointer;
        }

        .el-icon-arrow-down {
          font-size: 16px;
          width: 24px;
          margin-left: 0;
        }

        .user {
          margin: 0 20px 0 0;
        }
      }
    }

    .middle {
      border-top: 1px solid #dddddd;
      flex: 1;
      width: 100%;

      .mavon-editor--box {
        height: 100%;
      }
    }

    .bottom {
      display: flex;
      height: 40px;
      width: 100%;
      justify-content: flex-start;
      align-items: center;

      .bottom-panel {
        padding: 4px 20px;
        font-size: 20px;

        @{deep} .el-switch__label.el-switch__label--right {
          color: #bbb;
          &.is-active {
            color: #409eef;
          }
        }
      }
    }
  }

</style>

<style lang="less">
  .el-popover.el-popper {
    top: 60px !important;
    right: 40px;
    margin-top: 0;
    width: 200px;
    border-top: 1px solid #e2e2e2;

    .pop-box {
      margin: 12px;
      .publish-title {
        margin-bottom: 10px;
        font-size: 17px;
        font-weight: 600;
      }
      .panel-title {
        margin: 8px 0;
        font-size: 14px;
        font-weight: 500
      }
      .panel {
        margin: 10px 0;
      }
      .input-new-tag {
        margin: 6px 0;
        border: 0;

        .el-input__inner {
          font-size: 14px;
          height: 24px;
          line-height: 24px;
          border-radius: 0;
          border: 0;
          border-bottom: 1px solid #dddddd;
          padding: 12px 4px;
        }
      }

      .el-button.el-button--mini {
        width: 80px;
        padding: 10px 8px;
      }
      .tag_margin {
        margin: 3px;
      }

      .publish-btn {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }


</style>

