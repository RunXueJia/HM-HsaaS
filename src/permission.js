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
            if (!store.getters.userId) await store.dispatch('user/GetUserInfoFn')
            next()
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