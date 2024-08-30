<template>
  <div class="multiBandSelection">
    <el-checkbox-group :disabled="disabled" v-model="checkedCities" @change="handleCheckedCitiesChange">
      <template v-if="list && list.length">
        <el-checkbox v-for="item in list" :disabled="disabledList.indexOf(item) !== -1" :label="item" :key="item">
          {{item}}</el-checkbox>
      </template>
    </el-checkbox-group>
    <el-checkbox :disabled="disabled" class="check-all" v-model="checkAll" @change="handleCheckAllChange">全&nbsp;&nbsp;频
    </el-checkbox>
  </div>
</template>

<script>
export default {
  name: 'multiBandSelection',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: function () {
        return [
          '350M', '850M', '430M',
          '1.2G', '1.6G', '2.4G',
          '5.8G'
        ]
      }
    },
    disabledList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      checkAll: false,
      checkedCities: []
    }
  },
  mounted () {
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.list : []
      this.$emit('change', this.checkedCities)
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.list.length
      this.$emit('change', this.checkedCities)
    },
    setList (list) {
      this.checkedCities = list
    },
    setCheckAll (type) {
      this.checkAll = type
    }
  }
}
</script>

<style lang="scss" scoped>
// .multiBandSelection /deep/ .el-checkbox__input {
//   display: none;
// }
// .multiBandSelection /deep/ .el-checkbox {
//   width: 60px;
//   background-color: #062a54;
//   color: #fff;
//   height: 30px;
//   line-height: 32px;
//   text-align: center;
//   font-size: 18px;
//   margin-bottom: 10px;
//   border-radius: 5px;
//   .el-checkbox__label {
//     padding-left: 0;
//     font-size: 18px;
//   }
// }
// .multiBandSelection /deep/.el-checkbox-group {
//   display: contents;
// }
// .multiBandSelection .check-all {
//   margin-left: 26px;
// }
// .multiBandSelection /deep/.is-checked {
//   .el-checkbox__label {
//     color: #06e2f4 !important;
//   }
// }
</style>
