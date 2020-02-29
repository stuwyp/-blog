<template>
  <div class="blog-page">
    <v-header class="blog-header" v-show="isMenu"/>
    <v-main class="blog-main"/>
    <v-footer class="blog-footer" v-show="isMenu"/>
    <el-backtop target=".blog-page"/>
  </div>
</template>

<script>
import vHeader from "./components/header";
import vMain from "./components/main";
import vFooter from "./components/footer";

export default {
  components: {
    vHeader,
    vMain,
    vFooter
  },
  computed: {
    isMenu() {
      return this.$route.meta.isMenu
    }
  }
};
</script>

<style lang="less">

  .blog-page {
    height: 100%;
    min-width: 800px;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .blog-header {
      height: 60px;
    }
    .blog-main {
      flex: 1;
    }
    .blog-footer {
      height: 20px;
    }

  }

  @media (max-width: 960px) {

  }
</style>
