<template>
  <div>
    <Divider v-if="topDivider" class="app-form-divider" />
    <p v-if="title" class="form-title">{{title}}</p>
    <Form v-for="(formInline ,index) in headOptions" class="coreName" :key="'info2-'+index" inline
      style="display: flex; justify-content: space-between;position: relative;">
      <Form-item v-for="(item, key) in formInline" :class="{'put-away':item.type === 'select'}" :label="item.label"
        :key="key">
        <div>
          <img class='headname'
            v-if="item.options?Object.keys(item.options).length?item.options[headValues[key]]?item.options[headValues[key]].includes('data'):'':'':''"
            style="width:22px;height:22px "
            :src="item.options?Object.keys(item.options).length?item.options[headValues[key]]:'':''">

          <Select style="width:145px" v-if="item.type === 'select'" class="app-select" v-model="headValues[key]"
            :disabled="locked ? true : (item.hasOwnProperty('disabled') ? item.disabled : false)"
            @on-change="selectOnChange(headValues[key], item)">
            <Option v-for="(option, index) in item.options" :value="index" :key="index">
              <img style="width:22px;height:22px ;margin-left:40px" :src='option'>
              <span style="color:transparent"></span>
            </Option>
          </Select>
          <div v-else-if="item.type === 'input'" style="display: flex; flex-direction: row; align-items: center;">
            <Input class="app-input" v-model="headValues[key]" @on-keyup="keypress" :disabled="locked" />
            <span v-if="item.hasOwnProperty('unit') && item.unit" class="app-input-unit">{{item.unit}}</span>
          </div>
          <latlng-input v-else-if="item.type === 'latlngInput' || item.type === 'latInput' || item.type === 'lonInput'"
            class="latlng-input" v-model="formValues[key]" @keypress="keypress" :locked='locked'>
          </latlng-input>
          <p v-else-if="item.type === 'text'" class="show-title"></p>
        </div>
      </Form-item>
      <i :class="{'expand':openType}" class="icon-zhankai iconfont" @click='expand()'></i>
    </Form>
    <slot name="header"></slot>
    <div id="shj" class="open" :class="{'closed':!openType}">
      <slot name="inside"></slot>
      <template v-if="isSelected == '0x7A' || isSelected == '0x7B'">
        <Form v-for="(formInline ,index) in formOptions" :class="className" :key="index" inline
          style="display: flex; justify-content: space-between;">
          <Form-item v-for="(item, key) in formInline" :label="item.label" :key="key">
            <Select v-if="item.type === 'select'" class="app-select" v-model="formValues[key]" :disabled="locked">
              <Option v-for="(option, index) in item.options" :value="index" :key="index">{{option}}</Option>
            </Select>
            <div v-else-if="item.type === 'input' || item.type === 'number'"
              style="display: flex; flex-direction: row; align-items: center;">
              <Input class="app-input" v-model="formValues[key]" @on-keyup="keypress" :disabled="locked" />
              <span v-if="item.hasOwnProperty('unit') && item.unit" class="app-input-unit">{{item.unit}}</span>
            </div>
            <latlng-input
              v-else-if="item.type === 'latlngInput' || item.type === 'latInput' || item.type === 'lonInput'"
              class="latlng-input" v-model="formValues[key]" @input="keypress" @keypress="keypress" :locked='locked'>
            </latlng-input>
            <p v-else-if="item.type === 'text'" class="show-title"></p>
          </Form-item>
        </Form>
      </template>
      <template v-else>
        <div class="duobianxing">
          <div class='spectrum'>
            <div v-for=" (item, valueIndex) in formValues.list" :key="valueIndex">
              <div style="margin-top:14px">
                <p class="dr-title">
                  <i v-show="!locked" @click="Add(valueIndex)" class="el-icon-circle-plus"></i>
                  <i v-show="!locked" @click="Delete(valueIndex)" v-if="formValues.list.length > 3"
                    class="el-icon-remove"></i>
                  <span style="margin-left:10px" class="spanFontSize">{{$t('form.DD')}}{{valueIndex+1}}
                  </span>
                </p>
              </div>
              <div style="text-align:center;display: flex;">
                <p style="width: 100px;text-align: right;padding: 10px 12px 10px 0px;" class="spanFontSize">
                  {{$t('form.JD')}}</p>
                <latlng-input style="width: calc(100% - 100px);" class="latlng-input" v-model="item.Longitude"
                  @keypress="keypress" :locked='locked'></latlng-input>
              </div>
              <div style="margin-top:10px;text-align:center;display: flex;">
                <p style="width: 100px;text-align: right;padding: 10px 12px 10px 0px;" class="spanFontSize">
                  {{$t('form.WD')}}</p>
                <latlng-input style="width: calc(100% - 100px);" class="latlng-input" v-model="item.Latitude"
                  @keypress="keypress" :locked='locked'></latlng-input>
              </div>
            </div>
            <div style="display: flex; flex-direction: row; align-items: center;">
              <p style="width: 100px;text-align: right;padding: 10px 12px 10px 0px;">{{$t('form.FKGD')}}</p>
              <Input style="width: auto!important;" class="app-input" v-model="formValues.height" :disabled="locked" />
              <span class="app-input-unit">m</span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <slot name="footer"></slot>
    <Divider v-if="bottomDivider" class="app-form-divider" />

  </div>
