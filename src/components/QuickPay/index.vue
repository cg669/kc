<template>
  <div class="quick_pay">
      <div class="quick_pay_card_type">
          <div class="btn" @click="payType='21-1'">
              储蓄卡
              <div class="btn-box" v-if="payType==='21-1'" />
          </div>
          <div class="btn" @click="payType='21-2'">
              信用卡
              <div class="btn-box" v-if="payType==='21-2'" />
          </div>
      </div>
      <div class="bank_box">
          <div class="item"  v-for="(item,key) in bankCardBox" :key="key" @click="checkBankKey=key,bankId=item.bankId" v-if="payType==='21-2'||(payType==='21-1'&&!item.type)">
              <img :src="item.bankImg" alt="银行" />
              <img :src="icon" class="icon" v-if="checkBankKey===key"/>
              <div class="border-box" v-if="checkBankKey===key" />
          </div>
      </div>
      <div class="to_pay">
          <el-button type="danger" style="width:154px;line-height:24px;font-size:18px;background:#fe4c4f" @click="handleToPay" :disabled="!bankId">确认支付</el-button>
      </div>
  </div>
</template>
<script>
import { confirmPay } from '@/api/purchase'
// import bj from '@/assets/bank/bank_bj.jpg'
import gd from '@/assets/bank/bank_gd.jpg'  //
import gf from '@/assets/bank/bank_gf.jpg'  //
import gs from '@/assets/bank/bank_gs.jpg'   //
import hz from '@/assets/bank/bank_hz.jpg'
import js from '@/assets/bank/bank_js.jpg'  //
import jt from '@/assets/bank/bank_jt.jpg'  //
import ms from '@/assets/bank/bank_ms.jpg'  //
import nb from '@/assets/bank/bank_nb.jpg'
import ns from '@/assets/bank/bank_ns.jpg'
import ny from '@/assets/bank/bank_ny.jpg'  //
import pf from '@/assets/bank/bank_pf.jpg'  // SPDB
import pn from '@/assets/bank/bank_pn.jpg'  //
import sfz from '@/assets/bank/bank_sfz.jpg' //
import sh from '@/assets/bank/bank_sh.jpg'
import shnc from '@/assets/bank/bank_shnc.jpg'
// import sfz from '@/assets/bank/bank_sfz.jpg'
import xy from '@/assets/bank/bank_xy.jpg'  //
import yz from '@/assets/bank/bank_yz.jpg'  // PSBC
import zg from '@/assets/bank/bank_zg.jpg'  //
import zs from '@/assets/bank/bank_zs.jpg'  //
import zx from '@/assets/bank/bank_zx.jpg'  //
import icon from '@/assets/bank/icon-corner.png'

//  定义银行列表
const bankList = [
    {bankId:'ICBC',bankImg:gs},{bankId:'BOC',bankImg:zg},{bankId:'CCB',bankImg:js},{bankId:'CMB',bankImg:zs},
    {bankId:'ABC',bankImg:ny},{bankId:'CITIC',bankImg:zx},{bankId:'PAB',bankImg:pn},{bankId:'CIB',bankImg:xy},
    {bankId:'BCOM',bankImg:jt,type:1},{bankId:'CMBC',bankImg:ms},{bankId:'SDB',bankImg:sfz,type:1},{bankId:'CEB',bankImg:gd},
    {bankId:'GDB',bankImg:gf},{bankId:'SPDB',bankImg:pf},{bankId:'PSBC',bankImg:yz,type:1},{bankId:'SRCB',bankImg:shnc,type:1},
    {bankId:'SHB',bankImg:sh},{bankId:'NBCB',bankImg:nb,type:1},{bankId:'HZB',bankImg:hz,type:1},{bankId:'BJRCB',bankImg:ns,type:1}
]
export default {
    props: {
        orderAmount: {
            type: Number,
            required: true,
            default: ''
        },
        orderId: {
            type: String,
            required: true,
            default: ''
        },
    },
    data() { 
        return {
            payType: '21-1',
            icon: icon,
            checkBankKey: '',
            bankCardBox:bankList,
            bankId: ''
        }
    },
    methods: {
        //  支付
        handleToPay() {
            confirmPay({
                bankId:this.bankId,
                orderAmount:this.orderAmount,
                orderId:this.orderId,
                payType:this.payType,
                productName: '掌门代理卡'
            }).then( res => {
                if(res&&res.data){
                    window.location.href = res.data
                }
            }).catch( err=>{
                console.log(err)
                this.$message({
                    message: '系统异常，请刷新页面重试',
                    type: 'error',
                    showClose: true
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.quick_pay{
    margin: 0 auto;
    .quick_pay_card_type{
        padding: 20px 0;
        border-bottom: 1px solid #e8e8e8;
        overflow: hidden;
    }
    .btn{
        float: left;
        margin-right: 20px;
        position: relative;
        width:150px;line-height:50px;
        text-align: center;border-radius: 4px;
        border: 1px solid #ddd;
        &:hover{
            // border-color: #c70031
        }
        .btn-box{
            border-radius: 4px;
            position: absolute;
            top: 0;left: 0;
            width:150px;height:50px;
            border: 1px solid #c70031;
        }
    }
    .to_pay{
        margin-top: 40px;
    }
    .bank_box{
        overflow: hidden;
        .item{
            position: relative;
            cursor: pointer;
            width: 190px;
            height: 70px;
            border: 1px solid #ddd;
            float: left;
            margin: 10px;
            &:hover{
                border-color: #c70031
            }
            .border-box{
                position: absolute;
                top: 0;left: 0;
                width: 190px;
                height: 70px;
                border: 1px solid #c70031;
            }
            .icon{
                position: absolute;
                right: -1px;
                bottom: -2px;
                z-index: 1;
                display: block;
                width: 35px;
                height: 30px;
            }
        }
    }
}
</style>

