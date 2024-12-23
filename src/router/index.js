import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import LoginPage from '../views/login/LoginPage.vue';

const routes = [
    {
        path: '/',
        component: LoginPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()    // history 模式
    // history: createWebHashHistory()   // hash 模式
});

export default router;
