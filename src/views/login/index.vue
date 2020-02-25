<template>
  <div id="login">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名">
    <h4>密码</h4>
    <input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin">
    <el-button size="medium" @click="onLogin">立即登录</el-button>
    <p class="notice">没有账号？
      <router-link to="/register">注册新用户</router-link>
    </p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    ...mapActions(['login']),

    async onLogin() {
      try {
        await this.login({username: this.username, password: this.password})
        this.$message.success("登录成功")
        this.$router.push({path: this.$route.query.redirect || '/'})
      }
      catch (err) {
        this.$message.error('账号或密码错误')
      }
    }
  }
}

</script>

<style lang="less">
  @import url('../../assets/base.less');

  #login, #register {
    display: grid;
    justify-content: center;
    padding-top: 10%;

    h4 {
      margin: 10px 0 5px;
    }

    p {
      margin: 5px 0;
    }

    input {
      width: 400px;
    }

    .error {
      font-size: 12px;
      color: #f00;
    }

    button {
      margin-top: 30px;
      justify-self: start;
    }

    .notice {
      font-size: 12px;
      color: @textLighterColor;
      text-align: center;
      margin-top: 30px;

      a {
        color: @themeColor;
      }
    }
  }


</style>
