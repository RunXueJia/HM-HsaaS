import { LoginApi, getUserInfoApi } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  //设置用户信息
  setUserInfo(state, data) {
    state.userInfo = data
  },
  removeUserInfo() { }
}
const actions = {
  async LoginFn(context, data) {
    const res = await LoginApi(data)
    context.commit('setToken', res)
  },
  async getUserInfoFn(context) {
    const res = await getUserInfoApi()
    context.commit('setUserInfo', res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

