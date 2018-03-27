<template>
  <div>正在登出...</div>
</template>
<script>
export default {
  data() {
    return {
        loginTimer:null
    }
  },
  mounted() {
    this.loginTimer = setTimeout( ()=>{
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      clearTimeout(this.loginTimer)
      this.loginTimer = null
    },1000)
  }
}
</script>
