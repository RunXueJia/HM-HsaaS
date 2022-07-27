import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, getTimeKey } from '@/utils/auth'
import router from '@/router'
const TimeLean = 1000 * 3600 * 2
const TimeOut = () => Date.now() - getTimeKey() >= TimeLean
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = store.getters.token
    if (token) {
      if (TimeOut()) {
        Message.error('登录过期')
        store.dispatch('user/quit')
        router.push('/login')
        return Promise.reject('登录过期')

      }
      config.headers.Authorization = `Bearer ${getToken()}`
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const { data, success, message } = response.data
    if (success) return data
    Message.error(message)
    return Promise.reject(message)
    // return response
  },
  error => {
    if (error.response && error.response.status === 401 && error.response.data.code === 10002) {
      Message.error('登录过期')
      store.dispatch('user/quit')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service
