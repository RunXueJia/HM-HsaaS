import request from '@/utils/request'


export const getUserListApi = params => request({
    url: '/sys/user',
    method: 'get',
    params
})
export const AddUserApi = (data) => request({
    url: '/sys/user',
    method: 'post',
    data
})
export const EditUserApi = (data) => request({
    url: '/sys/user/' + data.id,
    method: 'put',
    data
})
export const DelUserApi = (id) => request({
    url: '/sys/user/' + id,
    method: 'delete'
})
export const getUserInfoApi = (id) => request({
    url: '/sys/user/' + id,
})