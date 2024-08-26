<template>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="计划名称">
        <el-input v-model="formInline.user01" placeholder="计划名称" clearable />
    </el-form-item>
    <el-form-item label="类型">
        <el-select v-model="formInline.region" placeholder="类型" clearable>
            <el-option label="测试类型1" value="shanghai" />
            <el-option label="测试类型2" value="beijing" />
        </el-select>
    </el-form-item>

    <el-form-item>
        <el-button class="my-btn" type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
</el-form>
<el-row>
    <el-col :span="24" class="py-2 mb-2">
        <el-button type="primary" class="my-btn">新增</el-button>
    </el-col>
</el-row>
<el-row>
    <el-col :span="24">
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column type="index" :index="indexMethod" label="序号" width="66" />
            <el-table-column prop="name" label="计划名称" width="180" />
            <el-table-column prop="type" label="类型" width="180" />
            <el-table-column prop="department" label="申请单位" />
            <el-table-column prop="uav" label="无人机" />
            <el-table-column prop="date" label="计划时间" />

            <!-- <el-table-column prop="address" label="架次数" /> -->
            <!-- <el-table-column prop="address" label="评估结果" /> -->
            <el-table-column prop="date" label="调度时间" />
            <!-- <el-table-column prop="date" label="当前状态" /> -->
            <el-table-column prop="address" label="操作">

                <template  #default="scope" >
                    <!-- -->
                    <el-button size="small"> 修改 </el-button>
                     <!-- @click="handleEdit(scope.$index, scope.row)"> -->
                        <!-- @click="handleDelete(scope.$index, scope.row)" -->
                        <el-button size="small" type="danger">
                            删除
                        </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-col>

</el-row>
<el-row justify="end" class="mt-4">

    <!-- <div class="demonstration">All combined</div> -->
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]" :size="size" background layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

</el-row>
</template>
  
<script lang="ts"  setup>
import {
    reactive,
    ref
} from 'vue'
import type {
    ComponentSize
} from 'element-plus'

const formInline = reactive({
    user01: '',
    region: '',
  
})

const onSubmit = () => {
    console.log('submit!')
}
const indexMethod = (index: number) => {
    return index + 1
}
const tableData = [{
        date: '2016-05-03',
        name: '飞行计划A',
        type:'巡线',
        uav:'无人机A',
        department:'申报部门C',

        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: '飞行计划B',
        type:'巡查',
        uav:'无人机B',
        department:'申报部门D',

        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: '飞行计划A',
        type:'巡线',
        uav:'无人机B',
        department:'申报部门E',

        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: '飞行计划C',
        type:'运输',
        uav:'无人机C',
        department:'申报部门F',

        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-01',
        name: '飞行计划C',
        type:'运输',
        uav:'无人机C',
        department:'申报部门B',

        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-01',
        name: '飞行计划C',
        type:'运输',
        uav:'无人机C',
        department:'申报部门A',
        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-01',
        name: '飞行计划C',
        type:'运输',
        uav:'无人机C',
        department:'申报部门B',

        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-01',
        name: '飞行计划C',
        type:'运输',
        uav:'无人机C',
        department:'申报部门A',

        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-01',
        name: '飞行计划C',
        type:'运输',
        uav:'无人机C',
        department:'申报部门B',

        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: '飞行计划C',
        type:'运输',
        uav:'无人机C',
        department:'申报部门B',

        address: 'No. 189, Grove St, Los Angeles',
    },
]

const currentPage4 = ref(4)

const pageSize4 = ref(100)
const size = ref < ComponentSize > ('default')

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
</script>

<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}

/* .demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bot飞行计划A: 16px;
} */
 .my-btn{
    background: linear-gradient(to bottom,  #315378,#1d243a);
    border: 1px solid #1d243a  !important;
  
    &:hover{
        /* background: #1d243a;
        border: 1px solid #315378 !important; */
        /* filter: grayscale(6%) ; */
        /* background-blend-mode: darken; */
        /* background-blend-mode: multiply; */
        background: linear-gradient(to bottom, #141b2a, #374368);
        border: 1px solid #7ea9f7 !important;
        transition: all 0.35s ease-in-out !important;
        /* transition: background 5s ease-in-out !important; */
    }
 }
 /* --el-color-primary:linear-gradient(to bottom, #7ea9f7, #315378); */
</style>
