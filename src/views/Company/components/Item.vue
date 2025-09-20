<template>
  <div class="content">
    <div class="header">
      <h1>项目立项管理</h1>

      <!-- 新建项目按钮 -->
      <el-button type="primary" icon="Plus" @click="addProject" class="add">
        新建项目
      </el-button>

      <!-- 新建项目 -->
      <el-dialog v-model="dialogVisible" title="添加新项目" width="400px">
        <template #title>
          <span style="font-size: 24px; font-weight: bold">添加新项目</span>
        </template>
        <hr />
        <div style="text-align: center">
          <el-form label-position="top" style="margin-top: 20px">
            <el-form-item label="项目ID">
              <el-input placeholder="请输入项目ID"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="hireDate" type="date" placeholder="选择创建日期" style="width: 100%" />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddProject">保 存</el-button>
        </template>
      </el-dialog>
    </div>

    <p>管理所有项目，包括创建、查看和删除操作</p>

    <!-- 项目列表 -->
    <div class="list">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{ color: '#000000', background: '#F7F7F9' }">
        <el-table-column prop="projectId" label="项目ID" width="auto" align="center" header-align="center" />
        <el-table-column prop="projectName" label="项目名称" width="auto" align="center" header-align="center" />
        <el-table-column prop="creator" label="创建人" width="auto" align="center" header-align="center" />
        <el-table-column prop="belongedCompany" label="所属公司" width="auto" align="center" header-align="center" />
        <el-table-column prop="creationTime" label="创建时间" width="auto" align="center" header-align="center" />
        <el-table-column label="操作" width="auto" align="center" header-align="center">
          <template #default="scope">
            <el-button type="primary" icon="Edit" @click="handleEdit(scope.row)"></el-button>
            <el-button type="danger" icon="Delete" @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
// 弹出添加员工表单
const dialogVisible = ref(false);
// 入职时间
const hireDate = ref("");

// 添加员工按钮
function addProject() {
  dialogVisible.value = true;
}

// 保存按钮
function handleAddProject() {
  // 这里可以添加表单校验和提交逻辑
  dialogVisible.value = false;
}

// 模拟项目数据
const tableData = [
  {
    projectId: "P001",
    projectName: "项目A",
    creator: "张三",
    belongedCompany: "公司X",
    creationTime: "2023-01-15",
  },
  {
    projectId: "P002",
    projectName: "项目B",
    creator: "李四",
    belongedCompany: "公司Y",
    creationTime: "2023-02-20",
  },
  {
    projectId: "P003",
    projectName: "项目C",
    creator: "王五",
    belongedCompany: "公司Z",
    creationTime: "2023-03-10",
  },
];

// 详情按钮
function handleEdit(row) {
  console.log("编辑", row);
  router.push({ name: "CompanyRegulations" });
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
  margin: 0 0 100px 0;
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
