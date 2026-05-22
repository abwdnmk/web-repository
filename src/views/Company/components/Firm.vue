<template>
  <div class="content">
    <template v-if="true">
      <div class="header">
        <h1>公司列表</h1>

        <!-- 添加公司按钮 -->
        <el-button type="primary" icon="Plus" @click="addFirm" class="add">
          添加公司
        </el-button>

        <!-- 添加公司 -->
        <el-dialog v-model="dialogVisible" title="添加新公司" width="400px" @close="resetForm">
          <template #title>
            <span style="font-size: 24px; font-weight: bold">添加公司</span>
          </template>
          <hr />
          <div style="text-align: center">
            <el-form :model="firmform" :rules="rules" ref="ruleFormref" label-position="top" style="margin-top: 20px">
              <el-form-item label="公司名称" prop="company_name">
                <el-input v-model="firmform.company_name" placeholder="请输入公司名称"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <template #footer>
            <el-button @click="cancelFirm">取 消</el-button>
            <el-button type="primary" @click="handleAddFirm">保 存</el-button>
          </template>
        </el-dialog>
      </div>

      <p>管理和查看公司所有公司及管理员信息</p>

      <!-- 公司列表 -->
      <div class="list">
        <el-table :data="listfirm" style="width: 100%" :header-cell-style="{ color: '#000000', background: '#F7F7F9' }">
          <el-table-column prop="company_id" label="序号" width="100" align="center" header-align="center" />
          <el-table-column prop="company_name" label="公司名称" width="auto" align="center" header-align="center" />
          <el-table-column prop="company_admin" label="管理员" width="auto" align="center" header-align="center" />
          <el-table-column prop="company_time" label="创建时间" width="auto" align="center" header-align="center" />
          <el-table-column label="操作" width="auto" align="center" header-align="center">
            <template #default="{ row }">
              <el-button type="primary" icon="Edit" @click="handleEdit(row.company_id)" />
              <el-button type="danger" icon="Delete" @click="handleDelete(row.company_id)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template v-else>
      <div class="stt">您的权限不足</div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getFirm, postFirm, deleteFirm } from '@/apis/firm'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from "element-plus"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

// 弹出添加公司表单
const dialogVisible = ref(false);

// 添加公司按钮
function addFirm() {
  dialogVisible.value = true;
}

const cancelFirm = () => {
  dialogVisible.value = false
}

const resetForm = () => {
  ruleFormref.value?.resetFields()
}

const ruleFormref = ref()

const listfirm = ref([
  {
    company_id: 1,
    company_name: '云科智能科技有限公司',
    company_admin: '系统管理员',
    company_time: '2023-01-10'
  },
  {
    company_id: 2,
    company_name: '恒信商务服务集团',
    company_admin: '系统管理员',
    company_time: '2023-02-15'
  },
  {
    company_id: 3,
    company_name: '盛世金融咨询公司',
    company_admin: '系统管理员',
    company_time: '2023-03-20'
  },
  {
    company_id: 4,
    company_name: '联达实业发展企业',
    company_admin: '系统管理员',
    company_time: '2023-04-25'
  },
  {
    company_id: 5,
    company_name: '启航财税管理中心',
    company_admin: '系统管理员',
    company_time: '2023-05-30'
  }
])

const firmform = ref({
  company_name: "",
  company_admin: ""
})

const rules = ref({
  company_name: [
    { required: true, message: '公司名称不能为空', trigger: 'blur' }
  ]
})

const handleAddFirm = () => {
  ruleFormref.value.validate(async (valid) => {
    if (valid) {
      const maxId = listfirm.value.length > 0
        ? Math.max(...listfirm.value.map(item => item.company_id))
        : 0

      listfirm.value.push({
        company_id: maxId + 1,
        company_name: firmform.value.company_name,
        company_admin: 'admin',
        company_time: new Date().toISOString().split('T')[0]
      })
      dialogVisible.value = false
      ElMessage.success("添加成功")
    }
  })
}

//删除功能
const handleDelete = async (company_id) => {
  listfirm.value = listfirm.value.filter(item => item.company_id !== company_id)
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

.stt {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
</style>
