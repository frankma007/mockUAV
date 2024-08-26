<template>
<TimeBox />
<div class="m-container">

<el-row type="flex" :gutter="12" class="row1">
    <el-col :span="6" class="double-box">
        <div class="double-item">
        <dv-border-box-8>
          <DutyTody title="无人机" />
        </dv-border-box-8>
    </div>
   <!--      <dv-border-box-8 style="margin-top:10px;">
          <DutyTody />
        </dv-border-box-8> -->
        <div class="double-item">
        <dv-border-box-8>

          <DutyTody title="无人船" />
        </dv-border-box-8>
    </div>

    </el-col>
    <el-col :span="12">
        <dv-border-box-8>
         <Map />
        </dv-border-box-8>
    </el-col>

    <el-col :span="6" class="double-box">

        <dv-border-box-8>

          <DutyTody title="飞行计划调度" />
        </dv-border-box-8>
      <!--   <dv-border-box-8 style="margin-top:10px;">
         <DutyTody />
        </dv-border-box-8> -->
    </el-col>
</el-row>

<el-row type="flex" :gutter="12" style="margin-top: 12px;" class="row2">
    <el-col :span="6">

        <dv-border-box-8>

          <DutyTody title="飞行任务" />

        </dv-border-box-8>
    </el-col>
    <el-col :span="12">
        <dv-border-box-8>
            <DutyTody title="无人船航行计划调度" />

        </dv-border-box-8>
    </el-col>
    <el-col :span="6">
        <dv-border-box-8>
           <DutyTody title="飞行员" />
        </dv-border-box-8>
    </el-col>
</el-row>

</div>


</template>
  
<script lang="ts"  setup>
import {
    reactive,
    ref
} from 'vue'
import type {
    ComponentSize
} from 'element-plus'

import TimeBox from './components/TimeBox.vue';
import DutyTody from './components/DutyTody.vue';
import Map from './components/map.vue';
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



const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style lang="scss" scoped>

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
 .m-container {
        margin-top: 12px;
        /* height: 100; */
        height: calc(100vh - 162px - 12px - 7px);
        overflow: hidden;
        color: #fff;

        .row1 {
            /* height: calc((100vh - 92px - 12px * 3) / 3 * 2); */
            height:calc(66.67% - 12px - 7px);
            position: relative;
        }

        .row2 {
            /* height: 50vh; */
            height:calc(33.33%);
            /* height: calc((100vh - 92px - 12px * 3) / 3); */
            position: relative;
        }
    }

    .left-container {
        width: 25%;
        // flex:1;

        // padding: 10px;
        // box-sizing: border-box;

        // .border-box-content {
        //   flex-direction: column;
        // }
        display: flex;
        flex-direction: column;
        margin: 0 6px;
        box-sizing: border-box;

        .top-box {
            flex: 3;

        }

        .bottom-box {

            margin-top: 12px;
            flex: 2;

            .border-box-content {
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;

            }

        }
    }

   .video-box{
        // width:calc(100% - 6px);
        padding: 3px;
        border-radius: 3px;
        width: 100%;
        height: 100%;
        video{
          width: 100%;
          height: 100%;
          /* object-fit: cover; */
          object-position: left top;
          object-fit: fill; opacity: 1; transform: scale(1) perspective(500px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        }
    }

    .main-container {
        width: 50%;
        // padding-left: 5px;
        margin: 0 6px;

        // flex:2;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin: 0 6px;

        .top-box {
            flex: 3;
        }

        .bottom-box {
            margin-top: 12px;
            flex: 2;
            overflow: hidden;
        }
    }

    .right-container {
        margin: 0 6px;

        // flex:1;

        width: 25%;
        // padding-left: 5px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin: 0 6px;

        .top-box {
            flex: 3;
            display: flex;
            flex-direction: column;
            // >div{
            //   flex:1;
            // }
        }

        .bottom-box {
            margin-top: 12px;
            flex: 2;
        }
    }

    /*   .rmctc-chart-1, .rmctc-chart-2 {
    height: 50%;
  } */


.double-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:10px;
    height: 100%;
    color: #fff;
    .double-item{
        flex:1;
        display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:50%;
    color: #fff;
    }

}
</style>
