import request from '@/utils/request'

export const LoginApi = (data) => {
    return request({
        url: '/sys/login',
        method: 'post',
        data
    })
}

export const getUserInfoApi = () => request({
    method: 'post',
    url: '/sys/profile',
})