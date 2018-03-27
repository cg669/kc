<template>
<div>
  <div class="card_detail" v-if="!isConfirmOrderStatus">
        <div class="title" v-if="cardInfo.name">
            <div v-if="type==='1'">
                <span class="one" @click="handleBack">代理卡</span><i class="el-icon-arrow-right" /> 
                <span>{{cardInfo.name}}</span>
            </div>
            <span v-else @click="handleBack" class="one">返回</span>
        </div>
        <div class="container" v-if="cardInfo">
            <div class="card_info">
                <div class="pic">
                    <img :src="cardInfo.imgUrl" class="image">
                </div>
                <div class="content" v-if="cardInfo.status ==='已下架'">
                    <header class="hd">{{cardInfo.name}}</header>
                    <div class="price tt">
                        <div class="tit">代理卡已下架</div>
                    </div>
                </div>
                <div class="content" v-if="cardInfo.studyCardStrategyBo&&cardInfo.status ==='出售中'">
                    <header class="hd">{{cardInfo.name}}</header>
                    <div class="price tt">
                        <div class="tit" style="position:relative;top:4px">单价</div>
                        <div class="main">
                            <span style="color: #fe4c4f">￥</span><span class="newPrice">{{cardInfo.salesPrice}}</span>
                            <span class="oldPrice">￥{{cardInfo.originalPrice}}</span>
                        </div>
                    </div>
                    <div class="open tt" v-if="cardInfo.studyCardStrategyBo.openclassGiftEnable">
                        <div class="tit">公开课特权</div>
                        <div class="main">自激活卡起，账号可观看课程 {{cardInfo.studyCardStrategyBo.viewTime}} 
                            <span v-if="cardInfo.studyCardStrategyBo.openclassDurationType">年</span>
                            <span v-else>日</span>
                        </div>
                    </div>
                    <div class="lesson tt"  v-if="cardInfo.studyCardStrategyBo.activeGiftEnable">
                        <div class="tit">课时特权</div>
                        <div class="main">
                            未付费用户，激活学习卡时，赠送 {{cardInfo.studyCardStrategyBo.unpayGiftCourse}} 课时<br />
                            <span>已付费用户，激活学习卡时，赠送 {{cardInfo.studyCardStrategyBo.payGiftCourse}} 课时
                                <el-tooltip class="item" effect="dark" placement="right-end">
                                    <div slot="content">付费用户：<br/>在掌门购买过一对一课程的用户</div>
                                    <i class="el-icon-info"></i>
                                </el-tooltip>
                            </span>
                        </div>
                    </div>
                    <div class="shop tt" v-if="cardInfo.studyCardStrategyBo.buyGiftEnable">
                        <div class="tit">购买特权</div>
                        <div class="main">
                            购买1对1课程时，可减免 {{cardInfo.studyCardStrategyBo.giftReductMoney}} 元。<br />
                            购买1对1课程时，<span v-if="cardInfo.studyCardStrategyBo.giftPercent">赠送 {{cardInfo.studyCardStrategyBo.giftPercent}}%  的课程。</span><span v-else>赠送 {{cardInfo.studyCardStrategyBo.giftCourse}} 课时</span>
                        </div>
                    </div>
                    <div class="info tt"  v-if="cardInfo.studyCardStrategyBo.buyGiftEnable">
                        <div class="tit"></div>
                        <div class="main" style="color:#999">
                            <span v-if="cardInfo.studyCardStrategyBo.courseAmountLimit">以上购买特权，需购买超过 {{cardInfo.studyCardStrategyBo.courseAmountLimit}} 课时；</span>
                            <span v-if="cardInfo.studyCardStrategyBo.periodizationLimit">非分期购买；</span><span v-else>可分期购买；</span>
                            <span v-if="cardInfo.studyCardStrategyBo.payLimit">限{{cardInfo.studyCardStrategyBo.payLimit}}购买用户；</span>
                            <span v-if="cardInfo.studyCardStrategyBo.coursePackageLimit">
                               仅限购买<span v-for="(val, key) in (cardInfo.studyCardStrategyBo.coursePackageLimit.split(','))" :key="key" v-if="cardInfo.studyCardStrategyBo">{{setName(val)}}<span v-if="cardInfo.studyCardStrategyBo.coursePackageLimit&&(key < (cardInfo.studyCardStrategyBo.coursePackageLimit.split(',').length-1))">、</span></span>课程包使用
                            </span>
                        </div>
                    </div>
                    <div class="leavetime tt">
                        <div class="tit">有效期</div>
                        <div class="main">
                            {{cardInfo.validityPeriod}}天
                            <el-tooltip class="item" effect="dark" placement="right-end">
                                <div slot="content">有效期：<br/>自激活代理卡时间起，{{cardInfo.validityPeriod}}天内有效</div>
                                <i class="el-icon-info"></i>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="num tt">
                        <div class="tit">
                            <el-input-number v-model="cardNum" controls-position="right" :min="1"  :max="100000" style="width:102px" @input="checkNumber"/>
                        </div>
                        <div class="main">
                            <el-button type="danger" plain @click="handleAddShopCar(cardNum,cardInfo.id)" class="to_car">加入购物车</el-button>
                            <el-button type="danger" @click="handleBuyNow(cardNum,cardInfo)" class="to_buy">立即购买</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
  <comfirm-order :comfirmOrderList="mutiShopCar" :tota="totalMoney" v-if="isConfirmOrderStatus" @back-shop-car="handleBack"/> 
