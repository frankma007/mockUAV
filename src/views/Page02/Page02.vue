<template>
    <!-- <TimeBox /> -->
    <div class="m-container">
        <Map />
        <div class="bg-top"></div>
        <div class="bg-bottom"></div>
        <div class="bg-left"></div>
        <div class="bg-right"></div>

        <TabsBox />
        <WarnList />
        <div class="bottom-box ">
            <div class="container-fluid">
                <div class="row bottom-content">
                    <div class="col-13  ">
                        <div class="data-access-title">数据接入</div>
                        <ul class="data-access-list">
                            <li class="data-access-item">xxx平台 <el-switch v-model="value3" size="default" inline-prompt
                                    active-text="开启" inactive-text="关闭" />
                            </li>
                            <li class="data-access-item">xxx平台 <el-switch v-model="value3" size="default" inline-prompt
                                    active-text="开启" inactive-text="关闭" />
                            </li>
                            <li class="data-access-item">xxx平台 <el-switch v-model="value3" size="default" inline-prompt
                                    active-text="开启" inactive-text="关闭" />
                            </li>
                        </ul>
                    </div>
                    <div class="col-30   equipment-box">
                        <div class="equipment-search-box">
                            <el-select v-model="formInline2.region" placeholder="Activity zone" clearable>
                                <el-option label="全部设备" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                            <el-select v-model="formInline2.region" placeholder="Activity zone" clearable>
                                <el-option label="全部设备" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                            <el-input v-model="formInline2.date" placeholder="请输入关键词" clearable />
                            <el-button class="w-100" type="primary" @click="onSubmit2">查询</el-button>

                        </div>
                     
                        <el-scrollbar height="190px" class="equipment-list-box">
                            <div class="equipment-item">
                                <div>雷达</div>
                                <div class="d-flex justify-content-between font-12">
                                    <div class="text-success">运行中</div>
                                    <div>探测数量 <span class="font-14">2</span></div>
                                </div>
                            </div>
                            <div class="equipment-item">
                                <div>光电</div>
                                <div class="d-flex justify-content-between font-12">
                                    <div class="text-success">运行中</div>
                                    <div>探测数量 <span class="font-14">2</span></div>
                                </div>
                            </div>
                            <div class="equipment-item">
                                <div>无线电监测</div>
                                <div class="d-flex justify-content-between font-12">
                                    <div class="text-success">运行中</div>
                                    <div>探测数量 <span class="font-14">2</span></div>
                                </div>
                            </div>
                            <div class="equipment-item">
                                <div>无线电干扰</div>
                                <div class="d-flex justify-content-between font-12">
                                    <div class="text-success">运行中</div>
                                    <div>探测数量 <span class="font-14">2</span></div>
                                </div>
                            </div>
                             <div class="equipment-item">
                                <div>无线电干扰222</div>
                                <div class="d-flex justify-content-between font-12">
                                    <div class="text-success">运行中</div>
                                    <div>探测数量 <span class="font-14">2</span></div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                    <div class="col-30">
                        <dv-border-box-8>
                            <div class="video-box">

                                <video ref="video01" muted="muted" poster="./img/11.png" loop="loop" autoplay="autoplay" style=""
                                    width="100%" height="100%">
                                    <source src="./img/1.mp4" type="video/mp4">
                                    您的浏览器不支持 video 标签。
                                </video>
                                <el-icon class="full-screen" :size="22" @click="toggleFullScreen01" >
                                    <FullScreen />
                                </el-icon>
                                <div class="video-name">可见光监控</div>
                            </div>
                        </dv-border-box-8>
                    </div>
                    <div class="flex1">
                        <dv-border-box-8>
                            <div class="video-box">
                                <video  ref="video02"   muted="muted" poster="./img/11.png" loop="loop" autoplay="autoplay" style=""
                                    width="100%" height="100%">
                                    <source src="./img/1.mp4" type="video/mp4">
                                    您的浏览器不支持 video 标签。
                                </video>
                                <el-icon class="full-screen" :size="22" @click="toggleFullScreen02" >
                                    <FullScreen />
                                </el-icon>
                                <div class="video-name">红外线监控</div>
                            </div>
                        </dv-border-box-8>

                    </div>
                </div>
            </div>
        </div>
        <div class="total-box"></div>
    </div>
<!-- 处置建议弹窗 -->
<Suggestion :issuggest="issuggest" @update:issuggest="issuggest=false" />
</template>

<script lang="ts" setup>
import {
    reactive,
    ref
} from 'vue'
import type {
    ComponentSize
} from 'element-plus'


import WarnList from './components/WarnList.vue';
import TabsBox from './components/TabsBox.vue';
import Map from './components/map.vue';
import Suggestion from './components/dialog/Suggestion.vue';

const issuggest=ref(true)


