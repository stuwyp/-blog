<template>
  <header>
    <router-link to="/" class="title">My Blog</router-link>

    <div class="nav-left">
      <el-input
        v-model="searchInput"
        clearable
        placeholder="搜索内容"
        @keyup.enter.native="onEnterSearch"
        prefix-icon="el-icon-search"></el-input>
    </div>
    <div class="nav-middle">
      <ul class="nav">
        <el-menu
          ref="'menu"
          :default-active="activeIndex"
          class="el-menu-demo"
          background-color="#fff"
          mode="horizontal"
          style="border-bottom:0"
          @select="handleSelect">
          <el-menu-item v-show="index>0" v-for="(item, index) in itemList" :index="item.url" :key="index">
            {{item.title}}
          </el-menu-item>
        </el-menu>
      </ul>
    </div>

    <template v-if="!isLogin">
      <div class="nav-right">
        <router-link to="/login"><span class="login">登录</span></router-link>
        <span style="padding: 3px">/</span>
        <router-link to="/register"><span class="register">注册</span></router-link>
      </div>
    </template>

    <template v-if="isLogin">
      <div class="nav-right">
        <el-button type="mini" class="nav-icon notification" @click="getNotification">
          <i class="iconfont  icon-tongzhi" style="font-size: 20px;"></i>
        </el-button>

        <el-dropdown class="nav-icon">
          <span class="el-dropdown-link me">
            <i class="el-icon-user" style="font-size: 20px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/draft">草稿</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/recycle_bin">回收站</router-link>
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
import utils from '@/api/utils'

window.auth = auth
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      searchInput: '',
      itemList: [
        {title: '', url: ''},
        {title: '首页', url: '/'},
        {title: '我的文章', url: '/archive'},
        {title: '写文章', url: '/create'},
      ]
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'user'
    ]),


    activeIndex() {
      for (let i of this.itemList.slice(1)) {
        if (this.$route.path === i.url)
          return this.$route.path
      }
      return ''
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

    handleSelect(url) {
      if (url !== '')
        this.$router.push(url)
    },
    async onEnterSearch() {
      console.log(this.searchInput)
      let result = await utils.globalSearch(this.searchInput)
      console.log(result)
    },
    onLogout() {
      this.logout()
      this.$router.push({path: '/'})
    },

    getNotification() {
      this.$router.push({path: '/notification'})
    }

  }
}
</script>

<style lang="less">

  @import "../assets/base.less";
  @import "http://at.alicdn.com/t/font_1377453_livkfs5l37.css";

  header {
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #efefef;

    .title {
      color: #828282;
      font-size: 25px;
      font-weight: lighter;
      flex: 1;
      margin-left: 2%;
      cursor: default;
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

    .nav {
      margin: 0;
    }

    .nav-icon {
      cursor: pointer;
    }
    .notification {
      border: 0;
      padding: 10px;

    }
    .nav-right {
      margin-left: 1%;
      .me {
        font-size: 16px;
        padding: 10px;
      }
    }

    .login, .register {
      color: #868e8a;
      font-size: 16px;
    }

  }


</style>