</template>

<script>
import { mapS } from '@/components/js/iconDataMap.js'
export default {
  name: 'coreForm',
  props: {
    headOptions: { // 表单配置：label 标签, type 控件类型, options 下拉框选项（只在type === 'select'时生效）, unit 单位（可选）
      type: Array,
      default: () => []
    },
    headValues: { // 表单绑定数据, 字段key与formOptions一一对应
      type: Object,
      default: () => { }
    },
    formOptions: { // 表单配置：label 标签, type 控件类型, options 下拉框选项（只在type === 'select'时生效）, unit 单位（可选）
      type: Array,
      default: () => []
    },
    formValues: { // 表单绑定数据, 字段key与formOptions一一对应
      type: [Object, Array],
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
    isSelected: { // 下拉框选中类型
      type: String,
      default: '0x7A'
    },
    locked: { // 锁定不可操作
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      Astate: false,
      formRules: [],
      // 默认展开
      openType: true
    }
  },
  created () {
  },
  components: {
    latlngInput: () => import('@/components/basic/latlngInput.vue'),
    appForm: () => import('@/components/basic/appForm.vue')
  },
  methods: {
    /**
     * 展开/收起
     */
    expand () {
      this.openType = !this.openType
    },
    Delete (valueIndex) { // 删除按钮
      this.$emit('delList', valueIndex)
    },
    Add (valueIndex) { // 添加按钮
      this.$emit('addList', valueIndex)
    },
    selectOnChange (e, item) { // 下拉框值变更触发事件
      console.log('sssssss', e, item)
      if (item.hasOwnProperty('onChange')) {
        // console.log('ssssss', item)
        item.onChange(e, item.index)
      }
    },
    keypress () {
      let newVal = this.formValues
      switch (this.isSelected) {
        // 圆形
        case '0x7A':
          if (newVal.Latitude &&
            newVal.Longitude &&
            newVal.Radius) {
            this.$emit('changeSpectrum', { data: newVal, type: '0x7A' })
          }
          break
        // 扇形
        case '0x7B':
          if (((newVal.Angle_Centerline - newVal.Angle_Sector) !== 0) &&
            newVal.Angle_Centerline !== '' &&
            newVal.Angle_Sector !== '' &&
            newVal.Latitude &&
            newVal.Longitude &&
            newVal.Radius) {
            this.$emit('changeSpectrum', { data: newVal, type: '0x7B' })
          }
          break
        // 多边形
        case '0x7F':
          let type = true
          newVal.list.map((item) => {
            item.Latitude = Number(item.Latitude)
            item.Longitude = Number(item.Longitude)
            if (!item.Latitude || !item.Longitude) {
              type = false
            }
          })

          if (type && newVal.list.length > 0) {
            this.$emit('changeSpectrum', { data: newVal.list, type: '0x7F' })
          }
          break
      }
    }
  },
  mounted () {
  },
  watch: {
    formValues: {
      handler (newVal, oldeVal) {
        if (this.isSelected === '0x7B') {
          this.keypress()
        }
        if (this.isSelected === '0x7A') {
          this.keypress()
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.spectrum {
  margin-left: 20px;
  margin-top: -30px;
  input {
    width: 80px;
    background: transparent;
    border: 1px solid #fff;
    padding: 0 16px;
    height: 32px;
    border-radius: 5px;
    text-align: center;
  }
  > i {
    font-size: 24px;
    display: inline-block;
    margin-left: 6px;
  }
  > p {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    > span {
      margin: 0 10px;
    }
  }
  p span {
    display: inline-block;
  }
}
.dr-title i {
  font-size: 24px;
  display: inline-block;
  margin-left: 6px;
}
.duobianxing {
  /* height: 344px; */
  width: 480px;
}
.duobianxing > div {
  width: 90%;
  margin-top: 10px;
}
.headname {
  position: absolute !important;
  left: 40px !important;
  top: 6px !important;
}
.spanFontSize {
  font-size: 18px;
  font-weight: 400;
  margin: 0px;
}
.ivu-select-disabled .ivu-select-selection {
  background-color: transparent !important;
}
.put-away {
  margin-left: -18px !important;
}
.icon-zhankai {
  transform: rotate(0deg);
  -ms-transform: rotate(0deg); /* IE 9 */
  -moz-transform: rotate(0deg); /* Firefox */
  -webkit-transform: rotate(0deg); /* Safari 和 Chrome */
  -o-transform: rotate(0deg); /* Opera */
  position: absolute;
  right: 9px;
  padding: 5px;
  top: 0px;
  cursor: pointer;
  transition: all 0.25s;
}
.iconfont.expand {
  position: absolute;
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -moz-transform: rotate(90deg); /* Firefox */
  -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
  -o-transform: rotate(90deg); /* Opera */
}
.open {
  overflow: hidden;
  height: auto;
}
.closed {
  height: 0px;
}
</style>
