<template>
  <!-- <div class="container-fluid"> -->

      <!-- <el-card style="max-width: 480px">
        <p><router-link to="/DataManage" class="text item">无人机数据管理</router-link></p>
        <p><router-link to="/ImitatedData" class="text item">无人机模拟数据配置</router-link></p>
      </el-card> -->
    
      <Navi />
   
  <!-- </div> -->
  <!-- <div class="container-fluid">      -->
  <el-tabs
    v-model="editableTabsValue"
    type="border-card"
    class="demo-tabs "
    closable
    @tab-remove="removeTab"
    @tab-click="handleClick"
   
  >
    <el-tab-pane class="pt-4"
    
       label="流量监控"
      name="1"
    >
    <Page01 />
    </el-tab-pane>
    <el-tab-pane 
    
     
      label="调度运行"
      name="2"
    >
    <Page02 />
    </el-tab-pane>
  </el-tabs>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Page01 from '@/views/Page01/Page01.vue';
import Page02 from '@/views/Page02/Page02.vue';
import Navi from  '@/components/Navi.vue'
import type { TabsPaneContext } from 'element-plus'
let tabIndex = 2
const editableTabsValue = ref('2')


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log('Switched to tab:', tab.props.name);
  // console.log(tab, event)
  // console.log( editableTabsValue.value)
  // editableTabsValue.value=tab.props.name
}
const editableTabs = ref([
  {
    title: '流量监控',
    name: '1',
    // content: ,
  },
  {
    title: '调度运行',
    name: '2',
    // content: 'Tab 2 content',
  },
])

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  })
  editableTabsValue.value = newTabName
}
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>
<style lang="scss"  scoped>
@import url(@/assets/css/product.css);
.demo-tabs {
  height: calc(100vh - 66px);

  .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

}


</style>

