<template>
  <div class="content">
    <div class="header">
      <h1>员工列表</h1>

      <!-- 添加员工按钮 -->
      <el-button type="primary" icon="Plus" @click="addEmployee" class="add">
        添加员工
      </el-button>

      <!-- 添加员工 -->
      <el-dialog v-model="dialogVisible" title="添加新员工" width="400px" @close="resetForm">
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
      <el-table :data="filterlist" style="width: 100%" :header-cell-style="{ color: '#000000', background: '#F7F7F9' }">
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
import { computed, onMounted, ref } from "vue";
import { getEmployee, postEmployee, putResign, employeeDelete } from '@/apis/employee'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

// 弹出添加员工表单
const dialogVisible = ref(false);

//-------------------------------->列表渲染
//思路：定义一个响应式list -> 调用接口获取后端数据 -> 赋值给list -> 将list绑定到table组件上
const list = ref([
  {
    worker_id: 1001,
    worker_name: "张三",
    worker_play: "2023-03-15",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 1
  },
  {
    worker_id: 1002,
    worker_name: "李四",
    worker_play: "2023-04-20",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 1
  },
  {
    worker_id: 1003,
    worker_name: "王五",
    worker_play: "2023-05-10",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 1
  },
  {
    worker_id: 1004,
    worker_name: "赵六",
    worker_play: "2023-06-01",
    worker_state: "离职",
    worker_dimission: "2025-01-10",
    worker_company: 1
  },
  {
    worker_id: 1005,
    worker_name: "陈七",
    worker_play: "2023-07-12",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 1
  },
  {
    worker_id: 1006,
    worker_name: "周明",
    worker_play: "2023-08-05",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 2
  },
  {
    worker_id: 1007,
    worker_name: "吴婷",
    worker_play: "2023-09-18",
    worker_state: "离职",
    worker_dimission: "2025-02-15",
    worker_company: 2
  },
  {
    worker_id: 1008,
    worker_name: "郑浩",
    worker_play: "2023-10-07",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 2
  },
  {
    worker_id: 1009,
    worker_name: "孙丽",
    worker_play: "2023-11-22",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 2
  },
  {
    worker_id: 1010,
    worker_name: "朱峰",
    worker_play: "2023-12-30",
    worker_state: "离职",
    worker_dimission: "2025-03-20",
    worker_company: 2
  },
  {
    worker_id: 1011,
    worker_name: "马阳",
    worker_play: "2024-01-15",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 3
  },
  {
    worker_id: 1012,
    worker_name: "胡雪",
    worker_play: "2024-02-19",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 3
  },
  {
    worker_id: 1013,
    worker_name: "林强",
    worker_play: "2024-03-11",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 3
  },
  {
    worker_id: 1014,
    worker_name: "高雯",
    worker_play: "2024-04-08",
    worker_state: "离职",
    worker_dimission: "2025-04-05",
    worker_company: 3
  },
  {
    worker_id: 1015,
    worker_name: "田宇",
    worker_play: "2024-05-06",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 4
  },
  {
    worker_id: 1016,
    worker_name: "刘畅",
    worker_play: "2024-06-14",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 4
  },
  {
    worker_id: 1017,
    worker_name: "张萌",
    worker_play: "2024-07-25",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 4
  },
  {
    worker_id: 1018,
    worker_name: "李超",
    worker_play: "2024-08-09",
    worker_state: "离职",
    worker_dimission: "2025-04-10",
    worker_company: 5
  },
  {
    worker_id: 1019,
    worker_name: "王佳",
    worker_play: "2024-09-12",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 5
  },
  {
    worker_id: 1020,
    worker_name: "赵瑞",
    worker_play: "2024-10-01",
    worker_state: "在职",
    worker_dimission: "",
    worker_company: 5
  }
])

const filterlist = computed(() => {
  return list.value.filter(item => item.worker_company === userStore.idIndex)
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
  ruleFormref.value.validate((valid) => {
    if (valid) {
      const maxId = list.value.length > 0
        ? Math.max(...list.value.map(item => item.id))
        : 0

      list.value.push({
        worker_id: form.value.employeeId,
        worker_name: form.value.employeeName,
        worker_play: new Date().toISOString().split('T')[0],
        worker_state: "在职",
        worker_dimission: "",
        worker_company: userStore.idIndex,
      })
      dialogVisible.value = false
      ElMessage.success("添加成功")
    }
  })
}

//打开弹窗
const addEmployee = () => {
  dialogVisible.value = true
}

//在监听到弹窗关闭后，可以重置弹窗的状态
const resetForm = () => {
  ruleFormref.value?.resetFields()
}

//取消（关闭弹窗）
const cancel = () => {
  dialogVisible.value = false
}

//<----------------------------------

//员工离职功能
const handleDelete = (worker_id) => {
  const worker = list.value.find(item => item.worker_id === worker_id)

  if (worker) {
    worker.worker_state = '离职'
    worker.worker_dimission = new Date().toISOString().split('T')[0]
    ElMessage.success('离职成功')
  } else {
    ElMessage.warning('未找到该员工')
  }
}

// 删除功能
const employeeDeletex = (worker_id) => {
  list.value = list.value.filter(item => item.worker_id !== worker_id)
  ElMessage.success("删除成功")
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

:v-deep(.el-table) {
  flex: 1;
  width: 100%;
}

:v-deep(.el-table__header tr),
:v-deep(.el-table__row) {
  height: 60px;
}

:v-deep(.el-table__body-wrapper) {
  overflow-y: auto;
  max-height: calc(100% - 60px);
}

/* 操作按钮间距 */
:deep(.el-button + .el-button) {
  margin-left: 8px;
}
</style>
