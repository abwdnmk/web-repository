<template>
  <div class="content">
    <div class="header">
      <h1>项目立项管理</h1>

      <!-- 新建项目按钮 -->
      <el-button type="primary" icon="Plus" @click="addProject" class="add">
        新建项目
      </el-button>

      <!-- 新建项目 -->
      <el-dialog v-model="dialogVisible" title="添加新项目" width="400px" @close="resetForm">
        <template #title>
          <span style="font-size: 24px; font-weight: bold">添加新项目</span>
        </template>
        <hr />
        <div style="text-align: center">
          <el-form :model="itemForm" :rules="rules" ref="ruleFormref" label-position="top" style="margin-top: 20px">
            <el-form-item label="项目名称" prop="project_name">
              <el-input v-model="itemForm.project_name" placeholder="请输入项目名称"></el-input>
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
      <el-table :data="filterListItem" style="width: 100%"
        :header-cell-style="{ color: '#000000', background: '#F7F7F9' }">
        <el-table-column prop="id" label="项目ID" width="auto" align="center" header-align="center" />
        <el-table-column prop="project_name" label="项目名称" width="auto" align="center" header-align="center" />
        <el-table-column prop="project_user" label="创建人" width="auto" align="center" header-align="center" />
        <el-table-column prop="project_company" label="所属公司" width="auto" align="center" header-align="center" />
        <el-table-column prop="project_time" label="创建时间" width="auto" align="center" header-align="center" />
        <el-table-column label="操作" width="auto" align="center" header-align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="Edit" @click="handleEdit(row.project_id)"></el-button>
            <el-button type="danger" icon="Delete" @click="handleDelete(row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useRoute } from "vue-router"
import { getItem, postItem, deleteItem } from '@/apis/item'
import { ElMessage } from "element-plus"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const route = useRoute()

const resetForm = () => {
  ruleFormref.value?.resetFields()
}

const dialogVisible = ref(false)

const addProject = () => {
  dialogVisible.value = true
}

