import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

import { isProd } from '@/common/otherTools';


import http from './http';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/** 添加公共样式 */
import '@/style/index.scss';

import router from './router';
/** 注册路由许可验证 */
// import './permission';
/** 打印完整路由表 */
import { sysMeluConfigList } from './router/common';
import 'element-plus/theme-chalk/dark/css-vars.css';

if (!isProd()) {
  console.log('系统完整路由表，router挂载全局window.router', router, sysMeluConfigList);
  /** 挂载到全局方便操作 */
  window.router = router;
  /** 提示重复菜单 */
  sysMeluConfigList.reduce((c, i) => {
      if (!i.name) return c;
      if (c[i.name]) {
          console.log('重复菜单 name', i);
      }
      c[i.name] = true;
      return c;
  }, {});
}
const pinia = createPinia();
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
// const userStore = useUserStore();
// if (localStorage.getItem('token')) {
//   userStore.login(JSON.parse(localStorage.getItem('user')), localStorage.getItem('token'));
// }
