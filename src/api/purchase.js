/* eslint-disable */
import request from '@/utils/request'

// 代理卡列表
export function getProxyCardList(){
    return request({
        url: '/api/proxyCard/list',
        method: 'get'
    })
}
// 代理卡详情
export function getProxyCardDetail( options={} ){
    return request({
        url: '/api/proxyCard/detail',
        method: 'get',
        params:options
    })
}

// 添加代理卡订单
export function addProxyCardOrder( options={} ){
    return request({
        url: '/api/proxyCard/addProxyCardOrder',
        method: 'post',
        data: options
    })
}

// 添加代理卡购物车
export function addProxyCardShoppingCart( options={} ){
    return request({
        url: '/api/proxyCard/addProxyCardShoppingCart',
        method: 'post',
        data: options
    })
}

// 查询代理卡订单
export function proxyCardOrder( options={} ){
    return request({
        url: '/api/proxyCard/proxyCardOrder',
        method: 'get',
        params: options
    })
}

// 取消代理卡订单
export function cancelProxyCardOrder( options='' ){
    return request({
        url: '/api/proxyCard/cancelProxyCardOrder?id='+options,
        method: 'post'
    })
}

// 删除代理卡购物车中商品
export function delProxyCardShoppingCart( options='' ){
    return request({
        url: '/api/proxyCard/delProxyCardShoppingCart?proxyCardId='+options,
        method: 'post',
    })
}

// 导出代理卡批次详情状态
export function exportProxyCardBatchCode( options={} ){
    return request({
        url: '/api/proxyCard/exportProxyCardBatchCode',
        method: 'get',
        params: options
    })
}

// 修改代理卡购物车中商品数量
export function updateProxyCardShoppingCart( options={} ){
    return request({
        url: '/api/proxyCard/updateProxyCardShoppingCart',
        method: 'post',
        data: options
    })
}

// 查询代理卡购物车
export function proxyCardShoppingCart(){
    return request({
        url: '/api/proxyCard/proxyCardShoppingCart',
        method: 'get',
    })
}

// 查询优惠码
export function proxyCardCouponCode( options={} ){
    return request({
        url: '/api/proxyCard/proxyCardCouponCode',
        method: 'get',
        params: options
    })
}

// 确认支付获取转到快钱支付页面的URL
export function confirmPay( options={} ){
    return request({
        url: '/api/doubleNineBill/confirmPay',
        method: 'post',
        data: options
    })
}