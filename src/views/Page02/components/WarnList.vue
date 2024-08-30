<template>
    <div class="warn-box">
            <div class="title-box">告警列表</div>
            <div class="search-box">

                <!-- <el-input class="input-box" v-model="search" placeholder="请输入关键字.." />
                <div class="btn-normal">新建任务</div> -->
                <el-select class="input-box"
      v-model="value1"
      placeholder="请选择"
      
      
    >
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select class="input-box" v-model="value" placeholder="请选择" >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
            </div>
            <div class="container">
                <div class="row th-box">
                    <div class="col-1 d-flex justify-content-center align-items-center">
                        #
                    </div>
                    <div class="col-3 d-flex justify-content-center align-items-center">
                        目标名称
                    </div>
                    <div class="col-3 d-flex justify-content-center align-items-center">
                        类型
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        速度
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        来源
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                       风险
                    </div>
                </div>
                <div class="row td-box">
                    <div class="col-1 d-flex justify-content-center align-items-center">
                        1
                    </div>
                    <div class="col-3 text-truncate d-flex justify-content-center align-items-center">
                        非合作目标-05
                    </div>
                    <div class="col-3 d-flex justify-content-center align-items-center">
                      固定翼
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                      7m/s
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        雷达
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        5
                    </div>
                </div>
                <div class="row td-box">
                    <div class="col-1 d-flex justify-content-center align-items-center">
                        3
                    </div>
                    <div class="col-3 text-truncate d-flex justify-content-center align-items-center">
                        非合作目标-04
                    </div>
                    <div class="col-3  d-flex justify-content-center align-items-center">
                      多旋翼
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                      7m/s
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        光电
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                       2
                    </div>
                </div>
                <div class="row td-box">
                    <div class="col-1 d-flex justify-content-center align-items-center">
                        4
                    </div>
                    <div class="col-3 text-truncate d-flex justify-content-center align-items-center">
                        非合作目标-03
                    </div>
                    <div class="col-3 d-flex justify-content-center align-items-center">
                      多旋翼
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                      7m/s
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        光电
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                       2
                    </div>
                </div>
                <div class="row td-box">
                    <div class="col-1 d-flex justify-content-center align-items-center">
                        2
                    </div>
                    <div class="col-3 text-truncate d-flex justify-content-center align-items-center">
                        非合作目标-04
                    </div>
                    <div class="col-3 d-flex justify-content-center align-items-center">
                      多旋翼
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                      7m/s
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        光电
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                       2
                    </div>
                </div>
                <div class="row td-box">
                    <div class="col-1 d-flex justify-content-center align-items-center">
                        2
                    </div>
                    <div class="col-3 text-truncate d-flex justify-content-center align-items-center">
                        非合作目标-04
                    </div>
                    <div class="col-3 d-flex justify-content-center align-items-center">
                      多旋翼
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                      7m/s
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        光电
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                       2
                    </div>
                </div>


            </div>
        </div>
</template>
<script lang="ts" setup>
import {
    reactive,
    ref
} from 'vue'





const tableData = [{
    date: '2016-05-03',
    name: '飞行计划A',
    type: '巡线',
    uav: '无人机A',
    department: '申报部门C',

    address: 'No. 189, Grove St, Los Angeles',
},
{
    date: '2016-05-02',
    name: '飞行计划B',
    type: '巡查',
    uav: '无人机B',
    department: '申报部门D',

    address: 'No. 189, Grove St, Los Angeles',
},
{
    date: '2016-05-04',
    name: '飞行计划A',
    type: '巡线',
    uav: '无人机B',
    department: '申报部门E',

    address: 'No. 189, Grove St, Los Angeles',
},
{
    date: '2016-05-01',
    name: '飞行计划C',
    type: '运输',
    uav: '无人机C',
    department: '申报部门F',

    address: 'No. 189, Grove St, Los Angeles',
}, {
    date: '2016-05-01',
    name: '飞行计划C',
    type: '运输',
    uav: '无人机C',
    department: '申报部门B',

    address: 'No. 189, Grove St, Los Angeles',
}, {
    date: '2016-05-01',
    name: '飞行计划C',
    type: '运输',
    uav: '无人机C',
    department: '申报部门A',
    address: 'No. 189, Grove St, Los Angeles',
}, {
    date: '2016-05-01',
    name: '飞行计划C',
    type: '运输',
    uav: '无人机C',
    department: '申报部门B',

    address: 'No. 189, Grove St, Los Angeles',
}, {
    date: '2016-05-01',
    name: '飞行计划C',
    type: '运输',
    uav: '无人机C',
    department: '申报部门A',

    address: 'No. 189, Grove St, Los Angeles',
}, {
    date: '2016-05-01',
    name: '飞行计划C',
    type: '运输',
    uav: '无人机C',
    department: '申报部门B',

    address: 'No. 189, Grove St, Los Angeles',
},
{
    date: '2016-05-01',
    name: '飞行计划C',
    type: '运输',
    uav: '无人机C',
    department: '申报部门B',

    address: 'No. 189, Grove St, Los Angeles',
},
]





const value = ref('0')

const options = [
    {
        value: '0',
        label: '全部风险',
    },
    {
        value: '1',
        label: '风险1',
    },
    {
        value: '2',
        label: '风险2',
    },    
]
const value1 = ref('0')

const options1 = [
    {
        value: '0',
        label: '全部类型',
    },
    {
        value: '1',
        label: '类型1',
    },
    {
        value: '2',
        label: '类型2',
    },    
]
</script>
<style lang="scss" scoped>
    .warn-box {
        width: 22.5%;
        height: calc((100vh - 15%)/3*1.3);
        position: absolute;
        right: 3%;
        top: 12%;
        /* background: rgba(224, 6, 6, 0.6); */
        z-index: 400;

        .title-box {
            text-align: center;
            height: 42px;

            font-size: 16px;

            padding: 0 15px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background: linear-gradient(to right, #37446a, #141b2a);


        }

        .search-box {
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            gap:12px;

            .input-box {
                border-radius: 2px;
                flex: 1;
                height: 40px;
                /* background:rgba(255,255,255,0.3); */
                /* color:#fff; */
                ::v-deep(.el-select__wrapper){
                 
                    /* color:#fff; */
                }
                ::v-deep(.el-select__placeholder) {
                    /* color:#fff; */
                }
                ::v-deep(.el-select__caret) {
                    /* color:#fff; */
                }
               
                ::v-deep(.el-input__inner){
                    /* background:rgba(255,255,255,0.5); */
                    /* color:#fff;
                    &::placeholder{
                    color:#fff;

                    } */
                }
            }

            .btn-normal {
                flex: 1;
                /* width: 30%;
                    height: 42px; */
                height: 40px;
                background: rgba(126, 169, 247, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                color: #141b2a;
                background: #fff;

            }

        }

        .th-box {
            height: 38px;
            /* display: flex; */
            /* 设置底边框背景 */
            color: #fff;
            font-size: 14px;
            /* align-items: center;
            justify-content: center; */
            background: rgba(16, 35, 42,0.3);
        }

        .td-box {
            background: rgba(16, 35, 42,0.5);
            height: 38px;
            font-size: 14px;
            border: 1px solid #fff;
            margin-top: 3px;
        }
    }
</style>
