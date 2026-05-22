//封装和项目相关的接口函数

import request from '@/utils/http'

//列表渲染
export const getItem = (company_id) => {
    return request({
        url: '/project/select',
        meithod: 'GET',
        params: { company_id }
    })
}

//添加项目
export const postItem = (itemForm) => {
    return request({
        url: '/project/insert',
        method: 'POST',
        data: {
            project_name: itemForm.project_name,
            project_user: itemForm.project_user,
            project_company: itemForm.project_company
        }
    })
}

//删除项目
export const deleteItem = (project_id) => {
    return request({
        url: '/project/delete',
        method: 'DELETE',
        data: { project_id }
    })
}