<template>
    <el-button type="primary" @click="centerDialogVisible = true">
        新增
    </el-button>

    <el-dialog v-if="centerDialogVisible" v-model="centerDialogVisible" title="新增" width="800" center>
        <!-- <span>
            AVIC
        </span> -->
        <slot>

        </slot>
        <!-- <slot name="footer">
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="close">
                    确定
                </el-button>
            </div>
        </slot> -->
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref,defineProps,onMounted } from 'vue'


const props = defineProps({
    dialogVisible:{
    type: Boolean,
 
  },
})

const centerDialogVisible = ref(false)
onMounted(()=>{
    centerDialogVisible.value=props.dialogVisible
})
// const close = () => {
//     centerDialogVisible.value = false
// }
</script>