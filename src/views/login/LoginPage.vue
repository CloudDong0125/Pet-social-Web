<template>
  <div class="select-none">
    <img
      src="https://pure-admin.github.io/vue-pure-admin/static/png/bg-oEDCYcDF.png"
      class="wave"
    />
    <!-- <div class="flex-c absolute right-5 top-3"></div> -->
    <div class="login-container">
      <div
        class="img"
        src="http://localhost:8083/static/img/logo3.5040afec.png"
      ></div>
      <div class="login-box">
        <div class="login-form">
          <div>
            <h2 :class="{'outline-none': isTyping}">Pet Social</h2>
          </div>

          <transition name="fade">
            <el-form :model="model" v-show="isFormVisible">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    trigger: 'blur',
                  },
                ]"
                prop="username"
              >
                <el-input
                  class="custom-input"
                  v-model="model.username"
                  clearable
                  placeholder="请输入用户名"
                />
              </el-form-item>
              <el-form-item
                :rules="[
                  {
                    required: true,
                    trigger: 'blur',
                  },
                ]"
                prop="password"
              >
                <el-input
                  class="custom-input"
                  v-model="model.password"
                  clearable
                  placeholder="请输入密码"
                />
              </el-form-item>

              <el-form-item>
                <el-button style="width: 100%;height: 40px" type="primary" @click="onSubmit">Login</el-button>
              </el-form-item>
            </el-form>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const isTyping = ref(true);
const isFormVisible = ref(false); // 添加一个新的ref来控制表单的显示
const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;
const router = useRouter();

onMounted(() => {
  // 假设文字显示完成的时间为3.5秒
  isFormVisible.value = true; // 显示 文字｜表单
  setTimeout(() => {
    isTyping.value = false;
   
  }, 1500);
});

const model = ref({
  username: '',
  password: '',
});

const onSubmit = async () => {
  // 接口请求
  const res = await $http.post('login', model.value);
  console.log(res.data);
  localStorage.token = res.data.token; // 浏览器的存储，设置token
  // sessionStorage.token = res.data.token; // 浏览器的不存储
  router.push('../home'); // 跳转页面

  ElMessage({
    showClose: true,
    message: '登录成功',
    type: 'success',
  });
  return;
};

const logout = async () => {
  await authStore.logout();
  window.location.href = '../login/LoginPage.vue';
};
</script>

<style scoped>

img {
  height: auto;
  max-width: 100%;
}

.flex-c {
  align-items: center;
  display: flex;
}

.absolute {
  position: absolute;
}

.right-5 {
  right: 1.25rem;
}

.top-3 {
  top: 0.75rem;
}

.wave {
  bottom: 0;
  height: 100%;
  left: 0;
  position: fixed;
  width: 80%;
  z-index: -1;
}

.login-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
  max-width: 100%;
  width: 100vw;
  grid-gap: 18rem;
  padding: 0 2rem;
  box-sizing: border-box;
  overflow: hidden;
}

.img {
  align-items: center;
  display: flex;
  justify-content: flex-end;
}

.img img {
  width: 500px;
}

.login-box {
  align-items: center;
  display: flex;
  overflow: hidden;
  text-align: center;
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.login-form h2 {
  color: #999;
  font: 700 200% Consolas, Monaco, monospace;
  margin: 15px 0;
  text-transform: uppercase;
}

.login-form {
  width: 360px;
}

.custom-input {
  height: 40px !important;
}
/* 定义过渡效果的样式 */
.fade-enter-active {
  transition: all 0.5s ease;
  transform: translateY(100%);
}

.fade-enter-to {
  transform: translateY(0);
}

.fade-leave-active {
  transition: all 0.5s ease;
  transform: translateY(100%);
}

.fade-leave-to {
  transform: translateY(100%);
}


@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from, to {
    border-color: transparent; /* 光标消失 */
  }
  50% {
    border-color: orange; /* 光标显示 */
  }
}

.outline-none {
  overflow: hidden; /* 隐藏溢出的文字 */
  white-space: nowrap; /* 防止文字换行 */
  border-right: .15em solid orange; /* 光标效果 */
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
  animation-delay: 0s; /* 设置为0，与fade动画同时开始 */
}





</style>
