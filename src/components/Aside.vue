<script setup>
import {
    ref
} from 'vue'

const settings = defineProps({
    collapse: Boolean,
    width: String
})

const iconColor = ref('color:#F8FAFB')
</script>


<template>
    <el-aside :width="settings.width">
        <el-scrollbar>
            <el-menu :default-openeds="['1', '3']" :collapse="settings.collapse" active-text-color="#409EFF"
                text-color="#74767A" router="true" style="background-color:#f5f6fa">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <House />
                        </el-icon><span>首页</span>
                    </template>
                    <el-menu-item index="/src/views/HomeView.vue">首页</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">

                    <template #title>
                        <el-icon>
                            <Menu />
                        </el-icon><span>内容管理</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>分类</template>
                        <el-menu-item index="/categories/create">新建分类</el-menu-item>
                        <el-menu-item index="/categories/list">分类列表</el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <Message />
                        </el-icon><span>宠物管理</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>小宠</template>
                        <el-menu-item index="/items/create">新建小宠之星</el-menu-item>
                        <el-menu-item index="/items/list">小宠之星列表</el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                            <Files />
                        </el-icon><span>新闻管理</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>文章</template>
                        <el-menu-item index="/articles/create">新建文章</el-menu-item>
                        <el-menu-item index="/articles/list">文章列表</el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>
                <el-sub-menu index="5">
                    <template #title>
                        <el-icon>
                            <Watermelon />
                        </el-icon><span>运营管理</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>运营</template>
                        <el-menu-item index="/ads/create">新建广告位</el-menu-item>
                        <el-menu-item index="/ads/list">广告位列表</el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>
                <el-sub-menu index="6">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon><span>管理员和用户</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>用户</template>
                        <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
                        <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
                        <el-menu-item index="/admin_users/userlist">用户列表</el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>
                <el-sub-menu index="7">
                    <template #title>
                        <el-icon>
                            <Setting />
                        </el-icon><span>系统设置</span>
                    </template>
                    <el-menu-item index="/admin/settings">系统设置</el-menu-item>
                </el-sub-menu>
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
