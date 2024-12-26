<template>
  <div id="app">
    <!-- // transition标签是Vue内置动画标签，负责在插入、更新、移除DOM元素时，给元素添加样式【包裹要插入动画的div】 -->
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
#app,
html {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  box-sizing: inherit;
  border: 0 solid;
}

*,
:after,
:before {
  box-sizing: inherit;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* // 动画样式类名
Vue2
进入： .v-enter 始状态、 v-enter-to 末状态、 .v-enter-active 进入动画
离开：.v-leave 始状态、v-leave-to 末状态、.v-leave-active 离开动画
 
Vue3
进入：.v-enter-from 始状态、.v-enter-to 末状态、.v-enter-active 进入动画
离开：.v-leave-from 始状态、.v-leave-to 末状态、.v-leave-active 离开动画
 
// mode属性
mode="out-in" 先离开后进入
mode="in-out" 先进入后离开 */
</style>
