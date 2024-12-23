<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="model.username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="model.password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;
const router = useRouter();


const model = ref({
  username: '',
  password: '',
});


const login = async () => {
  // 接口请求
  const res = await $http.post("login", model.value);
  console.log(res.data);
  localStorage.token = res.data.token; // 浏览器的存储，设置token
  // sessionStorage.token = res.data.token; // 浏览器的不存储
  // router.push("/Main"); // 跳转页面

  ElMessage({
    showClose: true,
    message: '登录成功',
    type: 'success',
  })
  return;
};
const logout = async () => {
  await authStore.logout();
  window.location.href = '../login/LoginPage.vue';
};


</script>