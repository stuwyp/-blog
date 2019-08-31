import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      email:'',
      password: ''
    }
  },

  methods: {
    ...mapActions(['register']),

    onRegister() {
      this.register({username: this.username, password: this.password,email:this.email})
        .then(()=>{
          this.$message.success("注册成功")
          this.$router.push({path: '/'})
        })
        .catch(()=>{
          this.$message.error("注册失败")
        })
    }
  }
}
