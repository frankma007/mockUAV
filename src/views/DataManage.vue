<template>
    <div class="container-fluid  p-4">

        <h2 class="pt-2 pb-2">无人机数据管理</h2>
        <p><router-link to="/" class="text item">返回首页</router-link></p>
        <SearchDataManage></SearchDataManage>
        <el-row>
            <el-col>
                <el-button type="primary" @click="dialogVisible = true">
                    新增
                </el-button>
            </el-col>
        </el-row>

        <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="新增" width="800" center destroy-on-close
            lock-scroll :close-on-click-modal="false">

            <FormDataManage @close="close"></FormDataManage>

        </el-dialog>

        <!-- class="table table-striped"> -->
        <el-table :data="tableData" border style="width: 100%" class="mt-4  table-hover" ref="multipleTableRef"
            @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55" />

            <el-table-column prop="Type_Target" label="类型" width="180" />
            <el-table-column prop="Speed" label="型号" />
            <el-table-column prop="Direction" label="机号" />
            <el-table-column prop="Direction" label="长" />
            <el-table-column prop="Direction" label="宽" />
            <el-table-column prop="Direction" label="高" />
            <el-table-column prop="Direction" label="重量" />
            <el-table-column prop="Direction" label="飞行最大航时" />

            <el-table-column prop="Distance_Target" label="使用升限" />
            <el-table-column prop="Distance_Target" label="最大速度" />

            <el-table-column label="操作">
                <template #default="props">

                    <el-button @click="toEdit(props.row.id)">编辑</el-button>
                    <el-button @click="toEdit(props.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>

</template>

<script lang="ts" setup>



import { reactive, ref } from 'vue'
// import AddDialog from './AddDialog.vue';
import FormDataManage from '@/views/imitatedData/FormDataManage.vue';
import SearchDataManage from '@/views/searchQuery/SearchDataManage.vue';

const multipleSelection = ref([])
const dialogVisible = ref(false)


const tableData = [
    {
        Type_Target: '多旋无人机',
        Speed: '2',
        Direction: '96°',
        Angle_A_Target: '12.1°',
        Angle_P_Target: '123.1°',
        Altitude_Target: '10',
        Distance_Target: '66',
        Prop_IFF: '1',
        ThreatRank: '2',
        ID_Target: 'C',
        Alarm_Level: '2'
    },
    {
        Type_Target: '多旋无人机',
        Speed: '2',
        Direction: '96°',
        Angle_A_Target: '12.1°',
        Angle_P_Target: '123.1°',
        Altitude_Target: '10',
        Distance_Target: '66',
        Prop_IFF: '1',
        ThreatRank: '2',
        ID_Target: 'C',
        Alarm_Level: '2'
    },

]
const toEdit = (id: any) => {
    console.log(id)
    dialogVisible.value = true
}
const handleSelectionChange = (val: []) => {
    multipleSelection.value = val
}


const close = () => {
    debugger
    dialogVisible.value = false
}


</script>
