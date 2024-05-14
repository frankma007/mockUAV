<template>
  <SearchMultiUAV></SearchMultiUAV>
  <el-row>
    <el-col>
      <el-button type="primary" @click="dialogVisible = true">
        新增
      </el-button>
    </el-col>
  </el-row>
  <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="新增" width="800" center destroy-on-close lock-scroll
    :close-on-click-modal="false">
    <FormMultiUAV @close="close"></FormMultiUAV>
  </el-dialog>

  <el-dialog v-if="viewVisible" v-model="viewVisible" title="查看" width="1200" center destroy-on-close lock-scroll
    :close-on-click-modal="false">
    <el-table :data="tableData2" border style="width: 100%" class="my-4  table-hover " ref="multipleTableRef">



      <el-table-column prop="Type_Target" label="类型" width="180" />
      <el-table-column prop="Speed" label="型号" />
      <el-table-column prop="Direction" label="机号" />
      <el-table-column prop="Direction" label="长" />
      <el-table-column prop="Direction" label="宽" />
      <el-table-column prop="Direction" label="高" />
      <el-table-column prop="Direction" label="重量" />
      <el-table-column prop="Direction" label="飞行最大航时" />

      <el-table-column prop="Distance_Target" label="使用升限" />
      <el-table-column prop="Distance_Target" label="最大速度" />


    </el-table>

  </el-dialog>



  <el-table :data="tableData" border style="width: 100%" class="mt-4  table-hover" ref="multipleTableRef"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <!-- <el-table-column prop="date" label="时间" width="180" /> -->
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="type" label="编队类型" width="180" />
    <el-table-column prop="number" label="数量" />
    <el-table-column prop="speed" label="速度" />
    <el-table-column prop="direction" label="航向" />
    <el-table-column label="操作">
      <template #default="props">
        <el-button>生成航迹</el-button>
        <el-button @click="viewVisible = true">查看</el-button>
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
import FormMultiUAV from '@/views/imitatedData/FormMultiUAV.vue';

import SearchMultiUAV from '@/views/searchQuery/SearchMultiUAV.vue';

import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const multipleSelection = ref([])
const dialogVisible = ref(false)
const viewVisible = ref(false)

const shapeList = reactive([
  { label: '人字形', value: '0' },
  { label: '镖形', value: '1' },
  { label: 'T字形', value: '2' },
  { label: '矩形', value: '3' },
  { label: '十字形', value: '4' },
  { label: '阵列', value: '6' },
  { label: '无编队', value: '5' }

])

interface RuleForm {

  number: string
  speed: string;

  height: string
  direction: string
  longitude: string
  latitude: string
  shape: string


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
  shape: ''

})



const rules = reactive<FormRules<RuleForm>>({
  number: [
    { required: true, message: '请输入数量', trigger: 'blur' },
    // { min: 3, max: 5, message: '长度在3 到 5个字符', trigger: 'blur' },
  ],
  height: [
    {
      required: true,
      message: '请输入高度',
      trigger: 'blur',
    },
  ],
  speed: [
    {
      required: true,
      message: '请输入巡航速度',
      trigger: 'blur',
    },
  ],

  direction: [
    {
      required: true,
      message: '请输入航向',
      trigger: 'blur',
    },
  ],
  longitude: [
    {
      required: true,
      message: '请输入经度',
      trigger: 'blur',
    },
  ],
  latitude: [
    {
      required: true,
      message: '请输入纬度',
      trigger: 'blur',
    },
  ],
  shape: [
    {
      required: true,
      message: '请选择编队形态',
      trigger: 'change',
    },
  ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


const tableData = [
  {
    name: '名称',
    type: '编队类型2',
    number: '数量',
    speed: '速度',
    direction: '航向',

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


const tableData2 = [
  {
    Type_Target: '多旋无人机',
    Speed: '2',
    Direction: '96°',
    Angle_A_Target: '12.1°',
    Angle_P_Target: '123.1°',
    Altitude_Target: '10',
    Distance_Target: '66',
    Prop_IFF: '1',
    ThreatRank: '2',
    ID_Target: 'C',
    Alarm_Level: '2'
  },
  {
    Type_Target: '多旋无人机',
    Speed: '2',
    Direction: '96°',
    Angle_A_Target: '12.1°',
    Angle_P_Target: '123.1°',
    Altitude_Target: '10',
    Distance_Target: '66',
    Prop_IFF: '1',
    ThreatRank: '2',
    ID_Target: 'C',
    Alarm_Level: '2'
  },

]
</script>
<style lang="scss" scoped>
.content {
  // background-color: skyblue;
  // border-radius: 4px;
}
</style>
