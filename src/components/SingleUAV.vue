<template>
  <el-row>
    <el-col>
      <el-button type="primary" @click="dialogVisible = true">
        新增
    </el-button>

      <!-- <AddDialog :dialogVisible="dialogVisible">
        <FormSingleUAV @close="close" ></FormSingleUAV>
       
      </AddDialog> -->
    </el-col>
  </el-row>
  
  <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="新增" width="800" center
  destroy-on-close
  lock-scroll
  :close-on-click-modal="false"
  >
      
        <FormSingleUAV @close="close" ></FormSingleUAV>
        <!-- <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template> -->
    </el-dialog>

  <!-- class="table table-striped"> -->
  <el-table :data="tableData" border style="width: 100%" class="mt-4  table-hover" ref="multipleTableRef"
    @selection-change="handleSelectionChange">

    <el-table-column type="selection" width="55" />
    <!-- <el-table-column prop="date" label="时间" width="180" /> -->
    <el-table-column prop="Type_Target" label="类型" width="180" />
    <el-table-column prop="Speed" label="航速" />
    <el-table-column prop="Direction" label="航向" />
    <!-- <el-table-column prop="Angle_A_Target" label="方位角" />
   <el-table-column prop="Angle_P_Target" label="俯仰角" /> -->
   
    <el-table-column prop="Distance_Target" label="经度" />
    <el-table-column prop="Distance_Target" label="纬度" />
    <el-table-column prop="Altitude_Target" label="高度" />
    <el-table-column prop="Distance_Target" label="时间" />
  <!--  <el-table-column prop="Prop_IFF" label="敌我属性" >
     <template #default="props">
           <span v-if="props.row.Prop_IFF==1">敌方</span>
           <span v-if="props.row.Prop_IFF==2">己方</span>
           <span v-if="props.row.Prop_IFF==3">友方</span>
           <span v-if="props.row.Prop_IFF==4">第三方</span>
           <span v-if="props.row.Prop_IFF==0">不明确</span>
         </template>
</el-table-column>
<el-table-column prop="ThreatRank" label="威胁等级">
  <template #default="props">

           <span v-if="props.row.ThreatRank==1">A1</span>
           <span v-else-if="props.row.ThreatRank==2">A2</span>
           <span v-else-if="props.row.ThreatRank==3">A3</span>
           <span v-else-if="props.row.ThreatRank==4">A4</span>
           <span v-else-if="props.row.ThreatRank==5">A5</span>
           <span v-else-if="props.row.ThreatRank==51">B1</span>
           <span v-else-if="props.row.ThreatRank==52">B2</span>
           <span v-else-if="props.row.ThreatRank==53">B3</span>
           <span v-else-if="props.row.ThreatRank==54">B4</span>
           <span v-else-if="props.row.ThreatRank==55">B5</span>
           <span v-else-if="props.row.ThreatRank==91">C</span>
           <span v-else-if="props.row.ThreatRank==92">C</span>
           <span v-else-if="props.row.ThreatRank==93">C</span>
           <span v-else-if="props.row.ThreatRank==94">C</span>
           <span v-else-if="props.row.ThreatRank==95">C</span>
           <span v-else-if="props.row.ThreatRank==255">D</span>
           <span v-else>{{props.row.ThreatRank}}</span>
         </template>
</el-table-column>
<el-table-column prop="ID_Target" label="来源" width="66">

</el-table-column>
<el-table-column label="告警等级">
  <template #default="props">
           <span v-if="props.row.Alarm_Level==1">一级告警</span>
           <span v-else-if="props.row.Alarm_Level==2">二级告警</span>
           <span v-else-if="props.row.Alarm_Level==3">三级告警</span>
           <span v-else-if="props.row.Alarm_Level==4">提示</span>
         </template>
</el-table-column> -->
    <el-table-column label="操作">
      <template #default="props">
        <el-button>生成航迹</el-button>
        <el-button @click="toEdit(props.row.id)">编辑</el-button>
        <el-button @click="toEdit(props.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="mt-4 mb-2 text-center">
    <el-button type="primary">生成航迹</el-button>
    <el-button type="primary">开始</el-button>
    <el-button type="primary">暂停</el-button>
    <el-button type="primary">停止</el-button>
    <el-button type="primary">复位</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// import AddDialog from './AddDialog.vue';
import FormSingleUAV from '@/views/imitatedData/FormSingleUAV.vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const multipleSelection = ref([])
const dialogVisible =ref(false)
interface RuleForm {
  type: string
  speed: string;
  height: string
  size: string
  direction: string
  longitude: string
  latitude: string
  Angle_A_Target: string
  Angle_P_Target: string
  Distance_Target: string
  Prop_IFF: string
  ThreatRank: string
  ID_Target: string
  Alarm_Level: string

}
const typeList = reactive([
  { label: '多旋无人机', value: '0' },
  { label: '固定式无人机', value: '1' },
  { label: '大疆', value: '2' },

])
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  type: '',
  speed: '',
  height: '',
  size: '',
  direction: '',
  longitude: '',
  latitude: '',
  Angle_A_Target: '',
  Angle_P_Target: '',
  Distance_Target: '',
  Prop_IFF: '',
  ThreatRank: '',
  ID_Target: '',
  Alarm_Level: '',

})



const rules = reactive<FormRules<RuleForm>>({
  type: [
    { required: true, message: '请选择类型', trigger: 'change' },
    // { min: 3, max: 5, message: '长度在3 到 5个字符', trigger: 'blur' },
  ],
  speed: [
    {
      required: true,
      message: '请输入飞行速度',
      trigger: 'blur',
    },
  ],
  height: [
    {
      required: true,
      message: '请输入高度',
      trigger: 'blur',
    },
  ],
  size: [
    {
      required: true,
      message: '请输入尺寸',
      trigger: 'blur',
    },
  ],
  direction: [
    {
      required: true,
      message: '请输入航向',
      trigger: 'blur',
    },
  ],
  longitude: [
    {
      required: true,
      message: '请输入经度',
      trigger: 'blur',
    },
  ],
  latitude: [
    {
      required: true,
      message: '请输入纬度',
      trigger: 'blur',
    },
  ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const tableData = [
  {
    Type_Target: '多旋无人机',
    Speed: '2',
    Direction: '96°',
    Angle_A_Target: '12.1°',
    Angle_P_Target: '123.1°',
    Altitude_Target: '10',
    Distance_Target: '66',
    Prop_IFF: '1',
    ThreatRank: '2',
    ID_Target: 'C',
    Alarm_Level: '2'
  },
  {
    Type_Target: '多旋无人机',
    Speed: '2',
    Direction: '96°',
    Angle_A_Target: '12.1°',
    Angle_P_Target: '123.1°',
    Altitude_Target: '10',
    Distance_Target: '66',
    Prop_IFF: '1',
    ThreatRank: '2',
    ID_Target: 'C',
    Alarm_Level: '2'
  },

]
const toEdit = (id: any) => {
  console.log(id)
}
const handleSelectionChange = (val: []) => {
  multipleSelection.value = val
}


const close = () => {
  debugger
  dialogVisible.value = false
}
</script>
