<!-- 首页组件的导航栏的位置 -->

<template>
    <nav class="app-topnav">
        <div class="container">
            <div class="logo icon-text"><img src="@/assets/LayoutNav/account2.png" class="logo-img">企业管理系统</div>
            <ul>
                <!-- 多模版渲染 区分登录状态和非登录状态 是否有token-->
                <template v-if="userStore.userToken === '0'">
                    <li><a href=" javascript:;"><el-icon :size="20" style="margin-right: 10px;">
                                <User />
                            </el-icon> {{ userStore.userInfo.account }} </a></li>
                    <li>
                        <el-popconfirm @confirm='confirm' title="确认退出吗？" confirm-button-text="确认"
                            cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;"><el-icon :size="20" style="margin-right:10px;">
                                        <Right />
                                    </el-icon>退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                </template>
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { User, Right } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';

const userStore = useUserStore()
const router = useRouter()

const confirm = () => {
    ElMessage({ type: 'success', message: '退出成功' })
    userStore.clearUserInfo()
    router.replace({ path: '/' })
}
</script>

<style scoped>
.app-topnav {
    background-color: #E0F7FA;
    height: 15vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: #fff;
    height: 80px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    /* 调整内边距，左右都留空间 */
    padding: 0 40px;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.logo-img {
    width: 40px;
    height: auto;
    margin-right: 10px;
}

.icon-text {
    display: flex;
    align-items: center;
}

.icon-img {
    width: 20px;
    height: auto;
    margin-right: 10px;
}

/* 移除默认的列表样式并调整间距 */
ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 15px;
}

/* 可根据需要调整链接样式 */
a {
    text-decoration: none;
    color: #333;
    /* 改为更合理的字体颜色，贴近设计稿 */
    font-size: 20px;
    /* 按需调整字号 */
}

a:hover {
    color: #42b983;
    /* Vue的品牌色，可根据需要修改 */
}
</style>