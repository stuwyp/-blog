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
