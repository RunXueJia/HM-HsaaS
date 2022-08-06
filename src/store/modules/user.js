import { loginApi, GetUserInfoApi, GetUserBaseInfoApi } from '@/api/user'
import { setToken, getToken, removeToken, setTimeToken } from '@/utils/auth'
import { resetRouter } from '@/router';
const state = {
  token: getToken(),
  userInfo: {}
};
const mutations = {
  setTokenFn(state, token) {
    state.token = token
    setToken(token)
    setTimeToken()
  },
  removeTokenFn(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },
  removeUserInfo(state) {
    state.userInfo = {}
  },

};
const actions = {
  async loginFn(context, data) {
    let res = await loginApi(data)
    context.commit('setTokenFn', res)
    // console.log(res);
  },
  async GetUserInfoFn(context) {
    let res = await GetUserInfoApi()
    let res2 = await GetUserBaseInfoApi(res.userId)
    // console.log(res);
    context.commit('setUserInfo', { ...res, ...res2 })
    return res
  },
  quit({ commit }) {
    commit('removeUserInfo')
    commit('removeTokenFn')
    resetRouter()
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

