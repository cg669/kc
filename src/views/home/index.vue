<template>
  <div class="app-wrapper app-main" :class="{hideSidebar:!sidebar.opened}">
    <div class="home-container">
      <navbar></navbar>
      <div class="app-main "> 
        <div class="content"  
          v-loading="loadingData" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
          <div class="top">
              <div class="left">
                  <p class="tit">代理卡数据概览</p>
                  <div class="card_total">
                    <p class="num">{{homeData.cardNum}}</p>
                    <p>代理卡总数</p>
                    <p class="border"></p>
                  </div>
                  <div class="card_active">
                    <p class="num">{{homeData.activeNum}}</p>
                    <p>激活数</p>
                    <p class="border" style="background:#67f3a3"></p>
                  </div>
                  <PieChart :pieData="homeData" width="300px" height="300px" class="chart" v-if="homeData.activeNum||homeData.cardNum"/>
              </div>
              <div class="right">
                <div id="qr" class="qr"/>
                <div class="info">
                  <div class="one">扫码分享我的1对1链接</div>
                  <div class="two" v-clipboard:copy="codeData"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">点击复制链接地址</div>
                  <div class="pic">
                    <img :src="saoma" alt="扫码">
                  </div>
                </div>
              </div>
          </div>
          <div class="bottom">
            <p class="tit">1对1数据概览</p>
            <div class="content">
              <div class="item">
                <div class="pic">
                  <img :src="yuyuerenshu" alt="预约人数">
                </div>
                <div class="info">
                  <div class="num">{{homeData.appointmentNum}}</div>
                  <div class="txt">预约人数</div>
                </div>
              </div>
              <div class="item">
                <div class="pic">
                  <img :src="shitingrenshu" alt="试听人数">
                </div>
                <div class="info">
                  <div class="num">{{homeData.auditionNum}}</div>
                  <div class="txt">试听人数</div>
                </div>
              </div>
              <div class="item">
                <div class="pic">
                  <img :src="fufeishu" alt="付费人数">
                </div>
                <div class="info">
                  <div class="num">{{homeData.paidNum}}</div>
                  <div class="txt">付费人数</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="foot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import bg from '@/assets/bg.png'
import fufeishu from '@/assets/fufeishu_icon.png'
import shitingrenshu from '@/assets/shitingrenshu_icon.png'
import yuyuerenshu from '@/assets/yuyuerenshu_icon.png'
import saoma from '@/assets/saoma_bg.png'
import qr from '@/assets/qr2.png'
import { Navbar } from '@/views/layout/components'
import PieChart from '@/components/PieChart'
import BarChart from '@/components/BarChart'
import {getLoginData} from '@/api/user'
// import VueQArt from 'vue-qart'
import QRCode from 'qrcodejs2'
export default {
  name: 'home',
  components: {
      Navbar,
      PieChart,
      BarChart
      // VueQArt
  },
  data() {
    return {
       bg,fufeishu,shitingrenshu,yuyuerenshu,saoma,
       homeData: {},
       loadingData: true,
       codeData: '',
       qrA: null
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  methods:{
    initData() {
      getLoginData().then( res=>{
          if(res&&res.code ==='0'){
              this.homeData = res.data
              for (let key in this.homeData){
                if(!this.homeData[key]){
                  this.homeData[key] = 0
                }
              }
              console.log(this.homeData)
              this.codeData = res.data.url
              this.$nextTick( ()=>{
                if(this.qrA !==null){
                  this.qrA.clear()
                  this.qrA = null
                }
                this.qrA = new QRCode(document.getElementById("qr"), {
                  text: this.homeData.url,
                  width: 140,
                  height: 140,
                  colorDark : "#000000",
                  colorLight : "#ffffff"
                })
              })
              this.loadingData = false
          }
      })
    },
    onCopy: function (e) {
        this.$message({
            type: 'success',
            message: '复制成功',
            duration: 2 * 1000,
            showClose: true
        })
      },
      onError: function (e) {
        this.$message({
            type: 'error',
            message: '复制失败',
            duration: 2 * 1000,
            showClose: true
        })
      }
  },
  mounted() {
    const path = this.$route.path
    this.$store.dispatch('ActiveRouter', path)
    this.initData()
    // oCanvas[2].width = oCanvas[2].height = 140
  },
  beforeDestroy() {
    this.qrA.clear()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .home-container{
    .foot{
      height: 236px;
      background: url('../../assets/bg.png') 0px -110px;
    }
    .content{
      // min-height: 500px;
      // overflow-y: auto;
      @include clearfix;
      width: 1200px;
      margin: 0 auto;
      .tit{
        margin: 16px 0;
        padding-left: 16px;
        border-left: 2px solid#FF6C78;
        font-size: 16px;
        color: #333333;
        letter-spacing: -0.24px;
      }
      .top{
        @include clearfix;
        margin: 20px 0 24px;
        height: 260px;
        background-color: #F4F5F7;
        .left{
          position: relative;
          @include clearfix;
          float: left;
          width: 792px;
          height: 100%;
          background-color: #fff;
          .card_total,.card_active{
            float: left;
            margin:0 70px;
            .num{
              text-align: center;
              font-size: 40px;
              color: #333333;
              line-height: 10px;
            }
            p{
              font-size: 18px;
              color: #777777;
            }
            .border{
              display: block;
              width: 40px;
              margin: 0 auto;
              height: 4px;
              background-color: #50BDFF;
            }
          }
          .chart{
            position: absolute;
            top: -20px;
            right: 70px;
            height: 350px;
            width: 350px;
          }
        }
        .right{
          @include clearfix;
          padding: 60px 0 30px 34px;
          width: 390px;
          height: 100%;
          float: right;
          background-color: #fff;
          .qr{
            float: left;
            width: 140px;height: 140px;
          }
          .info{
            float: left;
            margin-left:20px;
            .one{
              font-size: 16px;
              color: #333333;
              letter-spacing: -0.24px;
              line-height: 30px;
            }
            .two{
              font-weight: 500;
              font-size: 16px;
              color: #2385EE;
              letter-spacing: -0.24px;
              line-height: 26px;
              cursor: pointer;
            }
            .pic{
              padding-left: 20px;
              padding-top: 20px;
            }
          }
        }
      }
      .bottom{
        @include clearfix;
        padding-top: 4px;
        width: 100%;
        height: 260px;
        background-color: #fff;
        .content{
          margin-top: 60px;
          display: flex;
          height: 118px;
          .item{
            padding-top: 25px;
            padding-left: 101px;
            flex: 1;
            border-right: 2px solid #eee;
            display: flex;
            .info{
              padding-left: 50px;
              .num{
                text-align: center;
                font-size: 32px;
                color: #333333;
                line-height: 32px;
              }
              .txt{
                padding-top: 10px;
                font-size: 18px;
                color: #777777;
              }
            }
          }
          .item:last-child{
            border-right: 0;
          }
        }
      }
    }
  }
}
// .blur {    
//     -webkit-filter: blur(10px); /* Chrome, Opera */
//        -moz-filter: blur(10px);
//         -ms-filter: blur(10px);    
//             filter: blur(10px);    
// }
</style>
