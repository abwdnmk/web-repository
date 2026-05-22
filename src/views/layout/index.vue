<!-- 企业管理系统 -->

<template>
    <LayoutNav></LayoutNav>
    <LayoutMain></LayoutMain>
    <router-view></router-view>  
    <LayoutFooter></LayoutFooter>
</template>

<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutMain from './components/LayoutMain.vue'
import LayoutFooter from './components/LayoutFooter.vue';

</script>

<style></style>