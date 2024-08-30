<template>
     <!-- <div class="bg-tabs-box"></div> -->
    <div class="tabs-box">
        <div class="btn-box">
            <div class="btn-normal" :class="isActived == 0 ? 'current' : ''" @click="isActived = 0">任务列表</div>
            <div class="btn-normal " :class="isActived == 1 ? 'current' : ''" @click="isActived = 1">白名单</div>
            <div class="btn-normal" :class="isActived == 2 ? 'current' : ''" @click="isActived = 2">告警配置</div>
        </div>
        <TaskList v-if="isActived == 0">
           
        </TaskList>
        <white-list v-if="isActived == 1">
           
        </white-list>
        <alarm-config v-if="isActived ==2" />



    </div>
</template>
<script lang="ts" setup>
import {
    reactive,
    ref
} from 'vue'

import TaskList from './Task/TaskList.vue'
import WhiteList from './WhiteList/WhiteList.vue'
import AlarmConfig from './AlarmConfig.vue'


const isActived = ref(0)
const search = ref('')
</script>
<style lang="scss" >
    .bg-tabs-box {
        width: 22.5%;
    height: calc((100vh - 15%)/3*2);
    position: absolute;
    left: 3%;
    top: 12%;
    background: rgba(224, 6, 6, 0.5);
    z-index: 400;
    filter: blur(2px);
    border-radius: 4px;
    }
.tabs-box {
    width: 22.5%;
    height: calc((100vh - 15%)/3*2);
    position: absolute;
    left: 3%;
    top: 12%;
    /* background: rgba(224, 6, 6, 0.6); */
    z-index: 400;
    /* filter: blur(20px); */
    /* background:rgba(55, 68, 106,0.6); */

    .btn-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;

        .btn-normal {
            width: 30%;
            height: 42px;
            background: rgba(126, 169, 247, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &.current {
                color: #141b2a;
                background: #fff;
            }

        }
    }




}




</style>
