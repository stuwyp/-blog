<template>
  <div id="app">
    <Header id="header"></Header>
    <div id="main">
      <router-view></router-view>
    </div>
    <div id="left"></div>
    <div id="right"></div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less">
  @import "./assets/common.less";

  #app {
    display: grid;
    grid-template-columns: 12% auto 12%;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "header header header" "left main right" "footer footer footer";

    #header {
      grid-area: header;
      padding-left: 12%;
      padding-right: 12%;
    }

    #main {
      grid-area: main;
    }
    #left {
      grid-area: left;
    }
    #right {
      grid-area: right;
    }

    #footer {
      grid-area: footer;
      padding-left: 12%;
      padding-right: 12%;
    }
    #left, #right, #main {
      background-color: #fbfbfb;
    }
  }

  @media (max-width: 768px) {
    #app {
      grid-template-columns: 10px auto 10px;

      #header,
      #footer {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
</style>
