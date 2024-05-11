<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" :size="formSize"
    status-icon>
    <el-form-item label="无人机群名称" prop="number">
      <el-input v-model="ruleForm.number" placeholder="" />
    </el-form-item>

    <el-form-item label="无人机编队形态" prop="shape">
      <el-select v-model="ruleForm.shape" placeholder="请选择编队形态">

        <el-option v-for="(item, index) in shapeList" :key="index" :label="item.label" :value="item.value" />

      </el-select>
    </el-form-item>

    <div v-if="ruleForm.shape == '0'">
      <el-form-item label="无人机数量" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架 奇数" />
      </el-form-item>
      <el-form-item label="左侧" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架" />
      </el-form-item>
      <el-form-item label="右侧" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架" />
      </el-form-item>
      <el-form-item label="核心机经度" prop="longitude">
        <el-input v-model="ruleForm.longitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机纬度" prop="latitude">
        <el-input v-model="ruleForm.latitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机高度" prop="height">
        <el-input v-model="ruleForm.height" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="横向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="纵向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="高度差" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>

    </div>
    <div v-if="ruleForm.shape == '1'">
      <el-form-item label="无人机数量" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架 4的倍数" />
      </el-form-item>
      <!-- <el-form-item label="左侧" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架" />
      </el-form-item>
      <el-form-item label="右侧" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架" />
      </el-form-item> -->
      <el-form-item label="核心机经度" prop="longitude">
        <el-input v-model="ruleForm.longitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机纬度" prop="latitude">
        <el-input v-model="ruleForm.latitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机高度" prop="height">
        <el-input v-model="ruleForm.height" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="横向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="纵向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="高度差" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>

    </div>

    <div v-if="ruleForm.shape == '2'">
      <!-- T字形 -->
      <el-form-item label="无人机数量" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架" />
      </el-form-item>
      <el-form-item label="横向个数" prop="number">
        <el-input v-model="ruleForm.number" placeholder="奇数" />
      </el-form-item>
      <el-form-item label="纵向个数" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" />
      </el-form-item>
      <el-form-item label="核心机经度" prop="longitude">
        <el-input v-model="ruleForm.longitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机纬度" prop="latitude">
        <el-input v-model="ruleForm.latitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机高度" prop="height">
        <el-input v-model="ruleForm.height" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="横向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="纵向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="高度差" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>

    </div>
    <div v-if="ruleForm.shape == '4'">
      <!-- 十字形 -->
      <el-form-item label="无人机数量" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架" />
      </el-form-item>
      <el-form-item label="横向个数" prop="number">
        <el-input v-model="ruleForm.number" placeholder="奇数" />
      </el-form-item>
      <el-form-item label="纵向个数" prop="number">
        <el-input v-model="ruleForm.number" placeholder="奇数" />
      </el-form-item>
      <el-form-item label="核心机经度" prop="longitude">
        <el-input v-model="ruleForm.longitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机纬度" prop="latitude">
        <el-input v-model="ruleForm.latitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机高度" prop="height">
        <el-input v-model="ruleForm.height" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="横向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="纵向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="高度差" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>

    </div>

    <div v-if="ruleForm.shape == '3'">
      <!-- 矩形 -->
      <el-form-item label="无人机数量" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架" />
      </el-form-item>
      <el-form-item label="横向个数" prop="number">
        <el-input v-model="ruleForm.number" placeholder=">=2" />
      </el-form-item>
      <el-form-item label="纵向个数" prop="number">
        <el-input v-model="ruleForm.number" placeholder=">=2" />
      </el-form-item>
      <el-form-item label="核心机经度" prop="longitude">
        <el-input v-model="ruleForm.longitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机纬度" prop="latitude">
        <el-input v-model="ruleForm.latitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机高度" prop="height">
        <el-input v-model="ruleForm.height" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="横向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="纵向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="高度差" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>

    </div>
    <div v-if="ruleForm.shape == '6'">
      <!-- 阵列 -->
      <el-form-item label="无人机数量" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架" />
      </el-form-item>
      <el-form-item label="横向个数" prop="number">
        <el-input v-model="ruleForm.number" placeholder=">=2" />
      </el-form-item>
      <el-form-item label="纵向个数" prop="number">
        <el-input v-model="ruleForm.number" placeholder=">=2" />
      </el-form-item>
      <el-form-item label="核心机经度" prop="longitude">
        <el-input v-model="ruleForm.longitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机纬度" prop="latitude">
        <el-input v-model="ruleForm.latitude" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="核心机高度" prop="height">
        <el-input v-model="ruleForm.height" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="横向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="纵向间距" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="高度差" prop="number">
        <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
      </el-form-item>

    </div>
    <div v-if="ruleForm.shape == '5'">
      <!-- 无编队 -->
      <el-form-item label="无人机数量" prop="number">
        <el-input v-model="ruleForm.number" placeholder="最多20架" />
      </el-form-item>
      <div v-for="(item, index) in Number(ruleForm.number)" :key="index">
        <!-- <el-form-item :label="`无人机${item}`" prop="number">
          <el-input v-model="ruleForm.number" placeholder="" />
        </el-form-item> -->
        <el-row>
          <el-col :span="8">
            <el-form-item :label="`无人机${item}经度`" prop="number">
              <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="`无人机${item}纬度`" prop="number">
              <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">°</el-icon>
          </template>
        </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="`无人机${item}高度`" prop="number">
              <el-input v-model="ruleForm.number" placeholder="" >
          <template #suffix>
            <el-icon class="el-input__icon">米</el-icon>
          </template>
        </el-input>
            </el-form-item>
          </el-col>
        </el-row>



      </div>
    </div>

    <el-form-item label="飞行速度" prop="speed">
      <el-input v-model="ruleForm.speed" >
          <template #suffix>
            <el-icon class="el-input__icon">米/秒</el-icon>
          </template>
        </el-input>
    </el-form-item>
    <el-form-item label="飞行航向" prop="direction">
      <el-input v-model="ruleForm.direction" >
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
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item> -->
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
const close=()=>{
  emit('close');

}



</script>
<style lang="scss" scoped>
.content {
  // background-color: skyblue;
  // border-radius: 4px;
}
</style>
