// 辅助函数，添加 token 到请求头
export function addTokenToHeaders(token) {
    if (token) {
        return {
           headers: {
               token: `${token}`
           }
        };
    }
    return {};
}

// 辅助函数，添加 params 到请求配置
export function addParamsToConfig(params) {
    if (params) {
        return { params };
    }
    return {};
}