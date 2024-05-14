<template>

    <el-form :model="formSearch" class="p-5" label-position="right" label-width="80px">
        <el-row>
            <el-col :span="6">
                <el-form-item label="名称">
                    <el-input v-model="formSearch.name" placeholder="输入名称">

                    </el-input>
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
    name: '',
    region: ''
})
const onSubmit = () => {
    console.log('搜索')
}
const onReset = () => {
    console.log('清空')
}
</script>