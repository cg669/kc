/* eslint-disable */
import request from '@/utils/request'
// 代理卡/合作商报表
export function getAgentCardCooperatorReportList( options={} ){
    return request({
        url: '/api/cooperatorReport/getAgentCardCooperatorReportList',
        method: 'post',
        data: options
    })
}
// 代理卡/用户明细表
export function getAgentCardUserDetailReportList( options={} ){
    return request({
        url: '/api/cooperatorReport/getAgentCardUserDetailReportList',
        method: 'post',
        data: options
    })
}
// 一对一/合作商报表
export function getOneToOneCooperatorReportList( options={} ){
    return request({
        url: '/api/cooperatorReport/getOneToOneCooperatorReportList',
        method: 'post',
        data: options
    })
}
// 一对一/用户明细表
export function getOneToOneUserDetailReportList( options={} ){
    return request({
        url: '/api/cooperatorReport/getOneToOneUserDetailReportList',
        method: 'post',
        data: options
    })
}

// 掌门学堂/用户明细表
export function getZMClassReportList( options={} ){
    return request({
        url: '/api/cooperatorReport/getZMClassReportList',
        method: 'post',
        data: options
    })
}

// 一对一/合作商报表
export function getZMClassCooperationReportList( options={} ){
    return request({
        url: '/api/cooperatorReport/getZMClassCooperationReportList',
        method: 'post',
        data: options
    })
}

// 查询显示报表类型
export function selDataShowById( options={} ){
    return request({
        url: '/api/cooperatorReport/selDataShowById',
        method: 'post',
        data: options
    })
}

// 查询显示报表类型
export function getAuth(){
    return request({
        url: '/api/cooperatorReport/selResourceById',
        method: 'post',
    })
}