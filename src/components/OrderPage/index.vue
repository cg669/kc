<template>
  <div class="order_container">
      <div class="payed" v-if="orderData.payed.length&&(showInfo===1||showInfo===0)" v-for="item in orderData.payed" :key="item.id">
          <div class="title">
              <div class="order_no tit_item" v-if="item.orderNo"><span>订单号：</span>{{item.orderNo}}</div>
              <div class="order_no tit_item" v-if="item.createdAt"><span>下单时间：</span>{{item.createdAt}}</div>
              <div class="order_no tit_item" v-if="item.stateMark"><span>备注：</span>{{item.stateMark}}</div>
              <div class="tit_payed">已支付</div>
          </div>
          <div class="content">
              <div class="item" v-if="item.proxyCardBatchs&&item.proxyCardBatchs.length&&(key<1 || item.id ===expandId)" v-for="(el,key) in item.proxyCardBatchs" :key="el.id" @click="handleToCardDetail(el.cardId)">
                  <div class="pic">
                      <img :src="el.imgUrl" alt="掌门合作商" width="148" height="96" v-if="el.imgUrl">
                  </div>
                  <div class="info">
                      <p>{{el.cardName}}</p>
                      <p class="date" v-if="el.validityPeriodStart&&(el.validityPeriodEnd&&!el.validityPeriod)">有效日期：{{setTime(el.validityPeriodStart)+'-'+setTime(el.validityPeriodEnd)}}</p>
                      <p class="date" v-if="el.validityPeriod">有效期：{{el.validityPeriod}}天</p>
                  </div>
                  <ul class="detail">
                      <li>
                          <p>类型</p>
                          <p>代理卡</p>
                      </li>
                      <li>
                          <p>单价</p>
                          <p class="pri"><span>￥</span>{{el.price}}</p>
                          <p class="oldpri">{{el.originalPrice}}</p>
                      </li>
                      <li>
                          <p>数量</p>
                          <p>x&nbsp;{{el.generateAmount}}</p>
                      </li>
                  </ul>
              </div>
              <!-- <div class="no-content" v-if="!item.proxyCardBatchs||!item.proxyCardBatchs.length">
                  暂无商品列表信息...
              </div> -->
              <div class="footer">
                  <span  v-if="item.id !==expandId&&item.proxyCardBatchs.length" @click="expandId=item.id"><i class="el-icon-arrow-down" />展开</span>
                  <span  v-if="item.id ===expandId&&item.proxyCardBatchs.length" @click="expandId=''"><i class="el-icon-arrow-up" />收起</span>
                  <div class="content-info">共<span class="num">{{item.totalNum}}</span>张代理卡，实付<span class="price"><span>￥</span>{{setMoney(item.payPrice)}}</span></div>
              </div>
          </div>
      </div>
      <div class="un_pay" v-if="orderData.unPay.length&&(showInfo===2||showInfo===0)" v-for="item in orderData.unPay" :key="item.id">
          <div class="title">
              <div class="order_no tit_item" v-if="item.orderNo"><span>订单号：</span>{{item.orderNo}}</div>
              <div class="order_no tit_item" v-if="item.createdAt"><span>下单时间：</span>{{item.createdAt}}</div>
              <div class="tit_unpay">待支付（30分钟未支付，取消订单）</div>
          </div>
          <div class="content">
              <div class="item" v-if="item.proxyCardBatchs&&item.proxyCardBatchs.length&&(key<1 || item.id ===expandId)" v-for="(el,key) in item.proxyCardBatchs" :key="el.id" @click="handleToCardDetail(el.cardId)">
                  <div class="pic">
                      <img :src="el.imgUrl" alt="掌门合作商" width="148" height="96" v-if="el.imgUrl">
                  </div>
                  <div class="info">
                      <p>{{el.cardName}}</p>
                      <p class="date" v-if="el.validityPeriodStart&&(el.validityPeriodEnd&&!el.validityPeriod)">有效日期：{{setTime(el.validityPeriodStart)+'-'+setTime(el.validityPeriodEnd)}}</p>
                      <p class="date" v-if="el.validityPeriod">有效期：{{el.validityPeriod}}天</p>
                  </div>
                  <ul class="detail">
                      <li>
                          <p>类型</p>
                          <p>代理卡</p>
                      </li>
                      <li>
                          <p>单价</p>
                          <p class="pri"><span>￥</span>{{el.price}}</p>
                          <p class="oldpri">{{el.originalPrice}}</p>
                      </li>
                      <li>
                          <p>数量</p>
                          <p>x&nbsp;{{el.generateAmount}}</p>
                      </li>
                  </ul>
              </div>
              <div class="footer">
                  <i class="el-icon-arrow-down" v-if="item.id !==expandId&&item.proxyCardBatchs.length" @click="expandId=item.id">展开</i>
                  <i class="el-icon-arrow-up" v-if="item.id ===expandId&&item.proxyCardBatchs.length" @click="expandId=''">收起</i>
                  <div class="content-info">共<span class="num">{{item.totalNum}}</span>张代理卡，应付<span class="price"><span>￥</span>{{setMoney(item.payPrice)}}</span></div>
              </div>
              <div class="toPay">
                  <el-button type="danger" @click="handleToPay(item)" style="width:154px;height:48px;line-height:24px;font-size:16px;background:#ef4c4f">确定并支付</el-button>
                  <el-button @click="handleCancle(item.id)" style="width:154px;height:48px;line-height:24px;font-size:16px;">取消</el-button>
              </div>
          </div>
      </div>
      <div class="no_pay" v-if="orderData.noPay.length&&(showInfo===3||showInfo===0)" v-for="item in orderData.noPay" :key="item.id">
          <div class="title">
              <div class="order_no tit_item" v-if="item.orderNo"><span>订单号：</span>{{item.orderNo}}</div>
              <div class="order_no tit_item" v-if="item.createdAt"><span>下单时间：</span>{{item.createdAt}}</div>
              <div class="order_no tit_item" v-if="item.stateMark"><span>备注：</span>{{item.stateMark}}</div>
              <div class="tit_nopay">已取消</div>
          </div>
          <div class="content">
              <div class="item" v-if="item.proxyCardBatchs&&item.proxyCardBatchs.length&&(key<1 || item.id ===expandId)" v-for="(el,key) in item.proxyCardBatchs" :key="el.id" @click="handleToCardDetail(el.cardId)">
                  <div class="pic">
                      <img :src="el.imgUrl" alt="掌门合作商" width="148" height="96" v-if="el.imgUrl">
                  </div>
                  <div class="info">
                      <p>{{el.cardName}}</p>
                      <p class="date" v-if="el.validityPeriodStart&&(el.validityPeriodEnd&&!el.validityPeriod)">有效日期：{{setTime(el.validityPeriodStart)+'-'+setTime(el.validityPeriodEnd)}}</p>
                      <p class="date" v-if="el.validityPeriod">有效期：{{el.validityPeriod}}天</p>
                  </div>
                  <ul class="detail">
                      <li>
                          <p>类型</p>
                          <p>代理卡</p>
                      </li>
                      <li>
                          <p>单价</p>
                          <p class="pri"><span>￥</span>{{el.price}}</p>
                          <p class="oldpri">{{el.originalPrice}}</p>
                      </li>
                      <li>
                          <p>数量</p>
                          <p>x&nbsp;{{el.generateAmount}}</p>
                      </li>
                  </ul>
              </div>
              <div class="footer">
                  <i class="el-icon-arrow-down" v-if="item.id !==expandId&&item.proxyCardBatchs.length" @click="expandId=item.id">展开</i>
                  <i class="el-icon-arrow-up" v-if="item.id ===expandId&&item.proxyCardBatchs.length" @click="expandId=''">收起</i>
                  <div class="content-info">共<span class="num">{{item.totalNum}}</span>张代理卡，应付<span class="price"><span>￥</span>{{setMoney(item.payPrice)}}</span></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { cancelProxyCardOrder } from '@/api/purchase'
