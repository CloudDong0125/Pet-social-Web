<template>
  <div class="menu-item-container">
    <!-- 没有子目录的 -->
    <el-menu-item
      v-if="!dataInfo.childs || dataInfo.childs.length == 0"
      :index="dataInfo.path"
      :class="{
        'is-active': dataInfo.path == route.path,
      }"
      @click="handleClick(dataInfo)"
    >
      <!-- <linkItem :dataList="dataInfo"></linkItem> -->
      <div class="link-item-cp">
        <div class="top">
          <SvgIcon
            v-if="dataInfo.iconName"
            :style="'width: 17px;min-width:17px;height: 17px;'"
            :name="dataInfo.iconName"
          ></SvgIcon>
          {{ dataInfo.title }}
        </div>
        <div v-if="dataInfo.content" class="content">
          {{ dataInfo.content }}
        </div>
        <div v-if="dataInfo.number" class="sign">
          {{ dataInfo.number }}
        </div>
      </div>
    </el-menu-item>

    <!-- 有子目录且父节点不可点击 -->
    <el-sub-menu v-else :index="dataInfo.title">
      <template #title>
        <div class="link-item-cp">
          <div class="top">
            <SvgIcon
              v-if="dataInfo.iconName"
              :style="'width: 17px;min-width:17px;height: 17px;'"
              :name="dataInfo.iconName"
            ></SvgIcon>
            {{ dataInfo.title }}  <span v-if="dataInfo.content" class="content" style="color: #818c96;font-size: 10px;">{{ dataInfo.content }}</span>
          </div>
        
          <div v-if="dataInfo.number" class="sign">
            {{ dataInfo.number }}
          </div>
        </div>
      </template>
      <MenuItem
        v-for="(item, index) in dataInfo.childs"
        :key="item.path"
        :dataInfo="item"
      >
      </MenuItem>
    </el-sub-menu>
  </div>
</template>

<script>
/**
 * 左侧菜单组件
 */
import { defineComponent, reactive, toRef, watch } from "vue";
import SvgIcon from "@/components/svgIcon/index.vue";
import { useRouter, useRoute } from "vue-router";
import LinkItem from "./LinkItem.vue";

export default defineComponent({
  name: "MenuItem",
  components: {
    SvgIcon,
    LinkItem,
  },
  props: {
    /** 所显示的数据列表 */
    dataInfo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const dataContainer = reactive({
      dataInfo: toRef(props, "dataInfo"),
    });

    // Bug fix: 使用 watch 监听 props.dataInfo 的变化
    watch(
      () => props.dataInfo,
      (newValue) => {
        dataContainer.dataInfo.value = newValue;
      },
      { immediate: true }
    ); // 添加 immediate: true 以在初始渲染时执行一次

    // Bug fix: 使用 dataContainer.dataInfo.value 来访问 ref 对象的值
    // console.log(dataContainer.dataInfo.value, "11122");

    /** 跳转相应链接 */
    function handleClick(params) {
      console.log(params.path)
      if (!params.path) return;
      /** 如果是一个链接的话直接跳转 */
      if (params.isLink) {
        window.open(params.path);
      } else {
        router.push(params.path);
      }
    }
    return {
      dataContainer,
      handleClick,
      route,
    };
  },
});
</script>

<style scoped lang="scss">
.menu-item-container {
  height: fit-content;
  width: 100%;
}

.link-item-cp {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px 0px;
  box-sizing: border-box;
  min-height: var(--el-menu-item-height);
  > .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    > * {
      margin-right: 10px;
    }
  }
  > .content {
    width: 100%;
    font-size: 12px;
    opacity: 0.8;
    font-weight: 400 !important;
    text-align: left;
    padding: 0 0 0 calc(0px);
    box-sizing: border-box;
    margin-top: 2px;
    white-space: nowrap; /* 保持文本在一行内 */
    overflow: hidden; /* 隐藏溢出的内容 */
    text-overflow: ellipsis; /* 使用省略号表示溢出的内容 */
    color: #818c96;
  }
  > .sign {
    right: 0;
    position: absolute;
    width: fit-content;
    background-color: #ffe4e4;
    color: #f56c6c;
    border-radius: 999px;
    padding: 3px 8px;
    box-sizing: border-box;
    line-height: 1;
    font-size: 12px;
    margin: 0;
    font-weight: bold;
  }
}
</style>
