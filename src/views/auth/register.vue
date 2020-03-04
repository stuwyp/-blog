<template>
  <div class="register">
    <div class="register-box">
      <h4>用户名</h4>
      <p><input v-model="username" placeholder="用户名"></p>

      <h4>电子邮箱</h4>
      <p><input v-model="email" placeholder="电子邮箱"></p>

      <h4>密码</h4>
      <p><input v-model="password" type="password" placeholder="密码" @keyup.enter="onRegister"></p>

      <el-button size="medium" @click="onRegister">立即注册</el-button>
      <p class="notice">已有账号？
        <router-link to="/auth/login">立即登录</router-link>
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
      email: '',
      password: ''
    }
  },

  methods: {
    ...mapActions(['register']),

    onRegister() {
      this.register({username: this.username, password: this.password, email: this.email})
        .then(() => {
          this.$message.success({
            duration: 1500,
            message: "注册成功"
          })
          this.$router.push({path: '/'})
        })
        .catch(() => {
          this.$message.error("注册失败")
        })
    }
  }
}
</script>

<style scoped lang="less">
  @import 'common.less';

  .register {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
