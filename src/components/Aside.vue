<script setup>
import MenuItem from "./MenuItem.vue"
import {
    ref,reactive
} from 'vue'


const settings = defineProps({
    collapse: Boolean,
    width: String
})

const iconColor = ref('color:#F8FAFB')
const dataContainer = reactive({
  dataList: [
    {
      path: "/main/index",
      title: "首页",
      iconName: "home",
    },
    {
      title: "内容管理",
      iconName: "menu",
      childs: [
        {
          path: "/categories/create",
          title: "新建分类",
        },
        {
          path: "/categories/list",
          title: "分类列表",
        },
      ],
    },
    {
      title: "宠物管理",
      iconName: "menu",
      childs: [
        {
          path: "/items/create",
          title: "新建小宠之星",
        },
        {
          path: "/items/list",
          title: "小宠之星列表",
        },
      ],
    },
    {
      title: "新闻管理",
      iconName: "menu",
      childs: [
        {
          path: "/articles/create",
          title: "新建文章",
        },
        {
          path: "/articles/list",
          title: "文章列表",
        },
      ],
    },
    {
      title: "运营管理",
      iconName: "menu",
      childs: [
        {
          path: "/ads/create",
          title: "新建广告位",
        },
        {
          path: "/ads/list",
          title: "广告位列表",
        },
      ],
    },
    {
      title: "管理员和用户",
      iconName: "menu",
      childs: [
        {
          path: "/admin_users/create",
          title: "新建管理员",
        },
        {
          path: "/admin_users/list",
          title: "管理员列表",
        },
        {
          path: "/admin_users/userlist",
          title: "用户列表",
        },
      ],
    },
    {
      title: "系统设置",
      iconName: "menu",
      childs: [
        {
          path: "/admin/settings",
          title: "系统设置",
        },
      ],
    },
  ],
});
</script>


<template>
    <el-aside :width="settings.width">
        <el-scrollbar>
            <el-menu
        class="menu-container"
        ref="ElMenuRef"
        :collapse="false"
        :router="false"
    >
        <MenuItem
            v-for="(item, index) in dataContainer.dataList"
            :key="item.path"
            :dataInfo="item"
        ></MenuItem>
    </el-menu>

        </el-scrollbar> 
    </el-aside>
</template>


<style scoped>
.el-aside {

    height: 100vh;
    overflow: hidden;
    box-shadow: var(--el-box-shadow-lighter);
}

.el-scrollbar {

    height: 100vh;
    overflow: hidden;

}

.el-menu {


    border-right: none;
}
</style>
