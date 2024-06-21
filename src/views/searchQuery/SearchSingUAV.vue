<template>

    <el-form :model="formSearch" ref="formSearchRef" class="p-5" label-position="right" label-width="80px">
        <el-row>
            <el-col :span="6">
                <el-form-item label="类型" prop="region">
                    <el-select v-model="formSearch.region" placeholder="请选择类型">
                        <el-option label="类型一" value="shanghai"></el-option>
                        <el-option label="类型二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="型号"  prop="region">
                    <el-select v-model="formSearch.region" placeholder="请选择型号">
                        <el-option label="型号一" value="shanghai"></el-option>
                        <el-option label="型号二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="机号"  prop="region"> 
                    <el-select v-model="formSearch.region" placeholder="请选择机号">
                        <el-option label="机号一" value="shanghai"></el-option>
                        <el-option label="机号二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" class="text-center">
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="" @click="resetForm(formSearchRef)">清空</el-button>

            </el-col>
        </el-row>


    </el-form>

</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
const formSearchRef = ref<FormInstance>()

const formSearch = reactive({
    user: '',
    region: ''
})
const onSubmit = () => {
    console.log('搜索')
}
const resetForm=(formEl: FormInstance | undefined) => {
    console.log(333)
    // console.log('清空')
    // formSearch.user=''
    // formSearch.region=''
    if (!formEl) return
    formEl.resetFields();
}
</script>