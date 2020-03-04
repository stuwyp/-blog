<template>
  <div id="login">
    <div class="login-box">
      <h4>用户名</h4>

      <p><input v-model="username" placeholder="用户名"></p>

      <h4>密码</h4>
      <p><input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin"></p>

      <el-button size="medium" @click="onLogin">立即登录</el-button>
      <p class="notice">没有账号？
        <router-link to="/auth/register">注册新用户</router-link>
      </p>
    </div>
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
        this.$message.success({
          duration: 1500,
          message: "登录成功"
        })
        this.$router.push({path: this.$route.query.redirect || '/'})
      }
      catch (err) {
        this.$message.error('账号或密码错误')
      }
    }
  }
}

</script>

<style scoped lang="less">
  @import 'common.less';

  #login {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>
