import request from '@/utils/request'


export const getDepartmentListApi = () => request({
    url: '/company/department',
    methods: 'get'
})
export const AddDepartmentApi = (data) => request({
    url: '/company/department',
    methods: 'post',
    data
})
export const EditDepartmentApi = (data) => request({
    url: '/company/department/' + data.id,
    methods: 'put',
    data
})
export const DelDepartmentApi = (id) => request({
    url: '/company/department/' + id,
    methods: 'delete'
})