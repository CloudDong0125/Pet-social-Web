import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import { createPinia } from 'pinia'
import mainMainStore from '@/stores/modules/mainStore'

// 创建 Pinia 实例
const pinia = createPinia()
// 创建 mainStore 实例
const mainStore = mainMainStore(pinia)

class HYRequest {
  constructor(baseURL, timeout = 10000) {
    // 创建 axios 实例并设置 baseURL 和 timeout
    this.instance = axios.create({
      baseURL,
      timeout
    })
    // 请求拦截器，设置 mainStore.isLoading 为 true
    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      return config
    }, err => {
      return err
    })
    // 响应拦截器，设置 mainStore.isLoading 为 false
    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false
      return res
    }, err => {
      mainStore.isLoading = false
      return err
    })
  }

  // 处理请求结果，解析数据，处理错误，最终设置 mainStore.isLoading 为 false
  handleRequest(promise) {
    return promise.then(res => {
      return res.data
    }).catch(err => {
      throw err
    }).finally(() => {
      mainStore.isLoading = false
    })
  }

  // 发起请求
  request(config) {
    return this.handleRequest(this.instance.request(config))
  }

  // 为请求添加 token 到请求头的方法
  addTokenToConfig(config, token) {
  
    if (token) {
      return {
      ...config,
        headers: {
       ...(config.headers || {}),
          token: `${token}`
        }
      }
    }
    return config
  }

  // 发起 GET 请求，可根据是否设置 token 来添加 token 到请求头
  get(config, token) {
  
    const newConfig = this.addTokenToConfig(config, token)
   
    return this.request({
    ...newConfig,
      method: 'get'
    })
  }

  // 发起 POST 请求，可根据是否设置 token 来添加 token 到请求头
  post(config, token) {
    const newConfig = this.addTokenToConfig(config, token)
    return this.request({
    ...newConfig,
      method: 'post'
    })
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)
