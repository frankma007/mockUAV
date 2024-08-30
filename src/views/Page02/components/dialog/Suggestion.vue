<template>




    <el-dialog :model-value="issuggest" title="处置建议" width="700">
        <el-form :model="form" class="px-4 pt-4">
            <el-form-item label="目标名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="目标类型" :label-width="formLabelWidth">

                <el-input v-model="form.type" />
            </el-form-item>
            <el-form-item label="目标型号" :label-width="formLabelWidth">

                <el-input v-model="form.modelNumber" />
            </el-form-item>
            <el-form-item label="目标速度" :label-width="formLabelWidth">

                <el-input v-model="form.speed" /> m/s
            </el-form-item>
            <el-form-item label="目标高度" :label-width="formLabelWidth">

                <el-input v-model="form.height" /> m
            </el-form-item>
            <el-form-item label="目标航向" :label-width="formLabelWidth">

                <el-input v-model="form.direction" />
            </el-form-item>
            <el-form-item label="目标地址" :label-width="formLabelWidth">

                <el-input v-model="form.dress" />
            </el-form-item>
            <el-form-item label="处置人" :label-width="formLabelWidth">

                <el-input v-model="form.user" />
            </el-form-item>
            <el-form-item label="处置方式" :label-width="formLabelWidth">

                <el-input v-model="form.disposalWay" />
            </el-form-item>
            <el-form-item label="处置时间" :label-width="formLabelWidth">

                <el-input v-model="form.time" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer text-center">
                <el-button>重置</el-button>
                <el-button @click="emits('update:issuggest', false)">取消</el-button>
                <el-button type="primary">
                    上报
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

 defineProps({
    issuggest: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(["update:issuggest"])

//   const dialogFormVisible = ref(true)
const formLabelWidth = '100px'

const form = reactive({
    name: '',
    type: '',
    modelNumber: '',
    speed: '',
    height: '',
    direction: '',
    dress: '',
    user: '',
    disposalWay: '',
    time: ''
})


</script>
<style lang="scss" scoped>
::v-deep(.el-form-item__content) {
    flex-wrap: nowrap;
    gap: 10px;
}
</style>