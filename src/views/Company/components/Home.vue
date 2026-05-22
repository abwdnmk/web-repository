<template>
    <div class="home-page">
        <h1 style="font-size: 80px;">欢迎来到财务系统</h1>
    </div>
    <div style="width: 100%; height: 10%;display: flex;justify-content: center;">
        <el-button type="primary" size="large" @click="returnHome()">返回首页</el-button>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const returnHome = () => {
    router.push({ path: '/' })
}
</script>

<style>
.home-page {
    height: 80%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>