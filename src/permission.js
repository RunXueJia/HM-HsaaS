import router from "./router";
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whitelist = ['/404', '/login']
router.beforeEach((to, from, next) => {
    NProgress.start()
    const token = store.getters.token
    if (token) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (!store.getters.userId) store.dispatch('user/getUserInfoFn')
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
