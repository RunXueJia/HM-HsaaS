import { LoginApi, getUserInfoApi, getUserInfoByIdApi } from '@/api/user'
import { getToken, setToken, removeToken, setTimeKey } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
    setTimeKey()
  },
  //设置用户信息
  setUserInfo(state, data) {
    state.userInfo = data
  },
  removeUserInfo(state) {
    state.userInfo = {}
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async LoginFn(context, data) {
    const res = await LoginApi(data)
    context.commit('setToken', res)
  },
  async getUserInfoFn(context) {
    const res = await getUserInfoApi()
    const res2 = await getUserInfoByIdApi(res.userId)
    context.commit('setUserInfo', { ...res, ...res2 })
  },
  quit(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

