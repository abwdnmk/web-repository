<template>
  <div class="page">
    <!-- 导航 -->
    <div class="nav">
      <router-link :to="{ name: 'CompanyHome' }" class="nav-item" active-class="nav-item--active">首页</router-link>
      <router-link :to="{ name: 'CompanyItem' }" class="nav-item" active-class="nav-item--active">项目</router-link>
      <router-link :to="{ name: 'CompanyEmployee' }" class="nav-item" active-class="nav-item--active">员工</router-link>
      <router-link :to="{ name: 'CompanyFirm' }" class="nav-item" active-class="nav-item--active">公司</router-link>
    </div>

    <!-- 内容 -->
    <!-- 路由出口 -->
    <div class="content">
      <router-view></router-view>
    </div>

    <!-- 页脚 -->
    <div class="footer">@2023公司管理系统 - 版权所有</div>
  </div>
</template>

<script setup>

</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.nav {
  display: flex;
  gap: 1px;
  background-color: #f5f5f5;
  height: 80px;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #87CEEB;
}

.nav-item {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  text-decoration: none;
  color: #8b8c8f;
  font-size: 20px;
  transition: all 0.3s ease;
  margin: 0 80px;
}

.nav-item:hover {
  background-color: #e9e9e9;
}

.nav-item--active {
  color: #266aff;
  font-weight: 500;
  position: relative;
}

.nav-item--active::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: #1890ff;
  border-radius: 2px 2px 0 0;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0 auto;
}

.content {
  flex: 1;
  padding: 0px;
  background-color: #e9f4ff;
  height: calc(100vh - 130px);
}

.footer {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  height: 50px;
  color: #999;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
