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

export default router;