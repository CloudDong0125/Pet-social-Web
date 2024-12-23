// userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
    schoolInfo:null
  }),
  actions: {
    // 登录操作，更新用户信息和 token
    login(userData, token,schoolInfo) {
      this.user = userData;
      this.token = token;
      this.schoolInfo = schoolInfo
    },
    // 登出操作，清除用户信息和 token
    logout() {
      this.user = null;
      this.token = null;
      this.schoolInfo = null;
    },
    // 检查用户是否登录
    isLoggedIn() {
      return this.user!== null && this.token!== null;
    },
  },
  getters: {
    // 获取用户信息的 getter
    getUser: (state) => state.user,
    // 获取 token 的 getter
    getToken: (state) => state.token,
  },
});
