<template>
    <div class="title-box">任务列表</div>
    <div class="search-box">
        <el-input class="input-box" v-model="search" placeholder="请输入关键字.." />
        <div class="btn-normal" @click="issuggest=true">新建任务</div>
    </div>
    <div class="container">
        <div class="row th-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                #
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                任务名称
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                状态
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                类型
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                时间
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                操作
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                1
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-success">执行中</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span type="button" class="text-info">查看</span>
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                2
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-success">执行中</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span type="button" class="text-info">查看</span>
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                3
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-success">执行中</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span type="button" class="text-info">查看</span>
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                4
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-success">执行中</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span class="text-info">查看</span>
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                5
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-success">执行中</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span type="button" class="text-info">查看</span>
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                6
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-success">执行中</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span type="button" class="text-info">查看</span>
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                7
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-success">执行中</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span type="button" class="text-info">查看</span>
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                8
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-success">执行中</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span type="button" class="text-info">查看</span>
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                9
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-success">执行中</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span type="button" class="text-info">查看</span>
            </div>
        </div>
        <div class="row td-box">
            <div class="col-1 d-flex justify-content-center align-items-center">
                10
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                xxx任务
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <span class="text-warning">已结束</span>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                xxx
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                24h
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <span type="button" class="text-info">查看</span>
            </div>
        </div>
    </div>
    <AddTask :issuggest="issuggest" @update:issuggest="issuggest = false" />
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";

import AddTask from "./AddTask.vue";

const search = ref("");
const issuggest = ref(true);
</script>
<style lang="scss" scoped>
.title-box {
    text-align: center;
    height: 42px;
    /* line-height: 42px; */
    // display: flex;
    // justify-content: center;
    // align-items: center;
    font-size: 18px;
    // margin-bottom: 20px;
    padding: 0 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(to right, #37446a, #141b2a);

    /* width: calc(100% - 6px); */
    /* position: relative; */
    /* left: 3px;
                top: 3px; */
}

.search-box {
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    .input-box {
        border-radius: 2px;
        flex: 1;
        height: 40px;
        /* background: rgba(255, 255, 255, 0.3); */
        /* color: #fff; */

        ::v-deep(.el-input__inner) {
            /* background:rgba(255,255,255,0.5); */
            /* color: #fff; */

            /* &::placeholder {
                    color: #fff;

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
    background: rgba(16, 35, 42, 0.3);
}

.td-box {
    background: rgba(16, 35, 42, 0.5);
    height: 38px;
    font-size: 14px;
    border: 1px solid #fff;
    margin-top: 3px;
}

.text-info {
    cursor: pointer;
}
</style>
