<template>
  <div class="wel">
    <TopNav />
      <!-- <div class="banner">
          <div class="login">
              <router-link to="/login" class="il">登录</router-link>
              <! <router-link to="/login" class="more">了解更多</router-link> -->
          <!-- </div> --> 
     <div class="banner">
        <div class="layout">
            <h2>掌门1对1</h2>
            <h3>用一个生命影响另一个生命</h3>
        </div>
    </div>

    <div class="about-us-area">
        <div class="layout">
            <h3 class="title">关于我们</h3>
            <p>
                掌门1对1，中国中小学在线1对1教育第一品牌，专注为8—18岁孩子提供一对一专属定制化辅导。其前身是由清华、北大、交大、浙大、复旦精英联合创立的状元俱乐部。2014年，为满足更多学员及家长对高品质个性化定制教育的需求，掌门1对1全面转型提供线上教育服务。</p>
            <p>
                深耕教育多年，掌门1对1深谙中小学生学习教育痛点，培养了一支3万人的优质教师队伍，来自清华、北大、复旦、交大、浙大等全国顶级名校，拥有超过10万套独立研发教材资料以及700万各省各学科专业题库资源，并成为业内第一家自主研发涵盖了电脑、平板、手机、电视多终端在线上课系统的企业，服务质量备受广大家长学生肯定。2017年，掌门1对1注册学员超过200万人，学员覆盖全国600多个城市，各项数据指标在行业内遥遥领先。</p>
        </div>
    </div>

    <div class="boss-intro">
        <div class="layout">
            <div class="left-text">
                <h3 class="title">掌门1对1创始人兼CEO — 张翼</h3>
                <p class="tip">上榜2017福布斯30U30精英，名校学霸让您更放心！</p>
                <p class="desc">作为上海交通大学GPA位列前1%的毕业生，专注从事教育行业近十年，具备丰富的一线授课经验，善于针对性地提升学员的学习短板。他坚信：学习就像短跑，要注重平常日积月累的死磕训练，更要懂得最后阶段的冲刺技巧。2017年张翼登上福布斯30位30岁以下精英榜。<br>
                    “教育就是一个生命影响另一个生命”</p>
            </div>
            <div class="right-img">
                <img :src="require('../../static/boss.png')" alt="张翼">
            </div>
        </div>
    </div>

    <div class="huanglei-area">
        <div class="layout">
            <h3 class="title">掌门1对1首席家长 — 黄磊</h3>
            <div class="box">
                <img :src="require('../../static/huanglei.png')" alt="黄磊">
                <div class="desc">
                    <h3>明星家长信赖之选</h3>
                    <p>“好爸爸”黄磊第一次涉足在线教育领域合作，成为掌门1对1品牌代言人，黄磊高度认可掌门1对1的在线一对一学习模式。<br>
                        “借由互联网的在线辅导是一种全新的教育手段，这种模式能够让优秀教育资源经由网络技术覆盖到各个地区，对中国的学生来说，不论身处何处都能够享受到优秀的教育资源，就是件很幸福的事。</p>
                </div>
            </div>
        </div>
    </div>

    <div class="timeline-curly">
        <div class="layout">
            <h3 class="title">近70%市场份额，掌门1对1引领在线教育</h3>
        </div>
    </div>

    <div class="zhangmen-awards">
        <div class="layout">
            <h3 class="title">荣膺奖项</h3>
            <div class="year-2017">
                <div class="item">
                    <span class="award-time">2017年12月</span>
                    <span class="award-desc">2017年度受家长信赖教育辅导品牌</span>
                    <img :src="require('../../static/dashed.png')" class="dash-line"
                         style="width: 58%">
                    <span class="presentation-institution">网易</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年12月</span>
                    <span class="award-desc">2017年度新锐教育品牌</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 66%"
                         class="dash-line">
                    <span class="presentation-institution">百度</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年12月</span>
                    <span class="award-desc">2017年度家长信赖课外教育品牌</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 58%"
                         class="dash-line">
                    <span class="presentation-institution">央广网</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年12月</span>
                    <span class="award-desc">新商业100榜——年度高成长公司</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 60%"
                         class="dash-line">
                    <span class="presentation-institution">36氪</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年11月</span>
                    <span class="award-desc">2017德勤-华兴中国明日之星</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 55%"
                         class="dash-line">
                    <span class="presentation-institution">德勤、华兴资本</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年11月</span>
                    <span class="award-desc">时代创变榜-2017年度影响力企业</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 48%"
                         class="dash-line">
                    <span class="presentation-institution">中国财经峰会组委会</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年11月</span>
                    <span class="award-desc">2017年度影响力在线教育品牌</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 62%"
                         class="dash-line">
                    <span class="presentation-institution">腾讯</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年11月</span>
                    <span class="award-desc">2017年度教育影响力20强——品牌榜</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 58%"
                         class="dash-line">
                    <span class="presentation-institution">360</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年11月</span>
                    <span class="award-desc">2017最受关注十大在线教育机构</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 61%"
                         class="dash-line">
                    <span class="presentation-institution">360</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年11月</span>
                    <span class="award-desc">2017年中国品牌价值在线教育机构</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 59%"
                         class="dash-line">
                    <span class="presentation-institution">新浪</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年07月</span>
                    <span class="award-desc">2017年30位30岁以下精英</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 60%"
                         class="dash-line">
                    <span class="presentation-institution">福布斯中国</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年06月</span>
                    <span class="award-desc">2017中国教育行业最具影响力十大品牌</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 52%"
                         class="dash-line">
                    <span class="presentation-institution">中国商报</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年06月</span>
                    <span class="award-desc">21未来之星百强榜</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 65%"
                         class="dash-line">
                    <span class="presentation-institution">中国企业家</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年05月</span>
                    <span class="award-desc">2017最佳雇主奖</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 60%"
                         class="dash-line">
                    <span class="presentation-institution">中国财经峰会组委会</span>
                </div>
                <div class="item">
                    <span class="award-time">2017年04月</span>
                    <span class="award-desc">创业企业新苗榜</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 69%"
                         class="dash-line">
                    <span class="presentation-institution">证券时报</span>
                </div>
                <div class="item" style="margin-top: 24px">
                    <span class="award-time">2016年12月</span>
                    <span class="award-desc">2016影响力在线教育品牌</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 55%"
                         class="dash-line">
                    <span class="presentation-institution">腾讯网、腾讯教育</span>
                </div>
                <div class="item">
                    <span class="award-time">2016年12月</span>
                    <span class="award-desc">2016中国行业领先教育集团</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 54%"
                         class="dash-line">
                    <span class="presentation-institution">新浪网、新浪教育</span>
                </div>
                <div class="item">
                    <span class="award-time">2016年12月</span>
                    <span class="award-desc">2016中国创新成长企业100强</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 60%"
                         class="dash-line">
                    <span class="presentation-institution">创业邦</span>
                </div>
                <div class="item">
                    <span class="award-time">2016年11月</span>
                    <span class="award-desc">中国在线教育行业最具竞争力十大品牌</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 52%"
                         class="dash-line">
                    <span class="presentation-institution">中国商报</span>
                </div>
                <div class="item">
                    <span class="award-time">2016年09月</span>
                    <span class="award-desc">2016最具影响力民族品牌</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 26%; height: 1px;"
                         class="dash-line">
                    <span class="presentation-institution">北京民族经济发展促进会、中国民族品牌影响力论坛组委会</span>
                </div>
                <div class="item">
                    <span class="award-time">2016年09月</span>
                    <span class="award-desc">2016中国最佳品牌形象奖</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 48%"
                         class="dash-line">
                    <span class="presentation-institution">中国创新创业风云榜组委会</span>
                </div>
                <div class="item">
                    <span class="award-time">2016年09月</span>
                    <span class="award-desc">2016中国最佳商业模式奖</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 48%"
                         class="dash-line">
                    <span class="presentation-institution">中国创新创业风云榜组委会</span>
                </div>
                <div class="item">
                    <span class="award-time">2016年07月</span>
                    <span class="award-desc">2016年行业影响力品牌</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 55%"
                         class="dash-line">
                    <span class="presentation-institution">中国财经峰会组委会</span>
                </div>
                <div class="item">
                    <span class="award-time">2016年01月</span>
                    <span class="award-desc">十佳升学辅导培训品牌</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 60%"
                         class="dash-line">
                    <span class="presentation-institution">大众点评教育</span>
                </div>
                <div class="item">
                    <span class="award-time">2016年01月</span>
                    <span class="award-desc">中国最具投资价值企业50强</span>
                    <img :src="require('../../static/dashed.png')"
                         style="width: 62%"
                         class="dash-line">
                    <span class="presentation-institution">投资界</span>
                </div>
            </div>
        </div>
    </div>

    <div class="zm-advantage">
        <div class="layout">
            <h3 class="title">掌门特色</h3>
            <img :src="require('../../static/zm_advantage.png')" alt="">
        </div>
    </div>
  </div>
