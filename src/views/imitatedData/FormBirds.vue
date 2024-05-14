<template>
  <!-- <div class="container-fluid p-4"></div> -->
  <el-form ref="ruleFormRef" style="" :model="ruleForm" :rules="rules" label-width="auto" class="container-fluid p-4"
    :size="formSize" status-icon>
    <!-- 经度、纬度、高度、速度、方向 -->
    <el-form-item label="鸟群名称" prop="number">
      <el-input v-model="ruleForm.number" />
    </el-form-item>
    <el-form-item label="数量" prop="number">
      <el-input v-model="ruleForm.number" />
    </el-form-item>
    <el-form-item label="核心鸟经度" prop="longitude">
      <el-input v-model="ruleForm.longitude" />
    </el-form-item>
    <el-form-item label="核心鸟纬度" prop="latitude">
      <el-input v-model="ruleForm.latitude" />
    </el-form-item>
    <el-form-item label="核心鸟高度" prop="height">
      <el-input v-model="ruleForm.height" />
    </el-form-item>
    <el-form-item label="速度" prop="speed">
      <el-input v-model="ruleForm.speed" />
    </el-form-item>
    <el-form-item label="方向" prop="direction">
      <el-input v-model="ruleForm.direction" />
    </el-form-item>
    <el-form-item label="最大间距" prop="direction">
      <el-input v-model="ruleForm.direction" />
    </el-form-item>

    <el-form-item label="飞行时间" prop="speed">
      <el-input v-model="ruleForm.speed">
        <template #suffix>
          <el-icon class="el-input__icon">秒</el-icon>
        </template>
      </el-input>
    </el-form-item>

  </el-form>

  <div class="text-center">
    <el-button @click="close">取消</el-button>
    <el-button type="primary" @click="submitForm(ruleFormRef)">
      提交
    </el-button>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const emit = defineEmits(["close"]);
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
  // shape: [
  //   {
  //     required: true,
  //     message: '请选择编队形态',
  //     trigger: 'change',
  //   },
  // ],

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



const close = () => {
  emit('close');

}

</script>
