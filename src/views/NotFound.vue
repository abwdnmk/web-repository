<template>
  <div class="notfound">
    <div class="notfound-box">
      <h1 style="text-align: center;font-size: 100px;">404</h1>
      <p style="text-align: center;font-size: 60px;">页面不存在</p>
      <div style="text-align: center;">
        <router-link :to="{ name: 'Home' }" class="router-class">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>
.notfound {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notfound-box {
  height: 60%;
  width: 60%;
}

.router-class {
  font-size: 40px;
}

.router-class:hover{
  background-color: red;
}
</style>