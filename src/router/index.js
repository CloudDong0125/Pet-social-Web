/**
 * 路由列表部分
 * 所有路由必须先手动写好，然后由后端菜单接口来进行匹配并且指定是否显示
 */
import { createWebHistory, createRouter } from 'vue-router';
import LoginPage from '../views/login/LoginPage.vue';
/**
 * 为路由配置meta相当于为该路由配置了基本信息，配置的属性如下
 * title 用作标签显示字样的字段
 * hasTag 可以生成标签
 * isCache 该标签页面是否缓存
 * hidden 该标签页面是否在左边目录上显示
 * isLink 表示直接跳转新页面
 * iconName 菜单icon图标
 * fixed 标签是否固定
 * layoutName layout的名称，用作分组
 * redirectName 重定向的目标
 * path 路由地址，唯一键
 * fullPath
 * showTagIcon 标签显示的时候是否显示图标
 * content 菜单显示的详情
 * number 菜单显示的数字
 */
export const constantRoutes = [
    /** 登录注册相关页面 */
    {
        path: '/login',
        component: LoginPage
    },
    /** 404页面 */
    {
        path: '/404',
        component: () => import('@/views/system/error/404.vue'),
        name: '404',
    },
    /** 401页面 */
    {
        path: '/401',
        component: () => import('@/views/system/error/401.vue'),
        name: '401',
    },
    /** 定义首页重定向地址 */
    {
        path: '',
        redirect: '/main',
    },
    /** 其他业务相关页面 */
    {
        path: '/main',
        component: () => import('@/layout/main/index.vue'),
        children: [
            /**
             * 重定向页面
             * 用来刷新标签页
             *  */
            {
                path: 'redirect/:path(.*)',
                name: 'main-redirect',
                component: () => import('@/views/system/redirect/index.vue'),
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                },
            },
            {
                path: '401',
                name: 'main-401',
                component: () => import('@/views/system/error/401.vue'),
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                    hasTag: true,
                    title: '401',
                },
            },
            {
                path: '404',
                name: 'main-404',
                component: () => import('@/views/system/error/404.vue'),
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                    hasTag: true,
                    title: '404',
                },
            },
            {
                path: 'new-tag-page/:sign',
                component: () => import('@/views/system/newTagPage/index.vue'),
                name: 'new-tag-page',
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                    title: '新标签',
                    hasTag: true,
                },
            },
            {
                path: 'iframe/:sign(.*)',
                component: () => import('@/views/system/iframe/index.vue'),
                name: 'iframe',
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                    hasTag: true,
                },
            },
            /** 一些页面例子 */
            {
                path: '/main/index',
                component: () => import('@/views/system/main/index.vue'),
                name: 'main',
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                    hasTag: true,
                },
            },
            {
                path: '/main/categoryEdit/:id',
                component: () => import('@/views/system/main/categoryEdit.vue'),
                name: '新建分类',
                meta: {
                    layoutName: 'categoryEdit',
                    redirectName: 'categoryEdit-redirect',
                    hasTag: true,
                },
            },
            {
                path: '/main/categoryList',
                component: () => import('@/views/system/main/categoryList.vue'),
                name: 'categoryList',
                meta: {
                    layoutName: 'categoryList',
                    redirectName: 'categoryList-redirect',
                    hasTag: true,
                },
            },
            
            {
                path: '/main/itemsEdit/:id',
                component: () => import('@/views/system/main/itemsEdit.vue'),
                name: '新建宠物',
                meta: {
                    layoutName: 'itemsEdit',
                    redirectName: 'itemsEdit-redirect',
                    hasTag: true,
                },
            },
            {
                path: '/main/itemsList',
                component: () => import('@/views/system/main/itemsList.vue'),
                name: '宠物列表',
                meta: {
                    layoutName: 'itemList',
                    redirectName: 'itemList-redirect',
                    hasTag: true,
                },
            },

            {
                path: '/main/articlesEdit/:id',
                component: () => import('@/views/system/main/articlesEdit.vue'),
                name: '新建文章',
                meta: {
                    layoutName: 'articlesEdit',
                    redirectName: 'articlesEdit-redirect',
                    hasTag: true,
                },
            },
            {
                path: '/main/articlesList',
                component: () => import('@/views/system/main/articlesList.vue'),
                name: '文章列表',
                meta: {
                    layoutName: 'articlesList',
                    redirectName: 'articlesList-redirect',
                    hasTag: true,
                },
            },

            {
                path: '/main/adsEdit/:id',
                component: () => import('@/views/system/main/adsEdit.vue'),
                name: '新建运营',
                meta: {
                    layoutName: 'adsEdit',
                    redirectName: 'adsEdit-redirect',
                    hasTag: true,
                },
            },
            {
                path: '/main/adsList',
                component: () => import('@/views/system/main/adsList.vue'),
                name: '运营列表',
                meta: {
                    layoutName: 'adsList',
                    redirectName: 'adsList-redirect',
                    hasTag: true,
                },
            },


            {
                path: '/main/adminUseEdit/:id',
                component: () => import('@/views/system/adminUseEdit.vue'),
                name: '新建管理员',
                meta: {
                    layoutName: 'adminUseEdit',
                    redirectName: 'adminUseEdit-redirect',
                    hasTag: true,
                },
            },
            {
                path: '/main/adminUseList',
                component: () => import('@/views/system/main/adminUseList.vue'),
                name: '管理员列表',
                meta: {
                    layoutName: 'adminUseList',
                    redirectName: 'adminUseList-redirect',
                    hasTag: true,
                },
            },
            {
                path: '/main/useList',
                component: () => import('@/views/system/main/useList.vue'),
                name: '用户列表',
                meta: {
                    layoutName: 'useList',
                    redirectName: 'useList-redirect',
                    hasTag: true,
                },
            },


            {
                path: 'icon-list',
                component: () => import('@/views/system/iconList/index.vue'),
                name: 'icon-list',
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                    hasTag: true,
                },
            },
            {
                path: 'mine/info',
                component: () => import('@/views/system/mine/index.vue'),
                name: 'main-mine-info',
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                    title: '个人中心',
                    hasTag: true,
                },
            },
            {
                path: 'mine/info-update',
                component: () => import('@/views/system/mine/update.vue'),
                name: 'main-mine-info-update',
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                    title: '修改个人信息',
                    hasTag: true,
                },
            },
            {
                path: 'mine/info-password',
                component: () => import('@/views/system/mine/password.vue'),
                name: 'main-mine-info-password',
                meta: {
                    layoutName: 'main',
                    redirectName: 'main-redirect',
                    title: '修改密码',
                    hasTag: true,
                },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_routeBasePath),
    routes: constantRoutes,
});

export default router;
