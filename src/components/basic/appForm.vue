<template>
  <div>
    <Divider v-if="topDivider" class="app-form-divider" />
    <p v-if="title" class="form-title">{{title}}</p>
    <slot name="header"></slot>
    <!-- $t('form'+'.'+item.index) -->
    <Form v-for="(formInline ,index) in formOptions" :ref="'formRef' + index" :model="formValues"
      :rules="formRules[index]" :class="className" :key="index" inline
      style="display: flex; justify-content: space-between;">
      <Form-item v-for="(item, key) in formInline" :label="item.label" :key="key" :prop="key">
        <Select v-if="item.type === 'select'" class="app-select" v-model="formValues[key]"
          :disabled="locked ? true : (item.hasOwnProperty('disabled') ? item.disabled : false)"
          @on-change="selectOnChange(formValues[key], item)">
          <Option v-for="(option, index) in item.options" :value="index" :key="index">{{option}}</Option>
        </Select>
        <div v-else-if="item.type === 'input' || item.type === 'number'"
          style="display: flex; flex-direction: row; align-items: center;">
          <Input class="app-input" v-model="formValues[key]" :disabled="locked" />
          <span v-if="item.hasOwnProperty('unit') && item.unit" class="app-input-unit">{{item.unit}}</span>
        </div>
        <latlng-input v-else-if="item.type === 'latlngInput' || item.type === 'latInput' || item.type === 'lonInput'"
          class="latlng-input" v-model="formValues[key]" :disabled="locked" :title='item.label'>
        </latlng-input>
        <!--        <el-date-picker-->
        <!--          v-else-if="item.type === 'datetimeRange'"-->
        <!--          v-model="formValues[key]"-->
        <!--          :disabled="item.hasOwnProperty('disabled') ? item.disabled : false"-->
        <!--          type="datetimerange"-->
        <!--          start-placeholder="开始时间"-->
        <!--          end-placeholder="结束时间"-->
        <!--          :clearable="false"-->
        <!--        ></el-date-picker>-->
        <div v-else-if="item.type === 'datetimeRange'" class="datatime-range">
          <el-date-picker v-model="formValues[key][0]" type="datetime" :placeholder="$t('task.KSSJ')" :clearable="false"
            :disabled="locked">
          </el-date-picker>
          <span>{{item.hasOwnProperty('separator') ? item.separator : '-'}}</span>
          <el-date-picker v-model="formValues[key][1]" type="datetime" :placeholder="$t('task.JSSJ')" :clearable="false"
            :disabled="locked">
          </el-date-picker>
        </div>
        <p v-else-if="item.type === 'text'" class="show-title">{{formValues[key]}}</p>
      </Form-item>
    </Form>
    <slot name="footer"></slot>
    <Divider v-if="bottomDivider" class="app-form-divider" />
  </div>
</template>

<script>
export default {
  name: 'appForm',
  props: {
    formOptions: { // 表单配置：label 标签, type 控件类型, options 下拉框选项（只在type === 'select'时生效）, unit 单位（可选）
      type: Array,
      default: () => []
    },
    formValues: { // 表单绑定数据, 字段key与formOptions一一对应
      type: Object,
      default: () => { }
    },
    title: { // 表单标题（可选）
      type: String,
      default: ''
    },
    topDivider: { // 表单顶部分割线
      type: Boolean,
      default: false
    },
    bottomDivider: { // 表单底部分割线
      type: Boolean,
      default: false
    },
    className: { // 表单自定义样式名称（要求全局样式）
      type: String,
      default: 'app-form'
    },
    locked: { // 锁定不可操作
      type: Boolean,
      default: false
    }
  },
  components: {
    latlngInput: () => import('@/components/basic/latlngInput.vue')
  },
  data () {
    return {
      formRules: [], // 表单验证规则
      validPromise: [] // 表单验证promise集合
    }
  },
  created () {
    this.setRules()
  },
  methods: {
    setRules () { // 根据formOptions设置表单验证规则
      for (let formKey in this.formOptions) {
        let formOption = this.formOptions[formKey]
        let rules = {}
        for (let key in formOption) {
          rules[key] = []
          let r = {}
          if (formOption[key].hasOwnProperty('required') && formOption[key].required) { // 判断是否必填
            r = { required: true, message: formOption[key].label + '不能为空' }
            if (formOption[key].type === 'select') {
              r.trigger = 'change'
            } else {
              r.trigger = 'blur'
            }
            rules[key].push(r)
          }
          let valid = (rule, value, callback) => {
            if (formOption[key].hasOwnProperty('required') && formOption[key].required && !value) { // 判断是否必填
              return callback(new Error(formOption[key].label + '不能为空'))
            }
            if (formOption[key].type === 'number') {
              if (isNaN(value)) { // 判断是否为数字
                return callback(new Error('请输入数字'))
              }
              if (formOption[key].hasOwnProperty('min') && Number(value) < formOption[key].min) { // 判断最小值
                return callback(new Error(formOption[key].label + '不能小于' + formOption[key].min))
              }
              if (formOption[key].hasOwnProperty('max') && Number(value) > formOption[key].max) { // 判断最大值
                return callback(new Error(formOption[key].label + '不能大于' + formOption[key].max))
              }
            }
            if (formOption[key].type === 'latInput') {
              if (Number(value) < -90) {
                return callback(new Error('纬度值不能小于-90°'))
              }
              if (Number(value) > 90) {
                return callback(new Error('纬度值不能大于90°'))
              }
            }
            if (formOption[key].type === 'lonInput') {
              if (Number(value) < -180) {
                return callback(new Error('经度值不能小于-180°'))
              }
              if (Number(value) > 180) {
                return callback(new Error('经度值不能大于180°'))
              }
            }
            if (formOption[key].type === 'datetimeRange') {
              // if (this.formValues[key][0] === undefined || this.formValues[key][1] === undefined) {
              //   return callback(new Error('请选择时间'))
              // }
              var timestamp1 = Date.parse(new Date(this.formValues[key][0]))
              var timestamp2 = Date.parse(new Date(this.formValues[key][1]))
              timestamp1 = timestamp1 / 1000
              timestamp2 = timestamp2 / 1000
              // console.log(this.formValues[key][0], this.formValues[key][1], '11111')
              // console.log(timestamp1, timestamp2, '22222')
              if (timestamp1 > timestamp2) {
                return callback(new Error('开始时间不能超过结束时间'))
              }
              if (formOption[key].hasOwnProperty('range') && formOption[key].range < (this.formValues[key][1] - this.formValues[key][0])) {
                return callback(new Error('所选时间范围不能超过' + formOption[key].rangeLabel))
              }
            }
            return callback()
          }
          r.validator = valid
          if (formOption[key].type === 'select') {
            r.trigger = 'change'
          } else {
            r.trigger = 'blur'
          }
          rules[key].push(r)
        }
        this.formRules[formKey] = rules
      }
    },
    validate () { // 判断所有表单验证是否通过，通过promise返回结果
      this.validPromise = []
      for (let key in this.formOptions) {
        let refName = 'formRef' + key
        let prom = new Promise((resolve, reject) => {
          this.$refs[refName][0].validate((valid) => {
            if (valid) {
              resolve(true)
            } else {
              reject(new Error('表单校验失败'))
            }
          })
        })
        this.validPromise.push(prom)
      }
      return Promise.all(this.validPromise)
    },
    selectOnChange (e, item) { // 下拉框值变更触发事件
      console.log('app form test', e, item)
      if (item.hasOwnProperty('onChange')) {
        item.onChange(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
