<template>


    <el-form :model="formSearch" ref="formSearchRef" class="p-5" label-position="right" label-width="80px">


        <el-row>
            <el-col :span="6">

                <el-form-item label="类型" prop="type">
                    <el-select v-model="formSearch.type" placeholder="请选择类型" clearable @clear="formSearch.version='';formSearch.deviceNum=''" @change="getVersion()">
                        <el-option v-for=" (item, index) in typeList" :label="item?.type" :value="item?.type"
                            :key="index">

                        </el-option>

                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">

                <el-form-item label="型号" prop="version">
                    <el-select :disabled="!formSearch.type" v-model="formSearch.version" placeholder="请选择型号" clearable  @clear="formSearch.deviceNum=''" @change="getDeviceNum()">
                        <el-option v-for=" (item, index) in versionList" :label="item?.version" :value="item?.version"
                            :key="index">


                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="机号" prop="deviceNum">
                    <el-select :disabled="!formSearch.version" v-model="formSearch.deviceNum" placeholder="请选择机号" clearable >
                        <el-option v-for=" (item, index) in deviceNumList" :label="item?.deviceNum"
                            :value="item?.deviceNum" :key="index">


                        </el-option>
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
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { post, get } from "@/assets/utils/api.js";
const emit = defineEmits(["getList"]);
const formSearchRef = ref<FormInstance>()
const formSearch = reactive({
    type: '',
    version: '',
    deviceNum: ''
})

const onSubmit = async () => {
    console.log('搜索')
    // api/task/UavDataQuery
    const { data: { code, dataMap } } = await post('/api/task/UavDataQuery', formSearch)
    debugger
    if (code == 200) {
        emit('getList', dataMap.queryDeploy)
    }

}
interface selectList {
    type?: string;
    version?: string;
    deviceNum?: string

}
const typeList = ref<selectList[]>([])
const versionList = ref<selectList[]>([])
const deviceNumList = ref<selectList[]>([])
const getType = async () => {

    // api/task/UavDataQuery
    const { data: { code, dataMap } } = await get('/api/task/UavDataQueryType')

    if (code == 200) {
        typeList.value = dataMap.queryDeploy
    }



}
/* const typeChange =()=>{
    getVersion()
} */

const getVersion = async () => {


    const { data: { code, dataMap } } = await get('/api/task/UavDataQueryVersion?type='+formSearch.type)

    if (code == 200) {
        versionList.value = dataMap.queryDeploy
    }



}
const getDeviceNum = async () => {



    const { data: { code, dataMap } } = await get('/api/task/UavDataQueryDeviceNum?version='+formSearch.version+'&type='+formSearch.type)

    if (code == 200) {
        deviceNumList.value = dataMap.queryDeploy
    }


}
// /api/task/UavDataQueryType  类型
// /api/task/UavDataQueryVersion  型号
// /api/task/UavDataQueryDeviceNum 机号
onMounted(() => {
    getType()
    // getVersion()
    // getDeviceNum()
    onSubmit()
})
const resetForm = (formEl: FormInstance | undefined) => {
    console.log(333)
    // console.log('清空')
    // formSearch.user=''
    // formSearch.region=''
    if (!formEl) return
    formEl.resetFields();
}
</script>