<script setup>
import {
  ref,
  defineComponent,
  h,
  reactive,
  watch,
  toRef,
  computed,
  onMounted,
  onUnmounted,
} from "vue";

// 组件注册
import Header from "@/components/Header.vue";

import Aside from "@/components/Aside.vue";
import Navbar from "@/components/Navbar.vue";
import TagList from "@/components/TagList.vue";
import img_1 from "@/assets/logo.jpeg";
import img_2 from "@/assets/logo.png";
const dataContainer = reactive({
  img: {
    img_logo:img_2,
  },
  showMenu: "true", //是否显示目录
  userInfo: {
    name: "admin",
    avatar: img_1,
  },
});

/** 切换目录展示 */
function switchShowMenu(state) {
  console.log(state, "/** 切换目录展示 */");
}
const otherDataContainer = {
  baseCountdown: 3,
  countdown: 0, //控制按钮显示的倒计时
  timer: null,
};

const asideSettings = ref({
  isCollapse: false,
  width: "200",
});

// 给子组件绑定事件，通过子组件emit从而改变父组件的值
const changeAside = () => {
  asideSettings.value.isCollapse = !asideSettings.value.isCollapse;
  if (asideSettings.value.isCollapse) {
    asideSettings.value.width = "60";
  } else {
    asideSettings.value.width = "200";
  }
};

/**
 * 需要缓存的页面列表
 * 根据标签列表来的，需要改的话只需要处理标签列表
 *  */
const cacheTagList = computed(() => {
  return dataContainer.tagList
    .filter((item) => {
      return item.isCache;
    })
    .map((item) => {
      /** 缓存组件是根据path命名来缓存的 */
      return item.path;
    });
});
/** 当前活动的标签 */
const activeTag = computed(() => {
  let tag = dataContainer.tagList.find(
    (item) => item.sign == dataContainer.activeSign
  );
  return tag || {};
});
</script>
<template>
  <div
    :class="{
      'main-layout': true,
    }"
  >
    <div class="head-container">
      <div
        :class="{
          left: true,
          hidden: !dataContainer.showMenu,
        }"
      >
        <el-image
          @click="toPath({ path: '/' })"
          class="logo"
          :src="dataContainer.img.img_logo"
          fit="cover"
        />
        <div class="name">PetSocial管理</div>
      </div>
      <div class="right">
        <Navbar
          :showLogo="dataContainer.showMenu"
          @switchShowLogo="changeAside"
          :userInfo="dataContainer.userInfo"
          :breadcrumbList="dataContainer.breadcrumbList"
        ></Navbar>
      </div>
    </div>

    <div class="content-container">
      <div
        :class="{
          left: true,
          hidden: !dataContainer.showMenu,
        }"
        class="left"
      >
        <!-- 侧边栏 -->
        <Aside
          :collapse="asideSettings.isCollapse"
          :width="asideSettings.width"
        ></Aside>
      </div>
      <div class="right">
        <div class="top">
          <TagList
            :tagList="dataContainer.tagList"
            :activeSign="dataContainer.activeSign"
            @toPath="toPath"
            @closeTag="closeTag"
            @changeActiveTag="changeActiveTag"
          ></TagList>
        </div>
        
      </div>
     
    </div>
  </div>
 
</template>



<style scoped>
body {
  background-color: #eee;
  /* max-width: 100vw; */
  overflow: hidden;
}

.el-main {
  /* width: 100%; */
  padding: 0;
  height: 100vh;
  overflow-x: hidden;
}
.logo {
  width: 45px;
  height: 45px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}
</style>

<style scoped lang="scss">
.main-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
  z-index: 9;
  /** 内容页面全屏展示 */
  &.is-view-full-screen {
    > .head-container {
      z-index: 1;
      display: none;
    }
    > .content-container {
      z-index: 2;
      position: initial;
      > .left {
        z-index: 2;
        display: none;
      }
      > .right {
        z-index: 3;
        position: initial;
        > .top {
          display: none;
        }
        > .view-container {
          z-index: 4;
          position: absolute;
          top: 0;
          left: 0;
          flex: initial;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  > .head-container {
    width: 100%;
    background-color: white;
    height: var(--navbar-height);
    // border-bottom: 1px solid rgb(218, 218, 218);
    box-sizing: border-box;
    position: relative;
    z-index: 9;
    display: flex;
    flex-direction: row;
    > .left {
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
        > .name {
          font-size: 0;
        }
      }
      > .logo {
        // flex:1 1 0;
        width: 45px;
        height: 45px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
      }
      > .name {
        width: max-content;
        font-size: 22px;
        font-weight: bold;
        transition: all 0.2s;
        font-family: cursive;
      }
    }
    > .right {
      flex: 1 1 0;
      width: 0;
      height: 100%;
      // border-bottom: 1px solid var(--border-color);
      box-sizing: border-box;
    }
  }
  > .content-container {
    flex: 1 1 0;
    height: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    z-index: 8;
    > .left {
      width: var(--menu-width);
      height: 100%;
      overflow-y: auto;
      // border-right: 1px solid rgb(218, 218, 218);
      box-sizing: border-box;
      position: relative;
      z-index: 9;
      // box-shadow: 0 0 5px rgba(0, 0, 0, 0.177);
      // // background-color: #153451;
      transition: width 0.2s;
      overflow: hidden;
      &.hidden {
        width: 0;
        // display: none;
        pointer-events: none;
      }
    }
    > .right {
      flex: 1 1 0;
      width: 0;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 8;
      overflow: hidden;
      > .top {
        height: var(--tags-height);
        width: 100%;
        // border-bottom: 1px solid rgb(218, 218, 218);
        box-sizing: border-box;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.177);
        position: relative;
        z-index: 2;
      }
      > .view-container {
        flex: 1 1 0;
        height: 0;
        width: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
        background-color: #f1f1f1;
        > .iframe-view {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          > iframe {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
          }
        }
        > .option-bt-list {
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
          > .container {
            width: auto;
            border-radius: 3px;
            background-color: rgb(255, 255, 255);
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            box-sizing: border-box;
            box-shadow: rgba(0, 0, 0, 0.476) 0px 1px 3px;
            > * {
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
</style>
