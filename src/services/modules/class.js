/**
 * 班级模块
 */
import urlRequest from '../request'
import { addTokenToHeaders, addParamsToConfig } from '../request/utils'


export function getGradeClassRank(schoolId, token) {
    const headers = addTokenToHeaders(token);
    const params = addParamsToConfig({ schoolId });

    return urlRequest.get({
        url: '/classEvaluation/getGradeClassRaink',
       ...params,
       ...headers
    });
}

export function getProjectScoreClassTop(token) {
    const headers = addTokenToHeaders(token);

    return urlRequest.get({
        url: '/classEvaluation/getProjectScoreClassTop',
       ...headers
    });
}

export function getGradeWeekProjectScore(token) {
    const headers = addTokenToHeaders(token);

    return urlRequest.get({
        url: '/classEvaluation/getGradeWeekProjectScore',
       ...headers
    });
}

export function getGradeDeductionProject(gradeId, token) {
    const headers = addTokenToHeaders(token);
    const params = addParamsToConfig({ gradeId });
    
    return urlRequest.get({
        url: '/classEvaluation/getGradeDeductionProject',
       ...params,
       ...headers
    });
}

export function getDeductionProjectScoreClass(token) {
    const headers = addTokenToHeaders(token);

    return urlRequest.get({
        url: '/classEvaluation/getDeductionProjectScoreClass',
       ...headers
    });
}

export function getDeductionScoreTopTen(token) {
    const headers = addTokenToHeaders(token);
    
    return urlRequest.get({
        url: '/classEvaluation/getDeductionScoreTopTen',
       ...headers
    });
}