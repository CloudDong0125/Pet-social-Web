/**
 * 主模块
 */
import urlRequest from '../request'

// 单点登录
export function getApplicationLoginByUserId(userId) {
    return urlRequest.get({
        url: '/user/applicationLoginByUserId',
        params: {
            userId:userId
        }
    })
}

// 学校信息
export function getSchoolInfo(userId) {
    return urlRequest.get({
        url:'/common/getSchoolInfoByUserId',
        params:{
            userId:userId
        }
    })
}

