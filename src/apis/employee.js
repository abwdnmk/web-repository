//封装和员工相关的接口函数

import request from '@/utils/http'

//列表渲染的接口
export const getEmployee = (companyId) => {
    return request({
        url: '/worker/update',
        method: 'GET',
        params: { companyId }
    })
}

//添加员工的接口
export const postEmployee = (form) => {
    return request({
        url: '/worker/insert',
        method: 'POST',
        data: {
            worker_id: form.employeeId,
            worker_name: form.employeeName
        }
    })
}

//员工离职的接口（用于数据部分改变）
export const putResign = (worker_id) => {
    return request({
        url: '/worker/quit',
        method: 'PUT',
        data: { worker_id }
    })
}

//删除接口的实现
export const employeeDelete = (worker_id) => {
    return request({
        url: 'del',
        method: 'DELETE',
        data: { worker_id }
    })
}