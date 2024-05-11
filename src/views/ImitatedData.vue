<template>
  <div class="container-fluid">
    <el-container>
      <el-header>
        <h2 class="mt-2 mb-2">无人机配置</h2>
        <p><router-link to="/" class="text item">返回首页</router-link></p>


      </el-header>
      <el-main class="mt-2 mb-2">
        <el-tabs type="border-card" class="w-100">
          <el-tab-pane label="无人机">

            <SingleUAV></SingleUAV>
          </el-tab-pane>
          <el-tab-pane label="无人机群">
            <MultiUAV></MultiUAV>
          </el-tab-pane>
          <el-tab-pane label="鸟群">
            <Birds></Birds>
          </el-tab-pane>
          <!-- <el-tab-pane label="Task">Task</el-tab-pane> -->
        </el-tabs>

      </el-main>
    </el-container>
  </div>


</template>

<script setup lang="ts">
import SingleUAV from '@/components/SingleUAV.vue'
import MultiUAV from '@/components/MultiUAV.vue'
import Birds from '@/components/Birds.vue'


</script>
