<template>
  <div class="content">
    <div class="header">
      <h1>公司列表</h1>

      <!-- 添加公司按钮 -->
      <el-button type="primary" icon="Plus" @click="addFirm" class="add">
        添加公司
      </el-button>

      <!-- 添加公司 -->
      <el-dialog v-model="dialogVisible" title="添加新公司" width="400px">
        <template #title>
          <span style="font-size: 24px; font-weight: bold">添加公司</span>
        </template>
        <hr />
        <div style="text-align: center">
          <el-form label-position="top" style="margin-top: 20px">
            <el-form-item label="公司名称">
              <el-input placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="管理员">
              <el-input placeholder="请输入管理员"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="hireDate"
                type="date"
                placeholder="选择创建日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddFirm">保 存</el-button>
        </template>
      </el-dialog>
    </div>

    <p>管理和查看公司所有公司及管理员信息</p>

    <!-- 公司列表 -->
    <div class="list">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ color: '#000000', background: '#F7F7F9' }"
      >
        <el-table-column
          prop="serialNumber"
          label="序号"
          width="100"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="companyName"
          label="公司名称"
          width="auto"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="adminInfo"
          label="管理员"
          width="auto"
          align="center"
          header-align="center"
        >
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <div style="margin-right: 20px">
                <el-icon style="font-size: 24px"><User /></el-icon>
              </div>
              <div style="text-align: left; line-height: 1.5">
                <div>{{ scope.row.adminInfo.chineseName }}</div>
                <div>{{ scope.row.adminInfo.email }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="creationTime"
          label="创建时间"
          width="auto"
          align="center"
          header-align="center"
        />
        <el-table-column
          label="操作"
          width="auto"
          align="center"
          header-align="center"
        >
          <template #default="scope">
            <el-button
              type="primary"
              icon="Edit"
              @click="handleEdit(scope.row)"
            />
            <el-button
              type="danger"
              icon="Delete"
              @click="handleDelete(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 弹出添加公司表单
const dialogVisible = ref(false);
// 入职时间
const hireDate = ref("");

// 添加公司按钮
function addFirm() {
  dialogVisible.value = true;
}

// 保存按钮
function handleAddFirm() {
  // 这里可以添加表单校验和提交逻辑
  dialogVisible.value = false;
}

// 模拟管理员数据
const tableData = [
  {
    serialNumber: 1,
    companyName: "字节跳动",
    adminInfo: {
      chineseName: "张三",
      email: "zhangsan.@example.com",
    },
    creationTime: "2023-01-15",
  },
  {
    serialNumber: 2,
    companyName: "阿里巴巴",
    adminInfo: {
      chineseName: "李四",
      email: "lisi.@example.com",
    },
    creationTime: "2023-02-20",
  },
  {
    serialNumber: 3,
    companyName: "腾讯",
    adminInfo: {
      chineseName: "王五",
      email: "wangwu.@example.com",
    },
    creationTime: "2023-03-10",
  },
  {
    serialNumber: 4,
    companyName: "百度",
    adminInfo: {
      chineseName: "赵六",
      email: "zhaoliu.@example.com",
    },
    creationTime: "2023-04-05",
  },
  {
    serialNumber: 5,
    companyName: "华为",
    adminInfo: {
      chineseName: "孙七",
      email: "sunqi.@example.com",
    },
    creationTime: "2023-05-12",
  },
  {
    serialNumber: 6,
    companyName: "小米",
    adminInfo: {
      chineseName: "周八",
      email: "zhouba.@example.com",
    },
    creationTime: "2023-06-18",
  },
];

// 编辑按钮
function handleEdit(row) {
  console.log("编辑", row);
}

// 删除按钮
function handleDelete(row) {
  console.log("删除", row);
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
  padding: 0 100px 20px 100px;
  box-sizing: border-box;
  margin: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.add {
  width: 140px;
  height: 60px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  padding: 0;
  margin: 0;
}

.list {
  display: flex;
  border: 1px solid #ccc;
  padding: 0px;
  border-radius: 32px;
  background-color: #f9f9f9;
  margin: 0px 0 100px 0;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
  min-height: 0;
  max-height: calc(100vh - 240px);
}

h1 {
  font-size: 50px;
  margin: 0;
}

p {
  margin: 0 0 40px 0;
}

::v-deep .el-table {
  flex: 1;
  width: 100%;
}

::v-deep .el-table__header tr,
::v-deep .el-table__row {
  height: 60px;
}

::v-deep .el-table__body-wrapper {
  overflow-y: auto;
  max-height: calc(100% - 60px);
}
</style>
