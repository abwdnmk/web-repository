// //封装和公司相关的接口函数

import request from '@/utils/http'

//列表渲染的接口
export const getFirm = () => {
    return request({
        url: '/company/select',
        method: 'GET',
    })
}

//添加公司的接口
export const postFirm = (firmform) => {
    return request({
        url: '/company/insert',
        method: 'POST',
        data: {
            company_admin: firmform.company_admin,
            company_name: firmform.company_name,
        }
    })
}

// //删除公司的接口
export const deleteFirm = (company_id) => {
    return request({
        url: '/company/delete',
        method: 'DELETE',
        data: { company_id }
    })
}