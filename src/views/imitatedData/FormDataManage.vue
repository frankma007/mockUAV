<template>
    <!-- px-4 -->
    <div class="container-fluid p-4">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
            :size="formSize" status-icon>
            <!-- 型号、巡航速度、飞行高度、物理尺寸 -->
            <el-form-item label="类型" prop="type">
                <el-input v-model="ruleForm.type" />
            </el-form-item>
            <el-form-item label="型号" prop="version">
                <el-input v-model="ruleForm.version" />
            </el-form-item>
            <el-form-item label="机号" prop="deviceNum">
                <el-input v-model="ruleForm.deviceNum" />
            </el-form-item>
            <el-form-item label="长" prop="length">
                <el-input v-model="ruleForm.length">
                    <template #suffix>
                        <el-icon class="el-input__icon">米</el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="宽" prop="width">
                <el-input v-model="ruleForm.width">
                    <template #suffix>
                        <el-icon class="el-input__icon">米</el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="高" prop="height">
                <el-input v-model="ruleForm.height">
                    <template #suffix>
                        <el-icon class="el-input__icon">米</el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="重量" prop="weight">
                <el-input v-model="ruleForm.weight">
                    <template #suffix>
                        <el-icon class="el-input__icon">kg</el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item label="飞行最大航时" prop="maxTime">
                <el-input v-model="ruleForm.maxTime" />
            </el-form-item>
            <el-form-item label="使用升限" prop="ceiling">
                <el-input v-model="ruleForm.ceiling" />
            </el-form-item>

            <el-form-item label="最大速度" prop="maxSpeed">
                <el-input v-model="ruleForm.maxSpeed">
                    <template #suffix>
                        <el-icon class="el-input__icon">米/秒</el-icon>
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
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref,onMounted } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

import { post } from "@/assets/utils/api.js";
const emit = defineEmits(["close",'added']);
const props =defineProps({
    data:{
        type:  Object || undefined,
        default: () => {
          return null
        }
    }
    
})


interface RuleForm {
    id?:number,
    type: string;
    version: string;
    deviceNum: string;
    length: string;
    width: string;
    height: string;
    weight: string;
    maxTime: string;
    ceiling: string;
    maxSpeed: string;
}
const typeList = reactive([
    { label: "多旋无人机", value: "0" },
    { label: "固定式无人机", value: "1" },
    { label: "大疆", value: "2" },
]);
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref({
    type: "大疆",
    version: "多旋翼",
    deviceNum: "001",
    length: "9.6",
    width: "8.3",
    height: "4.6",
    weight: "3.2",
    maxTime: "19",
    ceiling: "10",
    maxSpeed: "19",
});
onMounted(()=>{
    // ruleForm.value={...props.data}
    Object.assign({},ruleForm.value,props.data)
})

const rules = reactive<FormRules<RuleForm>>({
    type: [
        { required: true, message: "请选择类型", trigger: "change" },
        // { min: 3, max: 5, message: '长度在3 到 5个字符', trigger: 'blur' },
    ],
    version: [
        {
            required: true,
            message: "请输入型号",
            trigger: "blur",
        },
    ],
    deviceNum: [
        {
            required: true,
            message: "请输入机号",
            trigger: "blur",
        },
    ],
    length: [
        {
            required: true,
            message: "请输入长度",
            trigger: "blur",
        },
    ],
    width: [
        {
            required: true,
            message: "请输入宽度",
            trigger: "blur",
        },
    ],
    height: [
        {
            required: true,
            message: "请输入高度",
            trigger: "blur",
        },
    ],
    weight: [
        {
            required: true,
            message: "请输入重量",
            trigger: "blur",
        },
    ],
    maxTime: [
        {
            required: true,
            message: "请输入飞行最大航时",
            trigger: "blur",
        },
    ],
    ceiling: [
        {
            required: true,
            message: "请输入使用升限",
            trigger: "blur",
        },
    ],
    maxSpeed: [
        {
            required: true,
            message: "请输入最大速度",
            trigger: "blur",
        },
    ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    const valid = await formEl.validate()

    if (valid) {

        const { data:{code, message} } = await post('/api/task/UavDataAdd', ruleForm.value)
debugger
        if (code == 200) {
         
            ElMessage({
                message,
                type: 'success',
            })
            setTimeout(()=>{
                close()
                emit('added')
            },3000)
        }
        else {
            ElMessage({
                message,
                type: 'error',
            })
        }
    }



};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
const close = () => {
    emit("close");
};
</script>
