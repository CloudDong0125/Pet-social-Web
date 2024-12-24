import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'
import LoginPage from '../views/login/LoginPage.vue';
import HomePage from '../views/HomeView.vue';
import CategoryEdit from '../views/CategoryEdit.vue';
import CategoryList from '../views/CategoryList.vue';
import ItemEdit from '../views/ItemEdit.vue';
import ItemList from '../views/ItemList.vue';
import ArticleEdit from '../views/ArticleEdit.vue';
import ArticleList from '../views/ArticleList.vue';
import AdEdit from '../views/AdEdit.vue';
import AdList from '../views/AdList.vue';
import AdminUserEdit from '../views/AdminUserEdit.vue';
import AdminUserList from '../views/AdminUserList.vue';
import UserList from '../views/UserList.vue';

// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';


//全局进度条的配置 
// NProgress.configure({ 
//     easing: 'ease', // 动画方式 
//     speed: 300, // 递增进度条的速度 
//     showSpinner: false, // 进度环显示隐藏
//     trickleSpeed: 200, // 自动递增间隔 
//     minimum: 0.3, // 更改启动时使用的最小百分比 
//     parent: 'body', //指定进度条的父容器 
// });


const routes = [{
        path: '/',
        component: LoginPage
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage,
        // 子路由
        children: [ //1.分类
            {
                path: '/categories/create',
                component: CategoryEdit
            },
            {
                path: '/categories/edit/:id',
                component: CategoryEdit,
                props: true
            },
            {
                path: '/categories/list',
                component: CategoryList
            },

            //2.物品
            {
                path: '/items/create',
                component: ItemEdit
            },
            {
                path: '/items/edit/:id',
                component: ItemEdit,
                props: true
            },
            {
                path: '/items/list',
                component: ItemList
            },

            //3.文章
            {
                path: '/articles/create',
                component: ArticleEdit
            },
            {
                path: '/articles/edit/:id',
                component: ArticleEdit,
                props: true
            },
            {
                path: '/articles/list',
                component: ArticleList
            },

            //4.广告位
            {
                path: '/ads/create',
                component: AdEdit
            },
            {
                path: '/ads/edit/:id',
                component: AdEdit,
                props: true
            },
            {
                path: '/ads/list',
                component: AdList
            },

            //5.管理员
            {
                path: '/admin_users/create',
                component: AdminUserEdit
            },
            {
                path: '/admin_users/edit/:id',
                component: AdminUserEdit,
                props: true
            },
            {
                path: '/admin_users/list',
                component: AdminUserList
            },
            {
                path: '/admin_users/userlist',
                component: UserList
            },
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHistory() // history 模式
    // history: createWebHashHistory()   // hash 模式
});

/** 此处只添加路由进度条动画 */
router.beforeEach((to, from, next) => {
    // NProgress.start();
    next();
});
router.afterEach(() => {
    // NProgress.done();
    /** 清除loading标记 */
    let loadingEl = document.querySelector('#html-loading-el');
    if (loadingEl) {
        loadingEl.remove();
    }
});

export default router;