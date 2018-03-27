<template>
  <div class="shop_card">
        <div v-if="!isConfirmOrderStatus&&loaded" class="wrapper">
            <div class="title">
                <span class="tit">购物车</span>
            </div>
            <div class="container">
                <el-table :data="shopCar" style="width: 100%" @selection-change="handleSelectionChange" v-if="shopCar.length" ref="multipleTableShop" row-class-name="tab_cell" max-height="540" header-row-class-name="head-dd">
                    <el-table-column type="selection" width="50" cell-class-name="check_box" align="center" />
                    <el-table-column label="代理卡信息" min-width="325">
                        <template slot-scope="scope">
                            <div class="ii" @click="handleToDetail(scope.row.proxyCardId,scope.row.proxyCardBo.status !== '出售中')">
                                <img :src="scope.row.proxyCardBo.imgUrl" class="image">
                                <div style="float:left;margin-left:16px;">
                                    <span style="color:#000;font-weight:500;font-size:18px" class="badge_item_container"> 
                                        {{scope.row.proxyCardBo.name}}  
                                    </span>
                                    <p style="line-height:12px;">有效期：{{scope.row.proxyCardBo.validityPeriod}}天</p>
                                    <div class="news_ifno" v-if="scope.row.changeState">
                                        <!-- <span>商品信息有更新</span> -->
                                        <el-tooltip effect="dark" :content="scope.row.changeMark" placement="right">
                                            <span>商品信息有更新</span>
                                        </el-tooltip>
                                    </div>
                                </div> 
                            </div> 
                            <div class="box_sha_status" v-if="scope.row.proxyCardBo.status !== '出售中'">
                                <div class="le_ff"></div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价" min-width="100" align="center">
                        <template slot-scope="scope">
                            <div>
                                <p style="font-size:16px;margin:0">￥{{scope.row.proxyCardBo.salesPrice}}</p>
                                <p class="old_price">￥{{scope.row.proxyCardBo.originalPrice}}</p>
                            </div>
                            <div class="box_sha_status" v-if="scope.row.proxyCardBo.status !== '出售中'"></div>
                            <img :src="xiajia" alt="" width="65" height="65" v-if="scope.row.proxyCardBo.status !== '出售中'" class="xia_jia">
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" width="210" align="center">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.number" @change="handleAddShopCar(scope.row)" :min="1" :max="100000" style="width:80%" @input="checkNumber(scope.row)"/>
                            <div class="box_sha_status" v-if="scope.row.proxyCardBo.status !== '出售中'"></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额" min-width="100" align="center">
                        <template slot-scope="scope">
                            <div style="font-size:16px;font-weight:500">￥{{setMoney(scope.row.proxyCardBo.salesPrice * scope.row.number)}}</div>
                            <div class="box_sha_status" v-if="scope.row.proxyCardBo.status !== '出售中'"></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-popover
                            ref="popover{{$index}}"
                            placement="top"
                            width="40"
                            popper-class="pop_del"
                            :value="scope.row.proxyCardId === delId">
                                <div class="pop_del_txt">删除商品？</div>
                                <div class="pop_del_btn">
                                    <el-button size="mini" type="primary" @click="delId= ''" plain>取消</el-button>
                                    <el-button type="primary" size="mini" @click="handleSureDel(scope.row.proxyCardId)">删除</el-button>
                                </div>
                            </el-popover>
                            <el-button type="text" @click="delId = scope.row.proxyCardId" v-popover:popover{{$index}} style="padding:0;color:#666">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-else class="no_shop_car_con">
                    <div class="no-shop-car-item">
                        <p>您的购物车暂未添加商品，</p>
                        <p @click="handleBuy">
                            <span>前往添加 ></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="pay" v-if="shopCar.length&&!isConfirmOrderStatus">
            <div class="pay-box">
                <span class="txt">合计：<span style="color:#fe4c4f;">￥</span><span style="color:#fe4c4f;font-size:28px;font-weight:500">{{setMoney(totalMoney)}}</span></span>
                <el-button type="danger" @click="handleConfirm" class="btn" :disabled="!mutiShopCar.length">结算<span v-if="totalNum">({{totalNum}})</span></el-button>
            </div>
        </div>
        <comfirm-order :comfirmOrderList="mutiShopCar" :tota="totalMoney" v-if="isConfirmOrderStatus" @back-shop-car="handleBack"/> 
  </div>
