import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user'

const httpInstance = axios.create({
    // baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    baseURL: 'http://www.globeman.cn:8888',
    timeout: 5000
})

//axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // 统一设置 Content-Type 为 JSON
    config.headers['Content-Type'] = 'application/json';

    const userStore = useUserStore()

    const token = userStore.userInfo?.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, e => Promise.reject(e))

//axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    ElMessage({
        type: 'warning',
        message: e.response.data.msg
    })
    return Promise.reject(e)
})

export default httpInstance
