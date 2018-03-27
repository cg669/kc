import Vue from 'vue'
import "babel-polyfill"
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
// import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './theme/index.css'
// import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// import loadingImg from '@/assets/loading.gif'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
Vue.use(ElementUI, {})
// Vue.use(VueLazyLoad,{
//   error:loadingImg,
//   loading:loadingImg
// })
Vue.config.productionTip = false

// window.onload = function() {
//   console.log(window.location)
//   window.location.href = window.location.href
//   // if(window.location.hash.indexOf('count')){
//   //   window.location.replace(window.location.origin+'#/login')
//   // }
// }
// window.onbeforeunload = function(){
//   if(window.location.hash.indexOf('count')){
//     history.go(0)
//   }
// }
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
