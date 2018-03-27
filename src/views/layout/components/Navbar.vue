<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="logo">
      <img :src="img_logo" alt="掌门1对1" title="掌门1对1" width="100%" style="margin-top:15px">
    </div>
    <div class="nav-top">
      <span v-for="(item,key) in routes" :key="key" @click="handleClick(item.path)" :class="isActive(item.path,route)" v-if="!item.hidden&&item.name !='个人资料'">
        {{item.name}}
      </span>
    </div>
    <div class="right_info clearfix">
      <div class="shop-car" @mouseover="showShopCar=true" @mouseout="showShopCar=false" v-if="isPermission">
          <svg-icon icon-class="car" class="iconclass" />
            购物车({{setCarNum(shopCar)}})
          <el-card class="shop-car-content" :body-style="{ padding: '0px',maxHeight: '320px', overflowY:'auto' }" v-show="showShopCar">
            <div slot="header" class="clearfix head-info">
              <span class="shop_car_tit">代理卡</span>
              <span class="right">共{{setCarNum(shopCar)}}张</span>
            </div>
            <div v-if="!shopCar.length" class="no-car">
               <p >您的购物车暂未添加商品，</p>
               <p ><span class="price" style="color: #1e81cd;font-size: 16px;" @click="handleBuy">前往添加></span></p>
            </div>
            <div class="shop_container">
               <div v-for="(item,index) in shopCar" :key="index" class="text item" >
                <p><span class="name">{{item.proxyCardBo.name}}</span><span class="price right">￥{{setMoney(item.proxyCardBo.salesPrice)}}</span></p>
                <p class="info">
                  <span class="num">数量：{{item.number}}</span>
                  <span class="price right">
                    <el-button size="mini" style="position:relative;top:-10px;right:-2px" @click="handleDel(item.proxyCardId)">删除</el-button>
                  </span>
                </p>
              </div>
            </div>
            <div class="footer clearfix">
              <div class="name">合计：<span class="price">￥{{setMoney(shopCar)}}</span></div>
              <div class="btn">
                <el-button type="danger" @click="handleToCar" style="height:28px;background:#fe4c4f;padding:5px 10px 5px">查看购物车</el-button>
              </div>
            </div>
          </el-card>
      </div>
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <svg-icon icon-class="ps" class="iconclass" />
          <span>{{name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <!-- <router-link class="inlineBlock" to="/home">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link> -->
          <router-link class="inlineBlock" to="/person">
            <el-dropdown-item>
              个人资料
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import img_logo from '@/assets/logo3.png'
import { delProxyCardShoppingCart } from '@/api/purchase'
import { formatText } from '@/utils'
export default {
  data() {
    return{
      img_logo,
      showShopCar: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'route',
      'shopCar',
      'isConfirmOrderStatus',
      'reportsPath'
    ]),
    routes() {
      const limit = this.$store.state.user.limit
      const secondary = this.$store.state.user.secondary //  是否是二级合作商
      if(this.$store.state.auth.routers) {
        const aRoute = this.$store.state.auth.routers
        const limitRoutes = aRoute
        const asyncRoute = limitRoutes.filter( el=> {
            if(el.children){
                el.children.filter( item => item.per !== 1)
            }
            return el.per !== 1
        })
        return secondary ? asyncRoute : limitRoutes
      }
    },
    isPermission() {
      if(this.reportsPath) {
        if(this.reportsPath.indexOf('采购') > -1) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  mounted() {
    this.routerFun();
  },
  methods: {
    //  设置下金钱
    setMoney( arr ) {
        let moneyTotal = 0
        if(arr.length){
          arr.forEach( el => {
            moneyTotal += el.number*el.proxyCardBo.salesPrice
          })
        }else{
          moneyTotal = arr
        }
        moneyTotal = Math.round(moneyTotal * 100) / 100
        moneyTotal += ''
        return formatText(moneyTotal)
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleClick(path) {
      console.log(path);
      this.$store.dispatch('ActiveRouter', path)
      this.$router.push({ path })
    },
    handleToCar() {
      console.log(this.isConfirmOrderStatus,'isConfirmOrderStatus')
      this.showShopCar = false
      this.$store.dispatch('SetConfirmOrderStatus',false)
      this.$router.push({ path: '/purchase/car' })
      
    },
    setCarNum(arr){
      console.log(arr,'dsds')
      let num = 0
      if(arr.length){
        arr.forEach( el => {
            num +=el.number
        })
      }
      return num
    },
    handleBuy() {
      this.showShopCar = false
      this.$router.push({ path: '/purchase/card' })
    },
    // 删除
    handleDel(proxyCardId) {
      delProxyCardShoppingCart(proxyCardId).then(res=>{
          console.log(res)
          if(res && res.code === '0'){
              // this.initData()
              this.$store.dispatch('GetShopCar')
          }
      })
    },
    isActive(value, route) {
      if (route.split(value).length > 1) {
        return 'active'
      } else {
        return ''
      }
    },
    routerFun() {
      var currentPath = this.$route.path;
      console.log('currentPath========',currentPath)
      if(currentPath === '/purchase' || currentPath === '/stock' || currentPath === '/count' || currentPath === 'partner') {
        console.log('hhhh',this.$router.options.routes)
        var routes = this.$store.state.auth.routers
        routes.forEach((item) => {
          if(item.path === currentPath) {
            console.log('item.path========',item.path)
            console.log('item=============',item)
            var directChildren = item.children.filter((child) => {
              if(child.meta.routerLevel === 3) {
                return true
              }
            })
            console.log('directChildren',directChildren)
            var directRoute
            if(directChildren.length>0) {
              directRoute = `${currentPath}/${directChildren[0].path}`
            } else {
              // directRoute = '/404'
            }
            console.log('directRoute',directRoute)
            this.$router.push({path:directRoute})
          }
        })
      }
    }
  },
  watch:{
      $route:function() {
        this.routerFun();
      }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 80px;
  line-height: 80px;
  border-radius: 0px !important;
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .logo{
    // display: inline-block;
    float: left;
    width: 180px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    // background-color: #eee
  }
  .nav-top{
    display: inline-block;
    // background-color: #eee;
    // padding-bottom: 20px;
    color: #333333;
    line-height: 80px;
    span{
      font-size: 16px;
      display: inline-block;
      margin: 0 23px;
      height: 60px;
      padding-bottom: 10px;
      cursor: pointer;
    }
    .active{
      color: #F25B56;
      border-bottom: 1px solid #F25B56;
    }
  }
  .right_info{
    position: absolute;
    right: 35px;top: 0;
  }
  .shop-car{
    font-size: 14px;
    display: inline-block;
    float: left;
    margin-right: 20px;
    height: 80px;
    // line-height: 40px;
    color: #606266;
    position: relative;
    cursor: pointer;
    .shop_container{
      max-height: 225px;
      overflow-y: auto;
    }
    &:hover{
      color: #F25B56;
    }
    .text {
      font-size: 14px;
      border-bottom: 1px solid #eee;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 5px;
    }
    .shop-car-content{
      position: absolute;
      z-index: 99999;
      left: -150px;top: 60px;
      width: 280px;
      line-height: 1.15;
      .no-car{
        font-size: 20px;
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }
      .head-info{
        padding: 0px;
        font-size: 14px;
        line-height: 16px;
        .shop_car_tit{
          position: relative;
          left:-10px;
        }
      }
      .right{
        float: right;
      }
      .name{
        font-weight: 600;
        color: #000;
      }
      .price{
        color: #F25B56;
        font-weight: 600;
      }
      .info{
        font-size: 12px;
      }
      .num{
        color: #9e9e9e;
      }
      .footer{
        background-color: #f7f7f7;
        height: 58px;
        line-height: 58px;
        padding: 0 10px;
        vertical-align: middle;
        .name{
          vertical-align: middle;
          float: left;
        }
        .btn{
          float: right;
          vertical-align: middle;
          // padding-top: 10px;
        }
      }
    }
  }
  .avatar-container {
    position: relative;
    top: 33px;
    line-height: 12px;
    display: inline-block;
    float: left;
    padding-right: 40px;
    .avatar-wrapper {
      font-size: 14px;
      cursor: pointer;
      position: relative;
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 0px;
        font-size: 14px;
      }
    }
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
</style>

