<template>
    <div class="top_bar_wrapper">
        <div class="top_bar">
            <div class="logo">
                <img :src="img_logo" alt="掌门1对1" title="掌门1对1" width="100%" style="margin-top:15px">
            </div>
            <div class="loign_box">
                <el-button type="info" plain @click="handleToLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import img_logo from '@/assets/logo.png'
export default {
  data() {
      return {
          img_logo
      }
  },
  methods: {
      handleToLogin() {
          this.$router.push({ path: `login` })
      }
  }
}
</script>
<style lang="scss" scoped>
.top_bar_wrapper{
    position: fixed;
    z-index: 999;
    top: 0;
    background-color: #fff;
    width: 100%;
    height: 80px;
}
.top_bar{
    margin: 0 auto;
    width: 1026px;
    overflow:hidden;_zoom:1;
    height: 80px;
    line-height: 80px;
    .logo{
    // display: inline-block;
        float: left;
        width: 180px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        // background-color: #eee
    }
    .loign_box{
        float: right;
    }
}
</style>


