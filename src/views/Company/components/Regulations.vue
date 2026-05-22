<template>
  <div class="content">
    <div class="header">
      <h1>条例详情管理</h1>

      <div class="header-right">
        <el-select v-model="value" clearable filterable placeholder="所有项目" style="width: 140px" class="select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <!-- 新建条例按钮 -->
        <el-button type="primary" icon="Plus" @click="addRegulation" class="add">
          新建条例
        </el-button>
      </div>

      <!-- 新建项目 -->
      <el-dialog v-model="dialogVisible" title="添加新条例" width="400px" @close="resetForm">
        <template #title>
          <span style="font-size: 24px; font-weight: bold">添加新条例</span>
        </template>
        <hr />
        <div style="text-align: center">
          <el-form :model="listRegulation" :rules="rules" ref="formRef" label-position="top" style="margin-top: 20px">
            <el-form-item label="条例名称" prop="name">
              <el-input v-model="listRegulation.name" placeholder="请输入条例名称"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-input v-model="listRegulation.type" placeholder="请输入条例类型"></el-input>
            </el-form-item>
            <el-form-item label="金额" prop="amount">
              <el-input v-model="listRegulation.amount" type="number" step="0.01" min="0" placeholder="请输入条例金额"
                @input="handleCalculate"></el-input>
            </el-form-item>
            <el-form-item label="税率(请输入0-100之间的数)" prop="taxRate">
              <el-input v-model="listRegulation.taxRate" type="number" step="0.01" min="0" max="100"
                placeholder="请输入条例税率" @input="handleCalculate"></el-input>
            </el-form-item>
            <el-form-item label="税金" prop="taxAmount">
              <el-input v-model="listRegulation.taxAmount" disabled placeholder="0.00"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddRegulation">保 存</el-button>
        </template>
      </el-dialog>
    </div>

    <p>管理项目相关的收支条例记录</p>
    <!-- 条例列表 -->
    <div class="list">
      <el-table :data="listRe" style="width: 100%" :header-cell-style="{ color: '#000000', background: '#F7F7F9' }">
        <el-table-column prop="detail_project" label="所属项目" width="auto" align="center" header-align="center" />
        <el-table-column prop="detail_name" label="条例名称" width="auto" align="center" header-align="center" />
        <el-table-column prop="detail_user" label="记录人" width="auto" align="center" header-align="center" />
        <el-table-column prop="detail_type" label="类型" width="auto" align="center" header-align="center" />
        <el-table-column prop="detail_amount" label="金额" width="auto" align="center" header-align="center" />
        <el-table-column prop="detail_rate" label="税率" width="auto" align="center" header-align="center" />
        <el-table-column prop="detail_tax" label="税金" width="auto" align="center" header-align="center" />
        <el-table-column prop="detail_time" label="记录时间" width="auto" align="center" header-align="center" />
        <el-table-column label="操作" width="auto" align="center" header-align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="Edit" @click="handleEdit(row.detail_id)"></el-button>
            <el-button type="danger" icon="Delete" @click="detailDelete(row.detail_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getRegulation, postRegulation, deleteRegulation } from '@/apis/regulations'
import { ElMessage } from "element-plus"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

// 弹出添加条例表单
const dialogVisible = ref(false);

//打开条例表单
const addRegulation = () => {
  dialogVisible.value = true
}

const resetForm = () => {
  formRef.value?.resetFields()
}

const listRe = ref([])

const updateRe = async () => {
  const res = await getRegulation("1")
  console.log(res.object)
  listRe.value = res.object
  listRe.value.forEach(item => {
    if (item.detail_type === "-1") {
      item.detail_type = "支出";
    } else if (item.detail_type === "1") {
      item.detail_type = "收入";
    }
  });
}

onMounted(() => {
  updateRe()
})

const listRegulation = ref({
  item: '',     //
  name: '',
  recorder: '',  //
  type: '',
  amount: null,  //金额
  taxRate: null,  //税率
  taxAmount: '0.00'  //税金
})

const handleCalculate = () => {
  const amount = parseFloat(listRegulation.value.amount) || 0
  const taxRate = parseFloat(listRegulation.value.taxRate) || 0

  // 计算并保留两位小数
  const taxAmount = (amount * (taxRate / 100)).toFixed(2)
  listRegulation.value.taxAmount = taxAmount
}

const rules = ref({
  name: [
    { required: true, message: '条例名称不能为空', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '条例类型不能为空', trigger: 'blur' }
  ],
  amount: [
    { required: true, message: '金额不能为空', trigger: 'blur' },
  ],
  taxRate: [
    { required: true, message: '税率不能为空', trigger: 'blur' }
  ]
})

const formRef = ref()

const handleAddRegulation = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      listRegulation.value.item = "1"
      listRegulation.value.recorder = userStore.userInfo.user_id
      const rex = await postRegulation(listRegulation.value)
      dialogVisible.value = false
      ElMessage({ type: 'success', message: '添加条例成功' })
      updateRe()
    }
  })
}

// 删除功能
const detailDelete = async (detail_id) => {
  const req = await deleteRegulation(detail_id)
  updateRe()
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
