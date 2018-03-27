import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
  per : 1   //1级合作商才能看
  limit: 0，1，2 是否显示某个报表
  auth:string：是否有权限 中文匹配 auth匹配全部  array：是否显示 没有权限这个页面
**/
export const constantRouterMap = [
  { path: '/', component: _import('index'), hidden: true },
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/forget', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/home',
    component: _import('home/index'),
    name: '首页',
    meta: { title: '首页', icon: 'pur' }
    // hidden: true
  },
  {
    path: '/person',
    component: Layout,
    name: '个人资料',
    meta: { title: '个人资料', icon: 'chart' },
    redirect: '/person/info',
    // hidden: true,
    children: [{
      path: 'info',
      component: _import('person/index'),
      meta: { title: '个人资料', icon: 'dot'}
    }, {
      path: 'forget',
      component: _import('person/forget'),
      meta: { title: '修改密码', icon: 'dot' }
    },{
      path: 'loginOut',
      component: _import('person/loginOut'),
      meta: { title: '退出登录', icon: 'dot' }
    }]
  },
]

export const asyncRouterMap = [
  {
    path: '/purchase',
    component: Layout,
    name: '采购',
    meta: { title: '采购', icon: 'pur' },
    // redirect: '/purchase/card',
    // hidden: true,
    auth:'采购',
    children: [{
      path: 'card',
      component: _import('purchase/card'),
      meta: { title: '代理卡', icon: 'dot' , routerLevel:3},
      auth:'auth',
    }, {
      path: 'car',
      component: _import('purchase/shopCar'),
      meta: { title: '购物车', icon: 'dot' , routerLevel:3},
      auth:'auth',
    }, {
      path: 'order-pay',
      component: _import('purchase/orderPay'),
      meta: { title: '支付页', icon: 'dot' },
      hidden: true,
      auth:'auth',
    },{
      path: 'page',
      component: _import('purchase/orderPage'),
      meta: { title: '采购单', icon: 'dot' , routerLevel:3},
      auth:'auth',
    }, {
      path: 'cardDetail/:id/:post_id',
      hidden: true,
      component: _import('purchase/cardDetail'),
      meta: { title: '代理卡详情页' },
      auth:'auth',
    },{
      path: 'payCallSuccess/:id',
      hidden: true,
      component: _import('purchase/payCallSuccess'),
      meta: { title: '支付成功' },
      auth:'auth',
    },{
      path: 'payCallError/:id',
      hidden: true,
      component: _import('purchase/payCallError'),
      meta: { title: '支付失败' },
      auth:'auth',
    }]
  },
  {
    path: '/stock',
    component: Layout,
    name: '库存',
    meta: { title: '库存', icon: 'left' },
    // redirect: '/stock/getcard',
    auth:'库存',
    // hidden: true,
    children: [{
      path: 'card',
      component: _import('stock/inventory'),
      redirect: '/stock/getcard',
      meta: { title: '代理卡'},
      auth:'库存代理卡',
    }, 
    {
      path: 'getcard',
      component: _import('stock/inventory'),
      meta: { title: '提取代理卡', icon: 'dot' , routerLevel:3},
      auth:'提取代理卡',
    }, {
      path: 'getcardinfo',
      component: _import('stock/cardLog'),
      meta: { title: '提取记录', icon: 'dot' , routerLevel:3},
      auth:'提取记录',
    }, {
      path: 'cardDetail/:batchId',
      hidden: true,
      component: _import('stock/cardDetail'),
      meta: { title: '提取代理卡详情页' },
      auth:'auth',
    }, {
      path: 'auth',
      hidden: true,
      component: _import('noAuth'),
      meta: { title: '无权限', icon: 'dot' , routerLevel:3},
      auth:['提取代理卡','提取记录'],
    }]
  },
  {
    path: '/count',
    component: Layout,
    name: '统计',
    meta: { title: '统计', icon: 'chart' },
    // redirect: '/count/friend',
    // hidden: true,
    auth:'统计',
    children: [{
      path: 'friend',
      component: _import('report/agentCoor'),
      // redirect: '/count/friend/friendChart',
      meta: { title: '一对一报表' },
      limit: 1,
      auth:'一对一报表'
    }, {
      path: 'friend/friendChart',
      component: _import('report/oneToOneCoor'),
      meta: { title: '合作商报表', icon: 'dot' , routerLevel:3},
      // per: 1,
      limit: 1,
      auth:'一对一报表/合作商报表'
    }, {
      path: 'friendChart/selfChart',
      component: _import('report/oneToOneSelf'),
      meta: { title: '用户明细表', icon: 'dot' , routerLevel:3},
      limit: 1,
      auth:'一对一报表/用户明细表'
    }, {
      path: 'agent',
      component: _import('report/agentCoor'),
      redirect: '/count/agent/agentFriendChart',
      meta: { title: '代理卡报表' },
      limit: 0,
      auth:'代理卡报表'
    }, {
      path: 'agent/agentFriendChart',
      component: _import('report/agentCoor'),
      meta: { title: '合作商报表', icon: 'dot' , routerLevel:3},
      // per: 1,
      limit: 0,
      auth:'代理卡报表/合作商报表'
    }, {
      path: 'agent/agentSelfCard',
      component: _import('report/agentSelf'),
      meta: { title: '用户明细表', icon: 'dot' , routerLevel:3},
      limit: 0,
      auth:'代理卡报表/用户明细表'
    },{
      path: 'class',
      component: _import('report/zmClassReport'),
      redirect: '/count/class/report',
      meta: { title: '学堂注册报表' },
      limit: 2,
      auth:'学堂注册报表'
    }, {
      path: 'class/agentCoor',
      component: _import('report/zmClassAgentCoor'),
      meta: { title: '合作商报表', icon: 'dot' , routerLevel:3},
      limit: 2,
      auth:'学堂注册报表/合作商报表',
      // per: 1
    }, {
      path: 'class/report',
      component: _import('report/zmClassReport'),
      meta: { title: '用户明细表', icon: 'dot' , routerLevel:3},
      limit: 2,
      auth:'学堂注册报表/用户明细表'
      // per: 1
    }, {
      path: 'auth',
      hidden: true,
      component: _import('noAuth'),
      meta: { title: '无权限', icon: 'dot' , routerLevel:3},
      auth:['一对一报表/合作商报表','一对一报表/用户明细表','代理卡报表/合作商报表','代理卡报表/用户明细表','学堂注册报表/合作商报表','学堂注册报表/用户明细表'],
    }]
  },
  {
    path: '/partner',
    component: Layout,
    name: '合作商',
    meta: { title: '合作商', icon: 'chart' },
    per: 1,
    redirect: '/partner/add',
    // hidden: true,
    auth:'合作商',
    children: [
    {
      path: 'controller',
      component: _import('partner/add'),
      redirect: '/partner/add',
      meta: { title: '合作商管理' },
      auth:'合作商',
    }, 
    {
      path: 'add',
      component: _import('partner/add'),
      meta: { title: '新增合作商', icon: 'dot' , routerLevel:3},
      auth:'合作商',
    }]
  },
  // 后端页面没权限跳转到首页 进入某个模块后修改权限
  { path: '/purchase/card', redirect:'/', hidden: true , auth:'auth'},
  { path: '/purchase/car', redirect:'/', hidden: true , auth:'auth'},
  { path: '/purchase/page', redirect:'/', hidden: true , auth:'auth'},
  { path: '/purchase/payCallSuccess/:id', redirect:'/', hidden: true , auth:'auth'},
  { path: '/purchase/payCallError/:id', redirect:'/', hidden: true , auth:'auth'},
  { path: '/stock/getcard', redirect:'/', hidden: true , auth:'auth'},
  { path: '/stock/getcardinfo', redirect:'/', hidden: true , auth:'auth'},
  { path: '/stock/auth', redirect:'/', hidden: true , auth:'auth'},
  { path: '/count/friend/friendChart', redirect:'/', hidden: true , auth:'auth'},
  { path: '/count/friendChart/selfChart', redirect:'/', hidden: true , auth:'auth'},
  { path: '/count/agent/agentFriendChart', redirect:'/', hidden: true , auth:'auth'},
  { path: '/count/agent/agentSelfCard', redirect:'/', hidden: true , auth:'auth'},
  { path: '/count/class/agentCoor', redirect:'/', hidden: true , auth:'auth'},
  { path: '/count/class/report', redirect:'/', hidden: true , auth:'auth'},
  { path: '/count/auth', redirect:'/', hidden: true , auth:'auth'},
  { path: '/partner/add', redirect:'/', hidden: true , auth:'auth'},
  
  { path: '/*', redirect: '/404', hidden: true , auth:'auth'},
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

