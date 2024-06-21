<template>

    <el-form :model="formSearch" ref="formSearchRef" class="p-5" label-position="right" label-width="80px">
        <el-row>
            <el-col :span="6">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="formSearch.name" placeholder="输入名称">

                    </el-input>
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
    name: '',
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