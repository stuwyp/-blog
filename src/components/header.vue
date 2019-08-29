<template>
  <header>

    <router-link to="/" class="title">My Blog</router-link>
    <div class="nav-left">
      <el-input v-model="searchInput" placeholder="搜索内容"></el-input>
    </div>
    <template v-if="!isLogin">
      <div class="nav-middle">
        <ul class="nav">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            background-color="#f9f9f9"
            mode="horizontal"
            @select="handleSelect">
            <el-menu-item v-for="(item, index) in itemList" :index="index.toString()" :key="index">
              {{item.title}}
            </el-menu-item>
          </el-menu>
        </ul>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="nav-right">
        <router-link to="/login"><span class="login">登录</span></router-link>
        <span style="padding: 5px">/</span>
        <router-link to="/register"><span class="register">注册</span></router-link>
      </div>
    </template>
    <template v-if="isLogin">
      <div class="nav-middle">
        <ul class="nav">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            background-color="#f9f9f9"
            mode="horizontal"
            @select="handleSelect">
            <el-menu-item v-for="(item, index) in itemList" :index="index.toString()" :key="index">
              {{item.title}}
            </el-menu-item>
          </el-menu>
        </ul>
      </div>
      <div class="nav-right">
        <el-dropdown>
          <span class="el-dropdown-link me">
            我的<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/">草稿</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/">回收站</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link to="/me">我的主页</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <a href="#" @click="onLogout">退出登录</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
  </header>
</template>


<script>
import auth from '@/api/auth'

window.auth = auth
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      activeIndex: '0',

      searchInput: ''
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'user'
    ]),
    itemList() {
      let list = []
      if (this.isLogin) {
         list = [
           {title: '首页', url: '/'},
           {title: '标签', url: '/tag'},
           {title: '分类', url: '/category'},
           {title: '通知', url: '/notification'},
           {title: '写文章', url: '/create'},
         ]
      }
      else {
        list = [
          {title: '首页', url: '/'},
          {title: '写文章', url: '/create'},
        ]
      }
      return list
    }
  },
  created() {
    this.checkLogin()
  },


  methods: {
    ...mapActions([
      'checkLogin',
      'logout'
    ]),

    handleSelect(key, keyPath) {
      this.$router.push(this.itemList[key].url)
    },
    onLogout() {
      this.logout()
    },



  }
}
</script>

<style lang="less">

  @import "../assets/base.less";

  header {
    display: flex;
    align-items: center;
    background: @bgColor;

    .title {
      color: #828282;
      font-size: 25px;
      font-weight: lighter;
      flex: 1;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border: 1px solid #fff;
      border-radius: 50%;
      margin-left: 15px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #636363
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }

    .nav-right {
      margin-left: 1%;

      .me{
        font-size: 16px;
        margin-left: 5px;
      }
    }

    .login, .register {
      color: #868e8a;
      font-size: 16px;
    }
  }


</style>