const listItem = ref([
  {
    id: 1,
    project_id: 1,
    project_name: '财务系统升级项目',
    project_user: '张三',
    project_company: '云科智能科技有限公司',
    project_time: '2025-01-10 09:30:00'
  },
  {
    id: 2,
    project_id: 1,
    project_name: '年度税务申报',
    project_user: '李四',
    project_company: '云科智能科技有限公司',
    project_time: '2025-01-12 14:20:00'
  },
  {
    id: 3,
    project_id: 1,
    project_name: '资金流水分析',
    project_user: '王五',
    project_company: '云科智能科技有限公司',
    project_time: '2025-01-15 11:10:00'
  },
  {
    id: 4,
    project_id: 1,
    project_name: '预算制定与管控',
    project_user: '赵六',
    project_company: '云科智能科技有限公司',
    project_time: '2025-01-18 16:45:00'
  },
  {
    id: 5,
    project_id: 1,
    project_name: '财务报表生成',
    project_user: '陈七',
    project_company: '云科智能科技有限公司',
    project_time: '2025-01-20 10:00:00'
  },
  {
    id: 6,
    project_id: 2,
    project_name: '财务系统升级项目',
    project_user: '张三',
    project_company: '恒信商务服务集团',
    project_time: '2025-01-10 09:30:00'
  },
  {
    id: 7,
    project_id: 2,
    project_name: '年度税务申报',
    project_user: '李四',
    project_company: '恒信商务服务集团',
    project_time: '2025-01-12 14:20:00'
  },
  {
    id: 8,
    project_id: 2,
    project_name: '资金流水分析',
    project_user: '王五',
    project_company: '恒信商务服务集团',
    project_time: '2025-01-15 11:10:00'
  },
  {
    id: 9,
    project_id: 3,
    project_name: '预算制定与管控',
    project_user: '赵六',
    project_company: '盛世金融咨询公司',
    project_time: '2025-01-18 16:45:00'
  },
  {
    id: 10,
    project_id: 3,
    project_name: '财务报表生成',
    project_user: '陈七',
    project_company: '盛世金融咨询公司',
    project_time: '2025-01-20 10:00:00'
  },
  {
    id: 11,
    project_id: 4,
    project_name: '员工薪资核算',
    project_user: '周明',
    project_company: '联达实业发展企业',
    project_time: '2025-02-05 08:20:00'
  },
  {
    id: 12,
    project_id: 4,
    project_name: '对公账目核对',
    project_user: '吴婷',
    project_company: '联达实业发展企业',
    project_time: '2025-02-08 15:10:00'
  },
  {
    id: 13,
    project_id: 4,
    project_name: '季度成本统计',
    project_user: '郑浩',
    project_company: '联达实业发展企业',
    project_time: '2025-02-12 09:50:00'
  },
  {
    id: 14,
    project_id: 4,
    project_name: '采购费用统筹',
    project_user: '孙丽',
    project_company: '联达实业发展企业',
    project_time: '2025-02-16 13:30:00'
  },
  {
    id: 15,
    project_id: 5,
    project_name: '往来账款整理',
    project_user: '朱峰',
    project_company: '启航财税管理中心',
    project_time: '2025-02-20 11:20:00'
  },
  {
    id: 16,
    project_id: 5,
    project_name: '固定资产盘点',
    project_user: '马阳',
    project_company: '启航财税管理中心',
    project_time: '2025-03-03 10:15:00'
  },
  {
    id: 17,
    project_id: 5,
    project_name: '营销费用核销',
    project_user: '胡雪',
    project_company: '启航财税管理中心',
    project_time: '2025-03-06 16:00:00'
  },
  {
    id: 18,
    project_id: 5,
    project_name: '融资账目梳理',
    project_user: '林强',
    project_company: '启航财税管理中心',
    project_time: '2025-03-09 08:55:00'
  },
  {
    id: 19,
    project_id: 5,
    project_name: '项目回款追踪',
    project_user: '高雯',
    project_company: '启航财税管理中心',
    project_time: '2025-03-13 14:40:00'
  },
  {
    id: 20,
    project_id: 5,
    project_name: '年度财务审计',
    project_user: '田宇',
    project_company: '启航财税管理中心',
    project_time: '2025-03-17 09:10:00'
  }
])

const filterListItem = computed(() => {
  return listItem.value.filter(item => item.project_id === userStore.idIndex)
})

const itemForm = ref({
  project_name: '',
  project_company: ''
})

const rules = ref({
  project_name: [
    { required: true, message: '项目名称不能为空', trigger: 'blur' }
  ]
})

const ruleFormref = ref()

//添加项目
const handleAddProject = () => {
  ruleFormref.value.validate(async (valid) => {
    if (valid) {

      switch (userStore.idIndex) {
        case 1:
          itemForm.value.project_company = '云科智能科技有限公司'
          break
        case 2:
          itemForm.value.project_company = '恒信商务服务集团'
          break
        case 3:
          itemForm.value.project_company = '盛世金融咨询公司'
          break
        case 4:
          itemForm.value.project_company = '联达实业发展企业'
          break
        case 5:
          itemForm.value.project_company = '启航财税管理中心'
          break
        default:
          console.log('不存在')
      }

      const maxId = listItem.value.length > 0
        ? Math.max(...listItem.value.map(item => item.id))
        : 0

      listItem.value.push({
        id: maxId + 1,
        project_id: userStore.idIndex,
        project_name: itemForm.value.project_name,
        project_user: 'admin',
        project_company: itemForm.value.project_company,
        project_time: new Date().toLocaleString()
      })

      dialogVisible.value = false
      ElMessage({ type: 'success', message: "添加成功" })
    }
  })
}

const handleDelete = async (id) => {
  listItem.value = listItem.value.filter(item => item.id !== id)
  ElMessage.success('删除成功！')
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
</style>
