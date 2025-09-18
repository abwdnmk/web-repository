<template>
  <section class="login-section">
    <div class="box">
      <!-- 装饰性方块元素 -->
      <div class="square" :style="`--i:${i}`" v-for="i in 6" :key="i"></div>
      <h1 style="text-align: center;font-size: 30px;">企业财务管理系统</h1>
      <div class="container">
        <el-form :model="form" :rules="rules" ref="ruleFormref" label-width="120px" label-position="top" size="large"
          class="login-form">
          <h1>用户登录</h1>

          <el-form-item label="用户名：" prop="account">
            <el-input v-model="form.account" placeholder="请输入用户名" class="custom-input" />
          </el-form-item>

          <el-form-item label="密码：" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password class="custom-input" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit(ruleFormref)" class="login-button">
              登录
            </el-button>
          </el-form-item>

          <div class="copyright">
            @2025企业财务管理系统版权 @All Rights Reserves
          </div>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
// import { loginAPI } from '@/apis/user'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  account: "",
  password: ""
})

const rules = ref({
  account: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度需在3-20之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度需在6-20之间', trigger: 'blur' }
  ]
})

//用于表单的全部验证
const ruleFormref = ref(null)

//登录按钮
const onSubmit = () => {
  ruleFormref.value.validate(async (valid) => {
    console.log(valid)
    if (valid) {
      const ress = await userStore.getUserInfo(form)
      console.log("后端数据", ress)
      console.log("更新后的useinfo", userStore.userInfo)
      console.log("更新后的useinfo", userStore.userToken)
      if (ress.code === 200) {
        ElMessage({ type: 'success', message: '登录成功' })
        router.replace({ path: '/' })
      }
      else {
        ElMessage({ type: 'error', message: ress.msg })
      }
    }
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@700&display=swap');
@import "element-plus/dist/index.css";

/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  font-family: 'El Messiri', sans-serif;
}

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  /* 关键问题 */
  min-height: 97.8vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  overflow: hidden;
}

/* 背景渐变动画 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/* 装饰性方块容器 */
.box {
  position: relative;
}

/* 装饰性方块样式 */
.square {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  animation: square 10s linear infinite;
  animation-delay: calc(-1s * var(--i));
}

/* 方块动画 */
@keyframes square {

  0%,
  100% {
    transform: translateY(-20px);
  }

  50% {
    transform: translateY(20px);
  }
}

/* 各个方块的位置和大小 */
.square:nth-child(1) {
  width: 100px;
  height: 100px;
  top: -15px;
  right: -45px;
}

.square:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 105px;
  left: -125px;
  z-index: 2;
}

.square:nth-child(3) {
  width: 60px;
  height: 60px;
  bottom: 85px;
  right: -45px;
  z-index: 2;
}

.square:nth-child(4) {
  width: 50px;
  height: 50px;
  bottom: 35px;
  left: -95px;
}

.square:nth-child(5) {
  width: 50px;
  height: 50px;
  top: -15px;
  left: -25px;
}

.square:nth-child(6) {
  width: 85px;
  height: 85px;
  top: 165px;
  right: -155px;
  z-index: 2;
}

/* 容器样式 */
.container {
  position: relative;
  padding: 50px;
  width: 350px;
  min-height: 420px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.container::after {
  content: '';
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border-radius: 5px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 2%);
}

/* 表单样式 */
.login-form {
  width: 100%;
  position: relative;
  z-index: 10;
}

.login-form h1 {
  color: #fff;
  letter-spacing: 2px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
}

/* 自定义输入框样式 */
.custom-input .el-input__wrapper {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 15px !important;
  box-shadow: none !important;
}

.custom-input .el-input__input {
  color: #fff !important;
}

.custom-input .el-input__placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

.custom-input .el-icon {
  color: #fff !important;
}

/* 表单标签样式 */
.el-form-item__label {
  color: #fff !important;
  font-size: 16px !important;
  padding-bottom: 8px !important;
}

/* 登录按钮样式 */
.login-button {
  width: 100%;
  background: #fff !important;
  color: #111 !important;
  border-radius: 15px !important;
  padding: 10px 0 !important;
  letter-spacing: 1px !important;
  transition: 0.5s !important;
  border: none !important;
}

.login-button:hover {
  background: linear-gradient(115deg, rgba(0, 0, 0, 0.10), rgba(255, 255, 255, 0.25)) !important;
  color: #fff !important;
}

/* 忘记密码链接 */
.forgot-password {
  text-align: right;
  margin-top: -20px;
  cursor: pointer;
  padding: 10px;
  color: #fff !important;
  transition: 0.3s;
}

.forgot-password:hover {
  color: #cce5ff !important;
  text-decoration: underline;
}

/* 版权信息 */
.copyright {
  font-size: 12px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 30px;
}

/* 表单验证错误提示 */
.el-form-item__error {
  color: #ff4d4f !important;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
