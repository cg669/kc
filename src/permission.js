import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, setToken } from '@/utils/auth' // 验权
import { asyncRouterMap } from '@/router/index.js' // 异步路由

const whiteList = ['/login','/'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login'||to.path === '/') {
      next({ path: '/home' })
      NProgress.done()
    } else {
      //  解决浏览器回退以及前进事件
      const path = to.path
      store.dispatch('ActiveRouter', path)
      /* 分界线，上面的很重要 */
      if (store.getters.roles&&store.getters.roles.length === 0) {
        store.dispatch('GetShopCar')
        // store.dispatch('setDataLimit') 权限接口修改了
        
        // 权限管理
        store.dispatch('GenerateRoutes').then(() => {
          router.addRoutes(store.state.auth.addRouters);
        })
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
            store.dispatch('GetShopCar').then( res => {
              next()
              NProgress.done()
            }).catch( ()=>{
              store.dispatch('FedLogOut').then(() => {
                Message.error('验证失败,请重新登录')
                next({ path: '/login' })
                NProgress.done()
              })
            })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
            NProgress.done()
          })
        })
      } else {
        next()
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      store.dispatch('GetInfo').then(res=>{
        console.log(res,'res')
        if(res.code === '11'){
          next()
          NProgress.done()
        }else if(res.code === '0'){
          setToken(res.data.token)
          next('/home')
          NProgress.done()
        }
      }).catch( err=>{
        next()
        NProgress.done()
      })
    } else {
      next('/')
      NProgress.done()
    }
  }
  // NProgress.done()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
