import axios from 'axios';
import { useRouter } from 'vue-router';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});

// 添加请求头
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token; // 规范Bearer
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 给http整个请求增加一个拦截器
http.interceptors.response.use(res => {
  return res;
}, err => {
  console.log(err.response.data.message);
  // 这里不再使用Vue.prototype.$message，而是通过传入的app实例来调用$message
  app.config.globalProperties.$message({
    type: 'error',
    message: err.response.data.message
  });

  console.log(err.response);
  if (err.response.status === 401) {
    // 跳转到登录页
    const router = useRouter();
    router.push('/');
  }
  return Promise.reject(err);
});

export default http;
