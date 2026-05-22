import { createRouter, createWebHistory } from "vue-router"
import LoginView from '../views/login/LoginView.vue'
import index from '../views/layout/index.vue'

import indexCompany from '../views/Company/indexCompany.vue'
import CompanyHome from '../views/Company/components/Home.vue'
import CompanyItem from '../views/Company/components/Item.vue'
import CompanyEmployee from '../views/Company/components/Employee.vue'
import CompanyFirm from '../views/Company/components/Firm.vue'
import CompanyRegulations from '../views/Company/components/Regulations.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: index
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
                component: CompanyHome
            },
            {
                path: 'item',
                name: 'CompanyItem',
                component: CompanyItem
            },
            {
                path: 'employee',
                name: 'CompanyEmployee',
                component: CompanyEmployee,
            },
            {
                path: 'firm',
                name: 'CompanyFirm',
                component: CompanyFirm,
                props: true
            },
            {
                path: 'regulations',
                name: 'CompanyRegulations',
                component: CompanyRegulations
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router