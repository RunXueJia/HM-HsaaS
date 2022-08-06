import request from '@/utils/request'
export const getEmployeesListApi = () => request({
    url: '/sys/user/simple',

})


//获取员工列表
export const GetUserListApi = (params) => request({
    method: 'get',
    url: '/sys/user',
    params
})

//获取员工详情 
export const GetUserInfoApi = (id) => request({
    method: 'get',
    url: '/sys/user/' + id
})

//增加员工详情
export const AddUserInfoApi = (data) => request({
    method: 'post',
    url: '/sys/user',
    data
})

//修改员工详情
export const EditUserInfoApi = (data) => request({
    method: 'put',
    url: '/sys/user/' + data.id,
    data
})

//删除员工详情
export const DelUserApi = (id) => request({
    method: 'delete',
    url: '/sys/user/' + id,
})


export const batchUserApi = (data) => request({
    method: 'post',
    url: '/sys/user/batch',
    data
})

/** *
 *  获取某个用户的基本信息
 *
 * ***/
export function getUserDetailById(id) {
    return request({
        url: `/sys/user/${id}`
    })
}
/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
    return request({
        url: `/employees/${id}/personalInfo`
    })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}


/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
    return request({
        url: `/employees/${id}/jobs`
    })
}


/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
    return request({
        url: `/employees/${data.userId}/jobs`,
        method: 'put',
        data
    })
}
/** *
 * 给用户分配角色
 * ***/
export function assignRoles(data) {
    return request({
        url: '/sys/user/assignRoles',
        data,
        method: 'put'
    })
}
