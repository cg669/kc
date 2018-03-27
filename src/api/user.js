import request from '@/utils/request'

// 获取个人信息
export function getInfo() {
    return request({
      url: '/api/user',
      method: 'get',
    })
}

// 忘记密码
export function forgetPassword( options={} ) {
    return request({
      url: '/api/user/forgetPassword',
      method: 'post',
      data: options
    })
}

// 修改名称
export function modifyFirstName( options={} ) {
    return request({
      url: '/api/user/modifyFirstName',
      method: 'post',
      data: options
    })
}

// 修改密码
export function modifyPassword( options={} ) {
    return request({
      url: '/api/user/modifyPassword',
      method: 'post',
      data: options
    })
}

// 发送验证码
export function sendVerifitionCode( options={} ) {
    return request({
      url: '/api/user/sendVerifitionCode',
      method: 'post',
      data: options
    })
}

// 首页实时数据
export function getLoginData() {
  return request({
    url: '/api/subCooperator/getLoginData',
    method: 'post',
  })
}