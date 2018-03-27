<template>
    <div class="order_pay">
        <div class="order_pay_info" v-if="orderInfo">
            <h1>本单应付金额：<span style="color:#DE4635">{{orderInfo.payPrice}}元</span></h1>
            <p v-if="orderInfo.proxyCardBatchs">
                您正在购买
                <span v-for="(el,orderKey) in orderInfo.proxyCardBatchs" :key="el.id" v-if="orderKey < 2&&!expanded">
                    “{{el.cardName}}”{{el.generateAmount}}张<span v-if="orderKey < 1||orderInfo.proxyCardBatchs.length <= 2">，</span><span v-if="orderKey === 1&&orderInfo.proxyCardBatchs.length>2">等，</span>
                </span>
                <span v-for="el in orderInfo.proxyCardBatchs" :key="el.id" v-if="expanded">
                    “{{el.cardName}}”{{el.generateAmount}}张，
                </span>
                合计{{orderInfo.amountTotal}}元，优惠{{orderInfo.couponAmount}}元，应付金额：{{orderInfo.payPrice}}元。
                <i class="el-icon-arrow-down ico" @click="expanded=true" v-if="!expanded && orderInfo.proxyCardBatchs.length>2"/>
                <i class="el-icon-arrow-up ico" @click="expanded=false" v-if="expanded"/>
            </p>
        </div>
        <div class="pay_card_box">
            <div class="tit">付款方式：</div>
            <el-tabs type="card" value="quickPay">
                <el-tab-pane label="快钱支付" name="quickPay">
                    <span slot="label" class="tab-item">快钱支付</span>
                    <QuickPay :orderAmount="orderInfo.payPrice" :orderId="orderInfo.orderNo" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import QuickPay from '@/components/QuickPay'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            expanded : false
        }
    },
    computed: {
    ...mapGetters([
      'orderInfo'
    ])},
    components: {
        QuickPay
    },
    mounted() {
        // console.log(this.$store.state.user)
        console.log(this.orderInfo,'orderInfo')
        if(!this.orderInfo||(this.orderInfo&&!this.orderInfo.payPrice)){
            this.$router.push({ path: '/purchase/page'})
        }
    }
}
</script>
<style lang="scss" scoped>
.order_pay{
    border-top: 25px solid #f3f3f3;
    .pay_card_box{
        padding: 50px;
        background-color: #fff;
        border: 1px solid #fce5e5;
        border-top: 25px solid #f3f3f3;
    }
    .tab-item{
        display: inline-block;
        width: 120px;
        text-align: center;
    }
    .order_pay_info{
        // height: 80px;
        padding: 10px 0;
        padding-left: 50px;
        background-color: #fff;
        // margin: 0 0 20px;
        border: 1px solid #fce5e5;
        // position: relative;
        h1{
            font-size: 18px;
            // margin-top: 5px;
            font-weight: 500;
        }
        p{
            font-size: 12px;
            color: #757373;
            line-height: 20px;
            .ico{
                position: relative;
                left:30px;
                cursor: pointer;
            }
            // font-weight: 300;
        }
    }
    .tit{
        // border-top: 25px solid #f3f3f3;
        font-weight: 500;
        font-size: 20px;
        padding-bottom: 20px;
        padding-top: 20px;
        // padding-left: 20px;
    }
}  
</style>

