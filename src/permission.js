import router from "./router";
import store from '@/store'
const whitelist = ['/404', '/login']
router.beforeEach((to, from, next) => {
    const token = store.getters.token
    if (token) {
        if (to.path === '/login') return next('/')
        if (!store.getters.userId) store.dispatch('user/getUserInfoFn')
        next()
    } else {
        if (whitelist.includes(to.path)) return next()
        next('/login')
    }
})