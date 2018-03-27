/* eslint-disable */
import request from '@/utils/request'

// 获取二级合作商列表
export function proxyCardInventory( options={} ){
    return request({
        url: '/api/proxyCard/proxyCardInventory',
        method: 'get',
        params: options
    })
}
// 查询代理卡提取查看详情
export function proxyCardBatchDetail( options={} ){
    return request({
        url: '/api/proxyCard/proxyCardBatchDetail',
        method: 'post',
        data: options
    })
}
// 查询代理卡提取记录
export function proxyCardExportLog( options={} ){
    return request({
        url: '/api/proxyCard/proxyCardExportLog',
        method: 'get',
        params: options
    })
}

// 复制一个代理卡激活码
export function copyProxyCardCode( options={} ){
    return request({
        url: '/api/proxyCard/copyProxyCardCode',
        method: 'post',
        data: options
    })
}

// 是否需要短信验证码
export function needVerificationCode( options={} ){
    return request({
        url: '/api/proxyCard/needVerificationCode',
        method: 'get',
        params: options
    })
}

// 启用一个批次代理卡
export function startupProxyCardBatch( options={} ){
    return request({
        url: '/api/proxyCard/startupProxyCardBatch',
        method: 'post',
        data: options
    })
}

// 代理卡提取导出
export function exportProxyCardBatchCode( options={} ){
    return request({
        url: '/api/proxyCard/exportProxyCardBatchCode',
        method: 'get',
        params: options
    })
}

// 查询代理卡批次概要信息
export function proxyCardBatchInfo( options={} ){
    return request({
        url: '/api/proxyCard/proxyCardBatchInfo',
        method: 'get',
        params: options
    })
}