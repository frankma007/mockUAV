<template>
       <div class="title-box">告警配置</div>
       <el-form
    ref="ruleFormRef"
  
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
   
    status-icon
  >
    <el-form-item label="影响范围" prop="influence">
      <el-input v-model="ruleForm.influence" placeholder="请输入影响范围" />
    </el-form-item>
    <el-form-item label="告警范围" prop="alarm">
      <el-input v-model="ruleForm.alarm" placeholder="请输入告警范围" />
    </el-form-item>
    <el-form-item label="预警范围" prop="preWarning">
      <el-input v-model="ruleForm.preWarning" placeholder="请输入预警范围" />
    </el-form-item>
  
    <div class="d-flex justify-content-end">
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
      <!-- <el-button @click="resetForm(ruleFormRef)">取消</el-button> -->
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import {
    reactive,
    ref
} from 'vue'



import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    influence: string
  alarm: string
  preWarning: string
}

// const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    influence: '',
    alarm: '',
    preWarning: '',
 
})



const rules = reactive<FormRules<RuleForm>>({
      influence: [
    { required: true, message: '请输入影响范围', trigger: 'blur' },
    { min: 3, max: 5, message: '长度应该到3到5个字节', trigger: 'blur' },
  ],
  alarm: [
  { required: true, message: '请输入告警范围', trigger: 'blur' },
  { min: 3, max: 5, message: '长度应该到3到5个字节', trigger: 'blur' },
  ],
  preWarning: [
  { required: true, message: '请输入预警范围', trigger: 'blur' },
  { min: 3, max: 5, message: '长度应该到3到5个字节', trigger: 'blur' },
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

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>
<style lang="scss" >

.title-box {
        text-align: center;
        height: 42px;      
        font-size: 18px;       
        padding: 0 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: linear-gradient(to right, #37446a, #141b2a);       
    }




</style>