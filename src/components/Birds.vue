<template>
  <SearchBirds></SearchBirds>
  <el-row>
    <el-col>
      <el-button type="primary" @click="dialogVisible = true">
        新增
      </el-button>
    </el-col>
  </el-row>
  <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="新增" width="800" center destroy-on-close lock-scroll
    :close-on-click-modal="false">
    <FormBirds @close="close"></FormBirds>
  </el-dialog>

  <el-table :data="tableData" border style="width: 100%" class="mt-4  table-hover" ref="multipleTableRef"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <!-- <el-table-column prop="date" label="时间" width="180" /> -->
    <el-table-column prop="name" label="名称" width="180" />

    <el-table-column prop="number" label="数量" />
    <el-table-column prop="speed" label="速度" />
    <el-table-column prop="direction" label="方向" />
    <el-table-column label="操作">
      <template #default="props">
        <el-button>生成航迹</el-button>
        <el-button @click="toEdit(props.row.id)">编辑</el-button>
        <el-button @click="toEdit(props.row.id)">删除</el-button>
      </template>
    </el-table-column>



  </el-table>

  <div class="mt-4 mb-2 text-center">
    <el-button type="primary">生成航迹</el-button>
    <el-button type="primary">开始</el-button>
    <el-button type="primary">暂停</el-button>
    <el-button type="primary">停止</el-button>
    <el-button type="primary">复位</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import FormBirds from '@/views/imitatedData/FormBirds.vue';

import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const multipleSelection = ref([])
const dialogVisible = ref(false)
import SearchBirds from '@/views/searchQuery/SearchBirds.vue';

interface RuleForm {

  number: string
  speed: string;

  height: string
  direction: string
  longitude: string
  latitude: string
  // shape: string


}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  number: '',
  speed: '',
  height: '',
  direction: '',
  longitude: '',
  latitude: '',
  // shape: ''

})




const tableData = [
  {
    name: '名称',
    // type: '编队类型2',
    number: '数量',
    speed: '速度',
    direction: '方向',

  },

]
const toEdit = (id: any) => {
  console.log(id)
}
const handleSelectionChange = (val: []) => {
  multipleSelection.value = val
}


const close = () => {
  debugger
  dialogVisible.value = false
}
</script>
