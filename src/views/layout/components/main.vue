<template>
  <div class="page-main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "vMain"
}
</script>

<style scoped lang="less">
  @import "~@/assets/common.less";
  .page-main {
    background-color: @bgColor;
  }



</style>
