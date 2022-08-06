import router from "./router";
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
import store from '@/store'

const whitelist = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (!store.getters.userId) {
                const res = await store.dispatch('user/GetUserInfoFn')
                const routes = await store.dispatch('permission/filterRoute', [...res.roles.menus, { path: '*', redirect: '/404', hidden: true }])
                // console.log(res.roles.menus);
                router.addRoutes(routes)
                if (store.state.permission.routes.some(item => item.path === to.path)) {
                    next(to.path)
                } else {
                    next('/')
                }
            } else {
                next()
            }

        }
    } else {
        if (whitelist.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
    NProgress.done()
})
router.afterEach(() => {
    NProgress.done()
})