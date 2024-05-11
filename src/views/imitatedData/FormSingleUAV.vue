<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
      :size="formSize" status-icon>
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择型号">

          <el-option v-for="(item, index) in typeList" :key="index" :label="item.label" :value="item.value" />

        </el-select>
      </el-form-item>
      <el-form-item label="型号" prop="type">
        <el-input v-model="ruleForm.speed" />
      </el-form-item>
      <el-form-item label="机号" prop="type">
        <el-input v-model="ruleForm.speed" />
      </el-form-item>




      <!-- <el-form-item label="物理尺寸" prop="size">
      <el-input v-model="ruleForm.size" />
    </el-form-item> -->
      <el-form-item label="起始经度" prop="longitude">
        <el-input v-model="ruleForm.longitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="起始纬度" prop="latitude">
        <el-input v-model="ruleForm.latitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="飞行高度" prop="height">
        <el-input v-model="ruleForm.height" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="飞行速度" prop="speed">
        <el-input v-model="ruleForm.speed" >
          <template #suffix>
            <el-icon class="el-input__icon">米/秒</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="飞行航向" prop="direction">
        <el-input v-model="ruleForm.direction">
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="飞行时间" prop="speed">
        <el-input v-model="ruleForm.speed">
          <template #suffix>
            <el-icon class="el-input__icon">秒</el-icon>
          </template>
        </el-input>
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
import { reactive, ref } from 'vue'
const emit = defineEmits(["close"]);


import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const multipleSelection = ref([])
interface RuleForm {
  type: string
  speed: string;
  height: string
  size: string
  direction: string
  longitude: string
  latitude: string
  Angle_A_Target: string
  Angle_P_Target: string
  Distance_Target: string
  Prop_IFF: string
  ThreatRank: string
  ID_Target: string
  Alarm_Level: string

}
const typeList = reactive([
  { label: '多旋无人机', value: '0' },
  { label: '固定式无人机', value: '1' },
  { label: '大疆', value: '2' },

])
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  type: '',
  speed: '',
  height: '',
  size: '',
  direction: '',
  longitude: '',
  latitude: '',
  Angle_A_Target: '',
  Angle_P_Target: '',
  Distance_Target: '',
  Prop_IFF: '',
  ThreatRank: '',
  ID_Target: '',
  Alarm_Level: '',

})



const rules = reactive<FormRules<RuleForm>>({
  type: [
    { required: true, message: '请选择类型', trigger: 'change' },
    // { min: 3, max: 5, message: '长度在3 到 5个字符', trigger: 'blur' },
  ],
  speed: [
    {
      required: true,
      message: '请输入飞行速度',
      trigger: 'blur',
    },
  ],
  height: [
    {
      required: true,
      message: '请输入高度',
      trigger: 'blur',
    },
  ],
  size: [
    {
      required: true,
      message: '请输入尺寸',
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
  // emit('close');
}
const close=()=>{
  emit('close');

}
</script>
