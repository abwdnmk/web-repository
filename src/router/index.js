import { createRouter, createWebHashHistory } from "vue-router"
import { useUserStore } from "@/stores/user.js"
import LoginView from '../views/login/LoginView.vue'
import index from '../views/layout/index.vue'

import indexCompany from '../views/Company/indexCompany.vue'
import CompanyHome from '../views/Company/components/Home.vue'
import CompanyItem from '../views/Company/components/Item.vue'
import CompanyEmployee from '../views/Company/components/Employee.vue'
import CompanyFirm from '../views/Company/components/Firm.vue'
import CompanyRegulations from '../views/Company/components/Regulations.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: index,
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/company',
        name: 'Company',
        component: indexCompany,
        redirect: '/company/home',
        children: [
            {
                path: 'home',
                name: 'CompanyHome',
                component: CompanyHome,
                meta: { requireAuth: true }
            },
            {
                path: 'item',
                name: 'CompanyItem',
                component: CompanyItem,
                meta: { requireAuth: true }
            },
            {
                path: 'employee',
                name: 'CompanyEmployee',
                component: CompanyEmployee,
                meta: { requireAuth: true }
            },
            {
                path: 'firm',
                name: 'CompanyFirm',
                component: CompanyFirm,
                meta: { requireAuth: true }
            },
            {
                path: 'regulations',
                name: 'CompanyRegulations',
                component: CompanyRegulations,
                meta: { requireAuth: true }
            }
        ]
    },
    {
        // 404页面
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from) => {
    const userStore = useUserStore()
    if (to.meta.requireAuth && !userStore.userToken) {
        ElMessage.error("请先登录")
        return '/';
    }
})

export default router