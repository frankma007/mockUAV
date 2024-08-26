<template>
 
 <nav class="nav-box sticky-top ">
  <!-- <div class="container d-flex flex-column flex-md-row justify-content-between"> -->
    <div class="d-flex " href="#" aria-label="Product">
      <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mx-auto" role="img" viewBox="0 0 24 24" focusable="false"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
      <div class="ml-3">横琴无人机垂直升降场调度系统</div>
    </div>
    <div class="nav-content">
      <div class="nav-item">首页</div>
      <div class="nav-item">流量监控</div>
      <div class="nav-item">BSS监控</div>
      <div class="nav-item">企业航线</div>
      <div class="nav-item">调度运行</div>
      <div class="nav-item current">飞行服务</div>
      <div class="nav-item">机务维修</div>
      <div class="nav-item">基础数据</div>
      <div class="nav-item">系统设置</div>
    </div>
    <div >
      <el-icon class="mr-2"   :size="20"><Warning /></el-icon>
      <el-icon :size="20">
     <User />
   </el-icon>
    </div>
   
  <!-- </div> -->
</nav>
</template>

<script lang="ts" setup>


</script>
<style  scoped>
.ml-3{
  margin-left: 8px;
}
.nav-box{
  font-size: 18px;
  height: 66px;
  padding-right: calc(1.5rem * .5);
  padding-left: calc(1.5rem * .5);
  
  background: linear-gradient(to bottom, #333f62, #131a28);
  display:flex;
  color: #fff;
  align-items: center;
  justify-content: space-between;
  .nav-content{
   
    padding:0 6em;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex:1;
    gap:1em;
    .nav-item{ 
      align-items: center;
      height: 44px;
      cursor: pointer;
      /* margin: 0 2em; */
      padding: 0 1em;
      display: flex;
      justify-content: center;
      flex:1;
      &.current,&:hover{
        /* background-color: #f0f0f0; */
        border-radius: 10px;
        /* box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3); */
        /* box-shadow: inset 0px 2px 22px 2px #141b2a; */
        background: linear-gradient(to bottom, #141b2a, #374368);
     
       
        border-radius: 4px;
          }
    }
  }
  
}
.mr-2{margin-right: 0.5em;}

</style>
