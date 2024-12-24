import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';
import { useUserStore } from './stores/modules/userStore';
import http from './http';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css";

// 导入字体图标
// import "./assets/iconfont/iconfont.js";
// import "./assets/iconfont/iconfont.css";



const app = createApp(App);
app.use(router);
app.use(pinia);

// 挂载全局属性
app.config.globalProperties.$http = http;
app.use(ElementPlus)
app.mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 可以在这里进行一些初始化操作，例如检查用户是否已经登录
const userStore = useUserStore();
if (localStorage.getItem('token')) {
  userStore.login(JSON.parse(localStorage.getItem('user')), localStorage.getItem('token'));
}
