/*jshint esversion: 9 */
// import { service } from './request';
// import qs from 'qs';

/** 公用接口 */
const allApi = {
    login() {
        // return service({
        //     url:"/public/captcha",
        //     method:'get',
        // });
        return Promise.resolve({
            msg: '操作成功',
            code: 200,
            token: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImJmMmYyMWRlLTUwNzctNDUxNy1hYmRlLTA0NGE4NzNhMzE0ZSJ9.DOnUxWppbtKyJGlvSBZqdExf5hrt0EdWalanz_op7rvyc9v-itJJZXbW0xn_yS5SZfXLYn1BRMlTdxadUmRmAg',
        });
    },
    getUserInfo() {
        return Promise.resolve({
            msg: '操作成功',
            code: 200,
            data: {
                userName: 'admin',
                nickName: '管理员',
                avatar: 'https://s11.ax1x.com/2023/12/15/pihx4js.jpg',
            },
        });
    },
    getMenuList() {
        let menuList = [
            {
                name: 'main-index',
                path: '/main/index',
                title: '首页',
                content: '(有缓存，并且标签页固定)',
                isCache: true,
                fixed: true,
                iconName: 'svg:sy.svg',
            },
            {
                name: 'category',
                title: '分类管理',
                iconName: 'svg:all-fill.svg',
                content: '(有接口)',
                childs: [
                    {
                        path: '/main/category',
                        title: '新建分类',
                        isCache: true,

                    },
                    {
                        path: '/main/categoryEdit',
                        title: '分类列表',
                        showTagIcon: true,
                    },
                ],
            },
            {
                title: '宠物管理',
                iconName: 'svg:cw.svg',
                content: '(有接口)',
                childs: [
                    {
                        name: 'category-list',
                        title: '新建小宠之星',
                        isCache: true,

                    },
                    {
                        path: '/main/new-tag-page/search-new-page',
                        title: '小宠之星列表',
                        showTagIcon: true,
                    },
                ],
            },
            {
                title: '站内链接',
                iconName: 'svg:aligncenter-fill.svg',
                childs: [
                    {
                        path: '/main/iframe/https://github.com/CloudDong0125/',
                        title: '文档',
                        content: '有缓存',
                        iconName: 'img:logo.png',
                        showTagIcon: true,
                        isCache: true,
                    },
                    {
                        path: '/main/iframe/https://github.com/CloudDong0125',
                        title: 'CloudDong0125 - gittee',
                        iconName: 'img:logo.png',
                        showTagIcon: true,
                        isCache: false,
                    },
                    {
                        path: '/main/iframe/https://codess.dumogu.top/',
                        title: 'CODESS',
                        iconName: 'img:logo.png',
                        showTagIcon: true,
                        isCache: false,
                    },
                    {
                        path: `/main/iframe/${encodeURIComponent(
                            'https://cn.vuejs.org/guide/introduction.html',
                        )}`,
                        title: 'VUE3文档',
                        content: '有缓存',
                        iconName: 'img:vue.svg',
                        showTagIcon: true,
                        isCache: true,
                    },
                    {
                        path: `/main/iframe/${encodeURIComponent('https://www.amap.com/')}`,
                        title: '高德地图',
                        content: '有缓存',
                        iconName: 'img:gaode.svg',
                        showTagIcon: true,
                        isCache: true,
                    },
                ],
            },
            {
                title: '多级菜单',
                iconName: 'svg:alignleft-fill.svg',
                childs: [
                    {
                        title: '父级',
                        iconName: 'svg:aligncenter-fill.svg',
                        childs: [
                            {
                                name: 'show-list-update',
                                title: '父级',
                                iconName: 'svg:aligncenter-fill.svg',
                                childs: [
                                    {
                                        path: '/main/new-tag-page/search-new-page1',
                                        title: '新标签页',
                                        iconName: 'svg:test-1.svg',
                                        showTagIcon: true,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: 'icon-list',
                title: 'icon 列表展示',
                isCache: true,
                content: '(有缓存)',
                iconName: 'img:logo.png',
                showTagIcon: true,
                number: 20,
            },
            {
                path: '/main/new-tag-page/search-new-page12?name=asdasd',
                title: '新标签页，带路由参数',
                iconName: 'svg:test-1.svg',
                showTagIcon: true,
            },
            {
                title: '文档',
                iconName: 'svg:friendship.svg',
                isLink: true,
                path: 'https://github.com/CloudDong0125/Pet-social-Web/blob/main/README.md',
            },
        ];
        return Promise.resolve({
            msg: '操作成功',
            code: 200,
            data: menuList,
        });
    },
};

export default allApi;
