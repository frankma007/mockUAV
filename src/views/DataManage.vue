<template>
    <div class="container-fluid  p-4">

        <h2 class="pt-2 pb-2">无人机数据管理</h2>
        <p><router-link to="/" class="text item">返回首页</router-link></p>
        <SearchDataManage :key="searchKey"  @get-list="getList"></SearchDataManage>
        <el-row>
            <el-col>
                <el-button type="primary" @click="dialogVisible = true">
                    新增
                </el-button>
            </el-col>
        </el-row>

        <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="新增" width="800" center destroy-on-close
            lock-scroll :close-on-click-modal="false">

            <FormDataManage @added="searchKey++" @close="close"></FormDataManage>

        </el-dialog>
        <el-dialog v-if="dialogVisibleEdit" v-model="dialogVisibleEdit" title="修改" width="800" center destroy-on-close
            lock-scroll :close-on-click-modal="false">

            <FormDataManage :data="editData" @added="searchKey++" @close="close"></FormDataManage>

        </el-dialog>

        <!-- class="table table-striped"> -->
        <el-table :data="tableData" empty-text="暂无数据" border style="width: 100%" class="mt-4  table-hover" ref="multipleTableRef"
            @selection-change="handleSelectionChange">

            <!-- <el-table-column type="selection" width="55" /> -->

            <el-table-column prop="type" label="类型" width="180" />
            <el-table-column prop="version" label="型号" />
            <el-table-column prop="deviceNum" label="机号" />
            <el-table-column prop="length" label="长" />
            <el-table-column prop="width" label="宽" />
            <el-table-column prop="height" label="高" />
            <el-table-column prop="weight" label="重量" />
            <el-table-column prop="maxTime" label="飞行最大航时" />

            <el-table-column prop="ceiling" label="使用升限" />
            <el-table-column prop="maxSpeed" label="最大速度" />

            <el-table-column label="操作">
                <template #default="props">
                    <el-button @click="toEdit(props.row)">编辑</el-button>
                    <el-button @click="toDel(props.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>

</template>

<script lang="ts" setup>



import { reactive, ref,onMounted } from 'vue'
// import AddDialog from './AddDialog.vue';
import FormDataManage from '@/views/imitatedData/FormDataManage.vue';
import SearchDataManage from '@/views/searchQuery/SearchDataManage.vue';
import { get } from "@/assets/utils/api.js";
import { ElMessage } from "element-plus";
const multipleSelection = ref([])
const dialogVisible = ref(false)
const searchKey=ref(0)

const editData=ref({})
const  dialogVisibleEdit = ref(false)
const tableData = ref([])
const getList=(e)=>{
    debugger
 tableData.value = e
}
const toEdit = (data: any) => {
    // console.log(id)
    dialogVisibleEdit.value = true
    delete data.statusNum;
    delete data.createTime
    delete data.updateTime
    editData.value =data

}
const toDel = async(id: any) => {
    console.log(id)
    // task/api/UavDataDel
    const { data:{code, message} } = await get('/api/task/UavDataDel?id='+id)
    debugger
    if(code ==200){
        ElMessage({
    message: '删除成功',
    type: 'success'
  })
  searchKey.value++
  
 
    }else{
        ElMessage({
    message,
    type: 'error'
  })
    }
   
}

const handleSelectionChange = (val: []) => {
    multipleSelection.value = val
}


const close = () => {
    
    dialogVisible.value = false
    dialogVisibleEdit.value=false
}


</script>
