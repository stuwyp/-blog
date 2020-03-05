<template>
  <div class="container">
    <div class="top">
      <div class="title">
        <el-input v-model="draft_title"
                  class="input-title"
                  placeholder="输入文章标题..."></el-input>
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
                <!--<el-button class="cate-btn"-->
                <!--type="mini"-->
                <!--v-for="cate in categories"-->
                <!--:key="cate.id"-->
                <!--@click="handleSelectCate(cate)">-->
                <!--{{cate.name}}-->
                <!--</el-button>-->
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
                      v-for="tag in labels"
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
</template>

<script>
import vUser from "../layout/components/user_tool";
import {genRandomStr} from "../../utils/index"
import {mapGetters} from 'vuex'
import cate from '@/api/cate'
import blog from '@/api/blog'
import draft from '@/api/draft'

export default {
  components: {
    vUser
  },
  beforeRouteEnter(to, from, next) {
    let uuid = to.path.split('/drafts/new/')[1]
    // draft.getDraft
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.uuid = uuid
    })
  },
  data() {
    return {
      storageKey: '',
      draft_title: '',
      draft_content: '',
      isSaved: false,
      isAutoSaved: true,
      inputVisible: false,
      inputValue: '',
      visible: false,
      isEdited: false,
      storage: {
        title: '',
        content: ''
      },
      draftCnt: 0,
      cate_id: 0,
      categories: [],
      labels: [],
      uuid: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    this.fetch_data()
  },
  watch: {
    draft_content(new_val) {
      if (!this.isEdited) {
        this.isEdited = true;
        this.uuid = genRandomStr()
        this.$router.push({path: `/editor/drafts/new/${this.uuid}`})
        Object.assign(this.storage, {'id': this.uuid})
      }
      if (this.isAutoSaved) {
        this.storage.content = new_val
        const draft = JSON.stringify(this.storage)
        this.isSaved = false
        setTimeout(() => {
          localStorage.setItem(`draft-u${this.user.id}-${this.storage.id}`, draft)
          this.isSaved = true
        }, 1000)
      }
    },
    draft_title(new_val) {
      if (!this.isEdited) {
        this.isEdited = true;
       this.uuid = genRandomStr()
        this.$router.push({path: `/editor/drafts/new/${this.uuid}`})
        Object.assign(this.storage, {'id': this.uuid})
      }
      if (this.isAutoSaved) {
        Object.assign(this.storage, {'title': new_val})

        const draft = JSON.stringify(this.storage)
        this.isSaved = false
        setTimeout(() => {
          localStorage.setItem(`draft-u${this.user.id}-${this.storage.id}`, draft)
          this.isSaved = true
        }, 1000)
      }
    }
  },
  methods: {
    async fetch_data() {
      let res = await cate.getCates()
      this.categories = res.data
      this.cate_id = 8
    },
    handlePublish() {
      if(this.labels.length === 0){
        this.$message.warning("请至少选择一个标签")
        return
      }
      blog.createBlog({
        title: this.draft_title,
        content: this.draft_content,
        description: '',
        user_id: this.user.id,
        tags: this.labels,
        category_id: this.cate_id,
        state: 1,
        uuid: this.uuid
      })
        .then(res => {
          // console.log(res)
          this.$message.success("创建成功")
          // this.$router.push({path: `/blog/${res.id}`})
        })
    },
    handleTagClose: function (tag) {
      this.labels.splice(this.labels.indexOf(tag), 1)
    },
    handleInputConfirm: function () {
      let inputValue = this.inputValue
      if (inputValue.trim()) {

        if (this.labels.indexOf(inputValue) > -1)
          this.$message.error("标签重复，添加失败")
        else if (this.labels.length >= 3)
          this.$message.error("最多只能添加三个")
        else
          this.labels.push(inputValue)

      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput: function () {
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
  @deep: ~'>>>';
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

