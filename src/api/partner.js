/* eslint-disable */
import request from '@/utils/request'

// 获取二级合作商列表
export function getSubCooperatorList( options={} ){
    return request({
        url: '/api/subCooperator/getSubCooperatorList',
        method: 'post',
        data: options
    })
}

// 新增二级合作商列表
export function addSubCooperator( options={} ){
    return request({
        url: '/api/subCooperator/addSubCooperator',
        method: 'post',
        data: options
    })
}

// 删除二级合作商
export function deleteSubCooperator( options='' ){
    return request({
        url: '/api/subCooperator/deleteSubCooperator?id='+options,
        method: 'post'
    })
}

// 编辑二级合作商
export function updateSubCooperator( options={} ){
    return request({
        url: '/api/subCooperator/updateSubCooperator',
        method: 'post',
        data: options
    })
}