import request from '@/utils/request'

// export function loginApi(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

export const loginApi = (data) => request({
  url: '/sys/login',
  method: 'post',
  data
})


export const GetUserInfoApi = () => request({
  method: 'post',
  url: '/sys/profile'
})
export const GetUserBaseInfoApi = (id) => request({
  url: '/sys/user/' + id
})

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


