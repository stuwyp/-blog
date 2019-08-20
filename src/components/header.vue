<template>
  <header>
    <template>
      <h1>My Blog</h1>
      <div class="nav_right">
        <ul class="nav">
          <li v-for="(item, index) in itemList" :key="index" @click="handleAClick(item.title)">
            <router-link :to="item.url" :class="[(currentClick === item.title) ? 'aActive' :'aNormal']">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </template>
  </header>
</template>


<script>

export default {
  data() {
    return {
      currentClick: '首页',
      itemList: [
        {title: '首页',url: '/'},
        {title: '关于',url: '/about'},
        {title: '标签',url: '/tag'},
        {title: '分类',url: '/category'},
        {title: '归档',url: '/archive'}
      ],
    }
  },
  methods: {
    handleAClick: function (title) {
      this.currentClick = title
    },
  }
}
</script>

<style lang="less">

  @import "../assets/base.less";

  .el-button {
    background-color: white;
  }


  header {
    display: flex;
    align-items: center;
    background: @bgColor;

    h1 {
      margin: 0;
      padding: 0;
      color: #828282;
      font-size: 26px;
      font-weight: lighter;
      flex: 1;
    }

    .edit {
      color: #fff;
      font-size: 30px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border: 1px solid #fff;
      border-radius: 50%;
      margin-left: 15px;
    }
  }

  .aActive {
    color: #007fff;
  }

  .aNormal {
    color: #71777c;
  }

  .nav_right {
    width: auto;
    margin: auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .nav {
    margin-left: 25px;
    li {
      width: 70px;
      float: left;
      list-style: none;
      a {
        display: block;
        height: 60px;
        line-height: 60px;
        text-align: center;
        text-decoration: none;
      }
    }
  }

</style>
