import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
// service.interceptors.request.use(config => {
//   // if (config.method === 'post') {
//   //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'; // post 请求改变请求头，防止多次请求
//   // }
//   console.log(config,'情头')
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== '0') {
      // if( res.code === '2'){
      //   Message({
      //     message: '服务器异常',
      //     type: 'error',
      //     duration: 2 * 1000,
      //     showClose: true
      //   })
      //   return Promise.reject('error')
      // }
        if (res.code === '11' ) {
          store.dispatch('FedLogOut')
        }else if(res.code === undefined){
          return response.data
        }else{
          Message({
            message: res.message||res.data,
            type: 'error',
            duration: 2 * 1000,
            showClose: true
          })
          return Promise.reject('error')
        }
      // }
      
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 2 ) {
      //   MessageBox.confirm('服务器异常，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload()// 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
    }else{
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
