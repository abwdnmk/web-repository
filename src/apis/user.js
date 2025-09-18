//封装和用户相关的接口函数

import request from '@/utils/http'

export const loginAPI = (form) => {
    return request({
        url: '/login',
        method: 'POST',
        data: {
            account: form.account,
            password: form.password
        }
    })
}