</template>
<script>
// import Cookies from 'js-cookie'
import xiajia from '@/assets/xiajia.png'
import { parseTime, formatText } from '@/utils'
import { proxyCardShoppingCart, updateProxyCardShoppingCart, delProxyCardShoppingCart } from '@/api/purchase'
// import Tit from '@/components/Tit'
import comfirmOrder from './comfirmOrder'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            totalMoney: 0,
            totalNum: 0,
            delId: '',
            loaded: false,
            xiajia
            // multipleSelection: []
            // confirmOrd: false //  确认订单？
        }
    },
    computed: {
    ...mapGetters([
      'shopCar',
      'shopCarNum',
      'shopCarPrice',
      'isConfirmOrderStatus',
      'mutiShopCar'
    ])},
    components: {
    //   Tit,
      comfirmOrder
    },
    methods: {
        //  设置下金钱
        setMoney( val ) {
            val = Math.round(val * 100) / 100
            val += ''
            return formatText(val)
        },
        handleBack() {
            console.log(11)
            this.$store.dispatch('SetConfirmOrderStatus',false)
            //  更新购物车
            this.$store.dispatch('GetShopCar')
        },
        //  判断是否为数字
        checkNumber(row) {
            // this.numInfo = false
            if(/^\d+\.\d+$/.test(row.number)){
                this.$nextTick( ()=>{
                    row.number = Math.round(row.number)
                })
            }
        },

        //  去详情页
        handleToDetail( id, bool) {
            if(bool) return;
            this.$router.push({ path: `cardDetail/${id}/${2}` })
        },
        // 选择结算哪个
        handleSelectionChange(val) {
            console.log(val,'SetMutiShopCar')
            // console.log(val[0].proxyCardBo.status === '出售中','val[0].proxyCardBo.status ')
            let oData = val.filter( el=> el.proxyCardBo.status !== '出售中')
            val.forEach( (el,key) => {
                if(el.proxyCardBo.status !== '出售中'){
                    val.splice(key,1)
                }
            })
            oData.forEach( el => {
                this.$refs.multipleTableShop.toggleRowSelection(el,false)
            })
            // this.$refs.multipleTableShop.toggleRowSelection(el,true)
            // console.log(val,'oddd')
            this.$store.dispatch('SetMutiShopCar',val)
            this.totalMoney = 0
            this.totalNum = 0
            // this.multipleSelection = val;
            if(!this.mutiShopCar.length) return;
            this.mutiShopCar.forEach( el=>{
                this.totalMoney += el.number * el.proxyCardBo.salesPrice
                this.totalNum += el.number
            })
        },  
        // 增加新的
        handleAddShopCar( row ){
            this.$nextTick(()=>{
                const {number,  proxyCardId } = row
                // console.log( number , 'number')
                updateProxyCardShoppingCart({
                    number, proxyCardId
                }).then( res=> {
                    console.log(this.mutiShopCar,'multipleSelection')
                    //  重新触发选择物品
                    this.totalMoney = 0
                    this.totalNum = 0
                    // if(!this.multipleSelection.length) return;
                    // this.multipleSelection = multipleSelection
                    //  更新顶部的购物车
                    this.mutiShopCar.forEach( el=>{
                        this.totalMoney += el.number * el.proxyCardBo.salesPrice
                        this.totalNum += el.number
                        // this.$refs.multipleTableShop.toggleRowSelection(el,true)
                    })
                        // console.log(this.mutiShopCar,'multipleSelection')
                }).catch( err=> console.log(err))
            })
        },
        // 删除
        handleSureDel(proxyCardId) {
            delProxyCardShoppingCart(proxyCardId).then(res=>{
                if(res && res.code === '0'){
                    // this.initData()
                    this.shopCar.forEach( (el,key) => {
                        if(el.proxyCardId === proxyCardId){
                            this.shopCar.splice(key,1)
                        }
                    })
                    this.mutiShopCar.forEach( (el,key) => {
                        if(el.proxyCardId === proxyCardId){
                            this.mutiShopCar.splice(key,1)
                        }
                    })
                    this.handleSelectionChange(this.mutiShopCar)
                }
            }).catch( err => console.log(err))
            this.$nextTick( ()=>{
                this.delId = ''
            })
        },
        // 确认订单
        handleConfirm() {
            this.$store.dispatch('SetConfirmOrderStatus',true)
            // this.confirmOrd = true
            // console.log(this.multipleSelection)
        },
        //  买买买
        handleBuy() {
            this.showShopCar = false
            this.$router.push({ path: '/purchase/card' })
        }
    },
    mounted() {
        this.totalMoney = 0
        this.$store.dispatch('SetMutiShopCar',[])
        this.$store.dispatch('SetConfirmOrderStatus',false)
        //  更新购物车
        this.$store.dispatch('GetShopCar').then( ()=> this.loaded=true)
    },
    beforeDestroy(){
        this.$store.dispatch('SetMutiShopCar',[])
        this.$store.dispatch('SetConfirmOrderStatus',false)
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.badge_item_container{
    position: relative;
}
.badge_item_cl{
    position: absolute;
    left: 100%;
    top: 0px;
}
.news_ifno{
    position: relative;
    top: 6px;
    color:#F25B56;
    cursor:pointer;
    font-size:12px;
    background-color:#ffebeb;
    padding:2px 4px;
    display:inline-block;
    line-height:1;
    border-radius:2px
}
.pop_del{
    padding: 10px;
    .pop_del_txt{
        text-align: center;
        margin-bottom: 20px;
    }
    .pop_del_btn{
        
    }
}
    .shop_card{
        background-color: #f4f5f7;
        // height: 100%;
        .box_sha_status{
            // width: calc(100% - 100px);
            width: 100%;
            height: 100%;;
            background:rgba(191,191,191,1);
            opacity:0.5;
            position: absolute;
            top: 0px;left: 0;
            z-index: 9999;
            .le_ff{
                width: 50px;
                height: 100%;
                background:rgba(191,191,191,1);
                // opacity:0.5;
                position: absolute;
                left:-50px;
            }
        }
        .xia_jia{
            position: absolute;
            top: 50%;
            left:10px;
            z-index: 99999;
            transform: translateY(-50%);
        }
        .shop_card_con{
            .title,.container{
                background-color: #fff;
            }
            .container{
                .head-dd{
                    th:first-child{
                        padding-left: 40px;
                    }
                }
                .ii{
                    padding-left: 50px;
                }
            }
        }
        .wrapper{
            background-color: #fff;
            .no_shop_car_con{
                border: 0;
                min-height: 460px;
                overflow: hidden;
            }
        }
        .no-shop-car-item{
            margin: 0 auto;
            width: 800px;
            // height: 460px;
            // color: #fff;
            background: url('../../../static/coo.png') no-repeat 170px 5px;
            background-size: 350px;
            // min-height: 300px;
            // line-height: 300px; 
            // border: 1px solid #ddd;
            // text-align: center;
            p{
                text-indent: 460px;
            }
            p:first-child{
                padding-top: 226px;
                font-size: 20px;
                font-weight: 500;
                color: #000;
            }
            p:last-child{
                color: #1e81cd;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
            }
            span{
                // text-indent: 400px;
                // position: relative;
                // right:80px;
            }
        }
        .title{
            position: relative;
            padding-left: 20px;
            // padding-top: 10px;
            line-height: 48px;
            height: 48px;
            border-bottom: 1px solid #ededed;
            .tit{
                padding-left:5px;
                border-left:4px solid #ef4c4f;
            }
            .back{
                position: absolute;
                top: 8px;
                right: 30px;
            }
        }
        .wrapper{
            border: 1px solid #eee;
        }
        .container{
            // padding: 20px;
            .el-table-column--selection{
                vertical-align: middle!important;
                .cell{
                    vertical-align: middle;
                }
            }
            .head-dd{
                height: 54px;
                line-height: 54px;
                background-color: #fafafa;
                th{
                    background-color: #fafafa;
                }
            }
            // .el-checkbox__original{
            //     position: relative;
            //     top: 10px;
            // }
            .el-checkbox__inner{
                // border: 1px solid #aaa;
                width: 20px;
                height: 20px;
                // padding: 5px;
            }
            .el-checkbox__inner::after{
                height: 10px;
                width: 5px;
                left: 6px;
                top: 2px;
            }
            .tab_cell{
                vertical-align: top;
                td{
                    padding: 30px 0;
                    vertical-align: top;
                }
            }
            .image{
                width: 146px;
                height: 92px;
                float: left;
                border-radius: 6px;
            }
            .old_price{
                font-size: 12px;
                color: #999;
                line-height: 12px;
                text-decoration: line-through;
            }
            .ii{
                // padding-left: 50px;
                cursor: pointer;
                position: relative;
                left: -10px;
            }
        }
        .pay{
            margin-top: 20px;
            background-color: #fff;
            overflow: hidden;
            position: relative;
            border: 1px solid #eee;
            // border-top: 1px solid #ededed;
            // line-height: 100px;
            min-height: 90px;
            .pay-box{
                position: absolute;
                right:40px;
                width: 600px;
                min-height: 70px;
                .total{
                    text-align: right;
                    color: #949191;
                }
                .money{
                    color: #000
                }
                .txt{
                    position: absolute;
                    left: 0px;top: 30px;
                    min-width: 400px;
                    text-align: right;
                }
                .btn{
                    position: absolute;
                    right: 10px;top: 20px;
                    width: 154px;height: 48px;
                    background-color: #ef4c4f;
                }
            }
        }
        .confirm-pay{
            min-height: 330px;
            .money-box{
                margin-top: 50px;
                font-size: 14px;
                .total{
                    color: #121212;
                    .tt{
                        padding-left: 20px;
                        // padding-bottom: 30px;
                        color: #f32121;
                        font-size: 24px;
                    }
                }
            }
        }
    }
</style>
