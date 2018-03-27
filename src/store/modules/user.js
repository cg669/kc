import { login, logout } from '@/api/login'
import { getInfo } from '@/api/user'
import { proxyCardShoppingCart } from '@/api/purchase'
import { selDataShowById } from '@/api/coorperation'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    secondary: false,
    mobile: '',
    shopCar: [],
    shopCarNum: 0,
    shopCarPrice:0,
    mutiShopCar:[],
    orderInfo:{},
    limit: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile
    },
    SET_SHOP_CAR: (state, shopCar) => {
      state.shopCar = shopCar
    },
    SET_SECONDARY: (state, secondary) => {
      state.secondary = secondary
    },
    SET_SHOP_CAR_NUM: (state,shopCar) => {
      state.shopCarNum = 0
      if(!shopCar) return;
      shopCar.forEach( el => {
        state.shopCarNum += el.number
      })
    },
    SET_SHOP_CAR_PRICE: (state,shopCar) => {
      state.shopCarPrice = 0
      if(!shopCar) return;
      shopCar.forEach( el => {
        state.shopCarPrice += el.number*el.proxyCardBo.salesPrice
      })
    },
    SET_ORDER_INFO: (state,orderInfo) => {
      state.orderInfo = orderInfo
    },
    SET_MUTI_SHOP_CAR: (state , mutil) => {
      state.mutiShopCar = mutil
    },
    SET_DATA_LIMIT: (state , limit) => {
      state.limit = limit||''
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password , userInfo.rememberMe).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          console.log(data)
          commit('SET_NAME', data.firstName)
          commit('SET_MOBILE', data.mobile)
          commit('SET_ROLES', data)
          commit('SET_SECONDARY', data.secondary)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  获取用户购物车信息
  GetShopCar({ commit, state }) {
    return new Promise((resolve, reject) => {
        proxyCardShoppingCart().then(response => {
          const data = response.data
          commit('SET_SHOP_CAR', data)
          commit('SET_SHOP_CAR_NUM', data)
          commit('SET_SHOP_CAR_PRICE', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  //  设置用户订单信息
  SetOrderInfo({ commit, state},orderInfo) {
    return new Promise((resolve, reject) => {
          commit('SET_ORDER_INFO', orderInfo)
          resolve()
    })
  },
  //  设置选择的订单
  SetMutiShopCar({ commit, state},mutil) {
    return new Promise((resolve, reject) => {
          commit('SET_MUTI_SHOP_CAR', mutil)
          resolve()
    })
  },

  //  设置统计报表展示权限
  setDataLimit({ commit , state}, limit ){
    return new Promise((resolve, reject) => {
        selDataShowById().then(response => {
          const data = response.data
          commit('SET_DATA_LIMIT', data)
          // commit('SET_DATA_LIMIT', '0,1,2')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
