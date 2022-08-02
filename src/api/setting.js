import request from '@/utils/request'
//获取部门列表
export const GetRoleListApi = (params) => request({
    method: 'get',
    url: '/sys/role',
    params
})

//获取部门详情 
export const GetRoleInfoApi = (id) => request({
    method: 'get',
    url: '/sys/role/' + id
})

//增加部门详情
export const AddRoleInfoApi = (data) => request({
    method: 'post',
    url: '/sys/role',
    data
})

//修改部门详情
export const EditRoleInfoApi = (data) => request({
    method: 'put',
    url: '/sys/role/' + data.id,
    data
})

//删除部门详情
export const DelRoleApi = (id) => request({
    method: 'delete',
    url: '/sys/role/' + id,
})
// /company/{id}
export const getCompanyApi = (id) => request({
    method: 'get',
    url: `/company/${id}`
})