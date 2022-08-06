import request from '@/utils/request'
//获取权限列表
export const GetpermissionListApi = () => request({
    method: 'get',
    url: '/sys/permission'
})

//获取权限详情 
export const GetpermissionInfoApi = (id) => request({
    method: 'get',
    url: '/sys/permission/' + id
})

//增加权限详情
export const AddpermissionInfoApi = (data) => request({
    method: 'post',
    url: '/sys/permission',
    data
})

//修改权限详情
export const EditpermissionInfoApi = (data) => request({
    method: 'put',
    url: '/sys/permission/' + data.id,
    data
})

//删除权限详情
export const DelpermissionApi = (id) => request({
    method: 'delete',
    url: '/sys/permission/' + id,

})