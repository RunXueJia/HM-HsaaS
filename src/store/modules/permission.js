import { constantRoutes, asyncRoutes } from '@/router'


const state = {
    routes: constantRoutes
}
const mutations = {
    setRoute(state, data) {
        state.routes = [...constantRoutes, ...data]
    }
}
const actions = {
    filterRoute(context, data) {
        // console.log(asyncRoutes);
        const res = asyncRoutes.filter(item => data.includes(item.name))
        // console.log(res);
        context.commit('setRoute', res)
        return res
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}