<template>
  <div class="register">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名">
    <h4>电子邮箱</h4>
    <input v-model="email" placeholder="电子邮箱">
    <h4>密码</h4>
    <input v-model="password" type="password" placeholder="密码" @keyup.enter="onRegister">

    <el-button size="medium" @click="onRegister">立即注册</el-button>
    <p class="notice">已有账号？
      <router-link to="/auth/login">立即登录</router-link>
    </p>
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
  @import '~@/assets/base.less';

  .register {
    display: grid;
    justify-content: center;
    padding-top: 15%;

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
