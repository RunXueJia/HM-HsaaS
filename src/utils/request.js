import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeToken } from '@/utils/auth'
const timeLen = 1000 * 3600 * 2
const isTokenTimeOUt = () => {
  return Date.now() - getTimeToken() > timeLen
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      if (isTokenTimeOUt()) {
        Message.error('登录已过期')
        store.dispatch('user/quit')
        router.push('/login')
        return Promise.reject('登录已过期')
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const { success, message, code, data } = response.data
    if (success) {
      return data
    } else {

      Message.error(message)
      return Promise.reject(message)
    }
  },
  error => {
    if (error.response && error.response.status === 401 && error.response.data.code === 10002) {
      Message.error('登录已过期')
      store.dispatch('user/quit')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service
