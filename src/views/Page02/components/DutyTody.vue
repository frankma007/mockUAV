import { default } from './map.vue';
<template>
  <div class="left-chart-1">
    <div class="lc1-header">{{props.title}}</div>
    
    <dv-scroll-board :config="config"  class="lc1-chart" />
    <div style="height:3px;" ></div>
  </div>
</template>
<script lang="ts"  setup>
import {
    reactive,
    ref
} from 'vue'
const props=defineProps({
  title:{type:String,default:'标题'}
})

const config=reactive({
  oddRowBGC:'#1e263d',
evenRowBGC:'#0a172a',
  data: [
        ['防控中心：', '张刘官', '王五强'],
    ['环岛北', '陆双双', '陆凤'],
    ['北山咀：', '张晶晶', '张智强'],
    ['横琴码头：', '冯远', '赵峰'],
    ['打私码头：', '王子玲', '李丽'],
    ['环岛南：', '石荣山', '石蒙'],
    ['无人机：', '刘夫丽', '刘奇'],
    ['无人船：', '王闯', '王西北'],
  ]
})
</script>

<style lang="scss" scoped>
.left-chart-1 {
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  justify-content: center;

  .lc1-header {
    text-align: center;
    height: 42px;
    /* line-height: 42px; */
    // display: flex;
    // justify-content: center;
    // align-items: center;
    font-size: 18px;
    // margin-bottom: 20px;
    padding:0 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(to right, #37446a, #141b2a);
   
    width: calc(100% - 6px);
    position: relative;
    left: 3px;
    top: 3px;
  }

  .lc1-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc1-chart {
    flex: 1;
    width: calc(100% - 6px);
     margin: 0 auto;
  }
}
</style>
