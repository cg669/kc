<template>
  <div class="pay_call">
      <div class="succ">
          <!-- <i class="el-icon-success" /> -->
          <svg-icon icon-class="success" class="iconclass_succe" />
      </div>
      <div class="info">
          购买成功
      </div>
      <div class="pay_box" v-if="oData.length">
          <p class="pay_info" v-for="(val,key) in oData[0].proxyCardBatchs" :key="key" v-if="key < 2">
              “{{val.cardName}}”{{val.generateAmount}}张
              <span v-if="key === 0&&oData[0].proxyCardBatchs.length !== 1">,</span>
              <span v-if="(key === 1)&&(oData[0].proxyCardBatchs.length > 2)">等几种代理卡</span>
          </p>
      </div>
      <div class="pay_btn_box">
          <el-button type="danger" plain class="home_btn" @click="handleToHome">返回首页</el-button>
          <el-button type="danger" class="order_btn" @click="handleToOrder">查看订单</el-button>
      </div>
  </div>
</template>
<script>
import { proxyCardOrder } from '@/api/purchase'
export default {
  data() {
      return {
          oData:[]
      }
  },
  methods: {
      //  返回首页
      handleToHome() {
          this.$router.push({ path: '/home' })
      },
      //   查看订单
      handleToOrder() {
          this.$router.push({ path: '/purchase/page' })
      },
   initData(orderNo) {
        proxyCardOrder({
            orderNo
        }).then( res=>{
            console.log(res)
            if(res.code == 0 && res.data){
                this.oData = res.data.elements
            }
        }).catch( err => console.log(err))
      }
  },
  mounted() {
      console.log(this.$route.params.id,'idddddddddsadasdasdd')
      this.initData(this.$route.params.id)
  }
}
</script>
<style lang="scss" scoped>
    .pay_call{
       height: 500px;
       border: 1px solid #ddd;
       text-align: center;
       background-color: #fff;
       .succ{
           margin: 100px auto 19px;
           font-size: 100px;
           color: rgb(45, 155, 45)
       }
        .info{
            font-size: 24px;
            font-weight: 500;
        }
        .pay_box{
            padding-bottom: 34px;
        }
        .pay_info{
            font-size: 14px;
            color: #b6b6b6;
            line-height: 10px;
        }
        .pay_btn_box{
            .home_btn{
                color: #f67f7e;
                width:154px;line-height:24px;background:#fdebeb;
                &:hover{
                    color: #f67f7e;
                }
                margin-right: 20px;
            }
            .order_btn{
                width:154px;background:#f54d49;line-height:24px
            }
        }
    }
</style>

