<template>
  <header>
    <router-link to="/" class="title">My Blog</router-link>
    <div class="nav">
      <div class="nav-left">
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
      </div>
      <div class="nav-middle">
        <el-input
          v-model="searchInput"
          clearable
          placeholder="搜索内容"
          @keyup.enter.native="onEnterSearch"
          prefix-icon="el-icon-search"></el-input>
      </div>
      <template v-if="!isLogin">
        <div class="nav-right">
          <router-link to="/auth/login">
            <span :class="loginClass">登录</span>
          </router-link>
          <span style="padding: 3px">/</span>
          <router-link to="/auth/register">
            <span :class="registerClass">注册</span>
          </router-link>
        </div>
      </template>
      <template v-if="isLogin">
        <div class="nav-right">
          <el-button type="mini" class="nav-icon notification" @click="getNotification">
            <i class="el-icon-message-solid" style="font-size: 20px;"></i>
          </el-button>
          <v-user/>

        </div>
      </template>
    </div>
  </header>
</template>


<script>
import auth from '@/api/auth'
import utils from '@/api/utils'
import vUser from "./user_tool";

window.auth = auth
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    vUser
  },
  data() {
    return {
      searchInput: '',
      itemList: [
        {title: '', url: ''},
        {title: '首页', url: '/index'},
        {title: '社区', url: '/post/index'},
        {title: '写文章', url: '/draft/new'},
      ]
    }
  },
  created() {
    this.checkLogin()
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ]),

    loginClass() {
      return ['login', this.$route.path === '/auth/login' ? 'active' : '']
    },

    registerClass() {
      return ['register', this.$route.path === '/auth/register' ? 'active' : '']
    },

    activeIndex() {
      for (let i of this.itemList.slice(1)) {
        if (this.$route.path === i.url)
          return this.$route.path
      }
      return ''
    }
  },

  methods: {
    ...mapActions([
      'checkLogin'
    ]),
    handleSelect(url) {
      if (url !== '')
        this.$router.push(url)
    },

    async onEnterSearch() {
      // console.log(this.searchInput)
      let result = await utils.globalSearch(this.searchInput)
      console.log(result)
    },

    getNotification() {
      this.$router.push({path: '/notification'})
    }
  }
}
</script>

<style lang="less">

  @import "~@/assets/base.less";
  @import "http://at.alicdn.com/t/font_1377453_livkfs5l37.css";

  header {
    padding: 0 15%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #fff;
    border-bottom: 1px solid #efefef;

    .title {
      color: #828282;
      font-size: 25px;
      font-weight: lighter;
      margin: 0 2.5%;
      cursor: default;
    }

    .nav {
      margin: 0;
      flex: 1 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .nav-left {
      margin: 0 1%;
      flex: 1;
    }

    .nav-middle {
      width: 160px;
    }
    .nav-right {
      margin: 0 2%;
    }

    .nav-icon {
      cursor: pointer;
    }

    .el-button:hover {
      color: #1db7d8;
      background-color: #FFF;
    }

    .notification {
      border: 0;
      padding: 10px;
      color: #959595;
    }
    .login, .register {
      color: #868e8a;
      font-size: 16px;
    }

    .active {
      color: #212121;
    }

  }

  @media (max-width: 960px) {
    header {
      padding: 0 10%;
    }
  }
</style>

