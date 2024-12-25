import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElLoading,ElMessage } from 'element-plus';

// 创建一个全局的 loading 实例
let loadingInstance = null;

// 显示 loading
const showLoading = () => {
  loadingInstance = ElLoading.service({
    lock: true,
    text: "加载中。。。。",
    background: 'rgba(0,0,0,0.7)'
  });
};

// 隐藏 loading
const hideLoading = () => {
  if (loadingInstance) {
    loadingInstance.close();
    loadingInstance = null;
  }
};

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});

// 添加请求头
http.interceptors.request.use(function (config) {
  // 开始加载
  showLoading();
  // Do something before request is sent
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token; // 规范Bearer
  }
  return config;
}, function (error) {
  hideLoading();
  // Do something with request error
  return Promise.reject(error);
});

// 给http整个请求增加一个拦截器
http.interceptors.response.use(res => {
  // 关闭loading
  hideLoading();
  return res;
}, err => {

  console.log(err.response.data.message);
  // 这里不再使用Vue.prototype.$message，而是通过传入的app实例来调用$message
  ElMessage({
    showClose: true,
    message: err.response.data.message,
    type: 'error',
  });
 
  
  console.log(err.response);
  if (err.response.status === 401) {
    // 跳转到登录页
    const router = useRouter();
    router.push('/');
  }
  hideLoading();
  return Promise.reject(err);
});

export default http;
export { showLoading, hideLoading };
