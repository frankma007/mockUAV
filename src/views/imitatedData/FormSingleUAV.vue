<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="container-fluid p-4"
      :size="formSize" status-icon>
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择类型" clearable
          @clear="ruleForm.version = ''; ruleForm.deviceNum = ''" @change="getVersion()">
          <el-option v-for=" (item, index) in typeList" :label="item?.type" :value="item?.type" :key="index">

          </el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="型号" prop="version">
        <el-select :disabled="!ruleForm.type" v-model="ruleForm.version" placeholder="请选择型号" clearable
          @clear="ruleForm.deviceNum = ''" @change="getDeviceNum()">
          <el-option v-for=" (item, index) in versionList" :label="item?.version" :value="item?.version" :key="index">


          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机号" prop="deviceNum">
        <el-select :disabled="!ruleForm.version" v-model="ruleForm.deviceNum" placeholder="请选择机号" clearable>
          <el-option v-for=" (item, index) in deviceNumList" :label="item?.deviceNum" :value="item?.deviceNum"
            :key="index">


          </el-option>
        </el-select>
      </el-form-item>



      <!-- <el-form-item label="物理尺寸" prop="size">
      <el-input v-model="ruleForm.size" />
    </el-form-item> -->
      <el-form-item label="起始经度" prop="Latitude_Target">
        <el-input v-model="ruleForm.Latitude_Target">
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="起始纬度" prop="Latitude_Target">
        <el-input v-model="ruleForm.Longitude_Target">
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="飞行高度" prop="Altitude_Target">
        <el-input v-model="ruleForm.Altitude_Target">
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="飞行速度" prop="Speed">
        <el-input v-model="ruleForm.Speed">
          <template #suffix>
            <el-icon class="el-input__icon">米/秒</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="飞行航向" prop="Direction">
        <el-input v-model="ruleForm.Direction">
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="飞行时间" prop="time">
        <el-input v-model="ruleForm.time">
          <template #suffix>
            <el-icon class="el-input__icon">秒</el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- ---------------- -->
      <el-form-item label="目标距离" prop="Distance_Target">
        <el-input v-model="ruleForm.Distance_Target" />
      </el-form-item>
      <el-form-item label="目标方位角" prop="Angle_A_Target">
        <el-input v-model="ruleForm.Angle_A_Target" />
      </el-form-item>

      <el-form-item label="目标俯仰角" prop="Angle_P_Target">
        <el-input v-model="ruleForm.Angle_P_Target" />
      </el-form-item>
      <el-form-item label="批号" prop="ID_Target_Fusion">
        <el-input v-model="ruleForm.ID_Target_Fusion">

        </el-input>
      </el-form-item>
      <el-form-item label="目标类型" prop="Type_Target">
        <el-input v-model="ruleForm.Type_Target">

        </el-input>
      </el-form-item>
      <el-form-item label="无人机群标识" prop="IdentifyNum">
        <el-select v-model="ruleForm.IdentifyNum">
          <el-option label="普通无人机" value="0">

          </el-option>
          <el-option label="无人机群" value="1">

          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>

        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
      </el-form-item> -->
    </el-form>

    <div class="text-center">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        提交
      </el-button>
    </div>




  </div>
  <!-- <template v-slot="footer">
    3333
  </template> -->
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'

import { post, get } from "@/assets/utils/api.js";
import { ElMessage } from "element-plus";
const emit = defineEmits(["close"]);
const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})


import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const multipleSelection = ref([])
onMounted(() => {
  //根据id来获取详情信息 反显到form表单上
  //id为空 是新增  不为空 则为
  getType()
})
interface RuleForm {







  type: string
  version: string
  deviceNum: string
  Latitude_Target: string
  Longitude_Target: string
  Altitude_Target: string

  Speed: string
  Direction: string
  time: string
  Distance_Target: string
  Angle_A_Target: string
  Angle_P_Target: string
  ID_Target_Fusion: string
  Type_Target: string
  IdentifyNum: string
}
// const typeList = reactive([
//   { label: '多旋无人机', value: '0' },
//   { label: '固定式无人机', value: '1' },
//   { label: '大疆', value: '2' },

// ])
interface selectList {
  type?: string;
  version?: string;
  deviceNum?: string

}
const typeList = ref<selectList[]>([])
const versionList = ref<selectList[]>([])
const deviceNumList = ref<selectList[]>([])

const getType = async () => {

  // api/task/UavDataQuery
  const { data: { code, dataMap } } = await get('/api/task/UavDataQueryType')

  if (code == 200) {
    typeList.value = dataMap.queryDeploy
  }



}
/* const typeChange =()=>{
getVersion()
} */

const getVersion = async () => {


  const { data: { code, dataMap } } = await get('/api/task/UavDataQueryVersion?type=' + ruleForm.type)

  if (code == 200) {
    versionList.value = dataMap.queryDeploy
  }



}
const getDeviceNum = async () => {



  const { data: { code, dataMap } } = await get('/api/task/UavDataQueryDeviceNum?version=' + ruleForm.version + '&type=' + ruleForm.type)

  if (code == 200) {
    deviceNumList.value = dataMap.queryDeploy
  }


}
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  type: '',
  version: '',
  deviceNum: '',






  time: '5000',








  Distance_Target: '374000',
  Altitude_Target: '27702',
  Angle_A_Target: '145340',
  Angle_P_Target: '2700',
  Direction: '-34660',
  ID_Target_Fusion: '',
  Speed: '2001',

  Type_Target: '9',
  Latitude_Target: '3100144627',
  Longitude_Target: '12143502133',
  IdentifyNum: '0'


})



const rules = reactive<FormRules<RuleForm>>({
  type: [
    { required: true, message: '请选择类型', trigger: 'change' },
    // { min: 3, max: 5, message: '长度在3 到 5个字符', trigger: 'blur' },
  ],
  Speed: [
    {
      required: true,
      message: '请输入飞行速度',
      trigger: 'blur',
    },
  ],
  Altitude_Target: [
    {
      required: true,
      message: '请输入高度',
      trigger: 'blur',
    },
  ],

  Angle_A_Target: [
    {
      required: true,
      message: '请输入航向',
      trigger: 'blur',
    },
  ],
  Latitude_Target: [
    {
      required: true,
      message: '请输入经度',
      trigger: 'blur',
    },
  ],


})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const valid = await formEl.validate()
  if (valid) {
    // console.log('submit!')

    // /api/RecognizeAddData
    const { data: { code, message } } =await post('/api/RecognizeAddData', ruleForm)
   console.log(code ,9999999999)
    debugger
    if (code == 200) {

      ElMessage({
        message,
        type: 'success',
      })
      setTimeout(() => {
        close()
        // emit('added')
      }, 3000)
    }
    else {
      ElMessage({
        message,
        type: 'error',
      })
    }
  }

}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  // emit('close');
}
const close = () => {
  emit('close');

}
</script>