import { formatText, parseTime } from '@/utils'
export default {
  name: 'tit',
  props: {
    orderData: {
      type: Object,
      required: true
    },
    showInfo: {
        type: Number,
        required: true,
        default: 0
    }
  },
  data() {
      return {
          expandId: ''
      }
  },
  methods: {
    //  设置下金钱
    setMoney( val ) {
        val = Math.round(val * 100) / 100
        val += ''
        return formatText(val)
    },
    //  设置时间
    setTime( val ) {
        if(!val)return;
        return parseTime(val,'{y}年{m}月{d}')
    },
    //  取消订单
    handleCancle( id ){
        console.log(id)
        cancelProxyCardOrder(id).then( res => {
            console.log(res)
            if(res&&res.code === '0'){
                this.$message({
                    message: '订单取消成功',
                    type: 'success',
                    showClose: true
                })
                this.$emit('refresh-data')
            }
        }).catch( err=> console.log(err))
    },
    handleToCardDetail(id) {
        console.log(id)
        if(id){
            this.$router.push({ path: `cardDetail/${id}/${2}` })
        }
    },
    //  确认订单并支付
    handleToPay( item ){
        //  存入仓库后页面跳转
        this.$store.dispatch('SetOrderInfo',item).then(()=>{
            //  更新购物车
            this.$store.dispatch('GetShopCar')
            .then( ()=>this.$router.push({ path: '/purchase/order-pay' }))
            .catch( err =>{
                console.log(err)
                this.$message({
                    message: '系统异常，请刷新页面重试',
                    type: 'error',
                    showClose: true
                })
            })
        }).catch( err => {
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
<style rel="stylesheet/scss" lang="scss" scoped>
    .order_container{
        background-color: #f7f7f7;
        .payed,.un_pay,.no_pay{
            border: 1px solid #ddd;
            border-top: 0;
            margin-bottom: 20px;
            background-color: #fff;
            overflow-x: auto;
            overflow-y: hidden;
            // box-shadow: 0 10px 38px 0 rgba(200,0,50,.09);
        }
        // .no-content{
        //     line-height: 150px;
        //     text-align: center;
        //     color: #f17979;
        //     font-size: 24px;
        //     border-bottom: 1px solid #ddd;
        // }
        // .order_no{
        //     margin-left: 50px;
        // }
        .content{
            // background-color: #f7f7f7;
            min-width: 800px;
            .item{
                width: 100%;
                cursor: pointer;
                padding: 30px 50px;
                padding-right: 0;
                // overflow: hidden;
                border-bottom: 1px solid #dddddd;
                height: 154px;
                // min-width: 1000px;
                display: flex;
                .pic{
                    img{
                        width: 148px;
                        height: 94px;
                        border-radius: 6px;
                    }
                }
                .info{
                    // float: left;
                    width: 310px;
                    margin-left: 28px;
                    // margin-right: 200px;
                    line-height: 0;
                    color: #333333;
                    p:first-child{
                        width: 310px;
                        font-weight: 500;
                    }
                    .date{
                        width: 110px;
                        line-height: 1.5;
                        color: #a6a6a6;
                        font-size: 12px;
                    }
                }
                .detail{
                    flex: 1;
                    display: flex;
                    margin: 0;
                    // padding-left: 200px;
                    // float: right;
                    overflow: hidden;
                    list-style: none;
                    li{
                        flex: 1;
                        color: #5e5b5b;
                        text-align: center;
                        // float: left;
                        font-size: 14px;
                        line-height: 0;
                        color: #8c8c8c;
                        width: 160px;
                        height: 88px;
                        border-left: 1px solid #ddd;
                        p:first-child{
                            
                        }
                        p:nth-child(2){
                            color: #4d4d4d;
                            line-height: 30px;
                        }
                        .pri{
                            margin: 5px 0;
                            font-size: 24px;
                            font-weight: 500;
                            line-height: 12px;
                            span{
                                font-size: 16px;
                            }
                        }
                        .oldpri{
                            text-decoration: line-through;
                        }
                    }
                }
            }
        }
        .title{
            min-width: 800px;
            width: 100%;
            line-height: 60px;
            background-color: #e9e9e9;
            overflow: hidden;
            padding-left: 26px;
            .tit_item{
                margin: 0 20px;
                float: left;
                color: #3e3e3e;
                span:first-child{
                    font-weight: 500;
                    color: #333333;
                }
                span{
                    color: #666666;
                }
            }
            .tit_payed{
                font-size: 14px;
                float: right;
                margin-right: 50px;
                font-weight: 600;
                color: #45a523;
            }
            .tit_unpay{
                font-size: 14px;
                float: right;
                margin-right: 50px;
                font-weight: 600;
                color: #ed7376;
            }
            .tit_nopay{
                font-size: 14px;
                float: right;
                margin-right: 50px;
                font-weight: 600;
                color: #666666;
            }
        }
        .footer{
            position: relative;
            line-height: 66px;
            height: 66px;
            color: #8c8c8c;
            text-align: center;
            padding-right: 20px;
            i{
                padding-right: 5px;
                font-size: 16px;
                transition: 0.3s;
                cursor: pointer;
            }
            .content-info{
                position: absolute;
                top: 0px;right: 50px;
            }
            .num{
                color: #333333;
                padding:0 4px;
            }
            .price{
                padding: 0 4px;
                color: #fe4c4f;
                font-size: 28px;
                span{
                    font-size: 14px;
                }
            }
        }
        .toPay{
            border-top: 1px solid #ddd;
            padding-right: 20px;
            line-height: 74px;
            text-align: right;
        }
    }
</style>
