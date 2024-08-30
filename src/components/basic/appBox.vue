<template>
  <el-dialog :model-value="modelFlag" :title="modalTitle" :mask-closable="false" class="colorF" :closable="false">
    <div v-if="modalText" class="modaltext colorF">
      {{modalText}}
      <span :class="modalclose === true ? 'modalclose modalimg' : 'modalclose1 modalimg'"></span>
    </div>
    <template #footer :class="cellDelFlag ? '' : 'footer1'">
      <Button class="app-button leftBtn colorF" v-if="cellDelFlag"
        @click="deleteData">{{leftBtnText ? leftBtnText : '是'}}</Button>
      <Button class="app-button rightBtn colorF" @click="cancel"
        v-if="rightBtnText!==''">{{rightBtnText ? rightBtnText : '否'}}</Button>
    </template>
    <template #close>
      <div :class="modalclose === true ? 'modalclose' : 'modalclose1'"></div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'appBox',
  props: {
    modalTitle: { // 自定义顶部标题（可选）
      type: String,
      default: '命令提示'
    },
    modelFlag: { // 控制弹出框的显示隐藏
      type: Boolean,
      default: false
    },
    modalText: { // 自定义文本内容
      type: String,
      default: ''
    },
    modalclose: { // 右上角图标样式 true 强调 modalclose 或 false 疑问 modalclose1
      type: Boolean,
      default: true
    },
    cellDelFlag: { // 是否显示确定按钮
      type: Boolean,
      default: true
    },
    leftBtnText: { // 左侧按钮文字
      type: String,
      default: '是'
    },
    rightBtnText: { // 右侧按钮文字
      type: String,
      default: '否'
    }
  },
  mounted () {
  },
  methods: {
    deleteData () { // 左侧按钮事件
      this.$emit('delSingle')
    },
    cancel () { // 右侧按钮事件
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.modaltext {
  // 盒子
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.ivu-modal {
  width: 370px !important;
  // height: 198px !important;
  border-radius: 5px;
  .ivu-modal-content {
    width: 370px;
    // height: 198px;
  }
  .ivu-modal-header {
    padding: 24px 0;
    .ivu-modal-header-inner {
      height: 30px;
      line-height: 30px;
      font-weight: bold;
      font-size: 20px;
    }
  }
  .ivu-modal-body {
    padding: 0 0 36px;
    .modaltext {
      font-size: 18px;
      padding: 0 16px;
    }
  }
  .ivu-modal-footer {
    padding: 0;
    font-size: 18px;
    border-top: #808a97 1px solid;
    > div {
      width: 100%;
      height: 58px;
      display: flex;
      .app-button {
        // background-color: #284c75 !important;
        font-size: 18px !important;
        padding: 0 !important;
      }
      .ivu-btn {
        width: 100%;
        height: 100%;
        margin: 0;
        border: none;
        border-radius: 0 !important;
        background-color: transparent !important;
      }
      .rightBtn {
        border-bottom-right-radius: 5px !important;
        // border-top-left-radius: 0 ;
        // border-bottom-left-radius: 0 !important;
      }
      .leftBtn {
        border-bottom-left-radius: 5px !important;
        // border-bottom-right-radius: 5px;
      }
    }
    > .footer1 {
      .ivu-btn {
        width: 100%;
        height: 100%;
        margin: 0;
        border: none !important;
      }
    }
  }
}
.modalimg {
  position: absolute;
  right: 0;
  top: 0;
  background-size: cover;
  width: 66px;
  height: 39px;
}
.modalclose {
  background-image: url("../../assets/imgs/exclamation.png");
}
.modalclose1 {
  background-image: url("../../assets/imgs/question.png");
}
</style>
