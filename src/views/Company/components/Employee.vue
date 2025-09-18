<template>
  <div class="content">
    <div class="header">
      <h1>员工列表</h1>

      <!-- 添加员工按钮 -->
      <el-button type="primary" icon="Plus" @click="addEmployee" class="add">
        添加员工
      </el-button>

      <!-- 添加员工 -->
      <el-dialog v-model="dialogVisible" title="添加新员工" width="400px">
        <template #title>
          <span style="font-size: 24px; font-weight: bold">添加新员工</span>
        </template>
        <hr />
        <div style="text-align: center">

          <el-form :model="form" :rules="rules" ref="ruleFormref" label-position="top" style="margin-top: 20px">

            <el-form-item label="员工工号" prop="employeeId">
              <el-input v-model="form.employeeId" placeholder="请输入员工工号"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="employeeName">
              <el-input v-model="form.employeeName" placeholder="请输入员工姓名"></el-input>
            </el-form-item>

          </el-form>
        </div>
        <template #footer>
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="handleAddEmployee">保 存</el-button>
        </template>
      </el-dialog>
    </div>

    <p>管理和查看公司所有员工</p>

    <!-- 员工列表 -->
    <div class="list">
      <el-table :data="list" style="width: 100%" :header-cell-style="{ color: '#000000', background: '#F7F7F9' }">
        <el-table-column prop="worker_id" label="员工工号" width="auto" align="center" header-align="center" />
        <el-table-column prop="worker_name" label="姓名" width="auto" align="center" header-align="center" />
        <el-table-column prop="worker_play" label="入职时间" width="auto" align="center" header-align="center" />
        <el-table-column prop="worker_state" label="是否离职" width="auto" align="center" header-align="center" />
        <el-table-column prop="worker_dimission" label="离职时间" width="auto" align="center" header-align="center" />
        <el-table-column label="操作" width="auto" align="center" header-align="center">
          <template #default="{ row }">
            <el-button type="primary" @click="handleDetails(row.worker_id)">详情</el-button>
            <el-button type="danger" @click="handleDelete(row.worker_id)">离职</el-button>
            <el-button type="warning" @click="employeeDeletex(row.worker_id)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getEmployee, postEmployee, putResign, employeeDelete } from '@/apis/employee'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus';


// 弹出添加员工表单
const dialogVisible = ref(false);

//-------------------------------->列表渲染
//思路：定义一个响应式list -> 调用接口获取后端数据 -> 赋值给list -> 将list绑定到table组件上
const list = ref([])

const getList = async () => {
  const company = 1
  // console.log(company)
  const rex = await getEmployee(company)
  list.value = rex
  list.value.forEach(item => {
    if (item.worker_state === "0") {
      item.worker_state = "是";
    } else if (item.worker_state === "1") {
      item.worker_state = "否";
    }
  });
}
onMounted(() => {
  getList()
})
//<------------------------------------



//----------------------------------->添加员工的逻辑
const form = ref({
  employeeId: "",
  employeeName: ""
})

const rules = ref({
  employeeId: [
    { required: true, message: '员工工号不能为空', trigger: 'blur' }
  ],
  employeeName: [
    { required: true, message: '员工姓名不能为空', trigger: 'blur' }
  ]
})

const ruleFormref = ref()

const handleAddEmployee = () => {
  ruleFormref.value.validate(async (valid) => {
    if (valid) {
      console.log("表单调用成功")
      const res = await postEmployee(form.value)
      console.log("后端返回的数据", res.code)
      getList()
      ruleFormref.value?.resetFields()
      if (res.code === 200) {
        ElMessage({ type: 'success', message: "员工创建成功" })
        dialogVisible.value = false
      } else {
        ElMessage({ type: 'error', message: "员工id重复" })
      }
    }
  })
}

//打开弹窗
const addEmployee = () => {
  dialogVisible.value = true
}

//取消（关闭弹窗）
const cancel = () => {
  ruleFormref.value?.resetFields()
  dialogVisible.value = false
}

//<----------------------------------

//员工离职功能
const handleDelete = async (worker_id) => {
  const rex = await putResign(worker_id)
  if (rex.code === 200) {
    ElMessage({ type: 'success', message: rex.msg })
  } else {
    ElMessage({ type: 'warning', message: rex.msg })
  }
  getList()
}

//删除功能
const employeeDeletex = async (worker_id) => {
  const req = await employeeDelete(worker_id)
  getList()
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

/* 操作按钮间距 */
::v-deep .el-button+.el-button {
  margin-left: 8px;
}
</style>
