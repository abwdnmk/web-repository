<template>
  <div class="content">
    <div class="header">
      <h1>条例详情管理</h1>

      <div class="header-right">
        <el-select
          v-model="value"
          clearable
          filterable
          placeholder="所有项目"
          style="width: 140px"
          class="select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 新建条例按钮 -->
        <el-button type="primary" icon="Plus" @click="addProject" class="add">
          新建条例
        </el-button>
      </div>

      <!-- 新建项目 -->
      <el-dialog v-model="dialogVisible" title="添加新员工" width="400px">
        <template #title>
          <span style="font-size: 24px; font-weight: bold">添加新员工</span>
        </template>
        <hr />
        <div style="text-align: center">
          <el-form label-position="top" style="margin-top: 20px">
            <el-form-item label="员工工号">
              <el-input placeholder="请输入员工工号"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input placeholder="请输入员工姓名"></el-input>
            </el-form-item>
            <el-form-item label="入职时间">
              <el-date-picker
                v-model="hireDate"
                type="date"
                placeholder="选择入职日期"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item>
              <el-checkbox>是否离职</el-checkbox>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddProject">保 存</el-button>
        </template>
      </el-dialog>
    </div>

    <p>管理项目相关的收支条例记录</p>

    <!-- 条例列表 -->
    <div class="list">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ color: '#000000', background: '#F7F7F9' }"
      >
        <el-table-column
          prop="belongingProject"
          label="所属项目"
          width="auto"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="regulationsName"
          label="条例名称"
          width="auto"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="recordPerson"
          label="记录人"
          width="auto"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="type"
          label="类型"
          width="auto"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="amount"
          label="金额"
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
            ></el-button>
            <el-button
              type="danger"
              icon="Delete"
              @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="taxRate"
          label="税率"
          width="auto"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="taxAmount"
          label="税金"
          width="auto"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="recordTime"
          label="记录时间"
          width="auto"
          align="center"
          header-align="center"
        />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

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

// 模拟条例数据
const tableData = [
  {
    belongingProject: "项目A",
    regulationsName: "条例1",
    recordPerson: "张三",
    type: "收入",
    amount: 10000,
    taxRate: "10%",
    taxAmount: 1000,
    recordTime: "2023-10-01 10:00",
  },
  {
    belongingProject: "项目B",
    regulationsName: "条例2",
    recordPerson: "李四",
    type: "支出",
    amount: 5000,
    taxRate: "5%",
    taxAmount: 250,
    recordTime: "2023-10-02 11:00",
  },
];

// 选择项目
const value = ref("");
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];

// 详情按钮
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

.header-right {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: auto;
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
