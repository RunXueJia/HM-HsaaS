import request from '@/utils/request'
//获取部门列表
export const GetDepartmentListApi = () => request({
    method: 'get',
    url: '/company/department'
})

//获取部门详情 
export const GetDepartmentInfoApi = (id) => request({
    method: 'get',
    url: '/company/department/' + id
})

//增加部门详情
export const AddDepartmentInfoApi = (data) => request({
    method: 'post',
    url: '/company/department',
    data
})

//修改部门详情
export const EditDepartmentInfoApi = (data) => request({
    method: 'put',
    url: '/company/department/' + data.id,
    data
})

//删除部门详情
export const DelDepartmentApi = (id) => request({
    method: 'delete',
    url: '/company/department/' + id,

})