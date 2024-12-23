import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';
import { useUserStore } from './stores/modules/userStore';
import http from './http';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);
app.use(router);
app.use(pinia);

// 挂载全局属性
app.config.globalProperties.$http = http;
app.use(ElementPlus)
app.mount('#app');

// 可以在这里进行一些初始化操作，例如检查用户是否已经登录
const userStore = useUserStore();
if (localStorage.getItem('token')) {
  userStore.login(JSON.parse(localStorage.getItem('user')), localStorage.getItem('token'));
}
