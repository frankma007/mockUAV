<template>
    <!-- px-4 -->
    <div class="container-fluid p-4">


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

        </el-form>
        <div class="text-center">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                提交
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const emit = defineEmits(["close"]);
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
const close = () => {
    emit('close');

}

</script>