const indexMethod = (index: number) => {
    return index + 1
}

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

const value3 = ref(true)


const formInline2 = reactive({
    user: '',
    region: 'shanghai',
    date: '',
})

const onSubmit2 = () => {
    console.log('submit!')
}


const video01 = ref(null);
const video02 = ref(null);
 
const toggleFullScreen01 = () => {
  if (!document.fullscreenElement) {
    video01.value.requestFullscreen().catch(err => {
      console.error(err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
const toggleFullScreen02 = () => {
  if (!document.fullscreenElement) {
    video02.value.requestFullscreen().catch(err => {
      console.error(err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
</script>

<style lang="scss" scoped>
.my-btn {
    background: linear-gradient(to bottom, #315378, #1d243a);
    border: 1px solid #1d243a !important;

    &:hover {
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
    /* margin-top: 12px; */
    /* height: 100; */
    /* height: calc(100vh - 162px - 12px - 7px); */
    position: absolute;
    left: 0;
    top: 0;
    /* right:0;bottom:0; */
    /* height: calc(100vh ); */
    width: 100%;
    height: 100vh;

    overflow: hidden;
    color: #fff;

    .row1 {
        /* height: calc((100vh - 92px - 12px * 3) / 3 * 2); */
        height: calc(66.67% - 12px - 7px);
        position: relative;
    }

    .row2 {
        /* height: 50vh; */
        height: calc(33.33%);
        /* height: calc((100vh - 92px - 12px * 3) / 3); */
        position: relative;
    }

    .bg-top {

        background: linear-gradient(to bottom, #315378, transparent);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 12%;
        z-index: 400;
    }

    .bg-bottom {
        background: linear-gradient(to top, #315378, transparent);
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 5%;
        z-index: 400;
    }

    .bg-right {
        background: linear-gradient(to left, #315378, transparent);
        position: absolute;
        right: 0;
        top: 0;
        width: 10%;
        height: 100%;
        z-index: 400;
    }

    .bg-left {
        background: linear-gradient(to right, rgb(49, 83, 120), transparent);
        position: absolute;
        left: 0;
        top: 0;
        width: 10%;
        height: 100%;
        z-index: 400;
    }






    .bottom-box {
        width: 94%;
        height: 215px;
        position: absolute;
        left: 3%;
        bottom: 0;
        /* background: rgba(224, 6, 6, 0.6); */
        background:  rgba(0, 0, 0,0.3);
        /* background: linear-gradient(to top, #315378, transparent); */
        z-index: 400;



    }

    .total-box {
        width: 120px;
        height: 42px;
        position: absolute;
        right: 3%;
        bottom: 230px;
        background: rgba(224, 6, 6, 0.6);
        z-index: 400;
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
    gap: 10px;
    height: 100%;
    color: #fff;

    .double-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50%;
        color: #fff;
    }

}

.bottom-content {
    gap: 12px;
    padding: 15px;
}

.col-30 {
    flex: 0 0 30%;
    max-width: 30%;
    position: relative;

    /* padding-right: 15px;
    padding-left: 15px; */
}

.col-13 {
    flex: 0 0 13%;
    max-width: 13%;
    position: relative;

    padding-right: 15px;
    padding-left: 15px;
}

.data-access {
    &-title {
        font-size: 16px;
    }

    &-list {
        box-shadow: 0 0 4px 1px #85d8f7;
        border-radius: 4px;
        margin-top: 6px;
        padding: 6px;
    }

    &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style-type: none;
    }
}

.equipment {
    &-box {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        justify-content: space-between;
    }

    &-search-box {
        width: 140px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    &-list-box {
        flex: 1;
      padding-right:12px;
      box-sizing: border-box;
    }

    &-item {
        /* box-shadow: 0 0 1px 1px #85d8f7; */
        border:1px solid #85d8f7;
        border-radius: 4px;
        margin-top: 3px;
        padding: 2px 8px;
        line-height: 1.3;
        font-size: 14px;

        .font-12 {
            font-size: 12px;
        }

        .font-14 {
            font-size: 16px;
        }


    }

}

.video-box {
    // width:calc(100% - 6px);
    padding: 3px;
    border-radius: 3px;
    width: 100%;
    height:190px;

    video {
        width: 100%;
        height: 100%;
        /* object-fit: cover; */
        object-position: left top;
        object-fit: fill;
        opacity: 1;
        transform: scale(1) perspective(500px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
}
.flex1{
    flex:1;
}
.full-screen{
    position: absolute;
    right:15px;
    top:15px;
    cursor:pointer;
}
.video-name{
    position: absolute;
    left:4px;
    top:4px;
    cursor:pointer;
    width:100px;
    height: 38px;
    line-height:38px;
    background: rgba(0,0,0,0.4);
    font-size: 14px;
    text-indent: 0.5em;
}
</style>