</template>
<script>
import { getInfo } from '@/api/user'
import TopNav from '@/components/TopBar'
export default {
    components:{
        TopNav
    },
    mounted() {
        // getInfo().then(res=>{
        //     console.log(res)
        // })
        // this.$store.dispatch('GetInfo').then(res=>{
        //     console.log(res)
        // })
    }
}
</script>
<style lang="scss" scoped>
.wel{
    padding-top: 80px;
    height: 100%;
    overflow-y: auto;
//     .banner{
//         position: relative;
//         height: 450px;
//         background: url('../../static/banner.png') center no-repeat;
//         .login{
//             font-size: 16px;
//             position: absolute;
//             top: 20px;right: 20px;
//             color: #666;
//             .il{
//                 padding: 10px;
//                 background-color: #ececec;
//                 border-radius:5px;
//             }
//             // .more{
//             //     color: #6d6b6b;
//             // }
//         }
//         .content{
//             .layout {
//   width: 1026px;
// }
.layout {
 margin: 0 auto;
  width: 1026px;
  overflow:hidden;_zoom:1;
}

.title {
  display: inline-block;
  font-size: 28px;
  color: #373737;
  font-weight: bold;
  &::before {
    content: '';
    display: inline-block;
    position: relative;
    margin-right: 10px;
    top: 4px;
    width: 6px;
    height: 30px;
    background: #c70031;
  }
}
.banner {
  overflow: hidden;
  position: relative;
  height: 450px;
  background: url('../../static/banner.png') no-repeat center top;
  .layout {
    position: relative;
    h2 {
      font-weight: bold;
      margin-top: 120px;
      font-size: 75px;
      color: #c70031;
    }
    h3 {
      font-weight: bold;
      font-size: 36px;
      color: #424242;
    }
  }
}

.about-us-area {
  overflow:hidden;_zoom:1;
  padding: 60px 0;
  height: 270px;
  background: #f7f6f6;
  .layout {
    p {
      margin-top: 40px;
      font-size: 16px;
      line-height: 26px;
    }
  }
}

.boss-intro {
  padding: 60px 0;
  min-height: 260px;
  overflow:hidden;_zoom:1;
  .layout {
     overflow:hidden;_zoom:1;
    .left-text {
      float: left;
      width: 640px;
      .tip {
        margin-top: 40px;
        margin-bottom: 20px;
        padding-left: 24px;
        width: 536px;
        height: 34px;
        line-height: 34px;
        font-size: 22px;
        background: #c70031;
        color: #fff;
      }
      .desc {
        font-size: 16px;
        line-height: 26px;
      }
    }
    .right-img {
      float: left;
      margin-left: 24px;
    }
  }
}

.huanglei-area {
//   overflow:hidden;_zoom:1;
  padding-top: 62px;
  height: 496px;
  background: url("../../static/huanglei_bg.png") no-repeat 0 0;
  &:before{
        display: table;
        content: "";
        line-height: 0;
      }
      &:after{
        clear: both;
        display: table;
        content: "";
        line-height: 0;
      }
  .layout {
      &:before{
        display: table;
        content: "";
        line-height: 0;
      }
      &:after{
        clear: both;
        display: table;
        content: "";
        line-height: 0;
      }
    overflow: visible;
    .box {
      &:before{
        display: table;
        content: "";
        line-height: 0;
      }
      &:after{
        clear: both;
        display: table;
        content: "";
        line-height: 0;
      }
      margin-top: 70px;
      img {
        float: left;
        margin-right: 50px;
      }
      .desc {
        float: left;
        padding: 20px 32px;
        width: 786px;
        height: 210px;
        border-radius: 8px;
        background: #fff;
        h3 {
          font-size: 18px;
          font-weight: bold;
        }
        p {
          font-size: 16px;
          line-height: 26px;
        }
      }
    }
  }
}

.timeline-curly {
  padding-top: 64px;
  height: 776px;
  background: url('../../static/big_event.png') no-repeat center 150px;
}

.zhangmen-awards {
  padding: 60px 0 90px;
  background: #f7f6f6;
  .layout {
    .year-2017 {
      margin-top: 50px;
      .item {
        overflow: hidden;
        white-space: nowrap;
        font-size: 17px;
        line-height: 30px;
        .award-time {
          //float: left;
          color: #a79e99;
        }
        .award-desc {
          //float: left;
          margin-left: 24px;
          color: #333;
        }
        .dash-line {
          position: relative;
          top: -6px;
        }
        .presentation-institution {
          float: right;
          color: #707070;
        }
      }
    }
  }
}

.zm-advantage {
  padding: 60px 0 80px;
  .layout {
    img {
      display: block;
      width: 80%;
      margin-left: 10%;
      margin-top: 90px;
    }
  }
}
}
</style>


