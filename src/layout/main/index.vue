<script setup>
import {
  defineComponent,
  reactive,
  toRef,
  ref,
  computed,
  onMounted,
  watch,
  getCurrentInstance,
} from "vue";
import Navbar from "@/components/Navbar.vue";
import Menu from "./components/Menu.vue";
import TagList from "./components/tagList.vue";
import img_1 from "@/assets/logo.jpeg";
import img_2 from "@/assets/logo.png";
import userApi from "@/http/user.js";
import { useRouter, useRoute } from "vue-router";

const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;
// Bug fix: Change 'const' to 'let'
let menuList = toRef([]);
const route = useRoute();
console.log(route, "route");
const routeIncetance = route;
async function userApiData() {
  // 本地接口请求
  // const res = await $http.get('rest/routers');
  // console.log(res)
  // menuList.value = await userApi
  //     .getMenuList()
  //     .then((res) => {
  //         // Bug fix: 将 console.log 语句放在 then 块中
  //         console.log('获取用户目录成功1', JSON.stringify(res.data));
  //         return res.data || {};
  //     })
  //     .catch(() => {
  //         return [];
  //     });

  // 线上接口请求
  menuList.value = await $http
    .get("rest/routers")
    .then((res) => {
      // Bug fix: 将 console.log 语句放在 then 块中
      console.log("获取用户目录成功1", res.data.data);
      return res.data.data || {};
    })
    .catch(() => {
      return [];
    });
}

// 生成数组数据
const breadcrumbData = ref([]);

const getBreadcrumbData = () => {

  // breadcrumbData.value = route.matched.filter((item) => {
  //   console.log(item)
  //   return item.meta && item.meta.name;
  // })
  const filteredMatched = route.matched.filter(
    (item) => item.path !== "/layout"
  );
  breadcrumbData.value = filteredMatched.map((item) => ({
    ...item,
    path: item.path,
    title: item.meta.title,
  }));
  console.log(breadcrumbData.value, "breadcrumbData");
};
// 监听路由发生改变时触发
watch(
  route,
  () => {
    getBreadcrumbData();
  },
  {
    immediate: true,
  }
);
// 处理点击事件
const onLinkClick = (item) => {
  router.push(item.path);
};

// Bug fix: 添加对 userApiData 函数的调用
onMounted(() => {
  userApiData();
});

// Bug fix: 使用 watch 监听 menuList 的变化
watch(menuList, (newValue) => {
  // console.log('获取用户目录成功2', newValue);
  dataContainer.dataList = newValue;
});

const dataContainer = reactive({
  img: {
    img_logo: img_2,
  },
  showMenu: "true", //是否显示目录
  userInfo: {
    name: "admin",
    avatar: img_1,
  },

  dataList: [],
});

const routes = computed(() => {
  return route.matched;
});

const perRouterName = computed(() => {
  return routeIncetance.name;
});
</script>

<template>
  <div class="main-layout full-screen">
    <div class="head-container">
      <div class="left">
        <el-image @click="toPath({ path: '/' })" class="logo" :src="dataContainer.img.img_logo" fit="cover" />
        <div class="name">PetSocial管理</div>
      </div>
      <div class="right">
        <Navbar :perRouterName="perRouterName"></Navbar>
        <div class="top">
          <!-- <TagList :routes="routes" :active-title="options.defaultActive"></TagList> -->
          <!-- <div class="breadcrumb_container">
            <el-breadcrumb class="breadcrumb" separator="/">
              <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">

                  <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
                    {{ item.name }}
                  </span>

                  <a v-else class="redirect" @click.prevent="onLinkClick(item)">
                    {{ item.name }}
                  </a>
                </el-breadcrumb-item>
              </transition-group>
            </el-breadcrumb>
          </div> -->

        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="left">
        <Menu v-if="dataContainer.dataList.length > 0" :dataList="dataContainer.dataList"></Menu>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
  z-index: 9;

  >.head-container {
    width: 100%;
    background-color: white;
    box-sizing: border-box;
    position: relative;
    z-index: 9;
    display: flex;
    flex-direction: row;

    >.left {
      width: var(--menu-width);
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      transition: all 0.2s;
      overflow: hidden;

      // border-bottom: 1px solid rgba(0, 0, 0, 0.435);
      &.hidden {
        width: 0;
        padding: 0;
        // display: none;
        pointer-events: none;

        >.name {
          font-size: 0;
        }
      }

      >.logo {
        // flex:1 1 0;
        width: 45px;
        height: 45px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
      }

      >.name {
        width: max-content;
        font-size: 22px;
        font-weight: bold;
        transition: all 0.2s;
        font-family: cursive;
      }
    }

    >.right {
      flex: 1 1 0;
      width: 0;
      height: 100%;
      box-sizing: border-box;
    }
  }

  >.content-container {
    flex: 1 1 0;
    height: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    z-index: 8;

    >.left {
      width: var(--menu-width);
      height: 100%;
      overflow-y: auto;
      // border-right: 1px solid rgb(218, 218, 218);
      box-sizing: border-box;
      position: relative;
      z-index: 9;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.177);
      background-color: var(--bg-color-2);
      transition: width 0.2s;
      overflow: auto;

      &.hidden {
        width: 0;
        // display: none;
        pointer-events: none;
      }
    }

    >.right {
      flex: 1 1 0;
      width: 0;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 8;
      overflow: hidden;
      background-color: var(--bg-color-3);

      >.top {
        height: var(--tags-height);
        width: 100%;
        // border-bottom: 1px solid rgb(218, 218, 218);
        box-sizing: border-box;
        box-shadow: 0 0 5px #242425;
        position: relative;
        z-index: 2;
      }

      >.view-container {
        flex: 1 1 0;
        height: 0;
        width: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
        background-color: #f1f1f1;

        >.iframe-view {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;

          >iframe {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
          }
        }

        >.option-bt-list {
          position: absolute;
          top: 5px;
          left: 0;
          width: 100%;
          opacity: 0;
          pointer-events: none;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s;
          z-index: 999;

          &.show {
            opacity: 1;
            pointer-events: initial;
          }

          >.container {
            width: auto;
            border-radius: 3px;
            background-color: rgb(255, 255, 255);
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            box-sizing: border-box;
            box-shadow: rgba(0, 0, 0, 0.476) 0px 1px 3px;

            >* {
              margin-right: 5px;
              cursor: pointer;
              border-radius: 3px;
              box-shadow: inset 0 1px 4px #0000001f;
              padding: 7px;
              color: #444954;

              &:last-child {
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
}

.breadcrumb_container {
  height: 20px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  background-color: white;
  font-weight: bolder;

}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

​ .breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

​ .breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb {
  font-size: 16px;
  // margin: 10px 0;
  padding: 0 20px;
  color: #333;
}

.breadcrumb-item {
  font-size: 16px;
  color: #333;
}

.breadcrumb-item:last-child {
  color: #666;
}

.breadcrumb-item .redirect {
  color: #666;
  cursor: pointer;
}

.breadcrumb-item.no-redirect {
  color: #999;
}
</style>
