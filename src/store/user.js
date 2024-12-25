/** 用户全局数据 */

import { defineStore } from 'pinia';
import allStorage from '@/action/storageManage';

export const userDataStore = defineStore('userDataStore', {
    state: () => {
        let userInfo = {};

        return {
            userInfo: userInfo || {}, //当前登录用户的基础数据
            userMenuConfigNameMap: [], //用户自定义的目录name配置（有该配置表示拥有该目录权限）
            userMenuConfigPathMap: [], //用户自定义的目录path配置（有该配置表示拥有该目录权限）
            userMenuList: [], //用于展示的菜单列表，结构树形化
            tagsMap: {}, // 页面标签MAP，layoutName为键名
            iframeList: [], //iframe 数组，iframe也属于标签，跟标签挂钩
        };
    },
    getters: {},
   
});
