//封装和项目相关的接口函数

import request from '@/utils/http'

//列表渲染
export const getRegulation = (details_project) => {
    return request({
        url: '/details/select',
        meithod: 'GET',
        params: { details_project }
    })
}

//添加条例
export const postRegulation = (listRegulation) => {
    return request({
        url: '/details/insert',
        method: 'POST',
        data: {
            detail_project: listRegulation.item,
            detail_name: listRegulation.name,
            detail_user: listRegulation.recorder,
            detail_type: listRegulation.type,
            detail_amount: listRegulation.amount,
            detail_rate: listRegulation.taxRate,
            detail_tax: listRegulation.taxAmount
        }
    })
}

//删除条例
export const deleteRegulation = (detail_id) => {
    return request({
        url: '/details/delete',
        method: 'DELETE',
        data: { detail_id }
    })
}