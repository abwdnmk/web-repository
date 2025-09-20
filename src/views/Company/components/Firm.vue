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
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getFirm, postFirm, deleteFirm } from '@/apis/firm'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from "element-plus";

// 弹出添加公司表单
const dialogVisible = ref(false);

// 添加公司按钮
function addFirm() {
  dialogVisible.value = true;
}

const cancelFirm = () => {
  dialogVisible.value = false
  ruleFormref.value?.resetFields()
}

const ruleFormref = ref()

const listfirm = ref([])

const getListFirm = async () => {
  const res = await getFirm()
  listfirm.value = res
  console.log(res)
}

onMounted(() => {
  getListFirm()
})

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
      firmform.value.company_admin = "1"
      console.log(firmform.value)
      const rex = await postFirm(firmform.value)
      console.log(rex)
      getListFirm()
      if (rex.code === 200) {
        ElMessage({ type: 'success', message: rex.msg })
        ruleFormref.value?.resetFields()
        dialogVisible.value = false
      }
      else {
        ElMessage({ type: 'warning', message: "公司名称重复" })
      }
    }
  })
}

//删除功能
const handleDelete = async (company_id) => {
  console.log(company_id)
  const req = await deleteFirm(company_id)
  getListFirm()
  ElMessage({ type: 'success', message: req.msg })
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
