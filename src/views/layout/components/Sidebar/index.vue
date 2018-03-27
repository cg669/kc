<template>
  <scroll-bar>
    <div class="sublogo">
      <svg-icon icon-class="chart" class="iconclass" />
      <span class="txt">
        {{routeInfo.zh_name}}
        <i>{{routeInfo.en_name}} Workplace</i>
      </span>  
      <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    </div>
    <div class="slider">
      <sidebar-item :routes="routes"></sidebar-item>
    </div>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'route'
    ]),
    routes() {
      console.log(this.$store.state.user.limit,'this.$store.state.user.limit')
      // const limit = this.$store.state.user.limit
      const secondary = this.$store.state.user.secondary //  是否是二级合作商
      // const aRoute = this.$router.options.routes
      console.log('routes',this.route)
      if(this.$store.state.auth.routers) {
        const aRoute = this.$store.state.auth.routers
        const nowRoute = aRoute.filter(el => {
            return this.route.split(el.path).length > 1&&el.children
        })
        console.log('nowRoute',nowRoute)

        // if(nowRoute[0].name === '统计'){
        //   let limitRoute = nowRoute[0].children
        //   nowRoute[0].children = limitRoute.filter( el => limit.indexOf(el.limit) > -1)
        // }

        if(secondary){
            nowRoute.forEach( el => {
              let childRoute = el.children;
              el.children = childRoute.filter( item=>item.per !== 1)
            })
        }
        return nowRoute
      }
    },
    routeInfo() {
        const tempRoute = this.route
        if(tempRoute.split('purchase').length > 1){
            return {
                zh_name : '采购', en_name : 'Purchase'
            }
        }else if(tempRoute.split('stock').length > 1){
            return {
                zh_name : '库存', en_name : 'Stock'
            }
        }else if(tempRoute.split('count').length > 1){
            return {
                zh_name : '统计', en_name : 'Count'
            }
        }else if(tempRoute.split('partner').length > 1){
            return {
                zh_name : '合作商', en_name : 'Partner'
            }
        }else if(tempRoute.split('person').length > 1){
            return {
                zh_name : '个人资料', en_name : 'Person'
            }
        }else{
            return {
                zh_name : '掌门合作商', en_name : 'Partner'
            }
        }
        // return tempRoute
        console.log(tempRoute,'tempRoute')
    }
    // isCollapse() {
    //   return !this.sidebar.opened
    // }
  }
  // mounted() {
  //   console.log(this.$route.path)
  // }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .sublogo{
    position: relative;
    height: 80px;
    padding-left: 20px;
    line-height: 80px;
    background-color: #F65B56;
    color: #fff;
    .iconclass{
      font-size: 30px
    }
    .txt{
      position: relative;
      top: -10px;left: -10px;
      font-weight: bold;
      i{
        position: absolute;
        bottom: -16px;
        left: 0;
        width: 120px;
        line-height: 1;
        font-size: 12px;
      }
    }
  }
  .slider{
    padding-top: 10px;
    padding-left: 20px;
    background-color: #22282E;
    color: #fff;
    font-size: 14px;
  }
  // .hamburger-container {
  //   position: absolute;
  //   top: 0px;
  //   right: -50px;
  //   line-height: 40px;
  //   height: 40px;
  //   float: left;
  //   padding: 0 10px;
  // }
</style>