//管理用户数据相关

import { defineStore } from "pinia"
import { loginAPI } from '@/apis/user'
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
    //定义一个我在首页点击获得的数据
    const idIndex = ref(0)

    //1.定义管理用户的state
    const userInfo = ref({})
    const userToken = ref()
    //2.定义获取接口数据的action函数
    // const getUserInfo = async (form) => {
    //     const res = await loginAPI(form.value)
    //     userInfo.value = res.object
    //     userToken.value = res.token
    //     return res
    // }

    //退出登录
    const clearUserInfo = () => {
        idIndex.value = ''
        userInfo.value = {}
        userToken.value = ""
    }

    //3.以对象的形式将state和action返回
    return {
        userInfo,
        // getUserInfo,
        clearUserInfo,
        userToken,

        idIndex
    }
}, {
    persist: true
})
