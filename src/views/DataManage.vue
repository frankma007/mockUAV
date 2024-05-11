<template>
    <div class="container-fluid">
        <h2 class="pt-2 pb-2">无人机数据管理</h2>
        <p><router-link to="/" class="text item">返回首页</router-link></p>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
            :size="formSize" status-icon>
            <!-- 型号、巡航速度、飞行高度、物理尺寸 -->
            <el-form-item label="类型" prop="type">
                <el-input v-model="ruleForm.speed" />
            </el-form-item>
            <el-form-item label="型号" prop="type">
                <el-input v-model="ruleForm.speed" />
            </el-form-item>
            <el-form-item label="机号" prop="type">
                <el-input v-model="ruleForm.speed" />
            </el-form-item>
            <el-form-item label="长" prop="speed">
                <el-input v-model="ruleForm.speed" />
            </el-form-item>
            <el-form-item label="宽" prop="speed">
                <el-input v-model="ruleForm.speed" />
            </el-form-item>
            <el-form-item label="高" prop="speed">
                <el-input v-model="ruleForm.speed" />
            </el-form-item>
            <el-form-item label="重量" prop="speed">
                <el-input v-model="ruleForm.speed" />
            </el-form-item>


            <el-form-item label="飞行最大航时" prop="size">
                <el-input v-model="ruleForm.size" />
            </el-form-item>
            <el-form-item label="使用升限" prop="size">
                <el-input v-model="ruleForm.size" />
            </el-form-item>
            <el-form-item label="最大速度" prop="longitude">
                <el-input v-model="ruleForm.longitude" />
            </el-form-item>
            <!-- <el-form-item label="起始纬度" prop="latitude">
                <el-input v-model="ruleForm.latitude" />
            </el-form-item> -->
            <!-- <el-form-item label="飞行高度" prop="height">
                <el-input v-model="ruleForm.height" />
            </el-form-item> -->

            <!-- 类型
            型号
            机号
            尺寸 长 宽 高
            重量
            飞行最大航时
            使用升限
            最大速度 -->


            <!-- <el-form-item label="飞行航向" prop="direction">
                <el-input v-model="ruleForm.direction">
                    <template #suffix>
                        <el-icon class="el-input__icon">°</el-icon>
                    </template>
</el-input>
</el-form-item> -->
            <!-- <el-form-item label="飞行时间" prop="speed">
                <el-input v-model="ruleForm.speed">
                    <template #suffix>
                        <el-icon class="el-input__icon">秒</el-icon>
                    </template>
                </el-input>
            </el-form-item> -->
            <!-- <el-form-item label="方位角" prop="Angle_A_Target">
      <el-input v-model="ruleForm.Angle_A_Target" >
        <template #suffix>
        <el-icon class="el-input__icon">°</el-icon>
      </template>
        </el-input>

    </el-form-item>
    <el-form-item label="俯仰角" prop="Angle_P_Target">
      <el-input v-model="ruleForm.Angle_P_Target" >
        <template #suffix>
        <el-icon class="el-input__icon">°</el-icon>
      </template>
        </el-input>
    </el-form-item> -->
            <!-- <el-form-item label="目标距离" prop="Distance_Target">
      <el-input v-model="ruleForm.Distance_Target" />
    </el-form-item>
    <el-form-item label="敌我属性" prop="Prop_IFF">
      <el-input v-model="ruleForm.Prop_IFF" />
    </el-form-item>
    <el-form-item label="威胁等级" prop="ThreatRank">
      <el-input v-model="ruleForm.ThreatRank" />
    </el-form-item>
    <el-form-item label="来源" prop="ID_Target">
      <el-input v-model="ruleForm.ID_Target" />
    </el-form-item>
    <el-form-item label="告警等级" prop="Alarm_Level">
      <el-input v-model="ruleForm.Alarm_Level" />
    </el-form-item> -->
            <!-- <el-form-item label="Activity zone" prop="region">
      <el-select v-model="ruleForm.region" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item> -->

            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确定
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

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
}


</script>