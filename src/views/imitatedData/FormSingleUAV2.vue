<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="container-fluid p-4"
      :size="formSize" status-icon>
      <el-form-item label="目标距离" prop="Distance_Target">
        <el-input v-model="ruleForm.Distance_Target" />
      </el-form-item>
      <el-form-item label="目标高度" prop="Altitude_Target">
        <el-input v-model="ruleForm.Altitude_Target" />
      </el-form-item>
      <el-form-item label="目标方位角" prop="Angle_A_Target">
        <el-input v-model="ruleForm.Angle_A_Target" />
      </el-form-item>




      <el-form-item label="目标俯仰角" prop="Angle_P_Target">
      <el-input v-model="ruleForm.Angle_P_Target" />
    </el-form-item>
      <el-form-item label="目标航向角" prop="Direction">
        <el-input v-model="ruleForm.Direction">
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="批号" prop="ID_Target_Fusion">
        <el-input v-model="ruleForm.ID_Target_Fusion">
         
        </el-input>
      </el-form-item>
      <el-form-item label="航速" prop="Speed">
        <el-input v-model="ruleForm.Speed">
          <template #suffix>
            <el-icon class="el-input__icon">米/秒</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="目标类型" prop="Type_Target">
        <el-input v-model="ruleForm.Type_Target">
          
        </el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="Latitude_Target">
        <el-input v-model="ruleForm.Latitude_Target">
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="经度" prop="Longitude_Target">
        <el-input v-model="ruleForm.Longitude_Target">
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
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
import { reactive, ref, onMounted } from 'vue'
import {post} from '@/assets/utils/api.js';
 
/* post('/api/home').then((rsp)=>{
    console.log(rsp);
}) */
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
})
interface RuleForm {
  Distance_Target: string;
  Altitude_Target: string;
  Angle_A_Target: string;
  Angle_P_Target: string;
  Direction: string;
  ID_Target_Fusion: string;
  Speed: string;

  Type_Target: string;
  Latitude_Target: string;
  Longitude_Target: string

}
const typeList = reactive([
  { label: '多旋无人机', value: '0' },
  { label: '固定式无人机', value: '1' },
  { label: '大疆', value: '2' },

])
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
 /*  Distance_Target--目标距离

Altitude_Target--目标高度

Angle_A_Target--目标方位角

Angle_P_Target--目标俯仰角

Direction--目标航向角

ID_Target_Fusion--批号

Speed--航速

Type_Target--目标类型

Latitude_Target--纬度

Longitude_Target--经度 */
// 374000 	27702	145340	2700	-34660	15	2001	9	3100144627	12143502133
const ruleForm = reactive<RuleForm>({
  Distance_Target: '374000',
  Altitude_Target: '27702',
  Angle_A_Target: '145340',
  Angle_P_Target: '2700',
  Direction: '-34660',
  ID_Target_Fusion: '',
  Speed: '2001',

  Type_Target: '9',
  Latitude_Target: '3100144627',
  Longitude_Target: '12143502133'


})



const rules = reactive<FormRules<RuleForm>>({
  Distance_Target: [
    { required: true, message: '请选目标距离', trigger: 'blur' },
    // { min: 3, max: 5, message: '长度在3 到 5个字符', trigger: 'blur' },
  ],
  Altitude_Target: [
    {
      required: true,
      message: '请输入目标高度',
      trigger: 'blur',
    },
  ],
  Angle_A_Target: [
    {
      required: true,
      message: '请输入目标方位角',
      trigger: 'blur',
    },
  ],
  Angle_P_Target: [
    {
      required: true,
      message: '请输入目标俯仰角',
      trigger: 'blur',
    },
  ],
  Direction: [
    {
      required: true,
      message: '请输入目标航向角',
      trigger: 'blur',
    },
  ],
  ID_Target_Fusion: [
    {
      required: true,
      message: '请输入批号',
      trigger: 'blur',
    },
  ],
  Speed: [
    {
      required: true,
      message: '请输入航速',
      trigger: 'blur',
    },
  ],
  Type_Target: [
    {
      required: true,
      message: '请输入目标类型',
      trigger: 'blur',
    },
  ],
  Latitude_Target: [
    {
      required: true,
      message: '请输入目标纬度',
      trigger: 'blur',
    },
  ],
  Longitude_Target: [
    {
      required: true,
      message: '请输入目标经度',
      trigger: 'blur',
    },
  ]

})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('submit!')

      // /api/RecognizeAddData
      post('/api/RecognizeAddData',ruleForm).then((rsp: any)=>{
          console.log(rsp);
      })
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
const close = () => {
  emit('close');

}
</script>
