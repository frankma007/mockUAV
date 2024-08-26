import { onMounted } from 'vue';
<template>
    <div class="time-box">
       <span class="date-text mr-4 d-inline-block " style="width: 172px;"> {{date.year}}-{{date.month}}-{{date.date}} {{date.hours}}:{{date.minutes}}:{{date.seconds}}     </span>
       
      
       <span  v-if="date.day==1" for="">星期一</span>
              <span  v-if="date.day==2" for="">星期二</span>
              <span  v-if="date.day==3" for="">星期三</span>
              <span  v-if="date.day==4" for="">星期四</span>
              <span  v-if="date.day==5" for="">星期五</span>
              <span  v-if="date.day==6" for="">星期六</span>
              <span  v-if="date.day==7" for="">星期日</span>
        <el-select class="ml-5"
      v-model="value"
      placeholder="请选择"
      size="large" 
      style="width: 240px" 
    >
    <template #prefix>
      <el-icon ><Location  style="color: #fff;" /></el-icon>
    </template>
     
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    </div>
</template>
<script lang="ts"  setup>
import {
    reactive,
    ref,onMounted,onUnmounted
} from 'vue'

let timer=ref(0)
    const   date=reactive({
        year:0,
        month:0,
        date:0,
        day:0,
        hours:0,
        minutes:0,
        seconds:0
      })

      onMounted(()=>{
        timer.value=   setInterval(()=>{
          var now = new Date();
          date.year= now.getFullYear(); // 2015, 年份
          date.month=now.getMonth()+1; // 5, 月份，注意月份范围是0~11，5表示六月
          date.date=now.getDate(); // 24, 表示24号
          date.day=now.getDay(); // 3, 表示星期三
          date.hours=now.getHours(); // 19, 24小时制
          date.minutes=now.getMinutes(); // 49, 分钟
          date.seconds=now.getSeconds(); // 22, 秒
    },1000)
      })
      onUnmounted(()=>{
        if(timer.value){
      clearInterval(timer.value);
    }
      })





const value = ref('0')

const options = [
  {
    value: '0',
    label: '横琴起降场A',
  },
  {
    value: '1',
    label: '横琴起降场B',
  },
  {
    value: '2',
    label: '横琴起降场C',
  },
  {
    value: '3',
    label: '横琴起降场D',
  },
 
]
</script>

<style scoped>
@font-face {
  font-family: "UnidreamLED";
  src: url(../fonts/UnidreamLED.eot); /***兼容ie9***/
  src: url(../fonts/UnidreamLED.eot?#iefix) format("embedded-opentype"),
    /***兼容ie6-ie8***/ url("../fonts/UnidreamLED.woff") format("woff"),
    local("UnidreamLED"), url("../fonts/UnidreamLED.woff"); /***默认使用本地的***/
}
.date-text{
    font-size: 22px;
    font-family: "UnidreamLED";
   word-spacing: .25rem;
}
.time-box{
    height: 48px;
    margin: -15px -15px 8px;
    padding:0 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(to right, #37446a, #141b2a);
    color: #fff;
    width: 100%;
}

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
/*  .ml-2 {
  margin-left: 0.5rem; 
} */
</style>