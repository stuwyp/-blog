<template>
  <span>
    <el-dropdown class="nav-icon">
          <span class="el-dropdown-link me">
            <i class="el-icon-user" style="font-size: 20px;"></i>
          </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/editor/drafts">草稿</router-link>
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
  </span>
</template>

<script>
import {mapActions} from 'vuex'

export default {


  methods: {
    ...mapActions([
      'logout'
    ]),

    onLogout() {
      this.logout()
      this.$router.push({path: '/'})
    },
  }
}
</script>

<style scoped lang="less">
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

  .me {
    font-size: 16px;
    padding: 10px;
  }

  .nav-icon {
    cursor: default;
  }
</style>
