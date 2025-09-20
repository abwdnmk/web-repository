<!-- 首页组件的主要内容位置 -->

<template>
    <a href="http://localhost:5173/company/home">进入首页</a>
    <div class="company-selection-page">
        <div class="company-selection-container">
            <div class="page-title">请选择您要访问的公司</div>
            <div class="page-description">您有权限访问以下的公司管理系统,请选择您需要操作的公司进入系统</div>
            <div class="card-container">

                <el-row :gutter="40">
                    <!-- 循环渲染卡片 -->
                    <el-col :lg="8" v-for="(item, index) in cardList" :key="index" class="mb-6">

                        <el-card class="card-item">
                            <!-- 卡片图片 -->
                            <img :src="item.imgUrl" alt="卡片图片" class="card-img">

                            <!-- 卡片内容 -->
                            <div class="card-content">
                                <div>{{ item.title }}</div>
                            </div>
                        </el-card>

                    </el-col>
                </el-row>

            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import unit1 from '@/assets/LayoutMain/unit1.png'
import unit2 from '@/assets/LayoutMain/unit2.png'
import unit3 from '@/assets/LayoutMain/unit3.png'
import unit4 from '@/assets/LayoutMain/unit4.png'
import unit5 from '@/assets/LayoutMain/unit5.png'

// 卡片列表的声明
const cardList = ref([
    {
        title: '示例卡片1',
        imgUrl: unit1
    },
    {
        title: '示例卡片2',
        imgUrl: unit2
    },
    {
        title: '示例卡片3',
        imgUrl: unit3
    },
    {
        title: '示例卡片4',
        imgUrl: unit4
    },
    {
        title: '示例卡片5',
        imgUrl: unit5
    },
    {
        title: '示例卡片6',
        imgUrl: unit5
    },
    {
        title: '示例卡片7',
        imgUrl: unit5
    }

])
</script>

<style scoped>
.company-selection-page {
    background-color: #E0F7FA;
    min-height: 75vh;
    /* 用min-height代替height，避免内容溢出 */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* 顶部对齐，避免内容过少时居中显得奇怪 */
}

.company-selection-container {
    background-color: #E0F7FA;
    width: 95%;
    max-width: 1200px;
    /* 限制最大宽度，避免超宽屏幕问题 */
    padding: 30px;
    box-sizing: border-box;
    /* 确保padding不影响宽度计算 */
}

.page-title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
}

.page-description {
    font-size: 1.25rem;
    text-align: center;
}

.card-container {
    /* height: 55vh;
    width: 100%; */

    max-height: 55vh;
    /* 使用最大高度而非固定高度 */
    width: 100%;
    overflow-y: auto;
    /* 启用垂直滚动 */
    padding-right: 10px;
    /* 为滚动条预留空间，避免内容被遮挡 */
    box-sizing: border-box;
}

/* 自定义滚动条样式（可选） */
.card-container::-webkit-scrollbar {
    width: 8px;
}

.mb-6 {
    margin-bottom: 20px !important;
}

/* 卡片列表的样式 */
.card-item {
    height: 180px;
    /* 固定卡片总高度 */
    display: flex;
    /* 用 flex 布局让内容区自适应 */
    flex-direction: column;
    /* 垂直排列图片和内容 */

    /* 清除卡片图片与边框的默认边距 */
    --el-card-padding: 0;

    cursor: pointer;
    /* 添加指针样式，表示可点击 */
    transition: transform 0.2s, box-shadow 0.2s;
    /* 添加过渡效果 */
}

/* 卡片悬停效果（可选增强） */
.card-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 图片区域：固定高度（可选） */
.card-img {
    height: 90px;
    /* 固定图片高度 */
    width: 100%;
    /* 图片宽度撑满卡片 */
    object-fit: cover;
    /* 图片裁剪适配（避免拉伸） */
}

/* 内容区域：自适应剩余高度，溢出滚动 */
.card-content {
    flex: 1;
    /* 占满卡片剩余高度 */
    padding: 16px;
    /* 内边距（避免内容贴边） */
    overflow-y: auto;
    /* 内容超出时显示垂直滚动条 */
}
</style>