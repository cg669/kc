<template>
  <div class="card"  
        v-loading="fetchData" 
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading">
        <div class="title"><span class="tit">代理卡</span></div>
        <div class="container">
            <el-row :gutter="20" >
                <div class="item" v-for="(el, index) in cardList" :key="index">
                    <el-card :body-style="{ padding: '0px' }" class="box-card" @click.native="handleCard(el.id)">
                        <img :src="el.imgUrl" class="image"  style="width:260px;height:170px;border-radius:10px" />
                        <div style="padding: 14px;padding-left:0px">
                            <span style="color:#333333;font-weight:500">{{el.name}}</span>
                            <div class="bottom clearfix">
                                <time class="time">有效期：{{ el.validityPeriod }} 天</time>
                                <div class="price">
                                    <span style="color: #fe4c4f">￥</span><span class="new">{{el.salesPrice}}</span>
                                    <span class="old">{{'￥'+el.originalPrice}}</span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-row>
        </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import { getProxyCardList } from '@/api/purchase'
// import Tit from '@/components/Tit'
export default {
    data() {
        return {
            cardList : [],
            fetchData : true
        }
    },
    // components: {
    //   Tit
    // },
    methods: {
        initData() {
            this.fetchData = true
            getProxyCardList().then( res=>{
            console.log(res)
            if(res.code == 0 && res.data){
                this.cardList = res.data
            }
            this.fetchData = false
            console.log(this.cardList)
        }).catch( err => {
            console.log(err)
            this.fetchData = false
        })
        },
        handleCard(id) {
            console.log(id)
            this.$router.push({ path: `cardDetail/${id}/${1}` })
        }
    },
    mounted() {
        this.initData()
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    .card{
        border: 1px solid #eee;
        background-color: #fff;
        .title{
            // padding-top: 20px;
            padding-left: 20px;
            border-bottom: 1px solid #eee;
            line-height: 48px;
            .tit{
                padding-left:5px;
                border-left:4px solid #ef4c4f;
            }
        }
        .el-row {
            display: flex;
            flex-wrap:wrap;
            margin-bottom: 20px;
        }
        .item{
            // flex: 1;
            // width:290px;
            // height: 290px;
            padding: 15px;
            overflow: hidden;
            margin-left: 20px;
            margin-top: 30px;
            // border-radius: 12px;
            border: 1px solid #fff;
            &:hover{
                box-shadow: 0 10px 28px 0 rgba(14, 13, 13, 0.09);
                border: 1px solid #eee;
            }
            .el-card{
                width: 260px;
                height: 260px;
                border: 0;
                box-shadow: none;
            }
        }
        .container{
            min-height: 500px;
            padding: 20px;
            .box-card{
                cursor: pointer;
            }
            .time {
                font-size: 13px;
                color: #a6a6a6;
            }
            
            .bottom {
                border-radius: 10px;
                margin-top: 10px;
                line-height: 12px;
            }
            .image {
                width: 100%;
                display: block;
            }
            .price{
                font-size: 12px;
                padding-top: 12px;
                padding-bottom: 10px;
                .new{
                    font-size: 26px;
                    color: #fe4c4f;
                }
                .old{
                    font-weight: 500;
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
</style>
