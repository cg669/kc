// import fetch from '@/utils/fetch'
import request from '@/utils/request'

export function login(username, password , rememberMe) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password,
      rememberMe
    }
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'get'
  })
}