</div>
</template>
<script>
import { parseTime } from '@/utils'
import { getProxyCardDetail, addProxyCardShoppingCart } from '@/api/purchase'
import comfirmOrder from './comfirmOrder'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            cardInfo : {},
            cardNum: 1,
            totalMoney: 0,
            type: '1'
        }
    },
    computed: {
    ...mapGetters([
      'isConfirmOrderStatus',
      'mutiShopCar'
    ])},
    components: {
      comfirmOrder
    },
    methods: {
        initData(id) {
            getProxyCardDetail({
                proxyCardId: id
            }).then( res=>{
            console.log(res)
            if(res.code == 0 && res.data){
                this.cardInfo = res.data
                // this.cardNum = res.data.
            }
        }).catch( err => console.log(err))
        },
        setName( val ){
            switch ( val ){
                case "0": 
                    return '普通';
                    break;
                case "1": 
                    return '特殊';
                    break;
                case "2": 
                    return '名师';
                    break;
                case "5": 
                    return 'VIP';
                    break;
            }
        },
        handleBack() {
            this.$store.dispatch('SetConfirmOrderStatus',false)
            //  更新购物车
            this.$store.dispatch('GetShopCar')
            this.$router.go(-1)
        },
        //  判断是否为数字
        checkNumber() {
            // this.numInfo = false
            if(/^\d+\.\d+$/.test(this.cardNum)){
                this.$nextTick( ()=>{
                    this.cardNum = Math.round(this.cardNum)
                })
            }
        },
        handleAddShopCar( num, id){
            addProxyCardShoppingCart({
                number: num, proxyCardId: id
            }).then( res=> {
                console.log(res)
                if(res&&res.code==='0'){
                    this.$message({
                        message: '添加购物车成功',
                        type: 'success',
                        duration: 2 * 1000,
                        showClose: true
                    });
                    //  更新顶部的购物车
                    this.$store.dispatch('GetShopCar')
                }
            }).catch( err=> console.log(err))
        },
        //  立即购买
        handleBuyNow( num, shopItem) {
            addProxyCardShoppingCart({
                number: num, proxyCardId: shopItem.id
            }).then( res=> {
                console.log(res)
                if(res&&res.code==='0'){
                    // this.$message({
                    //     message: '添加购物车成功',
                    //     type: 'success',
                    //     duration: 2 * 1000,
                    //     showClose: true
                    // });
                    //  更新顶部的购物车
                    this.$store.dispatch('GetShopCar').then( res=>{
                        console.log(shopItem,'shopItem')
                        this.$store.dispatch('SetMutiShopCar',[{
                            number: num,
                            proxyCardId: shopItem.id,
                            proxyCardBo: shopItem
                        }]).then( ()=>{
                            this.totalMoney = 0
                            if(!this.mutiShopCar.length) return;
                            this.mutiShopCar.forEach( el=>{
                                this.totalMoney += el.number * el.proxyCardBo.salesPrice
                                this.totalNum += el.number
                            })
                            this.$store.dispatch('SetConfirmOrderStatus',true)
                        })
                        // this.$router.push({ path: '/purchase/car' })
                    }).catch( err=> console.log(err))
                }
            }).catch( err=> console.log(err))
        }
    },
    beforeRouteUpdate (to, from, next) {
        console.log(from,'from')
    },
    mounted() {
        // console.log(this.$route.params.id)
        // console.log(this.$route.params.post_id)
        // console.log(this.$route)
        this.type = this.$route.params.post_id
        this.totalMoney = 0
        this.$store.dispatch('SetMutiShopCar',[])
        this.$store.dispatch('SetConfirmOrderStatus',false)
        this.initData(this.$route.params.id)
    },
    beforeDestroy(){
        this.$store.dispatch('SetMutiShopCar',[])
        this.$store.dispatch('SetConfirmOrderStatus',false)
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    .card_detail{
        border: 1px solid #eee;
        background-color: #eee;
        .title{
            position: relative;
            // padding-top: 20px;
            padding-left: 20px;
            height: 48px;
            line-height: 48px;
            border-bottom: 1px solid #eee;
            background-color: #fff;
            font-size:16px;
            color:rgba(51,51,51,1);
            cursor: pointer;
            .one{
                padding: 0 10px 0 6px;
                border-left: 4px solid rgba(239,76,79,1);
            }
        }
        .container{
            // min-height: 500px;
            // padding: 5px;
            .card_info{
                width: 100%;
                display: flex;
                padding: 20px;
                min-height: 400px;
                background-color: #fff;
                overflow: hidden;
                .pic{
                    // flex: 1;
                    // width: 360px;
                    padding: 0 4px;
                    height: 360px;
                    margin: 40px;position: relative;
                    margin-left:26px;
                    margin-top:10px;
                    // border: 1px solid #eee;
                    .image {
                        border-radius: 10px;
                        // position: relative;
                        // top: 50%;
                        // transform: translateY(-50%);
                        width: 350px;
                        // height: 316px;
                        display: block;
                    }
                }
                .content{
                    flex: 1;
                    margin: 10px;
                    // width: 550px;
                    .tt{
                        // overflow: hidden;
                        display: flex;
                        width: 100%;
                        // justify-content: flex-start;
                        padding-top: 15px;
                        padding-bottom: 15px;
                        font-size: 14px;
                        line-height: 1;
                        color: #333333;
                    }
                    .hd{
                        line-height: 30px;
                        font-size: 28px;
                    }
                    .tit{
                        // flex: 1;
                        width: 100px;
                        padding-top: 5px;
                        height: 100%;
                        // line-height: 24px;
                        text-align: right;
                        color: #a5a5a5;
                        margin-right: 40px;
                    }
                    .main{
                        overflow: hidden;
                        flex: 1;
                        // width: 400px;
                        line-height: 1.8;
                        color: #445544;
                        .to_car{
                            width:140px;
                            height:48px; 
                            background:rgba(255,235,235,1);
                            border-radius: 4px ; 
                            font-size:16px;
                            color:rgba(254,76,79,1);
                            &:hover{
                                color:rgba(254,76,79,1); 
                            }
                        }
                        .to_buy{
                            width:140px;
                            height:48px; 
                            background:rgba(254,76,79,1);
                            border-radius: 4px ; 
                            font-size:16px;
                        }
                    }
                    .price{
                        margin-top: 30px;
                        height: 66px;
                        // line-height: 66px;
                        background-color: #f5f5f5;
                        .main{
                            line-height: 1.2;
                            .newPrice{
                                font-size: 30px;
                                color: #fe4c4f;
                            }
                            .oldPrice{
                                font-weight: 500;
                                text-decoration: line-through;
                            }
                        }
                    }
                    .info{
                        border-top: 1px dashed #dedede;
                        border-bottom: 1px dashed #dedede;
                    }
                    .num{
                        .tit{
                            padding-top: 0;
                            width: 100px;
                            position: relative;
                            .num_info{
                                position: absolute;
                                right: 80px;
                                bottom: -20px;
                                font-size: 12px;
                                color: #fe4c4f;
                            }
                            .el-input-number {
                                line-height: 48px;
                            }
                            .el-input__inner{
                                height: 48px;
                            }
                            .el-input-number__decrease,.el-input-number__increase{
                                line-height: 22px;
                            }
                        }
                        .main{
                            width: 300px;
                        }
                    }
                    // height: 100px;width: 100px;
                    // background-color: #000;
                }
            }
            .box-card{
                cursor: pointer;
            }
            .time {
                font-size: 13px;
                color: #999;
            }
            
            .bottom {
                margin-top: 13px;
                line-height: 12px;
            }
            .price{
                padding-top: 20px;
                padding-bottom: 10px;
                .new{
                    font-size: 30px;
                    color: #F25B56;
                }
                .old{
                    margin-left: 4px;
                    text-decoration: line-through
                }
            }
            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }
            
            .clearfix:after {
                clear: both
            }
        }
    }
    .shop_card_con{
        background-color: #f4f5f7;
        // height: 100%;
        .title,.container{
            background-color: #fff;
        }
        .title{
            // padding-left: 50px;
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
        .shop_card_con{
            
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
