<template>
  <div class="shop_card_con">
        <div class="title">
            <span class="tit">确认订单</span>
            <el-button plain icon="el-icon-d-arrow-left" size="small" class="back" @click="handleBack">返回</el-button>
        </div>
        <div class="container">
            <el-table :data="comfirmOrderList" style="width: 100%" row-class-name="tab_cell" header-row-class-name="head-dd">
                 <el-table-column label="代理卡信息" width="365">
                    <template slot-scope="scope">
                        <div class="ii" @click="handleToDetail(scope.row.proxyCardId)">
                            <img :src="scope.row.proxyCardBo.imgUrl" class="image">
                            <div style="float:left;margin-left:16px;width:130px">
                                <div style="color:#000;font-weight:500;font-size:18px">{{scope.row.proxyCardBo.name}}</div>
                                <p>有效期：{{scope.row.proxyCardBo.validityPeriod}}天</p>
                            </div> 
                        </div> 
                    </template>
                </el-table-column>
                <el-table-column label="单价" min-width="100" align="center">
                    <template slot-scope="scope">
                        <div>￥{{scope.row.proxyCardBo.salesPrice}}</div>
                        <p class="old_price">￥{{scope.row.proxyCardBo.originalPrice}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="数量" min-width="180" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.number">x{{scope.row.number}}</span>
                        <!-- <el-input-number v-model="scope.row.number" @change="handleAddShopCar(scope.row)" :min="1" :max="1000000" style="width:80%"/> -->
                    </template>
                </el-table-column>
                <el-table-column label="金额" min-width="200" align="center">
                    <template slot-scope="scope">
                        <div>￥{{setMoney(scope.row.proxyCardBo.salesPrice * scope.row.number)}}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pay confirm-pay">
            <div class="pay-box">
                <p class="total" style="margin: 30px 0;">合计<span style="color:#333;margin-left:20px">￥</span><span class="money" style="font-weight:500">{{setMoney(tota)}}</span></p>
                <p class="total">
                    优惠码
                    <el-input v-model="couponCode" placeholder="请输入您的优惠码" style="width:200px;margin-left:20px;position:releative;top:1px" size="small" @input="handleInputCode"/>
                    <el-button  size="small" @click="handleCuuponCode" v-show="!showReset" style="margin-left:10px">兑换</el-button>
                    <el-button  size="small" @click="handleSetCode" v-show="showReset">重新输入</el-button>
                </p>
                <div class="money-box">
                    <p class="total">
                    折扣：
                    <span v-if="discount != '1'">{{discount * 1000 / 100}}折</span>
                    <span v-else>无</span>
                    </p>
                    <p class="total" style="margin-bottom:30px;">应付金额：￥{{setMoney(tota)}} x {{discount*1000 / 10 + '%'}} = <span class="tt"><span style="font-size:14px">￥</span>{{setMoney(tota * discount)}}</span></p>
                    <p class="total"><el-button type="danger" style="width:154px;line-height:24px;background-color: #ef4c4f;" @click="handleConfirmOrder">提交订单</el-button></p>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import { parseTime, formatText } from '@/utils'
import { proxyCardCouponCode, addProxyCardOrder } from '@/api/purchase'
// import Tit from '@/components/Tit'
export default {
    name : 'comfirmOrder',
    props: {
        comfirmOrderList: {
            default : [],
            type: Array,
            required: true
        },
        tota: {
            default : 0,
            type: Number,
            required: true
        }
    },
    data() {
        return {
            couponCode: '',
            discount: 1,
            showReset: false
        }
    },
    // components: {
    //   Tit
    // },
    methods: {
        handleBack() {
            this.$store.dispatch('SetConfirmOrderStatus',false)
            // this.$emit('back-shop-car')
            this.couponCode= ''
            this.discount = 1
            this.showReset= false
        },
        handleInputCode() {
            this.showReset=false
            this.discount = 1
        },
        handleSetCode() {
            this.couponCode = ''
            this.discount = 1
            this.showReset = false
        },
        //  设置下金钱
        setMoney( val ) {
            val = Math.round(val * 100) / 100
            val += ''
            return formatText(val)
        },
        //  验证验证码
        handleCuuponCode() {
            const couponCode = this.couponCode
            this.showReset = true
            proxyCardCouponCode({couponCode}).then( res=>{
                console.log(res)
                if(res && res.code==='0'){
                    this.discount = res.data.discount
                }
            }).catch( err => console.log(err))
        },
        //  提交订单
        handleConfirmOrder() {
            // console.log(this.comfirmOrderList)
            // let proxyCardBuys = this.comfirmOrderList.map(el=>{

            // })
            addProxyCardOrder({
                amountTotal: Math.round(this.tota * 100) / 100,
                couponCode: this.couponCode,
                payPrice: Math.round(this.tota*this.discount * 100) / 100,
                proxyCardBuys:this.comfirmOrderList
            }).then( res=>{
                console.log(res)
                if(res&&res.code==='0'){
                    //  存入仓库后页面跳转
                    this.$store.dispatch('SetOrderInfo',res.data).then(()=>{
                        //  更新购物车
                        this.$store.dispatch('GetShopCar')
                        .then( ()=>this.$router.push({ path: '/purchase/order-pay' }))
                        .catch( err =>{
                            console.log(err)
                            this.$message({
                                message: '系统异常，请刷新页面重试',
                                type: 'error',
                                duration: 2 * 1000,
                                showClose: true
                            })
                        })
                    }).catch( err => {
                        console.log(err)
                        this.$message({
                            message: '系统异常，请刷新页面重试',
                            type: 'error',
                            duration: 2 * 1000,
                            showClose: true
                        })
                    })
                }
            }).catch( err=>console.log(err))
        }
    }
}
</script>


