<template>
  <div>
    <div :class="className" v-if="latlngType !== 'double'">
      <el-input :model-value="value" :disabled="locked" />
      <span>°</span>
    </div>
    <div :class="className" v-else>
      <el-input :model-value="point[0]" style="width: 80%;" @on-change="formateToDouble(1)" @on-keyup="$emit('keypress')"
        :disabled="locked" />
      <span>°</span>
      <el-input :model-value="point[1]" style="width: 80%;" @on-change="formateToDouble(2)" @on-keyup="$emit('keypress')"
        :disabled="locked" />
      <span>'</span>
      <el-input :model-value="point[2]" @on-change="formateToDouble(3)" @on-keyup="$emit('keypress')" :disabled="locked" />
      <span>"</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { doubleToPoint, pointToDouble } from '@/components/js/methods.js'

export default {
  name: 'latlngInput',
  props: {
    value: { // 输入框绑定数据
      type: String | Number,
      default: ''
    },
    className: {
      type: String,
      default: 'latlng-input'
    },
    locked: { // 锁定不可操作
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('config', [
      'latlngType'
    ])
  },
  data () {
    return {
      point: ['', '', '']
    }
  },

  watch: {
    value: {
      handler (val) {
        if (!val) {
          this.point = ['', '', '']
        } else {
          let d = parseFloat(val)
          let p = doubleToPoint(d)
          for (let key in p) {
            this.$set(this.point, key, p[key] + '')
          }
        }
      },
      immediate: true
    },
    locked: {
      handler (val) {
        console.log(val, 'input')
      }
    }
  },
  created () {
    if (this.value) {
      let d = parseFloat(this.value)
      let p = doubleToPoint(d)
      for (let key in p) {
        this.point[key] = p[key] + ''
      }
    }
  },
  methods: {
    formateToDouble (i) {
      let p = []

      for (let key in this.point) {
        p[key] = parseFloat(this.point[key]) || 0
        if (Number(this.point[key]) < 0) {
          this.$message.error('经纬度不可小于0')
          this.point[key] = Math.abs(this.point[key])
        }
      }
      let val = pointToDouble(p) + ''
      console.log(val, this.point, p, i, '========')

      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>
</style>
