<template>
  <div class="published-page">

    <div class="word">
      <p>发布成功！有了你的分享，我们会变得更好！</p>
    </div>
    <div class="article">
      <router-link :to="link"></router-link>
      <div class="share">
        分享到：
        <span class="share-to">微信</span>
        <span class="share-to">微博</span>
        <span class="share-to">复制链接</span>
      </div>
    </div>
    <div class="btn-group">
      <router-link to="/editor/drafts"><el-button type="primary">回到草稿</el-button></router-link>
      <router-link to="/"><el-button plain class="back-home">回到首页</el-button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "published",
  props: {
    link: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {}
  },
  mounted() {
    this.checkLink()
  },
  methods: {
    checkLink() {
      if (this.link === '' || this.title === '') {
        setTimeout(()=>{
          this.$router.push({path: '/'})
        },500)
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/base.less";

  .published-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .word {
      margin: 20px 0;
    }

    .article {
      margin: 20px 0;
      width: 640px;
      height: 160px;
      background-color: white;
      border-radius: 1px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .share {
        margin: 10px;
        .share-to {
          cursor: pointer;
          display: inline-block;
          text-align: center;
          padding: 6px 20px;
          margin: 0 8px;
          border: 1px solid #dddddd;
          border-radius: 50%;
        }
      }
    }

    .btn-group {
      .el-button {
        height: 40px;
        width: 160px;
        display: block;
        margin: 8px 0;
        border: 0;
        &.back-home {
          background-color: @bgColor;
        }
      }
    }
  }
</style>
