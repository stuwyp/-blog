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
          <span v-if="saved">已保存至</span>
          <span v-else>文章将会自动保存至</span>
          <router-link class="draft-btn" to="/draft">草稿</router-link>
        </span>
        <i class="el-icon-picture" style="font-size: 22px;"></i>

        <el-popover v-model="visible" trigger="click">
          <div class="pop-box">
            <div class="publish-title">发布文章</div>
            <div class="panel">
              <div class="panel-title">分类</div>

              <div>
                <el-button class="cate-btn"
                           type="mini"
                           v-for="cate in categories"
                           :key="cate.id"
                           @click="handleSelectCate(cate)">
                  {{cate.name}}
                </el-button>
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
              <el-button v-else class="button-new-tag" size="mini" @click="showInput">+New Tag</el-button>
            </div>
            <div class="publish-btn">
              <el-button type="small">确定并发布</el-button>
            </div>
          </div>
          <el-button plain slot="reference" class="publish">
            发布
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
        <i class="el-icon-picture"></i>
      </span>
    </div>
  </div>
</template>

<script>
import vUser from "../layout/components/user_tool";

export default {
  components: {
    vUser
  },
  data() {
    return {
      saved: false,
      draft_title: '',
      draft_content: '',
      cate_id: 0,
      labels: [],
      inputVisible: false,
      inputValue: '',
      visible: false,
      categories: [
        {id: 1, name: '后端'},
        {id: 2, name: '前端'},
        {id: 3, name: 'Android'},
        {id: 4, name: 'iOS'},
        {id: 5, name: '人工智能'},
        {id: 7, name: '开发工具'},
        {id: 8, name: '代码人生'},
        {id: 6, name: '阅读'}
      ]
    }
  },
  methods: {
    handleSelectCate(cate) {
      this.cate_id = cate.id
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

        /deep/ .publish {
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
          margin: 0 14px;
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

        .el-icon-picture {
          color: #7e8c8d;
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
    width: 320px;
    border-top: 1px solid #e2e2e2;

    .pop-box {
      margin: 12px;
      .publish-title {
        margin-bottom: 10px;
        font-size: 17px;
        font-weight: 600
      }
      .panel-title {
        margin: 8px 0;
        font-size: 14px;
        font-weight: 500
      }
      .panel {
        margin: 10px 0;
      }
      .cate-btn {
        min-width: 40px;
        max-width: 90px;
        margin: 4px;
      }

      .input-new-tag {
        margin: 4px 0;
      }
      .el-button.el-button--mini {
        width: 80px;
        padding: 8px 4px;
      }
      .tag_margin {
        margin: 3px;
      }

      /deep/ .el-input__inner {
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        border-radius: 0;
        border: 0;
        border-bottom: 1px solid #dddddd;
        padding: 10px 0;
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

