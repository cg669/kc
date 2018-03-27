<template>
  <div class="pay_call">
      <div class="succ">
          <i class="el-icon-error" />
      </div>
      <div class="info">
          付款失败，请致电1010-8868
      </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
    .pay_call{
       height: 500px;
       border: 1px solid #ddd;
       text-align: center;
       background-color: #fff;
       .succ{
           margin: 100px auto 40px;
           font-size: 100px;
           color: rgb(231, 61, 18)
       }
        .info{
            font-size: 24px;
            font-weight: 500;
        }
    }
</style>

