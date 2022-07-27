import request from '@/utils/request'


export const getDepartmentListApi = () => request({
    url: '/company/department',
    method: 'get'
})
export const AddDepartmentApi = (data) => request({
    url: '/company/department',
    method: 'post',
    data
})
export const EditDepartmentApi = (data) => request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
})
export const DelDepartmentApi = (id) => request({
    url: '/company/department/' + id,
    method: 'delete'
})
export const getDepartmentInfoApi = (id) => request({
    url: '/company/department/' + id,
})