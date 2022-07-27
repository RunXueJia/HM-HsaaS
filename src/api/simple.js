import request from '@/utils/request'

export const getSimpleListApi = () => request({
    url: '/sys/user/simple'
})