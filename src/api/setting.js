import request from '@/utils/request'


export const getRoleListApi = (params) => request({
    url: '/sys/role',
    method: 'get',
    params
})
export const AddRoleApi = (data) => request({
    url: '/sys/role',
    method: 'post',
    data
})
export const EditRoleApi = (data) => request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
})
export const DelRoleApi = (id) => request({
    url: '/sys/role/' + id,
    method: 'delete'
})
export const getRoleInfoApi = (id) => request({
    url: '/sys/role/' + id,
})
// /company/
export const getCompanyInfoApi = (id) => request({
    url: '/company/' + id,
})