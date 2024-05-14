<template>

    <el-form :model="formSearch" class="p-5" label-position="right" label-width="80px">
        <el-row>
            <el-col :span="6">
                <el-form-item label="类型">
                    <el-select v-model="formSearch.region" placeholder="请选择类型">
                        <el-option label="类型一" value="shanghai"></el-option>
                        <el-option label="类型二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="型号">
                    <el-select v-model="formSearch.region" placeholder="请选择型号">
                        <el-option label="型号一" value="shanghai"></el-option>
                        <el-option label="型号二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="机号">
                    <el-select v-model="formSearch.region" placeholder="请选择机号">
                        <el-option label="机号一" value="shanghai"></el-option>
                        <el-option label="机号二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" class="text-center">
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="" @click="onReset">清空</el-button>
            </el-col>
        </el-row>


    </el-form>

</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'


const formSearch = reactive({
    user: '',
    region: ''
})
const onSubmit = () => {
    console.log('搜索')
}
const onReset = () => {
    console.log('清空')
}
</script>