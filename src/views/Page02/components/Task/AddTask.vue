<template>

  

  
    <el-dialog :model-value="issuggest" title="新建任务" width="700">
      <div class="px-4 pt-4">
        <div>
    <!-- <div id="fiexBox"></div> -->
    <div class="task-content" style="overflow-x: hidden" @click="onHidden">
      <div>
        <div style="margin-left: 22px; width: 95%; position: relative">
          <div style="display: flex; align-items: center; margin: 0 0 0 10px">
            <app-form
              :formOptions="headForm"
              :formValues="headParam"
              id="head"
              style="width: 290px"
              :locked="locked"
            >
            </app-form>
            <Button @click="changeActivation" class="isButton"
              ><i
                class="iconfont iconjihuoA"
                :class="
                  activationTask === 1
                    ? 'icon-jihuozhuangtai-01'
                    : 'icon-jihuozhuangtai'
                "
                :style="{ color: activationTask === 1 ? '#00ffff' : '#fff' }"
                style="font-size: 34px"
              ></i
            ></Button>
            <!-- <Button class="isButton" disabled style="margin-top: 14px;" v-else><i class="iconfont icon-jihuo"
                :style="{color: activationTask === 1 ? '#00ffff' : '#fff'}" style="font-size:34px;"></i></Button> -->
            <!-- isButton -->
          </div>
          <span class="huakuai">
            <!-- 1为固定式 0为机动式 -->
            <i
              :class="Type_Task_Control == 1 ? 'classTwo' : ''"
              @click="onType(1)"
              >{{ $t("task.GDS") }}</i
            >
            <i
              :class="Type_Task_Control == 0 ? 'classTwo' : ''"
              @click="onType(0)"
              >{{ $t("task.JDS") }}</i
            >
          </span>
        </div>
        <div class="fixed" v-if="Type_Task_Control === 0">
          <div>
            <div class="header">
              <span style="margin-left: 22px">{{ $t("task.HXQ") }}</span>
              <span
                ><img
                  src="@/assets/imgs/task/circular.png"
                  alt=""
                  class="circular-pic"
              /></span>
            </div>
            <div class="core">
              <app-form
                :formOptions="coreMobileForm"
                :formValues="coreMobileParam"
                id="core"
                :locked="locked"
              >
              </app-form>
            </div>
          </div>
          <div>
            <div class="header">
              <span style="margin-left: 22px">{{ $t("task.CZQ") }}</span>
              <span
                ><img
                  src="@/assets/imgs/task/circular.png"
                  alt=""
                  class="circular-pic"
              /></span>
            </div>
            <div class="core">
              <app-form
                :formOptions="disposalMobileForm"
                :formValues="disposalMobileParam"
                id="core1"
                :locked="locked"
              >
              </app-form>
            </div>
          </div>
          <div>
            <div class="header">
              <span style="margin-left: 22px">识别区</span>
              <span
                ><img
                  src="@/assets/imgs/task/circular.png"
                  alt=""
                  class="circular-pic"
              /></span>
            </div>
            <div class="core">
              <app-form
                :formOptions="disposalMobileFormA"
                :formValues="disposalMobileParamA"
                id="core1"
                :locked="locked"
              >
              </app-form>
            </div>
          </div>
          <div>
            <div class="header">
              <span style="margin-left: 22px">{{ $t("task.YJQ") }}</span>
              <span
                ><img
                  src="@/assets/imgs/task/circular.png"
                  class="circular-pic"
              /></span>
            </div>
            <div class="core">
              <app-form
                :formOptions="warnMobileForm"
                :formValues="warnMobileParam"
                id="core2"
                :locked="locked"
              >
              </app-form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="Type_Task_Control === 1">
        <p class="dr-title">
          <span> {{ $t("task.HXQ") }}</span>
          <i v-show="!locked" class="el-icon-circle-plus" @click="add"></i>
        </p>
        <div>
          <div v-for="(item, index) in trackData" :key="index" class="mobile">
            <div
              class="core"
              :class="{
                isActive:
                  activeIndex.name === 'shape' && activeIndex.index === index,
              }"
              style="
                color: #ffffff;
                font-size: 16px;
                border: 1px solid rgba(255, 255, 255, 0.4);
              "
            >
              <div slot="header" style="position: relative">
                <i
                  v-show="!locked && index == trackData.length - 1"
                  class="el-icon-remove delete-pic"
                  @click="deleteForm(index, item.upParam.Shape_Region_Control)"
                ></i>
                <p v-show="!locked" class="positionR">
                  <span
                    class="iconfont icon-huizhi"
                    @click="testClick(index, item)"
                  ></span>
                </p>
              </div>
              <core-form
                :formOptions="item.protectForm"
                :formValues="item.protectParam"
                @addList="
                  (valueIndex) =>
                    addPolygonList('core', { dataIndex: index, valueIndex })
                "
                @delList="
                  (valueIndex) =>
                    delPolygonList('core', { dataIndex: index, valueIndex })
                "
                id="protect"
                class="protect"
                :headOptions="item.upForm"
                :headValues="item.upParam"
                :moudleName="$t('task.HXQ')"
                @changeSpectrum="(data) => handleSpectrum(data, 'core', index)"
                :isSelected="item.upParam.Shape_Region_Control"
                :locked="locked"
              >
              </core-form>
            </div>
          </div>
        </div>
        <p class="dr-title" style="position: relative">
          <span>反制区</span>
          <i
            v-show="!locked"
            class="el-icon-circle-plus"
            @click="add1"
            v-if="Length_Defense === 1"
          ></i>
          <!--   <span class="huakuai" style="top:0">
                    <i :class="Length_Defense==1 ? 'classTwo' : ''" @click="onTypeS(1)">{{$t('task.ZDY')}}</i>
                    <i :class="Length_Defense==2 ? 'classTwo' : ''" @click="onTypeS(2)">{{$t('task.WYS')}}</i>
                </span> -->
        </p>
        <!-- <div v-if='Length_Defense===2' class="core">
                <app-form :formOptions="disposalForm" :formValues="disposalParam" id="core3" :locked="locked"></app-form>
            </div> -->
        <div v-if="Length_Defense === 1">
          <div v-for="(item, index) in trackData1" :key="index" class="mobile">
            <div
              :class="{
                isActive:
                  activeIndex.name === 'shapeA' && activeIndex.index === index,
              }"
              style="
                color: #ffffff;
                font-size: 16px;
                border: 1px solid rgba(255, 255, 255, 0.4);
                width: 485px;
                margin: 0 auto 16px;
                border-radius: 5px;
              "
            >
              <div slot="header" style="position: relative">
                <i
                  v-show="!locked && index == trackData1.length - 1"
                  class="el-icon-remove delete-pic"
                  @click="
                    deleteForm1(index, item.upParam.Shape_Region_Control, item)
                  "
                ></i>
                <p v-show="!locked" class="positionR">
                  <span
                    class="iconfont icon-huizhi"
                    @click="testClickT(index, item)"
                  ></span>
                  <!-- {{ activeIndex.name }} -->
                </p>
              </div>

              <core-form
                :formOptions="item.protectForm"
                :formValues="item.protectParam"
                @addList="
                  (valueIndex) =>
                    addPolygonList('dispose', { dataIndex: index, valueIndex })
                "
                @delList="
                  (valueIndex) =>
                    delPolygonList('dispose', { dataIndex: index, valueIndex })
                "
                id="protect"
                class="protect"
                :headOptions="item.upForm"
                :headValues="item.upParam"
                :moudleName="$t('task.CZQ')"
                @changeSpectrum="
                  (data) => handleSpectrum(data, 'dispose', index)
                "
                :isSelected="item.upParam.Shape_Region_Control"
                :locked="locked"
              ></core-form>
            </div>
          </div>
        </div>
        <!-- 识别区开始 -->
        <p class="dr-title" style="position: relative">
          <span>识别区</span>
          <i
            v-show="!locked"
            class="el-icon-circle-plus"
            @click="addItemsIdentfy()"
          ></i>
        </p>
        <!--         <div v-if='Length_Defense===2' class="core">
          <app-form :formOptions="disposalFormA" :formValues="disposalParamA" id="core3" :locked="locked"></app-form>
        </div>
        <div v-if='Length_Defense===1'>
          <div v-for="(item,index) in trackData2" :key='index' class='mobile'>
            <div :class="{'isActive':activeIndex.name === 'shapeE' && activeIndex.index === index}"
              style="color: #ffffff; font-size: 16px; border:1px solid rgba(255,255,255,0.4) ;width: 485px; margin: 0 auto 16px;border-radius: 5px;">
              <div slot="header" style="position:relative">
                <i v-show="!locked" class="el-icon-remove delete-pic"
                  @click='deleteForm2(index,item.upParam.Shape_Region_Control,item)'></i>
                <p v-show="!locked" class="positionR">
                  <span class="iconfont icon-huizhi" @click="testClickTA(index,item)"></span>
                </p>
              </div>
              <core-form :formOptions="item.protectForm" :formValues="item.protectParam"
                @addList="(valueIndex)=>addPolygonList('disposeA',{dataIndex:index,valueIndex})"
                @delList="(valueIndex)=>delPolygonList('disposeA',{dataIndex:index,valueIndex})" id='protect'
                class="protect" :headOptions="item.upForm" :headValues="item.upParam" :moudleName="$t('task.CZQ')"
                @changeSpectrum="(data)=>handleSpectrum(data,'disposeA',index)"
                :isSelected="item.upParam.Shape_Region_Control" :locked="locked"></core-form>
            </div>
          </div>
        </div> -->
        <!-- <div class="core" v-for="(item,index) in trackData2" :key="index" id="core5">
                <i v-show="!locked && index==(trackData2.length-1)" class="el-icon-remove delete-pic" @click="deleteForm2(index)"></i>
                <app-form :formOptions="item.protectForm" :formValues="item.protectParam" :locked="locked"></app-form>
            </div> -->
        <div v-if="Length_Defense === 1">
          <div v-for="(item, index) in trackData2" :key="index" class="mobile">
            <div
              :class="{
                isActive:
                  activeIndex.name === 'shapeE' && activeIndex.index === index,
              }"
              style="
                color: #ffffff;
                font-size: 16px;
                border: 1px solid rgba(255, 255, 255, 0.4);
                width: 485px;
                margin: 0 auto 16px;
                border-radius: 5px;
              "
            >
              <div slot="header" style="position: relative">
                <i
                  v-show="!locked && index == trackData2.length - 1"
                  class="el-icon-remove delete-pic"
                  @click="
                    deleteForm2(index, item.upParam.Shape_Region_Control, item)
                  "
                ></i>
                <p v-show="!locked" class="positionR">
                  <span
                    class="iconfont icon-huizhi"
                    @click="testClickTA(index, item)"
                  ></span>
                </p>
              </div>

              <core-form
                :formOptions="item.protectForm"
                :formValues="item.protectParam"
                @addList="
                  (valueIndex) =>
                    addPolygonList('disposeA', { dataIndex: index, valueIndex })
                "
                @delList="
                  (valueIndex) =>
                    delPolygonList('disposeA', { dataIndex: index, valueIndex })
                "
                id="protect"
                class="protect"
                :headOptions="item.upForm"
                :headValues="item.upParam"
                :moudleName="'识别区'"
                @changeSpectrum="
                  (data) => handleSpectrum(data, 'disposeA', index)
                "
                :isSelected="item.upParam.Shape_Region_Control"
                :locked="locked"
              ></core-form>
            </div>
          </div>
        </div>
        <!-- 识别区结束 -->
        <p class="dr-title" style="position: relative">
          <span>预警区</span>
          <i
            v-show="!locked"
            class="el-icon-circle-plus"
            @click="addItemsEarlyWarning()"
          ></i>
          <!-- <span class="huakuai" style="top:0" v-if='Length_Defense===1'>
            <i :class="RSS_Defense==1 ? 'classTwo' : ''" @click="onRSS_Defense(1)">识别区</i>
            <i :class="RSS_Defense==2 ? 'classTwo' : ''" @click="onRSS_Defense(2)">反制区</i>
          </span> -->
        </p>
        <!-- v-show="warnShow" -->
        <!-- <div class="core" v-for="(item,index) in silenceData" :key="index" id="core4">

                <i v-show="!locked && index==(silenceData.length-1)" class="el-icon-remove delete-pic" @click="deleteSilence(index)"></i>
                <app-form :formOptions="item.protectForm" :formValues="item.protectParam" :locked="locked"></app-form>
            </div> -->
        <!-- <div>
          <p class="dr-title">
            <span> {{$t('task.JMQ')}}</span>
            <i v-show="!locked" class="el-icon-circle-plus" @click="silenceAdd"></i>
          </p>
        </div> -->

        <div v-if="Length_Defense === 1">
          <div v-for="(item, index) in silenceData" :key="index" class="mobile">
            <div
              :class="{
                isActive:
                  activeIndex.name === 'shapeC' && activeIndex.index === index,
              }"
              style="
                color: #ffffff;
                font-size: 16px;
                border: 1px solid rgba(255, 255, 255, 0.4);
                width: 485px;
                margin: 0 auto 16px;
                border-radius: 5px;
              "
            >
              <div slot="header" style="position: relative">
                <i
                  v-show="!locked && index == silenceData.length - 1"
                  class="el-icon-remove delete-pic"
                  @click="
                    deleteSilence(
                      index,
                      item.upParam.Shape_Region_Control,
                      item
                    )
                  "
                ></i>
                <p v-show="!locked" class="positionR">
                  <span
                    class="iconfont icon-huizhi"
                    @click="onJmq(index, item)"
                  ></span>
                  <!-- {{ activeIndex.name === 'shapeC' }}--{{ activeIndex.index }} --{{ index }} -->
                </p>
              </div>
              <core-form
                :formOptions="item.protectForm"
                :formValues="item.protectParam"
                @addList="
                  (valueIndex) =>
                    addPolygonList('silence', { dataIndex: index, valueIndex })
                "
                @delList="
                  (valueIndex) =>
                    delPolygonList('silence', { dataIndex: index, valueIndex })
                "
                id="silence"
                class="protect"
                :headOptions="item.upForm"
                :headValues="item.upParam"
                moudleName="预警区"
                @changeSpectrum="
                  (data) => handleSpectrum(data, 'silence', index)
                "
                :isSelected="item.upParam.Shape_Region_Control"
                :locked="locked"
              ></core-form>
            </div>
          </div>
        </div>

        <!-- <div>
          <div v-for="(item,index) in silenceData" :key='index' class='mobile' style="margin-bottom:16px">

            <div class='silence boxSty'>
              <div slot="header" style="position:relative">
                <img src="@/assets/imgs/task/circular.png" alt="" class="circular1-pic">
                <p v-show="!locked" class="positionR">
                  <span class="iconfont icon-huizhi" @click="onJmq(index,item)"></span>
                </p>
                <i v-show="!locked" class="el-icon-remove delete-pic"
                  @click='deleteSilence(index,item.upParam.Shape_Region_Control,item)'></i>
              </div>

              <core-form :formOptions="item.protectForm" 
              :formValues="item.protectParam" id='silence'
                :headOptions="item.upForm" :headValues="item.upParam" 
                :locked="locked"></core-form>
            </div>
          </div>
        </div> -->
        <!--      <div>
          <p class="dr-title">
            <span> {{$t('task.YPQ')}}</span>
            <i v-show="!locked" class="el-icon-circle-plus" @click="trapAdd"></i>
          </p>
        </div>
        <div>
          <div v-for="(item,index) in trapData" :key='index' class='mobile' style="margin-bottom:16px">

            <div class='trap boxSty'>
              <div slot="header" style="position:relative">
                <img src="@/assets/imgs/task/circular.png" alt="" class="circular1-pic">
                <p v-show="!locked" class="positionR">
                  <span class="iconfont icon-huizhi" @click="onXpq(index,item)"></span>
                </p>
                <i v-show="!locked" class="el-icon-remove delete-pic"
                  @click='deleteTrap(index,item.upParam.Shape_Region_Control,item)'></i>
              </div>

              <core-form :formOptions="item.protectForm" :formValues="item.protectParam" id='trap'
                :headOptions="item.upForm" :headValues="item.upParam" :locked="locked">
              </core-form>
            </div>
          </div>
        </div> -->
      </div>

      <div class="time-box">
        <app-form
          ref="test"
          :formOptions="formOptions"
          :formValues="formValues"
          :locked="locked"
        ></app-form>
      </div>
    </div>
    <div class="bottom-btn-list">
      <!-- v-loading='isSaveing' -->
      <p @click="onSure('save')">{{ $t("home.save") }}</p>
      <p @click="copy">{{ $t("task.KB") }}</p>
      <p :class="{ isLocked: isLocked }" @click="changeLocked">
        <span v-show="isLocked">已</span>{{ $t("task.SD") }}
      </p>
      <p
        @click="
          () => {
            this.$router.back();
          }
        "
      >
        {{ $t("home.return") }}
      </p>
    </div>
    <app-box
      :modelFlag="modelFlag"
      :modalTitle="$t('home.MLTS')"
      modalText="当前防控任务已激活"
      :modalclose="modalclose"
      @delSingle="delSingle"
      leftBtnText="确定"
      rightBtnText=""
    ></app-box>
  </div>
      </div>
      <template #footer>
        <div class="dialog-footer text-center">
          <el-button >重置</el-button>
          <el-button @click="emits('update:issuggest',false)">取消</el-button>
          <el-button type="primary">
           提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  
  



  <script>
  import L from "leaflet";

  import { mapF } from "@/components/js/iconDataMap.js";
  import { getLatlngString } from "@/components/js/util.js";
  import markerIcon from "leaflet-draw/dist/images/marker-icon.png";
  import { mapState } from "vuex";
  export default {
   
    data() {
      return {
        roundnessList_identify: [],
        roundnessList_earlyWarning: [],
        //
        identification: [
          /*  {
                     formOptions:
                     [{
                         long: {
                           indexA: 'WYCD',
                           label: '外延长度',
                           type: 'input',
                           unit: 'm'
                         },
                         Height_Control: {
                           indexA: 'FKGD',
                           label: '防控高度',
                           type: 'input',
                           unit: 'm'
                         }
                       }],
                     formValues:{
                       long: 0,
                       Height_Control: 0
                     }
                   }, */
        ],
        earlyWarning: [
          /* {
                    formOptions:
                    [{
                        long: {
                          indexA: 'WYCD',
                          label: '外延长度',
                          type: 'input',
                          unit: 'm'
                        },
                        Height_Control: {
                          indexA: 'FKGD',
                          label: '防控高度',
                          type: 'input',
                          unit: 'm'
                        }
                      }],
                    formValues:{
                      long: 0,
                      Height_Control: 0
                    }
                  }, */
        ],
        RSS_Defense: 1, // 1是软杀，2是硬杀
        modalclose: true,
        modelFlag: false, // 激活提示弹窗
        isButton: true,
        // 修改id
        id: this.$route.params.id || 0,
        shape: [], // 核心区
        shapeA: [], // 反制区
        shapeE: [], // 识别区
        shapeC: [], // 静默区
        shapeD: [], // 诱铺区
        indexLog: 0, // 点击定位的下标
        indexType: 0, // 0是核心区1是反制区
        map: {},
        drawLayer: "",
        mapDataList: "",
        circleEdit: "", // 地图形状编辑
        circleDele: "", // 地图删除
        latlngStringFormat: "",
        mouseLatlng: [0, 0], // 当前鼠标的经纬度位置
        latlngString: "", // 经纬度显示内容
        circleDraw: "",
        polygonDraw: "", // 多边形
        dialogVisible: false,
        editDialogVisible: false,
        Type_Task_Control: 1, //  0: '机动式', 1: '固定式',
        Length_Defense: 1, // 反制区-1是自定义
        customState: false,
        type: "",
        formOptions: [
          {
            dataTime: {
              label: "计划时间",
              indexA: "JHSJ",
              type: "datetimeRange",
              separator: "至",
            },
          },
        ],
        formValues: {
          dataTime: [
            new Date(),
            new Date().setTime(new Date().getTime() + 3600 * 1000 * 24 * 7),
          ],
        },
        coreState: true,
  
        trapData: [],
        trackData: [],
        trackData1: [],
        trackData2: [], // 识别区
        silenceData: [], //预警区数组
        headForm: [
          {
            head: {
              indexA: "K",
              type: "input",
            },
          },
        ],
        headParam: {
          index: "",
          head: "无形截击防控任务",
        },
        // 机动式-核心区
        coreMobile: [],
        // 机动式-核心区
        coreMobileForm: [
          {
            Radius: {
              indexA: "BJ",
              label: "半径",
              type: "input",
              min: 0,
              unit: "m",
            },
            Height_Control: {
              indexA: "FKGD",
              label: "防控高度",
              type: "input",
              unit: "m",
            },
          },
        ],
        // 机动式-核心区
        coreMobileParam: {
          Radius: 0,
          Height_Control: 0,
        },
        // 机动式-反制区
        disposalMobile: [],
        // 机动式-反制区
        disposalMobileForm: [
          {
            long: {
              indexA: "WYCD",
              label: "外延长度",
              type: "input",
              unit: "m",
            },
            Height_Control: {
              indexA: "FKGD",
              label: "防控高度",
              type: "input",
              unit: "m",
            },
          },
        ],
        // 机动式-反制区
        disposalMobileParam: {
          long: 0,
          Height_Control: 0,
        },
        // 机动式-识别区
        disposalMobileA: [],
        // 机动式-识别区
        disposalMobileFormA: [
          {
            long: {
              indexA: "WYCD",
              label: "外延长度",
              type: "input",
              unit: "m",
            },
            Height_Control: {
              indexA: "FKGD",
              label: "防控高度",
              type: "input",
              unit: "m",
            },
          },
        ],
        // 机动式-识别区
        disposalMobileParamA: {
          long: 0,
          Height_Control: 0,
        },
        // 机动式-预警区
        warnMobile: [],
        // 机动式-预警区
        warnMobileForm: [
          {
            long: {
              indexA: "WYCD",
              label: "外延长度",
              type: "input",
              unit: "m",
            },
            Height_Control: {
              indexA: "FKGD",
              label: "防控高度",
              type: "input",
              unit: "m",
            },
          },
        ],
        // 机动式-预警区
        warnMobileParam: {
          long: 0,
          Height_Control: 0,
        },
        // 机动式
        // 反制区外延
        disposalForm: [
          {
            long: {
              indexA: "WYCD",
              label: "外延长度",
              type: "input",
              unit: "m",
            },
            Height_Control: {
              indexA: "FKGD",
              label: "防控高度",
              type: "input",
              unit: "m",
            },
          },
        ],
        // 反制区外延
        disposalParam: {
          long: 0,
          Height_Control: 0,
        },
        // 识别区外延
        disposalFormA: [
          {
            long: {
              indexA: "WYCD",
              label: "外延长度",
              type: "input",
              unit: "m",
            },
            Height_Control: {
              indexA: "FKGD",
              label: "防控高度",
              type: "input",
              unit: "m",
            },
          },
        ],
        // 识别区外延
        disposalParamA: {
          long: 0,
          Height_Control: 0,
        },
        // 圆形表单
        circularForm: [
          {
            Longitude: {
              indexA: "YXJD",
              label: "圆心经度",
              type: "latlngInput",
              max: "180",
              min: "0",
            },
          },
          {
            Latitude: {
              indexA: "YXWD",
              label: "圆心纬度",
              type: "latlngInput",
              max: "90",
              min: "0",
            },
          },
          {
            Radius: {
              indexA: "BJ",
              label: "半径",
              type: "input",
              min: 0,
              unit: "m",
            },
            Height_Control: {
              indexA: "FKGD",
              label: "防控高度",
              type: "input",
              unit: "m",
            },
          },
        ],
        // 圆形表单
        circularParam: {
          Longitude: 0,
          Latitude: 0,
          Radius: 0,
          Height_Control: 0,
        },
        // 扇形表单
        sectorForm: [
          {
            Longitude: {
              indexA: "ZXJD",
              label: "中心经度",
              type: "latlngInput",
              max: "180",
              min: "0",
            },
          },
          {
            Latitude: {
              indexA: "ZXWD",
              label: "中心纬度",
              type: "latlngInput",
              max: "90",
              min: "0",
            },
          },
          {
            Angle_Centerline: {
              indexA: "QSJD",
              label: "起始角度",
              type: "input",
              unit: "°",
            },
            Angle_Sector: {
              indexA: "ZZJD",
              label: "终止角度",
              type: "input",
              unit: "°",
            },
          },
          {
            Radius: {
              indexA: "BJ",
              label: "半径",
              type: "input",
              min: 0,
              unit: "m",
            },
            Height_Control: {
              indexA: "FKGD",
              label: "防控高度",
              type: "input",
              unit: "m",
            },
          },
        ],
        // 扇形表单
        sectorParam: {
          Longitude: 0,
          Latitude: 0,
          Angle_Centerline: 0,
          Angle_Sector: 0,
          Radius: 0,
          Height_Control: 0,
        },
        // 预警区外延
        warnForm: [
          {
            long: {
              indexA: "WYCD",
              label: "外延长度",
              type: "input",
              unit: "m",
            },
            Height_Control: {
              indexA: "FKGD",
              label: "防控高度",
              type: "input",
              unit: "m",
            },
          },
        ],
        // 预警区外延
        warnParam: {
          long: 0,
          Height_Control: 0,
        },
        // 多边形表单
        multilateralForm: [
          {
            Longitude: {
              indexA: "JD",
              label: "经度",
              type: "latlngInput",
              max: "190",
              min: "0",
            },
            Latitude: {
              indexA: "WD",
              label: "纬度",
              type: "latlngInput",
              max: "90",
              min: "0",
            },
          },
          {
            Longitude: {
              indexA: "JD",
              label: "经度",
              type: "latlngInput",
              max: "180",
              min: "0",
            },
            Latitude: {
              index: "WD",
              label: "纬度",
              type: "latlngInput",
              max: "90",
              min: "0",
            },
          },
        ],
        // 多边形表单
        multilateralParam: [
          {
            Longitude: 0,
            Latitude: 0,
          },
          {
            Longitude: 0,
            Latitude: 0,
          },
        ],
        chuzhiheadForm: [
          {
            type: {
              indexA: "CZQ",
              label: "反制区",
              type: "select",
              options: {
                0: "自定义设置",
                1: "核心区外延",
              },
            },
          },
        ],
        chuzhiheadParam: {
          type: "",
        },
  
        testArr: [],
        // 当前选中的绘制图像参数
        selectedDraw: {
          type: "",
          // 核心区
          core: {
            index: 0,
            // 圆形配置
            circle: {},
            circleDrawLayer: {},
            circleEdit: {},
            // 多边形配置
            polygon: {},
            polygonDrawLayer: {},
            polygonEdit: {},
            // 右键
            // markercontext: {}
            //
          },
          // 反制区
          dispose: {
            index: 0,
            // 圆形配置
            circle: {},
            circleDrawLayer: {},
            circleEdit: {},
            // 多边形配置
            polygon: {},
            polygonDrawLayer: {},
            polygonEdit: {},
            // 外延
            extend: "",
          },
          // 识别区
          disposeA: {
            index: 0,
            // 圆形配置
            circle: {},
            circleDrawLayer: {},
            circleEdit: {},
            // 多边形配置
            polygon: {},
            polygonDrawLayer: {},
            polygonEdit: {},
            // 外延
            extend: "",
          },
          // 预警区
          warning: {
            // extend: '',
            // circleDrawLayer: {}
            index: 0,
            // 圆形配置
            circle: {},
            circleDrawLayer: {},
            circleEdit: {},
          },
          // 静默区
          silence: {
            index: 0,
            // 圆形配置
            circle: {},
            circleDrawLayer: {},
            circleEdit: {},
            polygon: {},
            polygonDrawLayer: {},
            polygonEdit: {},
          },
          // 诱捕区
          trap: {
            index: 0,
            // 圆形配置
            circle: {},
            circleDrawLayer: {},
            circleEdit: {},
          },
        },
        // 图形基本配置
        drawOptions: {
          // 核心区
          core: {
            shapeOptions: {
              stroke: true,
              color: "#D9001B",
              opacity: 1,
              fill: true,
              fillColor: null, // same as color by default
              fillOpacity: 0.2,
              clickable: true,
            },
          },
          // 反制区
          dispose: {
            shapeOptions: {
              stroke: true,
              color: "#F9B604",
              opacity: 1,
              fill: true,
              fillColor: null, // same as color by default
              fillOpacity: 0.2,
              clickable: true,
            },
          },
          // 识别区
          disposeA: {
            shapeOptions: {
              stroke: true,
              color: "#04BAF9",
              opacity: 1,
              fill: true,
              fillColor: null, // same as color by default
              fillOpacity: 0.2,
              clickable: true,
            },
          },
          // 静默区
          silence: {
            shapeOptions: {
              stroke: true,
              color: "#F9D904",
              opacity: 1,
              fill: true,
              fillColor: null, // same as color by default
              fillOpacity: 0.2,
              clickable: true,
            },
          },
          // 诱捕区
          trap: {
            shapeOptions: {
              stroke: true,
              color: "#F9D904",
              opacity: 1,
              fill: true,
              fillColor: null, // same as color by default
              fillOpacity: 0.2,
              clickable: true,
            },
          },
        },
        // 选中样式
        activeIndex: {
          name: "",
          index: "",
        },
        // 是否折叠预警区
        warnShow: false,
        // 是否激活
        activationTask: 0,
        // 保存遮罩
        isSaveing: false,
        // 锁定状态
        locked: false,
        isLocked: false,
      };
    },
    components: {
      appForm: () => import("@/components/basic/appForm.vue"),
      coreForm: () => import("@/components/basic/coreForm.vue"),
      appBox: () => import("@/components/basic/appBox.vue"),
    },

    mounted() {
      // this.warnShow = true
      // this.trapAdd()
      // this.silenceAdd()
      // this.add()
      // this.add1()
      this.map = this.$store.state.equipment.map;
      // 初始化各类绘制类型
      if (this.map) {
        //  核心区
        // trap
        let { core, dispose, disposeA, silence } = this.drawOptions;
        this.selectedDraw.core.circle = new L.Draw.Circle(this.map);
        // this.selectedDraw.core.marker = new L.Draw.Marker(this.map)
        this.selectedDraw.core.circle.setOptions(core);
        this.selectedDraw.core.circleDrawLayer = new L.FeatureGroup();
        this.selectedDraw.core.circleDrawLayer.addTo(this.map);
        // this.selectedDraw.core.markercontext.addTo(this.map)
        this.selectedDraw.core.circleEdit = new L.EditToolbar.Edit(this.map, {
          featureGroup: this.selectedDraw.core.circleDrawLayer,
        });
        // draw: markercontext
        // 反制区
        this.selectedDraw.dispose.circle = new L.Draw.Circle(this.map);
        this.selectedDraw.dispose.circle.setOptions(dispose);
        this.selectedDraw.dispose.circleDrawLayer = new L.FeatureGroup();
        this.selectedDraw.dispose.circleDrawLayer.addTo(this.map);
        this.selectedDraw.dispose.circleEdit = new L.EditToolbar.Edit(this.map, {
          featureGroup: this.selectedDraw.dispose.circleDrawLayer,
        });
  
        // 识别区
        this.selectedDraw.disposeA.circle = new L.Draw.Circle(this.map);
        this.selectedDraw.disposeA.circle.setOptions(disposeA);
        this.selectedDraw.disposeA.circleDrawLayer = new L.FeatureGroup();
        this.selectedDraw.disposeA.circleDrawLayer.addTo(this.map);
        this.selectedDraw.disposeA.circleEdit = new L.EditToolbar.Edit(this.map, {
          featureGroup: this.selectedDraw.disposeA.circleDrawLayer,
        });
  
        // 静默区
        this.selectedDraw.silence.circle = new L.Draw.Circle(this.map);
        this.selectedDraw.silence.circle.setOptions(silence);
        this.selectedDraw.silence.circleDrawLayer = new L.FeatureGroup();
        this.selectedDraw.silence.circleDrawLayer.addTo(this.map);
        this.selectedDraw.silence.circleEdit = new L.EditToolbar.Edit(this.map, {
          featureGroup: this.selectedDraw.silence.circleDrawLayer,
        });
  
        /*     // 诱捕区
        this.selectedDraw.trap.circle = new L.Draw.Circle(this.map)
        this.selectedDraw.trap.circle.setOptions(trap)
        this.selectedDraw.trap.circleDrawLayer = new L.FeatureGroup()
        this.selectedDraw.trap.circleDrawLayer.addTo(this.map)
        this.selectedDraw.trap.circleEdit = new L.EditToolbar.Edit(this.map, { featureGroup: this.selectedDraw.trap.circleDrawLayer })
   */
        // 多边形
        this.selectedDraw.core.polygon = new L.Draw.Polygon(this.map);
        this.selectedDraw.core.polygon.setOptions(core);
        this.selectedDraw.core.polygonDrawLayer = new L.FeatureGroup();
        this.selectedDraw.core.polygonDrawLayer.addTo(this.map);
        this.selectedDraw.core.polygonEdit = new L.EditToolbar.Edit(this.map, {
          featureGroup: this.selectedDraw.core.polygonDrawLayer,
        });
  
        this.selectedDraw.dispose.polygon = new L.Draw.Polygon(this.map);
        this.selectedDraw.dispose.polygon.setOptions(dispose);
        this.selectedDraw.dispose.polygonDrawLayer = new L.FeatureGroup();
        this.selectedDraw.dispose.polygonDrawLayer.addTo(this.map);
        this.selectedDraw.dispose.polygonEdit = new L.EditToolbar.Edit(this.map, {
          featureGroup: this.selectedDraw.dispose.polygonDrawLayer,
        });
  
        this.selectedDraw.disposeA.polygon = new L.Draw.Polygon(this.map);
        this.selectedDraw.disposeA.polygon.setOptions(disposeA);
        this.selectedDraw.disposeA.polygonDrawLayer = new L.FeatureGroup();
        this.selectedDraw.disposeA.polygonDrawLayer.addTo(this.map);
        this.selectedDraw.disposeA.polygonEdit = new L.EditToolbar.Edit(
          this.map,
          {
            featureGroup: this.selectedDraw.disposeA.polygonDrawLayer,
          }
        );
        this.selectedDraw.silence.polygon = new L.Draw.Polygon(this.map);
        this.selectedDraw.silence.polygon.setOptions(silence);
        this.selectedDraw.silence.polygonDrawLayer = new L.FeatureGroup();
        this.selectedDraw.silence.polygonDrawLayer.addTo(this.map);
        this.selectedDraw.silence.polygonEdit = new L.EditToolbar.Edit(this.map, {
          featureGroup: this.selectedDraw.silence.polygonDrawLayer,
        });
  
        // 用于机动式
        this.selectedDraw.warning.circleDrawLayer = new L.FeatureGroup();
        this.selectedDraw.warning.circleDrawLayer.addTo(this.map);
        var name = localStorage["created"]; // qu
        if (Number(name) === 1) {
          this.map.on("draw:created", this.drawCreated);
          this.map.on("draw:editstop", this.drawCreatedEdit);
        }
      }
      this.dragTl();
      this.getTaskDetailById();
      // 根据id查询防控任务详情接口
    },
    destroyed() {
      // 清空所有绘制图形
      this.clearAll();
      // 清空监听
      this.clearOn();
      // 清空所有机动式
      this.clearMobileAll();
      //清空预警区
      this.clearSilence();
    },
  
    methods: {
      delItems_identify(index) {
        //识别区 删除一项
        this.trackData2.splice(index, 1);
  
        //    this. map.removeLayer(this.roundnessList_identify[index]);
  
        //    this.roundnessList_identify.splice(index,1)
        /* if( typeof this.earlyWarning[index] != 'undefined'){
              this.map.removeLayer( this.roundnessList_earlyWarning[index])
              this.roundnessList_earlyWarning.splice(index, 1)
              this.earlyWarning.splice(index, 1)
            } */
      },
      //预警区删除一项
      delItems_earlyWarning(index) {
        this.silenceData.splice(index, 1);
  
        /*   this. map.removeLayer(this.roundnessList_earlyWarning[index]);
  
              this.roundnessList_earlyWarning.splice(index,1) */
      },
      addItemsIdentfy() {
        if (this.trackData1.length == 0) {
          this.$message.error("反制区没有绘制圆形图");
          return;
        }
        const index = this.trackData2.length; //当前添加项的下标
  
        // console.log(this.trackData1[0])
        console.log(this.drawOptions.disposeA.shapeOptions);
  
        // const index =this.trackData1.length;//当前添加项的下标
        debugger;
        if (this.trackData1.length == index) {
          this.$message.error("识别区的圆绘制不能超过反制区圆的个数");
          return;
        }
        const { protectParam, upParam, protectForm, upForm, state } =
          this.trackData1[index];
        debugger;
  
        const { Radius } = protectParam;
        let r = Number(Radius) + 5000;
        let data = {
          state,
          upForm: this._.cloneDeep(upForm),
          protectForm: this._.cloneDeep(protectForm),
          upParam: {
            proTect: "识别区" + Number(index + 1),
            Shape_Region_Control: upParam.Shape_Region_Control,
          },
          protectParam: Object.assign(
            {},
            {
              ...protectParam,
            },
            {
              Radius: r,
            }
          ),
        };
        data.upForm[0].Shape_Region_Control.onChange = this.test2;
        if (upParam.Shape_Region_Control == "0x7F") {
          data.protectForm = [];
          data.protectParam = {
            list: [
              {
                Latitude: 0,
                Longitude: 0,
              },
            ],
            height: "",
          };
        }
        this.trackData2.push(data);
        let { disposeA } = this.drawOptions;
        let type = upParam.Shape_Region_Control;
        localStorage.created = 1;
        // event.stopPropagation()
        // 存入反制区下标
        this.selectedDraw.disposeA.index = index;
        this.selectedDraw.type = "disposeA";
        // 关闭所有绘制
        this.closeAllDraw();
  
        /* let newC=    new L.Circle([Number(newCenter.Latitude), Number(newCenter.Longitude)], Number(newCenter.Radius),               
                      this.drawOptions.disposeA.shapeOptions
                  ) */
        // this.roundnessList_identify.push(newC)
        // this.roundnessList_identify[this.roundnessList_identify.length-1].addTo(this.map)
        // .addTo(this.map)
        // newC.addTo(this.selectedDraw.disposeA.circleDrawLayer)
  
        if (upParam.Shape_Region_Control != "0x7F") {
          this.drawTypeCreated(
            type,
            Object.assign(
              {},
              {
                ...protectParam,
              },
              {
                Radius: r,
              }
            ),
            disposeA.shapeOptions,
            "disposeA",
            this.selectedDraw.disposeA.index
          );
        }
      },
      addItemsEarlyWarning() {
        if (this.trackData2.length == 0) {
          this.$message.error("识别区没有绘制圆形图");
          return;
        }
        const index = this.silenceData.length; //当前添加项的下标
        if (this.trackData2.length == index) {
          this.$message.error("预警区的圆绘制不能超过识别区圆的个数");
          return;
        }
        // console.log(this.trackData2[0])
        // console.log(this.drawOptions.disposeA.shapeOptions)
  
        const { protectParam, upParam, protectForm, upForm, state } =
          this.trackData2[index];
  
        const { Radius } = protectParam;
        let r = Number(Radius) + 5000;
  
        let data = {
          state,
          upForm: this._.cloneDeep(upForm),
          protectForm: this._.cloneDeep(protectForm),
          upParam: {
            proTect: "预警区" + Number(index + 1),
            Shape_Region_Control: upParam.Shape_Region_Control,
          },
          protectParam: Object.assign(
            {},
            {
              ...protectParam,
            },
            {
              Radius: r,
            }
          ),
        };
        data.upForm[0].Shape_Region_Control.onChange = this.test3;
        if (upParam.Shape_Region_Control == "0x7F") {
          data.protectForm = [];
          data.protectParam = {
            list: [
              {
                Latitude: 0,
                Longitude: 0,
              },
            ],
            height: "",
          };
        }
        this.silenceData.push(data);
        /*     
              let newC=      new L.Circle([Number(newCenter.Latitude), Number(newCenter.Longitude)], Number(newCenter.Radius),               
                  this.drawOptions.silence.shapeOptions
              )
             this. roundnessList_earlyWarning.push(newC)
             this.roundnessList_earlyWarning[this.roundnessList_earlyWarning.length-1].addTo(this.map)
   */
        // .addTo(this.map)
        let { silence } = this.drawOptions;
        let type = upParam.Shape_Region_Control;
        localStorage.created = 1;
        // event.stopPropagation()
        // 存入反制区下标
        this.selectedDraw.silence.index = index;
        this.selectedDraw.type = "silence";
        // 关闭所有绘制
        this.closeAllDraw();
        /*       this.drawTypeCreated(type, Object.assign({}, {
                        ...protectParam
                    }, {
                        Radius: r,
                    }), silence.shapeOptions, 'silence', index) */
  
        if (upParam.Shape_Region_Control != "0x7F") {
          this.drawTypeCreated(
            type,
            Object.assign(
              {},
              {
                ...protectParam,
              },
              {
                Radius: r,
              }
            ),
            silence.shapeOptions,
            "silence",
            index
          );
        }
      },
  
      dragTl() {
        // this.map.dragstart.disable()
        this.map.on("contextmenu", (e) => {
          console.log(e, "=====点击地图");
          this.map.dragstart.disable();
        });
      },
      // // // 拖动结束绑定结束事件
      // dragOver () {
      //   this.map.dragging.enable()
      //   this.map.off(this.dragOver)
      //   console.log(2)
      // },
      delSingle() {
        // 激活弹窗确定
        this.modelFlag = false;
      },
      /**
       * 根据id查询防控任务详情接口
       */
      getTaskDetailById() {
        if (!this.id) {
          return;
        }
  
        let _this = this;
        let url = this.$taskApi + "/api/Prevention/getPrevent";
        this.http
          .post(url, {
            id: this.id,
          })
          .then((con) => {
            let item = con[0];
            _this.headParam.head = con[0].name_Task;
            this.formValues.dataTime = [
              item.plan_Start_Time_Task,
              item.plan_End_Time_Task,
            ];
            _this.activationTask = Number(con[0].activation_Task); // 0是未激活1是激活
            if (Number(con[0].locked_Task) === 1) {
              _this.isLocked = false;
            } else {
              _this.isLocked = true;
            }
            // con[0].status_Task 0包含 1是未包含
            if (Number(con[0].locked_Task) === 0) {
              _this.locked = true;
              // _this.isLocked = true
            } else if (
              Number(con[0].state_Task) === 0 &&
              Number(con[0].locked_Task) === 1 &&
              Number(con[0].activation_Task) === 0
            ) {
              // _this.isLocked = false
              _this.locked = false;
            } else {
              _this.locked = true;
              // _this.isLocked = false
            }
            // if (Number(con[0].locked_Task) === 1) {
            //   _this.locked = false
            //   _this.isLocked = false
            // }
            // con[0].state_Task 0未执行 1是已执行 2是已过期
            // con[0].locked_Task 0是锁定 1是未锁定
            // ---activationTask  0是未激活 1是激活
            // 机动式
            if (con[0].type_Task_Control === "0") {
              let {
                length_Defense: lengthDefense,
                length_DefenseA: lengthDefenseA,
                length_Warning: lengthWarning,
                name_Task: nameTask,
                activation_Task: activationTask,
                locked,
                radius,
                height_Control: heightControl,
              } = con[0];
              // 核心区
              _this.coreMobileParam = {
                Radius: radius,
                Height_Control: heightControl || 0,
              };
              // 反制区
              _this.disposalMobileParam = {
                long: JSON.parse(lengthDefense) || 0,
                Height_Control: heightControl || 0,
              };
              // 识别区
              _this.disposalMobileParamA = {
                long: JSON.parse(lengthDefenseA) || 0,
                Height_Control: heightControl || 0,
              };
              // 预警区
              _this.warnMobileParam = {
                long: JSON.parse(lengthWarning) || 0,
                Height_Control: heightControl || 0,
              };
              // 任务名称
              _this.headParam.head = nameTask;
              // 是否激活
              _this.activationTask = JSON.parse(activationTask);
              // 是否锁定
              _this.locked = !JSON.parse(locked);
              _this.Type_Task_Control = 0;
            } else {
              /**
               * Type_Region_control
               * 0：核心区
               * 1：反制区
               * 2：反制区自动填充
               * 3：静默区（形状默认为圆形，无其他形状）
               * 4：定点迫降区
               * */
              /**
               * 预警区不返回，故从反制区做判断，如果有预警区长度则添加预警区
               * 每条数据都要根据相应的类型做添加数据及图形
               */
              // 判断反制区是否自定义 大于则是外延， = 0则是自定义
  
              // if (con.filter((item) => { return JSON.parse(item.length_Defense) }).length > 0) {
              //   this.Length_Defense = 2 //外延
              // } else {
              //   this.Length_Defense = 1 // 自定义
              // }
              if (con.length > 0) {
                con.forEach((item, index) => {
                  if (
                    Number(item.type_Region_Control) === 1 ||
                    Number(item.type_Region_Control) === 2
                  ) {
                    if (Number(item.extend_Length) === 0) {
                      this.Length_Defense = 1; // 自定义
                    } else {
                      this.Length_Defense = 2; // 外延
                    }
                  }
                });
              }
              // console.log('a', con.filter((item) => { return JSON.parse(item.length_Defense) }).length)
              /**
               * 如果反制区是外延则不需要遍历反制区
               * 填充完核心区，赋值即可
               */
              //  trap
              let { core, dispose, disposeA, silence } = this.drawOptions;
              con.map((item) => {
                if (this.Length_Defense === 2) {
                  // 反制区外延
                  if (Number(item.type_Region_Control) === 1) {
                    _this.disposalParam.long = Number(item.extend_Length);
                  }
                  // 识别区外延
                  if (Number(item.type_Region_Control) === 2) {
                    _this.disposalParamA.long = Number(item.extend_Length);
                  }
                  switch (item.type_Region_Control) {
                    // 核心区
                    case "0":
                      this.selectedDraw.type = "core";
                      this.selectedDraw.core.index = _this.trackData.length;
                      let data = {
                        state: true,
                        upForm: [
                          {
                            proTect: {
                              indexA: "K",
                              type: "input",
                            },
                            Shape_Region_Control: {
                              type: "select",
                              indexA: "K",
                              options: {
                                "0x7A": require("@/assets/imgs/task/circular.png"),
                                "0x7B": require("@/assets/imgs/task/sector.png"),
                                "0x7C": require("@/assets/imgs/task/Annularsector.png"),
  
                                "0x7F": require("@/assets/imgs/task/duobian.png"),
                              },
                              index: Number(_this.trackData.length),
                              onChange: _this.test,
                            },
                          },
                        ],
                        upParam: {
                          proTect: item.shape_Name,
                          Shape_Region_Control: item.shape_Region_Control,
                        },
                        protectForm: [
                          {
                            Longitude: {
                              indexA: "YXJD",
                              label: "圆心经度",
                              type: "latlngInput",
                              max: "180",
                              min: "0",
                            },
                          },
                          {
                            Latitude: {
                              indexA: "YXWD",
                              label: "圆心纬度",
                              type: "latlngInput",
                              max: "90",
                              min: "0",
                            },
                          },
                          {
                            Radius: {
                              indexA: "BJ",
                              label: "半径",
                              min: 0,
                              type: "input",
                              unit: "m",
                            },
                            Height_Control: {
                              indexA: "FKGD",
                              label: "防控高度",
                              type: "input",
                              unit: "m",
                            },
                          },
                        ],
                        protectParam: {
                          Longitude: 0,
                          Latitude: 0,
                          Radius: 0,
                          Height_Control: 0,
                          type: 0,
                          index: Number(_this.trackData.length),
                        },
                        isAdd: true,
                      };
                      let { form, param } = _this.drawTypeFormParam(
                        item.shape_Region_Control,
                        item
                      );
                      data.protectForm = form;
                      data.protectParam = param;
                      _this.trackData.push(data);
                      debugger;
                      _this.drawTypeCreated(
                        item.shape_Region_Control,
                        param,
                        core.shapeOptions,
                        "core",
                        _this.trackData.length - 1
                      );
                      break;
                    // 静默区
                    case "3":
                      this.selectedDraw.type = "silence";
                      this.selectedDraw.silence.index = _this.silenceData.length;
                      let silenceData = {
                        upForm: [
                          {
                            proTect: {
                              indexA: "K",
                              type: "input",
                            },
                            Shape_Region_Control: {
                              indexA: "K",
                              type: "text",
                            },
                          },
                        ],
                        upParam: {
                          proTect: item.shape_Name,
                          Shape_Region_Control: "0x7A",
                        },
                        protectForm: [
                          {
                            Longitude: {
                              indexA: "YXJD",
                              label: "圆心经度",
                              type: "latlngInput",
                              max: "180",
                              min: "0",
                            },
                          },
                          {
                            Latitude: {
                              indexA: "YXWD",
                              label: "圆心纬度",
                              type: "latlngInput",
                              max: "90",
                              min: "0",
                            },
                          },
                          {
                            Radius: {
                              indexA: "BJ",
                              label: "半径",
                              type: "input",
                              unit: "m",
                            },
                            Height_Control: {
                              indexA: "FKGD",
                              label: "防控高度",
                              type: "input",
                              unit: "m",
                            },
                          },
                        ],
                        protectParam: {
                          Longitude: 0,
                          Latitude: 0,
                          Radius: 0,
                          Height_Control: 0,
                        },
                      };
                      let { form: silenceForm, param: silenceParam } =
                        _this.drawTypeFormParam(item.shape_Region_Control, item);
                      silenceData.protectForm = silenceForm;
                      silenceData.protectParam = silenceParam;
                      _this.silenceData.push(silenceData);
                      _this.drawTypeCreated(
                        "0x7A",
                        silenceParam,
                        silence.shapeOptions,
                        "silence",
                        _this.silenceData.length
                      );
                      break;
                    // 诱捕区
                    /*  case '4':
                                         this.selectedDraw.type = 'trap'
                                         this.selectedDraw.trap.index = _this.trapData.length
                                         let trapData = {
                                           upForm: [{
                                             proTect: {
                                               indexA: 'K',
                                               type: 'input'
                                             },
                                             Shape_Region_Control: {
                                               indexA: 'K',
                                               type: 'text'
                                             }
                                           }],
                                           upParam: {
                                             proTect: item.shape_Name,
                                             Shape_Region_Control: '0x7A'
                                           },
                                           protectForm: [
                                             {
                                               Longitude: {
                                                 indexA: 'YXJD',
                                                 label: '圆心经度',
                                                 type: 'latlngInput',
                                                 max: '180',
                                                 min: '0'
                                               }
                                             },
                                             {
                                               Latitude: {
                                                 indexA: 'YXWD',
                                                 label: '圆心纬度',
                                                 type: 'latlngInput',
                                                 max: '90',
                                                 min: '0'
                                               }
                                             },
                                             {
                                               Radius: {
                                                 indexA: 'BJ',
                                                 label: '半径',
                                                 type: 'input',
                                                 unit: 'm'
                                               },
                                               Height_Control: {
                                                 indexA: 'FKGD',
                                                 label: '防控高度',
                                                 type: 'input',
                                                 unit: 'm'
                                               }
                                             }
                                           ],
                                           protectParam: {
                                             Longitude: 0,
                                             Latitude: 0,
                                             Radius: 0,
                                             Height_Control: 0
                                           }
                                         }
                                         let { form: trapForm, param: trapParam } = _this.drawTypeFormParam(item.shape_Region_Control, item)
                                         trapData.protectForm = trapForm
                                         trapData.protectParam = trapParam
                                         _this.trapData.push(trapData)
                                         _this.drawTypeCreated('0x7A', trapParam, trap.shapeOptions, 'trap', _this.trapData.length)
                                         break */
                  }
                } else {
                  // type_Region_Control 用来区分是核心区0 反制区1 识别区2 静默区3
                  switch (item.type_Region_Control) {
                    // 核心区
                    case "0":
                      this.selectedDraw.type = "core";
                      this.selectedDraw.core.index = _this.trackData.length;
                      let data = {
                        state: true,
                        upForm: [
                          {
                            proTect: {
                              indexA: "K",
                              type: "input",
                            },
                            Shape_Region_Control: {
                              type: "select",
                              indexA: "K",
                              options: {
                                "0x7A": require("@/assets/imgs/task/circular.png"),
                                "0x7B": require("@/assets/imgs/task/sector.png"),
                                // '0x7C': require('@/assets/imgs/task/Annularsector.png'),
                                // '3': require('@/assets/imgs/task/huan.png'),
                                "0x7F": require("@/assets/imgs/task/duobian.png"),
                              },
                              index: Number(_this.trackData.length),
                              onChange: _this.test,
                            },
                          },
                        ],
                        upParam: {
                          proTect: item.shape_Name,
                          Shape_Region_Control: item.shape_Region_Control,
                        },
                        protectForm: [
                          {
                            Longitude: {
                              indexA: "YXJD",
                              label: "圆心经度",
                              type: "latlngInput",
                              max: "180",
                              min: "0",
                            },
                          },
                          {
                            Latitude: {
                              indexA: "YXWD",
                              label: "圆心纬度",
                              type: "latlngInput",
                              max: "90",
                              min: "0",
                            },
                          },
                          {
                            Radius: {
                              indexA: "BJ",
                              label: "半径",
                              min: 0,
                              type: "input",
                              unit: "m",
                            },
                            Height_Control: {
                              indexA: "FKGD",
                              label: "防控高度",
                              type: "input",
                              unit: "m",
                            },
                          },
                        ],
                        protectParam: {
                          Longitude: 0,
                          Latitude: 0,
                          Radius: 0,
                          Height_Control: 0,
                          type: 0,
                          index: Number(_this.trackData.length),
                        },
                        isAdd: true,
                      };
                      debugger;
                      let { form, param } = _this.drawTypeFormParam(
                        item.shape_Region_Control,
                        item
                      );
                      data.protectForm = form;
                      data.protectParam = param;
                      _this.trackData.push(data);
                      _this.drawTypeCreated(
                        item.shape_Region_Control,
                        param,
                        core.shapeOptions,
                        "core",
                        _this.trackData.length - 1
                      );
                      break;
                    // 反制区
                    case "1":
                      this.selectedDraw.type = "dispose";
                      this.selectedDraw.dispose.index = _this.trackData1.length;
                      let disposeData = {
                        state: true,
                        upForm: [
                          {
                            proTect: {
                              indexA: "K",
                              type: "input",
                            },
                            Shape_Region_Control: {
                              type: "select",
                              indexA: "K",
                              options: {
                                "0x7A": require("@/assets/imgs/task/circular.png"),
                                "0x7B": require("@/assets/imgs/task/sector.png"),
                                // '0x7C': require('@/assets/imgs/task/Annularsector.png'),
                                // '3': require('@/assets/imgs/task/huan.png'),
                                "0x7F": require("@/assets/imgs/task/duobian.png"),
                              },
                              index: Number(_this.trackData1.length),
                              onChange: _this.test1,
                            },
                          },
                        ],
                        upParam: {
                          proTect: item.shape_Name,
                          Shape_Region_Control: item.shape_Region_Control,
                        },
                        protectForm: [
                          {
                            Longitude: {
                              indexA: "YXJD",
                              label: "圆心经度",
                              type: "latlngInput",
                              max: "180",
                              min: "0",
                            },
                          },
                          {
                            Latitude: {
                              indexA: "YXWD",
                              label: "圆心纬度",
                              type: "latlngInput",
                              max: "90",
                              min: "0",
                            },
                          },
                          {
                            Radius: {
                              indexA: "BJ",
                              label: "半径",
                              min: 0,
                              type: "input",
                              unit: "m",
                            },
                            Height_Control: {
                              indexA: "FKGD",
                              label: "防控高度",
                              type: "input",
                              unit: "m",
                            },
                          },
                        ],
                        protectParam: {
                          Longitude: 0,
                          Latitude: 0,
                          Radius: 0,
                          Height_Control: 0,
                          type: 0,
                          index: Number(_this.trackData1.length),
                        },
                        isAdd: true,
                      };
                      let { form: disposeForm, param: disposeParam } =
                        _this.drawTypeFormParam(item.shape_Region_Control, item);
                      disposeData.protectForm = disposeForm;
                      disposeData.protectParam = disposeParam;
                      _this.trackData1.push(disposeData);
                      _this.drawTypeCreated(
                        item.shape_Region_Control,
                        disposeParam,
                        dispose.shapeOptions,
                        "dispose",
                        _this.trackData1.length - 1
                      );
                      break;
                    // 识别区
                    case "2":
                      this.selectedDraw.type = "disposeA";
                      this.selectedDraw.disposeA.index = _this.trackData2.length;
                      let disposeDataA = {
                        state: true,
                        upForm: [
                          {
                            proTect: {
                              indexA: "K",
                              type: "input",
                            },
                            Shape_Region_Control: {
                              type: "select",
                              indexA: "K",
                              options: {
                                "0x7A": require("@/assets/imgs/task/circular.png"),
                                "0x7B": require("@/assets/imgs/task/sector.png"),
                                "0x7F": require("@/assets/imgs/task/duobian.png"),
                              },
                              index: Number(_this.trackData2.length),
                              onChange: _this.test2,
                            },
                          },
                        ],
                        upParam: {
                          proTect: item.shape_Name,
                          Shape_Region_Control: item.shape_Region_Control,
                        },
                        protectForm: [
                          {
                            Longitude: {
                              indexA: "YXJD",
                              label: "圆心经度",
                              type: "latlngInput",
                              max: "180",
                              min: "0",
                            },
                          },
                          {
                            Latitude: {
                              indexA: "YXWD",
                              label: "圆心纬度",
                              type: "latlngInput",
                              max: "90",
                              min: "0",
                            },
                          },
                          {
                            Radius: {
                              indexA: "BJ",
                              label: "半径",
                              min: 0,
                              type: "input",
                              unit: "m",
                            },
                            Height_Control: {
                              indexA: "FKGD",
                              label: "防控高度",
                              type: "input",
                              unit: "m",
                            },
                          },
                        ],
                        protectParam: {
                          Longitude: 0,
                          Latitude: 0,
                          Radius: 0,
                          Height_Control: 0,
                          type: 0,
                          index: Number(_this.trackData2.length),
                        },
                        isAdd: true,
                      };
                      let { form: disposeFormA, param: disposeParamA } =
                        _this.drawTypeFormParam(item.shape_Region_Control, item);
                      disposeDataA.protectForm = disposeFormA;
                      disposeDataA.protectParam = disposeParamA;
                      _this.trackData2.push(disposeDataA);
                      _this.drawTypeCreated(
                        item.shape_Region_Control,
                        disposeParamA,
                        disposeA.shapeOptions,
                        "disposeA",
                        _this.trackData2.length - 1
                      );
                      break;
                    // 静默区
                    case "3":
                      this.selectedDraw.type = "silence";
                      this.selectedDraw.silence.index = _this.silenceData.length;
                      console.log(_this.silenceData.length, "测试");
                      let silenceData = {
                        upForm: [
                          {
                            proTect: {
                              indexA: "K",
                              type: "input",
                            },
                            Shape_Region_Control: {
                              type: "select",
                              indexA: "K",
                              options: {
                                "0x7A": require("@/assets/imgs/task/circular.png"),
                                "0x7B": require("@/assets/imgs/task/sector.png"),
                                // '0x7C': require('@/assets/imgs/task/Annularsector.png'),
                                "0x7F": require("@/assets/imgs/task/duobian.png"),
                              },
                              index: Number(_this.silenceData.length),
                              onChange: _this.test3, //找到对应的变更方法
                            },
                          },
                        ],
  
                        upParam: {
                          proTect: item.shape_Name,
                          Shape_Region_Control: item.shape_Region_Control,
                        },
                        protectForm: [
                          {
                            Longitude: {
                              indexA: "YXJD",
                              label: "圆心经度",
                              type: "latlngInput",
                              max: "180",
                              min: "0",
                            },
                          },
                          {
                            Latitude: {
                              indexA: "YXWD",
                              label: "圆心纬度",
                              type: "latlngInput",
                              max: "90",
                              min: "0",
                            },
                          },
                          {
                            Radius: {
                              indexA: "BJ",
                              label: "半径",
                              type: "input",
                              unit: "m",
                            },
                            Height_Control: {
                              indexA: "FKGD",
                              label: "防控高度",
                              type: "input",
                              unit: "m",
                            },
                          },
                        ],
                        protectParam: {
                          Longitude: 0,
                          Latitude: 0,
                          Radius: 0,
                          Height_Control: 0,
                          type: 0,
                          index: Number(_this.silenceData.length),
                        },
                        isAdd: true,
                      };
                      let { form: silenceForm, param: silenceParam } =
                        _this.drawTypeFormParam(item.shape_Region_Control, item);
                      silenceData.protectForm = silenceForm;
                      silenceData.protectParam = silenceParam;
                      _this.silenceData.push(silenceData);
                      console.log(_this.silenceData.length, "测试002");
                      debugger;
                      _this.drawTypeCreated(
                        item.shape_Region_Control,
                        silenceParam,
                        silence.shapeOptions,
                        "silence",
                        _this.silenceData.length - 1
                      );
                      break;
                    // 诱捕区
                    /* case '4':
                                        this.selectedDraw.type = 'trap'
                                        this.selectedDraw.trap.index = _this.trapData.length
                                        let trapData = {
                                          upForm: [{
                                            proTect: {
                                              indexA: 'K',
                                              type: 'input'
                                            },
                                            Shape_Region_Control: {
                                              indexA: 'K',
                                              type: 'text'
                                            }
                                          }],
                                          upParam: {
                                            proTect: item.shape_Name,
                                            Shape_Region_Control: '0x7A'
                                          },
                                          protectForm: [
                                            {
                                              Longitude: {
                                                indexA: 'YXJD',
                                                label: '圆心经度',
                                                type: 'latlngInput',
                                                max: '180',
                                                min: '0'
                                              }
                                            },
                                            {
                                              Latitude: {
                                                indexA: 'YXWD',
                                                label: '圆心纬度',
                                                type: 'latlngInput',
                                                max: '90',
                                                min: '0'
                                              }
                                            },
                                            {
                                              Radius: {
                                                indexA: 'BJ',
                                                label: '半径',
                                                type: 'input',
                                                unit: 'm'
                                              },
                                              Height_Control: {
                                                indexA: 'FKGD',
                                                label: '防控高度',
                                                type: 'input',
                                                unit: 'm'
                                              }
                                            }
                                          ],
                                          protectParam: {
                                            Longitude: 0,
                                            Latitude: 0,
                                            Radius: 0,
                                            Height_Control: 0
                                          }
                                        }
                                        let { form: trapForm, param: trapParam } = _this.drawTypeFormParam(item.shape_Region_Control, item)
                                        trapData.protectForm = trapForm
                                        trapData.protectParam = trapParam
                                        _this.trapData.push(trapData)
                                        _this.drawTypeCreated('0x7A', trapParam, trap.shapeOptions, 'trap', _this.trapData.length)
                                        break */
                  }
                }
                // 显示预警区
                if (Number(item.type_Region_Control) === 5) {
                  // 预警区外延
                  _this.RSS_Defense = Number(item.extendKillArea_Type);
                  _this.warnParam.long = Number(item.extend_Length);
                  if (Number(item.extend_Length) !== 0) {
                    this.warnShow = true;
                  }
                }
              });
              let {
                name_Task: nameTask,
                activation_Task: activationTask,
                locked_Task,
              } = con[0];
              // 任务名称
              console.log(con, "-=-=-=-=");
              this.setMapCenter(con);
              _this.headParam.head = nameTask;
              // 是否激活
              _this.activationTask = JSON.parse(activationTask);
              // 是否锁定
              // _this.locked = !!JSON.parse(locked_Task) //这个锁定是什么意思
              _this.locked = false;
  
              // 重置地图中心点，使图形在中心显示
            }
  
            if (Number(con.code) === 400) {
              this.$message.error(con.message);
            }
          });
      },
  
      /**
       * 重置地图中心点，使图形在中心显示
       */
      setMapCenter(con) {
        var a = [];
        var b = [];
        let mapConfig = {
          mapCenter: ["", ""],
          mapZoom: "",
        };
        for (var i = 0; i < con.length; i++) {
          var dataDemo = JSON.parse(con[i].geometrys);
          // var dataDemo1 = JSON.parse(con[i].geometrysWarning)
          dataDemo.forEach((item1, index1) => {
            item1 = item1.split(" ");
            a.push(Number(item1[2]));
            b.push(Number(item1[1]));
          });
          // if (dataDemo1) {
          //   dataDemo1.forEach((item1, index1) => {
          //     item1 = item1.split(' ')
          //     a.push(Number(item1[2]))
          //     b.push(Number(item1[1]))
          //   })
          // }
          mapConfig.mapCenter[0] =
            (Math.max.apply(null, a) + Math.min.apply(null, a)) / 2;
          mapConfig.mapCenter[1] =
            (Math.max.apply(null, b) + Math.min.apply(null, b)) / 2;
          let Lat1 = (Math.max.apply(null, a) * 3.1415926) / 180;
          let Lat2 = (Math.min.apply(null, a) * 3.1415926) / 180;
          let Lon1 = (Math.max.apply(null, b) * 3.1415926) / 180;
          let Lon2 = (Math.min.apply(null, b) * 3.1415926) / 180;
          let Lata = Lat1 - Lat2; // 两点纬度之差
          let Latb = Lon1 - Lon2; // 经度之差
          let s = 0;
          s =
            2 *
            Math.asin(
              Math.sqrt(
                Math.pow(Math.sin(Lata / 2), 2) +
                  Math.cos(Lat1) *
                    Math.cos(Lat2) *
                    Math.pow(Math.sin(Latb / 2), 2)
              )
            );
          s = s * 6378137.0;
          if (s < 10000) {
            mapConfig.mapZoom = 14;
          } else if (s > 10000 && s < 25000) {
            mapConfig.mapZoom = 13;
          } else if (s > 25000 && s < 40000) {
            mapConfig.mapZoom = 12;
          } else if (s > 40000 && s < 80000) {
            mapConfig.mapZoom = 11;
          } else if (s > 80000 && s < 160000) {
            mapConfig.mapZoom = 10;
          } else if (s > 160000 && s < 320000) {
            mapConfig.mapZoom = 9;
          } else if (s > 320000 && s < 640000) {
            mapConfig.mapZoom = 8;
          }
          this.map.flyTo(mapConfig.mapCenter, mapConfig.mapZoom);
        }
      },
  
      /**
       * 根据类型返回
       * @drawType 0x7A,0x7B,0x7F
       */
      drawTypeFormParam(drawType, item) {
        let form = {};
        let param = {};
        switch (drawType) {
          case "0x7A":
            form = this.circularForm;
            param = {
              Longitude: item.longitude,
              Latitude: item.latitude,
              Radius: item.radius,
              Height_Control: item.height_Control,
            };
            break;
          case "0x7B":
            form = this.sectorForm;
            param = {
              Longitude: item.longitude,
              Latitude: item.latitude,
              Angle_Centerline: item.angle_Centerline,
              Angle_Sector: item.angle_Sector,
              Radius: item.radius,
              Height_Control: item.height_Control,
            };
            break;
          case "0x7F":
            form = this.sectorForm;
            let points = JSON.parse(item.geometrys);
            param = {
              list: points.map((point) => {
                let points = point.trim().split(" ");
                return {
                  Latitude: JSON.parse(points[1]),
                  Longitude: JSON.parse(points[0]),
                };
              }),
              height: item.height_Control,
            };
            param.list.pop();
            break;
          default:
            form = this.circularForm;
            param = {
              Longitude: 0,
              Latitude: 0,
              Radius: 0,
              Height_Control: 0,
              type: 0,
            };
            break;
        }
        return {
          form,
          param,
        };
      },
      /**
       * 根据类型创建图形
       * @drawType 0x7A,0x7B,0x7F
       */
      drawTypeCreated(drawType, param, options, type, index) {
        let drawCreated = {};
        switch (drawType) {
          case "0x7A":
            drawCreated = {
              layer: L.circle(
                [Number(param.Latitude), Number(param.Longitude)],
                Number(param.Radius),
                options
              ),
            };
            this.drawCreated(drawCreated);
  
            break;
          case "0x7B":
            this.handleSpectrum(
              {
                data: param,
                type: drawType,
              },
              type,
              index
            );
            break;
          case "0x7F":
            drawCreated = {
              layer: L.polygon(
                param.list.map((item) => {
                  return [item.Latitude, item.Longitude];
                }),
                options
              ),
            };
            this.drawCreated(drawCreated);
            break;
        }
        // 设置层级顺序
      },
      /**
       * 防控区域开关
       * 1-固定式，0-机动式
       * */
      onType(e) {
        // 锁定不可操作
        if (this.locked) {
          return;
        }
        if (e) {
          // 绘制固定式,清空所有机动式
          this.clearMobileAll();
        } else {
          // 绘制机动式,清除固定式
          this.clearAll();
          this.clearOn();
        }
        this.Type_Task_Control = e;
      },
      /**
       * 切换反制区
       * 1-自定义
       * */
      onTypeS(e) {
        // 锁定不可操作
        if (this.locked) {
          return;
        }
        this.Length_Defense = e;
        this.disposalParam.long = 0;
        this.disposalParamA.long = 0;
        this.warnParam.long = 0;
        this.warnParam.Height_Control = 0;
        // 清除反制区外延
        this.clearDisposeExtend();
        // 清除识别区外延
        this.clearDisposeExtendA();
        // 清除反制区
        this.clearDispose();
        // 清除识别区
        this.clearDisposeA();
        // 清除预警区外延
        this.clearWarnExtend();
      },
      onRSS_Defense(e) {
        this.RSS_Defense = Number(e);
        this.drawWarnExtend();
      },
      // 监听input
      typeChange(e) {
        this.$emit("areaChange", e);
      },
      // 所有图形数据
      onShow() {
        let url = this.$taskApi + "/api/Prevention/queryPrevent";
        this.http.post(url).then((con) => {
          debugger;
          if (Number(con.code) === 200) {
            this.list = con.dataMap.getPrevent;
            mapF(con.dataMap.getPrevent);
          } else {
            this.$message.error(con.message);
          }
        });
        // let urls = '/equipment/api/Prevention/queryPrevent'
        // this.http
        //   .post(url)
        //   .then(con => {
        //     this.list = con.dataMap.getPrevent
        //     mapF(con.dataMap.getPrevent)
        //   })
      },
      // 获取经纬度
      map_mousemove(e) {
        let { type, core, dispose, disposeA, silence } = this.selectedDraw;
        let index = "";
        let dataName = "";
        switch (type) {
          // 核心区
          case "core":
            index = core.index;
            dataName = "trackData";
            break;
          // 反制区
          case "dispose":
            index = dispose.index;
            dataName = "trackData1";
            break;
          // 识别区
          case "disposeA":
            index = disposeA.index;
            dataName = "trackData2";
            break;
          // 预警区
          case "silence":
            index = silence.index;
            dataName = "silenceData";
            break;
        }
        // draw:created
        // L.circle([e.latlng.lat, e.latlng.lng], { color: '#FF0000', fillColor: '#FF0000', radius: 1, fillOpacity: 1 }).addTo(this.map)
        this[dataName][index].protectParam.Latitude = e.latlng.lat;
        this[dataName][index].protectParam.Longitude = e.latlng.lng;
        this.map.off("click");
      },
      /**
       * 监听绘制开始事件
       * 只调用一次:其余根据选中类型判断
       */
      drawCreated(e) {
        var name = localStorage["created"]; // qu
        debugger;
        if (Number(name) === 1) {
          // trap
          let { type, core, dispose, disposeA, silence } = this.selectedDraw;
          let dataName = "";
          let index = 0;
          let circleDrawLayer = "";
          let circle = "";
          let shapeName = "";
          let polygon = "";
          let polygonDrawLayer = "";
          switch (type) {
            // 核心区
            case "core":
              index = core.index;
              circleDrawLayer = core.circleDrawLayer;
              circle = core.circle;
              polygonDrawLayer = core.polygonDrawLayer;
              polygon = core.polygon;
              shapeName = "shape";
              dataName = "trackData";
              break;
            // 反制区
            case "dispose":
              index = dispose.index;
              circleDrawLayer = dispose.circleDrawLayer;
              circle = dispose.circle;
              polygonDrawLayer = dispose.polygonDrawLayer;
              polygon = dispose.polygon;
              shapeName = "shapeA";
              dataName = "trackData1";
              break;
            // 识别区A
            case "disposeA":
              index = disposeA.index;
              circleDrawLayer = disposeA.circleDrawLayer;
              circle = disposeA.circle;
              polygonDrawLayer = disposeA.polygonDrawLayer;
              polygon = disposeA.polygon;
              shapeName = "shapeE";
              dataName = "trackData2";
              break;
            // 静默区
            case "silence":
              debugger;
              index = silence.index;
              circleDrawLayer = silence.circleDrawLayer;
              circle = silence.circle;
              polygonDrawLayer = silence.polygonDrawLayer;
              polygon = silence.polygon;
              shapeName = "shapeC";
              dataName = "silenceData";
              break;
            // 诱捕区
            case "trap":
              index = trap.index;
              circleDrawLayer = trap.circleDrawLayer;
              circle = trap.circle;
              shapeName = "shapeD";
              dataName = "trapData";
              break;
          }
          switch (this[dataName][index].upParam.Shape_Region_Control) {
            // 圆形
            case "0x7A":
              e.layer
                .addTo(circleDrawLayer)
                .on("click", (e) => this.setActiveIndex(shapeName, index, e))
                .openPopup();
              // .bindPopup('<div><span class="nameTaskBox_A">' + this.headParam.head + ':' + this[dataName][index].upParam.proTect + '</span></div>')
              let circleCon = {
                type: "0x7A",
                list: e.layer,
                index: index,
                indexA: "K",
              };
              this[shapeName].push(circleCon);
              let latLog = JSON.parse(JSON.stringify(e.layer._latlng));
              let data = JSON.parse(JSON.stringify(e.layer.options));
              this[dataName][index].protectParam.Latitude = latLog.lat;
              this[dataName][index].protectParam.Longitude = latLog.lng;
              this[dataName][index].protectParam.Radius = data.radius.toFixed(2);
              circle.disable();
              break;
            // 扇形
            case "0x7B":
              e.layer
                .addTo(circleDrawLayer)
                .on("click", (e) => this.setActiveIndex(shapeName, index, e))
                .bindPopup(
                  '<div><span class="nameTaskBox_A">' +
                    this.headParam.head +
                    ":" +
                    this[dataName][index].upParam.proTect +
                    "</span></div>"
                )
                .openPopup();
              let sanxingCon = {
                type: "0x7B",
                list: e.layer,
                index: index,
                indexA: "K",
              };
              this[shapeName].push(sanxingCon);
              let sanxinglatLog = JSON.parse(JSON.stringify(e.layer._latlng));
              // this[dataName][index].protectParam.Latitude = sanxinglatLog.lat
              // this[dataName][index].protectParam.Longitude = sanxinglatLog.lng
              this[dataName][index].protectParam.Latitude = sanxinglatLog.lat;
              this[dataName][index].protectParam.Longitude = sanxinglatLog.lng;
              circle.disable();
              break;
            // 多边形
            case "0x7F":
              e.layer
                .addTo(polygonDrawLayer)
                .on("click", (e) => this.setActiveIndex(shapeName, index, e))
                .openPopup();
              // .bindPopup('<div><span class="nameTaskBox_A">' + this.headParam.head + ':' + this[dataName][index].upParam.proTect + '</span></div>')
              let polygonCon = {
                type: "0x7F",
                list: e.layer,
                index: index,
                indexA: "K",
              };
              this[shapeName].push(polygonCon);
              let mapDataList = e.layer._latlngs[0];
              let changeList = JSON.parse(
                JSON.stringify(mapDataList).replace(/lat/g, "Latitude")
              );
              changeList = JSON.parse(
                JSON.stringify(changeList).replace(/lng/g, "Longitude")
              );
              this[dataName][index].protectParam.list = changeList;
              this[dataName][index].isAdd = true;
              polygon.disable();
              break;
          }
          // 设置层级顺序
          this.setIndex();
        }
      },
  
      /**
       * 设置当前选中高亮
       */
      setActiveIndex(name, index) {
        console.log(name, index);
        this.activeIndex.index = index;
        this.activeIndex.name = name;
      },
      /**
       * 监听绘制修改事件
       * 只调用一次:其余根据选中类型判断
       */
      drawCreatedEdit(e) {
        console.log("33");
        let { type, core, dispose, disposeA, silence, trap } = this.selectedDraw;
        let dataName = "";
        let shapeName = "";
        switch (type) {
          // 核心区
          case "core":
            dataName = "trackData";
            shapeName = "shape";
            break;
          // 反制区
          case "dispose":
            dataName = "trackData1";
            shapeName = "shapeA";
            break;
          // 识别区
          case "disposeA":
            dataName = "trackData2";
            shapeName = "shapeE";
            break;
          // 静默区
          case "silence":
            dataName = "silenceData";
            shapeName = "shapeC";
            break;
          /*    // 诱捕区
                      case 'trap':
                        dataName = 'trapData'
                        shapeName = 'shapeD'
                        break */
        }
        /**
         * 此处绘制他是按堆栈按顺序插入
         * 故遍历找出堆栈下标
         * 递归层级找出修改的图形
         */
        this[shapeName].map((item, itemIndex) => {
          let layer = e.sourceTarget._layers[item.list._leaflet_id];
          // '<div><span class="nameTaskBox_A">' + this.headParam.head + ':' + this[dataName][item.index].upParam.proTect + '</span></div>'
          layer.bindPopup().openPopup();
          switch (this[dataName][item.index].upParam.Shape_Region_Control) {
            // 圆形
            case "0x7A":
              let { _latlng, _mRadius } = layer;
              this[dataName][item.index].protectParam.Latitude = _latlng.lat;
              this[dataName][item.index].protectParam.Longitude = _latlng.lng;
              this[dataName][item.index].protectParam.Radius =
                Number(_mRadius).toFixed(2);
              break;
            // 多边形
            case "0x7F":
              let latlngs = layer.editing.latlngs[0][0].map((item) => {
                return {
                  Latitude: item.lat,
                  Longitude: item.lng,
                };
              });
              this[dataName][item.index].protectParam.list = latlngs;
              let points = latlngs.map((item) => {
                return [item.Latitude, item.Longitude];
              });
              item.list.setLatLngs(points);
              break;
          }
        });
        /**
         * 反制区是外延
         * 重绘反制区，预警区
         */
        if (this.Length_Defense === 2) {
          this.drawDisposeExtend();
          this.drawDisposeExtendA();
        }
        this.drawWarnExtend();
      },
      // 监听经纬度输入====
      handleSpectrum({ data, type }, shapeType, index) {
        // 图形集合,需要添加的图形, 颜色设置
        let shapeName = "";
        let dataName = "";
        let item = {};
        let option = {};
        let { Radius, Latitude, Longitude, Angle_Centerline, Angle_Sector } =
          data;
        let _this = this;
        switch (shapeType) {
          // 核心区
          case "core":
            shapeName = "shape";
            dataName = "trackData";
            option = {
              color: "#D9001B",
              fillOpacity: 0.2,
            };
            break;
          // 反制区
          case "dispose":
            shapeName = "shapeA";
            dataName = "trackData1";
            option = {
              color: "#F9B604",
              fillOpacity: 0.2,
            };
            break;
          // 识别区
          case "disposeA":
            shapeName = "shapeE";
            dataName = "trackData2";
            option = {
              color: "#04BAF9",
              fillOpacity: 0.2,
            };
            break;
          // 静默区
          case "silence":
            shapeName = "shapeC";
            dataName = "silenceData";
            option = {
              color: "#F9D904",
              fillOpacity: 0.2,
            };
            break;
          // 诱捕区
          /*case 'trap':
                        shapeName = 'shapeD'
                        dataName = 'trapData'
                        break */
        }
        if (
          type === "0x7B" &&
          !this[shapeName].filter((item) => {
            return item.index === index;
          }).length
        ) {
          let radius = Number(Radius) / 111111.111;
          let points = this.getPoints(
            [Number(Latitude), Number(Longitude)],
            radius,
            Number(Angle_Centerline),
            Number(Angle_Sector),
            1000
          );
          points[points.length] = points[0];
          let layer = L.polygon(points, option)
            .addTo(this.map)
            .on("click", (e) => this.setActiveIndex(shapeName, index, e))
            .openPopup();
          // .bindPopup('<div><span class="nameTaskBox_A">' + this.headParam.head + ':' + this[dataName][index].upParam.proTect + '</span></div>')
          item = {
            type: "0x7B",
            list: layer,
            index: index,
            indexA: "K",
          };
          this[shapeName].push(item);
        }
        this[shapeName].map((shapeItem, shapeIndex) => {
          if (shapeItem.index === index) {
            shapeItem.type = type;
            switch (type) {
              // 圆形
              case "0x7A":
                shapeItem.list.setLatLng(L.latLng(Latitude, Longitude));
                shapeItem.list.setRadius(Radius);
                shapeItem.list.bindPopup().openPopup();
                // '<div><span class="nameTaskBox_A">' + this.headParam.head + ':' + this[dataName][index].upParam.proTect + '</span></div>'
                break;
              // 扇形
              case "0x7B":
                // let radius = Number(Radius) / 100000
                let radius = Number(Radius) / 111111.111;
                let sectorPoints = _this.getPoints(
                  [Number(Latitude), Number(Longitude)],
                  radius,
                  Number(Angle_Centerline),
                  Number(Angle_Sector),
                  1000
                );
                if (shapeItem.list) {
                  debugger;
                  shapeItem.list.setLatLngs(sectorPoints);
                  shapeItem.list.bindPopup().openPopup();
                  // '<div><span class="nameTaskBox_A">' + this.headParam.head + ':' + this[dataName][index].upParam.proTect + '</span></div>'
                } else {
                  debugger;
                  sectorPoints[sectorPoints.length] = sectorPoints[0];
                  let layer = L.polygon(sectorPoints, option)
                    .addTo(this.map)
                    .on("click", (e) =>
                      this.setActiveIndex(shapeName, shapeIndex, e)
                    )
                    .bindPopup()
                    .openPopup();
                  // '<div><span class="nameTaskBox_A">' + this.headParam.head + ':' + this[dataName][index].upParam.proTect + '</span></div>'
                  item = {
                    type: "0x7B",
                    list: layer,
                    index: index,
                    indexA: "K",
                  };
                  debugger;
                  if (_this[shapeName][shapeIndex]) {
                    _this[shapeName][shapeIndex] = item;
                  } else {
                    _this[shapeName][shapeIndex].push(item);
                  }
                }
                break;
              // 多边形
              case "0x7F":
                let list = data.map((item) => {
                  return L.latLng(item.Latitude, item.Longitude);
                });
                shapeItem.list.setLatLngs(list);
                shapeItem.list.bindPopup().openPopup();
                // '<div><span class="nameTaskBox_A">' + this.headParam.head + ':' + this[dataName][index].upParam.proTect + '</span></div>'
                let polygonLayer = {
                  layer: shapeItem.list,
                };
                shapeItem.list.editing._updateLatLngs(polygonLayer);
                shapeItem.list.redraw();
                break;
            }
          }
        });
        /**
         * 反制区是外延
         * 重绘反制区，预警区
         */
        if (this.Length_Defense === 2) {
          this.drawDisposeExtend();
          this.drawDisposeExtendA();
        }
        this.drawWarnExtend();
        //重置图层
        this.setPolygonIndex();
      },
      // 核心区
      testClick(index, item) {
        let self = this;
        let type = item.upParam.Shape_Region_Control;
        localStorage.created = 1; // cun
        event.stopPropagation();
        // 存入核心区下标
        this.selectedDraw.core.index = index;
        this.selectedDraw.type = "core";
        // 关闭所有绘制
        this.closeAllDraw();
        switch (type) {
          // 圆形
          case "0x7A":
            if (self.trackData[index].protectParam.Radius) {
              // 编辑
              this.trackData[index].isCircleEdit =
                !this.trackData[index].isCircleEdit;
              if (this.trackData[index].isCircleEdit) {
                this.selectedDraw.core.circleEdit.enable();
              }
            } else {
              // 添加
              this.selectedDraw.core.circle.enable();
            }
            break;
          // 扇形
          case "0x7B":
            this.map.on("click", (e) => {
              this.map_mousemove(e);
            });
            break;
          // 多边形
          case "0x7F":
            // 修改
            if (this.trackData[index].isAdd) {
              this.trackData[index].isPolygonEdit =
                !this.trackData[index].isPolygonEdit;
              if (this.trackData[index].isPolygonEdit) {
                this.selectedDraw.core.polygonEdit.enable();
              }
            } else {
              // 新增
              this.selectedDraw.core.polygon.enable();
            }
            break;
        }
      },
  
      // 反制区
      testClickT(index, item) {
        let self = this;
        let type = item.upParam.Shape_Region_Control;
        localStorage.created = 1;
        event.stopPropagation();
        // 存入反制区下标
        this.selectedDraw.dispose.index = index;
        this.selectedDraw.type = "dispose";
        // 关闭所有绘制
        this.closeAllDraw();
        switch (type) {
          // 圆形
          case "0x7A":
            if (self.trackData1[index].protectParam.Radius) {
              this.trackData1[index].isCircleEdit =
                !this.trackData1[index].isCircleEdit;
              if (this.trackData1[index].isCircleEdit) {
                this.selectedDraw.dispose.circleEdit.enable();
              }
            } else {
              this.selectedDraw.dispose.circle.enable();
            }
            break;
          // 扇形
          case "0x7B":
            this.map.on("click", (e) => {
              this.map_mousemove(e);
            });
            break;
          // 多边形
          case "0x7F":
            // 修改
            if (this.trackData1[index].isAdd) {
              this.trackData1[index].isPolygonEdit =
                !this.trackData1[index].isPolygonEdit;
              if (this.trackData1[index].isPolygonEdit) {
                this.selectedDraw.dispose.polygonEdit.enable();
              }
            } else {
              // 新增
              this.selectedDraw.dispose.polygon.enable();
            }
            break;
        }
      },
      // 识别区
      testClickTA(index, item) {
        let self = this;
        let type = item.upParam.Shape_Region_Control;
        localStorage.created = 1;
        event.stopPropagation();
        // 存入反制区下标
        this.selectedDraw.disposeA.index = index;
        this.selectedDraw.type = "disposeA";
        // 关闭所有绘制
        this.closeAllDraw();
        switch (type) {
          // 圆形
          case "0x7A":
            if (self.trackData2[index].protectParam.Radius) {
              this.trackData2[index].isCircleEdit =
                !this.trackData2[index].isCircleEdit;
              if (this.trackData2[index].isCircleEdit) {
                this.selectedDraw.disposeA.circleEdit.enable();
              }
            } else {
              this.selectedDraw.disposeA.circle.enable();
            }
            break;
          // 扇形
          case "0x7B":
            this.map.on("click", (e) => {
              this.map_mousemove(e);
            });
            break;
          // 多边形
          case "0x7F":
            // 修改
            if (this.trackData2[index].isAdd) {
              this.trackData2[index].isPolygonEdit =
                !this.trackData2[index].isPolygonEdit;
              if (this.trackData2[index].isPolygonEdit) {
                this.selectedDraw.disposeA.polygonEdit.enable();
              }
            } else {
              // 新增
              this.selectedDraw.disposeA.polygon.enable();
            }
            break;
        }
      },
  
      /**
       * 关闭所有绘制
       */
      closeAllDraw() {
        // 关闭五个区域修改绘制-圆形
        this.selectedDraw.dispose.circleEdit.disable();
        this.selectedDraw.disposeA.circleEdit.disable();
        this.selectedDraw.core.circleEdit.disable();
        /*  this.selectedDraw.silence.circleEdit.disable()
               this.selectedDraw.trap.circleEdit.disable() */
        // 关闭五个区域新增绘制-圆形
        this.selectedDraw.dispose.circle.disable();
        this.selectedDraw.disposeA.circle.disable();
        this.selectedDraw.core.circle.disable();
        /* this.selectedDraw.silence.circle.disable()
              this.selectedDraw.trap.circle.disable() */
        // 关闭两个区域新增绘制-多边形
        this.selectedDraw.dispose.polygon.disable();
        this.selectedDraw.disposeA.circle.disable();
        this.selectedDraw.core.polygon.disable();
        // 关闭两个区域修改绘制-多边形
        this.selectedDraw.dispose.polygonEdit.disable();
        this.selectedDraw.disposeA.circle.disable();
        this.selectedDraw.core.polygonEdit.disable();
        // 关闭扇形监听
        this.map.off("click");
      },
      // 静默区
      onJmq(index, item) {
        let self = this;
        let type = item.upParam.Shape_Region_Control;
        localStorage.created = 1; // cun
        event.stopPropagation();
        // 存入静默区下标
        this.selectedDraw.silence.index = index;
        this.selectedDraw.type = "silence";
        // 关闭所有绘制
        this.closeAllDraw();
        switch (type) {
          // 圆形
          case "0x7A":
            if (self.silenceData[index].protectParam.Radius) {
              // 编辑
              this.silenceData[index].isCircleEdit =
                !this.silenceData[index].isCircleEdit;
              if (this.silenceData[index].isCircleEdit) {
                this.selectedDraw.silence.circleEdit.enable();
              }
            } else {
              // 添加
              this.selectedDraw.silence.circle.enable();
            }
            break;
          // 扇形
          case "0x7B":
            this.map.on("click", (e) => {
              this.map_mousemove(e);
            });
            break;
          // 多边形
          case "0x7F":
            // 修改
            if (this.silenceData[index].isAdd) {
              this.silenceData[index].isPolygonEdit =
                !this.silenceData[index].isPolygonEdit;
              if (this.silenceData[index].isPolygonEdit) {
                this.selectedDraw.silence.polygonEdit.enable();
              }
            } else {
              // 新增
              this.selectedDraw.silence.polygon.enable();
            }
            break;
        }
      },
      // 诱铺区
      /*     onXpq (index, item) {
                let type = item.upParam.Shape_Region_Control
                localStorage.created = 1 // cun
                event.stopPropagation()
                // 存入诱铺区下标
                this.selectedDraw.trap.index = index
                this.selectedDraw.type = 'trap'
                // 关闭所有绘制
                this.closeAllDraw()
                switch (type) {
                  // 圆形
                  case '0x7A':
                    if (this.trapData[index].protectParam.Radius) { // 编辑
                      this.trapData[index].isCircleEdit = !this.trapData[index].isCircleEdit
                      if (this.trapData[index].isCircleEdit) {
                        this.selectedDraw.trap.circleEdit.enable()
                      }
                    } else { // 添加
                      this.selectedDraw.trap.circle.enable()
                    }
                    break
                }
              }, */
      onHidden() {
        event.stopPropagation();
      },
      setTime(t) {
        return t < 10 ? "0" + t : t;
      },
      /**
       * 拷贝，清空id
       */
      copy() {
        this.id = "";
        this.locked = false;
        this.isLocked = false;
      },
      /**
       * 保存
       */
      onSure(type) {
        var sfm1 = "";
        var sfm2 = "";
        var self = this;
        self.isSaveing = true;
        //日期时间
        if (
          self.formValues.dataTime[0].length === 18 ||
          self.formValues.dataTime[1].length === 18
        ) {
          sfm1 = self.formValues.dataTime[0];
          sfm2 = self.formValues.dataTime[1];
        }
        if (sfm1.length !== 18) {
          var tiem1 = self.formValues.dataTime[0];
          var sTime = new Date(tiem1); // 这里组件上拿到的值是一个数组，有两个值（第一个是开始时间）
          var startTime =
            sTime.getFullYear() +
            "-" +
            (sTime.getMonth() + 1) +
            "-" +
            sTime.getDate();
          sfm1 =
            startTime +
            " " +
            this.setTime(sTime.getHours()) +
            ":" +
            this.setTime(sTime.getMinutes()) +
            ":" +
            this.setTime(sTime.getSeconds());
        }
        if (sfm2.length !== 18) {
          var tiem2 = self.formValues.dataTime[1];
          var eTime = new Date(tiem2); // 第二个值是结束时间
          var endTime =
            eTime.getFullYear() +
            "-" +
            (eTime.getMonth() + 1) +
            "-" +
            eTime.getDate();
          sfm2 =
            endTime +
            " " +
            this.setTime(eTime.getHours()) +
            ":" +
            this.setTime(eTime.getMinutes()) +
            ":" +
            this.setTime(eTime.getSeconds());
        }
        // console.log(self.formValues.dataTime, '时间')
        this.$refs.test
          .validate()
          .then((res) => {
            let list = [];
            let dataList = {};
            let self = this;
            // 1-固定式，0-机动式
            if (this.Type_Task_Control) {
              //固定式
              //核心区
              self.trackData.map(function (item, index, arr) {
                item.upParam.Type_Region_Control = "0";
                var DATA = {};
                if (item.upParam.Shape_Region_Control === "0x7F") {
                  //多边形
                  DATA = {
                    InfoPack_PreventFigure: item.protectParam.list.map(
                      (protectParam) => {
                        return {
                          ...protectParam,
                          Radius: 0,
                          Height_Control: item.protectParam.height,
                          Shape_Name: item.upParam.proTect,
                        };
                      }
                    ),
                  };
                } else {
                  DATA = {
                    InfoPack_PreventFigure: [
                      {
                        ...item.protectParam,
                        Shape_Name: item.upParam.proTect,
                      },
                    ],
                  };
                }
                list.push(Object.assign({}, DATA, item.upParam));
              });
              //反制区
              self.trackData1.map(function (item, index, arr) {
                // item.upParam.Type_Region_Control = self.Length_Defense
                item.upParam.Type_Region_Control = "1";
                var DATA = {};
                if (item.upParam.Shape_Region_Control === "0x7F") {
                  DATA = {
                    InfoPack_PreventFigure: item.protectParam.list.map(
                      (protectParam) => {
                        return {
                          ...protectParam,
                          Radius: 0,
                          Height_Control: item.protectParam.height,
                          Shape_Name: item.upParam.proTect,
                        };
                      }
                    ),
                  };
                } else {
                  DATA = {
                    InfoPack_PreventFigure: [
                      {
                        ...item.protectParam,
                        Shape_Name: item.upParam.proTect,
                      },
                    ],
                  };
                }
                list.push(Object.assign({}, DATA, item.upParam));
              });
              //识别区
              self.trackData2.map(function (item, index, arr) {
                item.upParam.Type_Region_Control = "2";
                var DATA = {};
                if (item.upParam.Shape_Region_Control === "0x7F") {
                  DATA = {
                    InfoPack_PreventFigure: item.protectParam.list.map(
                      (protectParam) => {
                        return {
                          ...protectParam,
                          Radius: 0,
                          Height_Control: item.protectParam.height,
                          Shape_Name: item.upParam.proTect,
                        };
                      }
                    ),
                  };
                } else {
                  //圆形---扇形
                  DATA = {
                    InfoPack_PreventFigure: [
                      {
                        ...item.protectParam,
                        Shape_Name: item.upParam.proTect,
                      },
                    ],
                  };
                }
                list.push(Object.assign({}, DATA, item.upParam));
              });
              //预警区
              self.silenceData.map(function (item, index, arr) {
                item.upParam.Type_Region_Control = "3";
                var DATA = {};
                if (item.upParam.Shape_Region_Control === "0x7F") {
                  DATA = {
                    InfoPack_PreventFigure: item.protectParam.list.map(
                      (protectParam) => {
                        return {
                          ...protectParam,
                          Radius: 0,
                          Height_Control: item.protectParam.height,
                          Shape_Name: item.upParam.proTect,
                        };
                      }
                    ),
                  };
                } else {
                  //圆形---扇形
                  DATA = {
                    InfoPack_PreventFigure: [
                      {
                        ...item.protectParam,
                        Shape_Name: item.upParam.proTect,
                      },
                    ],
                  };
                }
  
                //
                list.push(Object.assign({}, DATA, item.upParam));
              });
              /*           self.trapData.map(function (item, index, arr) {
                                  item.upParam.Type_Region_Control = '4'
                                  var DATA = {
                                    InfoPack_PreventFigure: [{ ...item.protectParam, Shape_Name: item.upParam.proTect }]
                                  }
                                  list.push(Object.assign({}, DATA, item.upParam))
                                }) */
              dataList = {
                InfoPack_PreventTask: {
                  // Height_Defense: this.disposalParam.Height_Control, /* 反制区高度 */
                  // Height_DefenseA: this.disposalParamA.Height_Control, /* 识别区高度 */
                  Height_HardKilling: this.disposalParam.Height_Control,
                  /* 反制区高度 */
                  Height_SoftKilling: this.disposalParamA.Height_Control,
                  /* 识别区高度 */
                  Height_Warning: this.warnParam.Height_Control,
                  /* 预警区高度 */
                  Length_HardKilling: this.disposalParam.long,
                  /* 反制区范围 */
                  Length_SoftKilling: this.disposalParamA.long,
                  /* 识别区范围 */
                  Length_Warning: this.warnParam.long,
                  /* 预警区范围 */
                  ExtendKillArea_Type: this.RSS_Defense,
                  // Length_Defense: this.Length_Defense, // 反制区范围
                  // Activation_Task: this.activationTask, // 是否激活
                  Name_Task: this.headParam.head, // 防控任务名称
                  Type_Task_Control: this.Type_Task_Control, // 防控任务类型
                  Plan_Start_Time_Task: sfm1, // 预计开始时间
                  Plan_End_Time_Task: sfm2, // 预计结束时间
                },
                InfoPack_PreventAreaType: list,
              };
            } else {
              // 机动式-核心区
              list.push({
                InfoPack_PreventFigure: [
                  {
                    Height_Control: this.coreMobileParam.Height_Control,
                    Radius: this.coreMobileParam.Radius,
                    Latitude: 31.470496664389557,
                    Longitude: 121.69648011743081,
                    Shape_Name: "核心防护区1",
                  },
                ],
                Shape_Region_Control: "0x7A",
                Type_Region_Control: "0",
                proTect: "核心防护区1",
              });
              dataList = {
                InfoPack_PreventTask: {
                  Height_HardKilling: this.disposalMobileParam.Height_Control,
                  /* 反制区高度 */
                  Height_SoftKilling: this.disposalMobileParamA.Height_Control,
                  /* 识别区高度 */
                  Height_Warning: this.warnMobileParam.Height_Control,
                  /* 预警区高度 */
                  // Length_Defense: this.disposalMobileParam.long, /* 反制区范围 */
                  Length_HardKilling: this.disposalMobileParam.long,
                  /* 反制区范围 */
                  Length_SoftKilling: this.disposalMobileParamA.long,
                  /* 识别区范围 */
                  Length_Warning: this.warnMobileParam.long,
                  /* 预警区范围 */
                  // Length_Defense: this.Length_Defense, // 反制区范围
                  // Activation_Task: this.activationTask, // 是否激活
                  Name_Task: this.headParam.head, // 防控任务名称
                  Type_Task_Control: this.Type_Task_Control, // 防控任务类型
                  Plan_Start_Time_Task: sfm1, // 预计开始时间
                  Plan_End_Time_Task: sfm2, // 预计结束时间
                },
                InfoPack_PreventAreaType: list,
              };
            }
            if (this.id && type === "save") {
              dataList.InfoPack_PreventTask["ID_Task"] = this.id;
            }
            console.log("传给后端的值：", dataList);
            // dataList.InfoPack_PreventAreaType.Type_Region_Control===1 //1反制区 2识别区
            // RSS_Defense 1是软 2是硬
            let isTypeArr = [];
            dataList.InfoPack_PreventAreaType.forEach((item) => {
              if (
                Number(item.Type_Region_Control) === 1 ||
                Number(item.Type_Region_Control) === 2
              ) {
                isTypeArr.push(Number(item.Type_Region_Control));
              }
            });
            setTimeout(() => {
              isTypeArr = [...new Set(isTypeArr)];
              console.log(isTypeArr, "isType");
              /*   if (isTypeArr.length !== 2) {
                          if (isTypeArr[0] === 1 && this.RSS_Defense === 1) {
                              this.$message.warning('识别区为空 预警区无法对识别区进行外延')
                          } else if (isTypeArr[0] === 2 && this.RSS_Defense === 2) {
                              this.$message.warning('反制区为空 预警区无法对反制区进行外延')
                          }
                      } */
            }, 500);
            this.$refs.test
              .validate()
              .then((res) => {
                let url = this.$taskApi + "/api/Prevention/addPrevent";
                dataList.InfoPack_PreventTask.Activation_Task = 0;
                if (dataList.InfoPack_PreventTask.ID_Task) {
                  url = this.$taskApi + "/api/Prevention/editPrevent";
                }
                console.log("aaa", dataList);
                this.http
                  .post(url, dataList)
                  .then((con) => {
                    if (Number(con.code) === 200) {
                      this.isSaveing = false;
                      let { result, id } = con.dataMap;
                      if (id) {
                        this.id = id;
                      }
                      if (result) {
                        result.map((item) => {
                          setTimeout(() => {
                            this.$message.error(item);
                          });
                        });
                      }
                      this.onShow();
                      setTimeout(() => {
                        if (con.code === 200) {
                          this.$message.success(con.message);
                        } else {
                          this.$message.warning(con.message);
                        }
                      });
  
                      var lng =
                        dataList.InfoPack_PreventAreaType[0]
                          .InfoPack_PreventFigure[0];
                      this.map.flyTo([lng.Latitude, lng.Longitude], 13);
                    } else {
                      this.$message.error(con.message);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    this.$message.error("新增失败");
                    this.isSaveing = false;
                  });
              })
              .catch((err) => {
                this.isSaveing = false;
                console.log(err.message);
              });
          })
          .catch((err) => {
            this.isSaveing = false;
            console.log(err.message);
          });
      },
      getPrevent() {
        let _this = this;
        let url = this.$taskApi + "/api/Prevention/getPrevent";
        this.http
          .post(url, {
            id: this.id,
          })
          .then((con) => {
            _this.headParam.head = con[0].name_Task;
            _this.formValues.dataTime[0] = con[0].plan_Start_Time_Task;
            _this.formValues.dataTime[1] = con[0].plan_End_Time_Task;
            _this.activationTask = Number(con[0].activation_Task);
            if (Number(con[0].locked_Task) === 1) {
              _this.isLocked = false;
            } else {
              _this.isLocked = true;
            }
            // con[0].locked_Task 0是锁定 1是未锁定
            // con[0].status_Task 0包含 1是未包含
            if (Number(con[0].locked_Task) === 0) {
              _this.locked = true;
              // _this.isLocked = true
            } else if (
              Number(con[0].state_Task) === 0 &&
              Number(con[0].locked_Task) === 1 &&
              Number(con[0].activation_Task) === 0
            ) {
              // _this.isLocked = false
              _this.locked = false;
            } else {
              _this.locked = true;
              // _this.isLocked = false
            }
          });
      },
      /**
       * 锁定
       */
      changeLocked() {
        this.isSaveing = true;
        if (this.id) {
          let payload = {
            id: this.id,
            Locked_Task: this.isLocked ? 1 : 0,
          };
          let url = this.$taskApi + "/api/Prevention/editPreventTask";
          this.http
            .post(url, payload)
            .then((con) => {
              if (Number(con.code) === 200) {
                this.isSaveing = false;
                if (con.status) {
                  // _this.warnShow = true
                  // _this.locked = !this.locked
                  // _this.isLocked = !this.isLocked
                  this.getPrevent();
                  // this.$emit('closepop')
                }
              } else {
                this.$message.error(con.message);
              }
            })
            .catch((err) => {
              this.isSaveing = false;
              console.log("锁定报错:" + err);
            });
        }
      },
      /**
       * 激活
       */
      changeActivation() {
        let _this = this;
        var myDate = new Date();
        let Y = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
        let M = myDate.getMonth(); // 获取当前月份(0-11,0代表1月)
        let D = myDate.getDate(); // 获取当前日(1-31)
        let H = myDate.getHours(); // 获取当前小时数(0-23)
        let minutes = myDate.getMinutes(); // 获取当前分钟数(0-59)
        let S = myDate.getSeconds(); // 获取当前秒数(0-59)
        let timeData =
          Y + "-" + (M + 1) + "-" + D + " " + H + ":" + minutes + ":" + S;
        if (_this.id) {
          let payload = {
            id: _this.id,
            Activation_Task: _this.activationTask ? 0 : 1,
          };
          if (payload.Activation_Task === 1) {
            payload.Start_Time_Task = timeData;
            _this.modelFlag = true;
          } else {
            payload.End_Time_Task = timeData;
          }
          let url = _this.$taskApi + "/api/Prevention/editPreventTask";
          _this.http
            .post(url, payload)
            .then((con) => {
              if (Number(con.code) === 200) {
                // _this.activationTask = this.activationTask ? 0 : 1
                _this.getPrevent();
              } else {
                _this.$message.error(con.message);
              }
            })
            .catch((err) => {
              console.log("锁定报错:" + err);
            });
        }
      },
      test(e, index = null) {
        debugger;
        // 切换绘制类型时清除外延图形
        this.clearDisposeExtend();
        this.clearDisposeExtendA();
        this.clearWarnExtend();
        if (index !== null) {
          this.trackData[index].protectParam.Height_Control = 0;
          this.trackData[index].protectParam.Latitude = 0;
          this.trackData[index].protectParam.Longitude = 0;
          this.trackData[index].protectParam.Radius = 0;
          this.trackData[index].protectParam.Angle_Centerline = 0;
          this.trackData[index].protectParam.Angle_Sector = 0;
          this.shape.forEach((item1, index1) => {
            if (item1.index === index) {
              this.map.removeLayer(item1.list);
              this.shape.splice(index1, 1);
              this.shape = this.shape.map((item) => {
                return {
                  ...item,
                  index: item.index > index ? item.index - 1 : item.index,
                };
              });
            }
          });
          // if (this.shape[index]) {
          //   this.map.removeLayer(this.shape[index].list)
          //   this.shape[index].list = null
          // }
        }
        let { upParam } = this.trackData[index];
        switch (upParam.Shape_Region_Control) {
          // 圆形
          case "0x7A":
            this.trackData[index].protectForm = this.circularForm;
            this.trackData[index].protectParam = {
              Longitude: 0,
              Latitude: 0,
              Radius: 0,
              Height_Control: 0,
              type: 0,
            };
            break;
          // 扇形
          case "0x7B":
            this.trackData[index].protectForm = this.sectorForm;
            this.trackData[index].protectParam = {
              Longitude: 0,
              Latitude: 0,
              Angle_Centerline: 0,
              Angle_Sector: 0,
              Radius: 0,
              Height_Control: 0,
            };
            break;
          // 多边形
          case "0x7F":
            this.trackData[index].isAdd = false;
            this.trackData[index].protectForm = [];
            this.trackData[index].protectParam = {
              list: [
                {
                  Latitude: 0,
                  Longitude: 0,
                },
              ],
              height: "",
            };
            break;
        }
      },
      test1(e, index = null) {
        if (index !== null) {
          this.trackData1[index].protectParam.Height_Control = 0;
          this.trackData1[index].protectParam.Latitude = 0;
          this.trackData1[index].protectParam.Longitude = 0;
          this.trackData1[index].protectParam.Radius = 0;
          this.trackData1[index].protectParam.Angle_Centerline = 0;
          this.trackData1[index].protectParam.Angle_Sector = 0;
          this.shapeA.forEach((item1, index1) => {
            if (item1.index === index) {
              this.map.removeLayer(item1.list);
              this.shapeA.splice(index1, 1);
              this.shapeA = this.shapeA.map((item) => {
                return {
                  ...item,
                  index: item.index > index ? item.index - 1 : item.index,
                };
              });
            }
          });
        }
        let { upParam } = this.trackData1[index];
        switch (upParam.Shape_Region_Control) {
          // 圆形
          case "0x7A":
            this.trackData1[index].protectForm = this.circularForm;
            this.trackData1[index].protectParam = {
              Longitude: 0,
              Latitude: 0,
              Radius: 0,
              Height_Control: 0,
              type: 0,
            };
            break;
          // 扇形
          case "0x7B":
            this.trackData1[index].protectForm = this.sectorForm;
            this.trackData1[index].protectParam = {
              Longitude: 0,
              Latitude: 0,
              Angle_Centerline: 0,
              Angle_Sector: 0,
              Radius: 0,
              Height_Control: 0,
            };
            break;
          // 多边形
          case "0x7F":
            this.trackData1[index].isAdd = false;
            this.trackData1[index].protectForm = [];
            this.trackData1[index].protectParam = {
              list: [
                {
                  Latitude: 0,
                  Longitude: 0,
                },
              ],
              height: "",
            };
            break;
        }
      },
      test2(e, index = null) {
        if (index !== null) {
          this.trackData2[index].protectParam.Height_Control = 0;
          this.trackData2[index].protectParam.Latitude = 0;
          this.trackData2[index].protectParam.Longitude = 0;
          this.trackData2[index].protectParam.Radius = 0;
          this.trackData2[index].protectParam.Angle_Centerline = 0;
          this.trackData2[index].protectParam.Angle_Sector = 0;
          this.shapeE.forEach((item1, index1) => {
            if (item1.index === index) {
              this.map.removeLayer(item1.list);
              this.shapeE.splice(index1, 1);
              this.shapeE = this.shapeE.map((item) => {
                return {
                  ...item,
                  index: item.index > index ? item.index - 1 : item.index,
                };
              });
            }
          });
        }
        let { upParam } = this.trackData2[index];
        switch (upParam.Shape_Region_Control) {
          // 圆形
          case "0x7A":
            this.trackData2[index].protectForm = this.circularForm;
            this.trackData2[index].protectParam = {
              Longitude: 0,
              Latitude: 0,
              Radius: 0,
              Height_Control: 0,
              type: 0,
            };
            break;
          // 扇形
          case "0x7B":
            this.trackData2[index].protectForm = this.sectorForm;
            this.trackData2[index].protectParam = {
              Longitude: 0,
              Latitude: 0,
              Angle_Centerline: 0,
              Angle_Sector: 0,
              Radius: 0,
              Height_Control: 0,
            };
            break;
          // 多边形
          case "0x7F":
            this.trackData2[index].isAdd = false;
            this.trackData2[index].protectForm = [];
            this.trackData2[index].protectParam = {
              list: [
                {
                  Latitude: 0,
                  Longitude: 0,
                },
              ],
              height: "",
            };
            break;
        }
      },
      test3(e, index = null) {
        if (index !== null) {
          this.silenceData[index].protectParam.Height_Control = 0;
          this.silenceData[index].protectParam.Latitude = 0;
          this.silenceData[index].protectParam.Longitude = 0;
          this.silenceData[index].protectParam.Radius = 0;
          this.silenceData[index].protectParam.Angle_Centerline = 0;
          this.silenceData[index].protectParam.Angle_Sector = 0;
          this.shapeE.forEach((item1, index1) => {
            if (item1.index === index) {
              this.map.removeLayer(item1.list);
              this.shapeE.splice(index1, 1);
              this.shapeE = this.shapeE.map((item) => {
                return {
                  ...item,
                  index: item.index > index ? item.index - 1 : item.index,
                };
              });
            }
          });
        }
        let { upParam } = this.silenceData[index];
        switch (upParam.Shape_Region_Control) {
          // 圆形
          case "0x7A":
            this.silenceData[index].protectForm = this.circularForm;
            this.silenceData[index].protectParam = {
              Longitude: 0,
              Latitude: 0,
              Radius: 0,
              Height_Control: 0,
              type: 0,
            };
            break;
          // 扇形
          case "0x7B":
            this.silenceData[index].protectForm = this.sectorForm;
            this.silenceData[index].protectParam = {
              Longitude: 0,
              Latitude: 0,
              Angle_Centerline: 0,
              Angle_Sector: 0,
              Radius: 0,
              Height_Control: 0,
            };
            break;
          // 多边形
          case "0x7F":
            this.silenceData[index].isAdd = false;
            this.silenceData[index].protectForm = [];
            this.silenceData[index].protectParam = {
              list: [
                {
                  Latitude: 0,
                  Longitude: 0,
                },
              ],
              height: "",
            };
            break;
        }
      },
      /**
       * 核心区-删除
       */
      deleteForm(subscript) {
        this.trackData.splice(subscript, 1);
        this.trackData.forEach((item, index) => {
          item.upParam.proTect = "核心防护区" + (index + 1);
          // item.upParam.proTect = '核心防护区' + (index + 1)
          if (
            Object.prototype.toString.call(item.protectParam) ===
            "[object Object]"
          ) {
            item.protectParam.index = index;
          }
          item.upForm.forEach((deal) => {
            deal.Shape_Region_Control.index = index;
          });
          /*  item.upForm.forEach((up, upIndex) => {
                       up.Shape_Region_Control.index = index
                   }) */
        });
        /*   this.shape 为核心区的画图图形组
         */
        this.shape.forEach((item1, index1) => {
          if (item1.index === subscript) {
            this.map.removeLayer(item1.list);
            this.shape.splice(index1, 1);
            this.shape = this.shape.map((item, shapeIndex) => {
              item.list
                .on("click", (e) => this.setActiveIndex("shape", shapeIndex, e))
                .bindPopup(
                  '<div><span class="nameTaskBox_A">' +
                    this.headParam.head +
                    ":" +
                    this.trackData[item1.index].upParam.proTect +
                    "</span></div>"
                );
              return {
                ...item,
                index: item.index > subscript ? item.index - 1 : item.index,
              };
            });
          }
        });
        // 反制区模式:Length_Defense， 1-自定义 ，2-外延
        if (this.Length_Defense === 2) {
          // 重绘反制区外延
          this.drawDisposeExtend();
          this.drawDisposeExtendA();
          // 重绘预警区外延
          this.drawWarnExtend();
        }
  
        //删除反制区及图
        if (typeof this.trackData1[subscript] != "undefined") {
          this.deleteForm1(subscript);
        }
        //删除识别区
        if (typeof this.trackData2[subscript] != "undefined") {
          this.deleteForm2(subscript);
        }
        //删除预警区
        if (typeof this.silenceData[subscript] != "undefined") {
          this.deleteSilence(subscript);
        }
      },
      /**
       * 反制区-删除
       * 反制区删除单项 subscript 为单项索引号
       * item.upParam.Shape_Region_Control 为 圆形，扇形 还是多边形
       * 实际只是传了索引号
       */
      deleteForm1(subscript) {
        //清空识别区 圆
        // map.removeLayer(tempCircle)
        /*   this.roundnessList_identify.forEach(item=>
  
                ) */
        if (typeof this.identification[subscript] != "undefined") {
          this.map.removeLayer(this.roundnessList_identify[subscript]);
          // this.identification=[]
          this.roundnessList_identify.splice(subscript, 1);
          // this.roundnessList_identify[subscript]=null
          this.identification.splice(subscript, 1);
        }
  
        // this.roundnessList_identify=[]
        //清空 预警区 圆
        /*  this.roundnessList_earlyWarning.forEach(item=>
                 this.map.removeLayer(item)
               ) */
        //   此项应改为删除预警区圆 识别区圆 和自己本身反制区圆
        if (typeof this.earlyWarning[subscript] != "undefined") {
          this.map.removeLayer(this.roundnessList_earlyWarning[subscript]);
          this.roundnessList_earlyWarning.splice(subscript, 1);
          this.earlyWarning.splice(subscript, 1);
        }
  
        this.trackData1.splice(subscript, 1);
        this.trackData1.forEach((item, index) => {
          item.upParam.proTect = "反制区" + (index + 1);
          // item.upParam.proTect = '反制区' + (index + 1)
          if (
            Object.prototype.toString.call(item.protectParam) ===
            "[object Object]"
          ) {
            item.protectParam.index = index;
          }
          item.upForm.forEach((deal, dealIndex) => {
            deal.Shape_Region_Control.index = index;
          });
          /*  item.upForm.forEach((up, upIndex) => {
                       up.Shape_Region_Control.index = index
                   }) */
        });
        /*   thisA.shape 为反制区的画图图形组
         */
        this.shapeA.forEach((item1, index1) => {
          if (item1.index === subscript) {
            this.map.removeLayer(item1.list);
            this.shapeA.splice(index1, 1);
            this.shapeA = this.shapeA.map((item, shapeAIndex) => {
              item.list
                .on("click", (e) => this.setActiveIndex("shapeA", shapeAIndex, e))
                .bindPopup(
                  '<div><span class="nameTaskBox_A">' +
                    this.headParam.head +
                    ":" +
                    this.trackData1[item1.index].upParam.proTect +
                    "</span></div>"
                );
              return {
                ...item,
                index: item.index > subscript ? item.index - 1 : item.index,
              };
            });
          }
        });
        // 反制区模式:Length_Defense， 1-自定义 ，2-外延
        if (this.Length_Defense === 1) {
          // 重绘预警区外延
          this.drawWarnExtend();
        }
  
        //删除识别区
        if (typeof this.trackData2[subscript] != "undefined") {
          this.deleteForm2(subscript);
        }
        //删除预警区
        if (typeof this.silenceData[subscript] != "undefined") {
          this.deleteSilence(subscript);
        }
      },
      /**
       * 识别区-删除
       */
      deleteForm2(subscript) {
        this.trackData2.splice(subscript, 1);
        this.trackData2.forEach((item, index) => {
          // item.upParam.proTect = '识别区' + (index + 1)
          // item.upParam.proTect = '识别区' + (index + 1)
          if (
            Object.prototype.toString.call(item.protectParam) ===
            "[object Object]"
          ) {
            item.protectParam.index = index;
          }
          item.upForm.forEach((deal, dealIndex) => {
            deal.Shape_Region_Control.index = index;
          });
          // item.upForm.forEach((up, upIndex) => {
          //     up.Shape_Region_Control.index = index
          // })
        });
        this.shapeE.forEach((item1, index1) => {
          if (item1.index === subscript) {
            this.map.removeLayer(item1.list);
            this.shapeE.splice(index1, 1);
            this.shapeE = this.shapeE.map((item, shapeEIndex) => {
              item.list
                .on("click", (e) => this.setActiveIndex("shapeE", shapeEIndex, e))
                .bindPopup(
                  '<div><span class="nameTaskBox_A">' +
                    this.headParam.head +
                    ":" +
                    this.trackData2[item1.index].upParam.proTect +
                    "</span></div>"
                );
              return {
                ...item,
                index: item.index > subscript ? item.index - 1 : item.index,
              };
            });
          }
        });
        // 反制区模式:Length_Defense， 1-自定义 ，2-外延
        if (this.Length_Defense === 1) {
          // 重绘预警区外延
          this.drawWarnExtend();
        }
        //删除预警区
        if (typeof this.silenceData[subscript] != "undefined") {
          this.deleteSilence(subscript);
        }
      },
      /**
       * 静默区-删除
       */
      deleteSilence(subscript) {
        this.silenceData.splice(subscript, 1);
        this.silenceData.forEach((item, index) => {
          // item.upParam.proTect = '反制区' + (index + 1)
          if (
            Object.prototype.toString.call(item.protectParam) ===
            "[object Object]"
          ) {
            item.protectParam.index = index;
          }
          item.upForm.forEach((deal, dealIndex) => {
            deal.Shape_Region_Control.index = index;
          });
        });
        this.shapeC.forEach((item1, index1) => {
          if (item1.index === subscript) {
            this.map.removeLayer(item1.list);
            this.shapeC.splice(index1, 1);
            this.shapeC = this.shapeC.map((item, index) => {
              return {
                ...item,
                index: item.index > subscript ? item.index - 1 : item.index,
              };
            });
          }
        });
      },
      /**
       * 诱捕区-删除
       */
      /* deleteTrap (subscript) {
            this.trapData.splice(subscript, 1)
            this.trapData.forEach((item, index) => {
              item.upParam.proTect = '反制区' + (index + 1)
              if (Object.prototype.toString.call(item.protectParam) === '[object Object]') {
                item.protectParam.index = index
              }
              item.upForm.forEach((deal, dealIndex) => {
                deal.Shape_Region_Control.index = index
              })
            })
            this.shapeD.forEach((item1, index1) => {
              if (item1.index === subscript) {
                this.map.removeLayer(item1.list)
                this.shapeD.splice(index1, 1)
                this.shapeD = this.shapeD.map((item, index) => {
                  return {
                    ...item,
                    index: item.index > subscript ? item.index - 1 : item.index
                  }
                })
              }
            })
          }, */
  
      /**
       * 诱捕区-新增
       */
      /*     trapAdd () {
                let data = {
                  upForm: [{
                    proTect: {
                      indexA: 'K',
                      type: 'input'
                    },
                    Shape_Region_Control: {
                      indexA: 'K',
                      type: 'text'
                    }
                  }],
                  upParam: {
                    proTect: '诱捕区' + Number(this.trapData.length + 1),
                    Shape_Region_Control: '0x7A'
                  },
                  protectForm: [
  
                    {
                      Longitude: {
                        indexA: 'YXJD',
                        label: '圆心经度',
                        type: 'latlngInput',
                        unit: 'm',
                        max: '180',
                        min: '0'
                      }
                    },
                    {
                      Latitude: {
                        indexA: 'YXWD',
                        label: '圆心纬度',
                        type: 'latlngInput',
                        unit: 'm',
                        max: '90',
                        min: '0'
                      }
                    },
                    {
                      Radius: {
                        indexA: 'BJ',
                        label: '半径',
                        type: 'input',
                        unit: 'm'
                      },
                      Height_Control: {
                        indexA: 'FKGD',
                        label: '防控高度',
                        type: 'input',
                        unit: 'm'
                      }
                    }
                  ],
                  protectParam: {
                    Longitude: 0,
                    Latitude: 0,
                    Radius: 0,
                    Height_Control: 0
                  }
                }
                this.trapData.push(data)
              }, */
      /**
       * 静默区-新增
       */
      /*     silenceAdd () {
                let data = {
                  upForm: [{
                    proTect: {
                      indexA: 'K',
                      type: 'input'
                    },
                    Shape_Region_Control: {
                      indexA: 'K',
                      type: 'text'
                    }
                  }],
                  upParam: {
                    proTect: '静默区' + Number(this.silenceData.length + 1),
                    Shape_Region_Control: '0x7A'
                  },
                  protectForm: [
  
                    {
                      Longitude: {
                        indexA: 'YXJD',
                        label: '圆心经度',
                        type: 'latlngInput',
                        max: '180',
                        min: '0'
                      }
                    },
                    {
                      Latitude: {
                        index: 'YXWD',
                        label: '圆心纬度',
                        type: 'latlngInput',
                        max: '90',
                        min: '0'
                      }
                    },
                    {
                      Radius: {
                        indexA: 'BJ',
                        label: '半径',
                        type: 'input',
                        unit: 'm'
                      },
                      Height_Control: {
                        indexA: 'FKGD',
                        label: '防控高度',
                        type: 'input',
                        unit: 'm'
                      }
                    }
                  ],
                  protectParam: {
                    Longitude: 0,
                    Latitude: 0,
                    Radius: 0,
                    Height_Control: 0
                  }
                }
                this.silenceData.push(data)
              }, */
      /**
       * 核心区-新增
       */
      add() {
        // 当核心区超过一个时清空外延
        if (this.trackData.length > 1) {
          this.clearDisposeExtend();
          this.clearDisposeExtendA();
          this.clearWarnExtend();
        }
        let data = {
          state: true,
          upForm: [
            {
              proTect: {
                indexA: "K",
                type: "input",
              },
              Shape_Region_Control: {
                type: "select",
                indexA: "K",
                options: {
                  "0x7A": require("@/assets/imgs/task/circular.png"),
                  "0x7B": require("@/assets/imgs/task/sector.png"),
                  // '0x7C': require('@/assets/imgs/task/Annularsector.png'),
                  // '3': require('@/assets/imgs/task/huan.png'),
                  "0x7F": require("@/assets/imgs/task/duobian.png"),
                },
                index: Number(this.trackData.length),
                onChange: this.test,
              },
            },
          ],
          upParam: {
            proTect: "核心防护区" + Number(this.trackData.length + 1),
            Shape_Region_Control: "0x7A",
          },
          protectForm: [
            {
              Longitude: {
                indexA: "YXJD",
                label: "圆心经度",
                type: "latlngInput",
                max: "180",
                min: "0",
              },
            },
            {
              Latitude: {
                indexA: "YXWD",
                label: "圆心纬度",
                type: "latlngInput",
                max: "90",
                min: "0",
              },
            },
            {
              Radius: {
                indexA: "BJ",
                label: "半径",
                type: "input",
                unit: "m",
              },
              Height_Control: {
                indexA: "FKGD",
                label: "防控高度",
                type: "input",
                unit: "m",
              },
            },
          ],
          protectParam: {
            Longitude: 0,
            Latitude: 0,
            Radius: 0,
            Height_Control: 0,
          },
        };
        this.trackData.push(data);
      },
      /**
       * 反制区-新增
       * trackData 核心区
       * trackData1 反制区
       */
      add1() {
        if (this.trackData.length == 0) {
          this.$message.error("核心区没有绘制圆形图");
          return;
        }
        const index = this.trackData1.length; //当前添加项的下标
        if (this.trackData.length == index) {
          this.$message.error("反制区的圆绘制不能超过核心区圆的个数");
          return;
        }
        debugger;
        const { protectParam, upParam, protectForm, upForm, state } =
          this.trackData[index];
        const { Radius } = protectParam;
        let r = Number(Radius) + 5000;
  
        let data = {
          state,
          upForm: this._.cloneDeep(upForm),
          protectForm: this._.cloneDeep(protectForm),
          upParam: {
            proTect: "反制区" + Number(index + 1),
            Shape_Region_Control: upParam.Shape_Region_Control,
          },
          protectParam: Object.assign(
            {},
            {
              ...protectParam,
            },
            {
              Radius: r,
            }
          ),
        };
        data.upForm[0].Shape_Region_Control.onChange = this.test1;
        if (upParam.Shape_Region_Control == "0x7F") {
          data.protectForm = [];
          data.protectParam = {
            list: [
              {
                Latitude: 0,
                Longitude: 0,
              },
            ],
            height: "",
          };
        }
        console.log(data);
        debugger;
        this.trackData1.push(data);
        let { dispose } = this.drawOptions;
  
        let type = upParam.Shape_Region_Control;
        localStorage.created = 1;
        // event.stopPropagation()
        // 存入反制区下标
        this.selectedDraw.dispose.index = index;
        this.selectedDraw.type = "dispose";
        // 关闭所有绘制
        this.closeAllDraw();
  
        debugger;
        if (upParam.Shape_Region_Control != "0x7F") {
          this.drawTypeCreated(
            type,
            Object.assign(
              {},
              {
                ...protectParam,
              },
              {
                Radius: r,
              }
            ),
            dispose.shapeOptions,
            "dispose",
            this.selectedDraw.dispose.index
          );
        }
  
        // this.selectedDraw.core.circleDrawLayer.bringToFront()
      },
      /**
       * 识别区-新增
       */
      add2() {
        let data = {
          state: true,
          upForm: [
            {
              proTect: {
                indexA: "K",
                type: "input",
              },
              Shape_Region_Control: {
                type: "select",
                indexA: "K",
                options: {
                  "0x7A": require("@/assets/imgs/task/circular.png"),
                  "0x7B": require("@/assets/imgs/task/sector.png"),
                  "0x7F": require("@/assets/imgs/task/duobian.png"),
                },
                index: Number(this.trackData2.length),
                onChange: this.test2,
              },
            },
          ],
          upParam: {
            proTect: "识别区" + Number(this.trackData2.length + 1),
            Shape_Region_Control: "0x7A",
          },
          protectForm: [
            {
              Longitude: {
                indexA: "YXJD",
                label: "圆心经度",
                type: "latlngInput",
                max: "180",
                min: "0",
              },
            },
            {
              Latitude: {
                indexA: "YXWD",
                label: "圆心纬度",
                type: "latlngInput",
                max: "90",
                min: "0",
              },
            },
            {
              Radius: {
                indexA: "BJ",
                label: "半径",
                type: "input",
                unit: "m",
              },
              Height_Control: {
                indexA: "FKGD",
                label: "防控高度",
                type: "input",
                unit: "m",
              },
            },
          ],
          protectParam: {
            Longitude: 0,
            Latitude: 0,
            Radius: 0,
            Height_Control: 0,
          },
        };
        this.trackData2.push(data);
      },
      // 扇形
      // center 中心点 数组
      // radius 半径
      // startAngle 起始角度
      // endAngle 终止角度
      // pointNum 圆弧上点的个数
      getPoints(center, radius, startAngle, endAngle, pointNum) {
        var sin;
        var cos;
        var x;
        var y;
        var angle;
        var points = [];
        points.push(center);
        for (var i = 0; i <= pointNum; i++) {
          angle = startAngle + ((endAngle - startAngle) * i) / pointNum;
          sin = Math.sin((angle * Math.PI) / 180);
          cos = Math.cos((angle * Math.PI) / 180);
          y = center[0] + radius * cos;
          x = center[1] + radius * sin;
          points[i] = [y, x];
        }
        var point = points;
        point.push(center);
        return point;
      },
  
      /**
       * 清除核心区
       */
      clearCore() {
        this.trackData = [];
        this.shape.map((item) => {
          this.map.removeLayer(item.list);
        });
        this.shape = [];
      },
      /**
       * 清除反制区
       */
      clearDispose() {
        this.trackData1 = [];
        this.shapeA.map((item) => {
          this.map.removeLayer(item.list);
        });
        this.shapeA = [];
      },
      /**
       * 清除识别区
       */
      clearDisposeA() {
        this.trackData2 = [];
        this.shapeE.map((item) => {
          this.map.removeLayer(item.list);
        });
        this.shapeE = [];
      },
      /**
       * 清除预警区==
       */
      clearSilence() {
        this.silenceData = [];
        this.shapeC.map((item) => {
          this.map.removeLayer(item.list);
        });
        this.shapeC = [];
      },
      /**
       * 清除反制区外延
       */
      clearDisposeExtend() {
        this.selectedDraw.dispose.extend &&
          this.selectedDraw.dispose.extend.remove();
      },
      /**
       * 清除识别区外延
       */
      clearDisposeExtendA() {
        this.selectedDraw.disposeA.extend &&
          this.selectedDraw.disposeA.extend.remove();
      },
      /**
       * 清除预警区外延
       */
      clearWarnExtend() {
        this.selectedDraw.warning.extend &&
          this.selectedDraw.warning.extend.remove();
      },
      /**
       * 清除静默区
       */
      /*     clearSilence () {
                this.silenceData = []
                this.shapeC.map((item) => {
                  this.map.removeLayer(item.list)
                })
                this.shapeC = []
              }, */
      /**
       * 清除诱捕区
       */
      /*     clearTrap () {
                this.trapData = []
                this.shapeD.map((item) => {
                  this.map.removeLayer(item.list)
                })
                this.shapeD = []
              }, */
  
      /**
       * 清空所有图形
       */
      clearAll() {
        // 清除核心区
        this.clearCore();
        // 清除反制区
        this.clearDispose();
        // 清除识别区
        this.clearDisposeA();
        // 清除预警区外延
        this.clearWarnExtend();
        // 清除静默区
        /*  this.clearSilence()
               // 清除诱捕区
               this.clearTrap() */
        // 清除反制区外延
        this.clearDisposeExtend();
        // 清除识别区外延
        this.clearDisposeExtendA();
      },
      /**
       * 清空所有机动式图形
       */
      clearMobileAll() {
        // 清除核心区
        this.clearMobileCore();
        // 清除反制区
        this.clearMobileDisposal();
        // 清除预警区
        this.clearMobileWarn();
      },
      /**
       * 清空核心区
       */
      clearMobileCore() {
        this.coreMobile.map((item) => {
          this.map.removeLayer(item);
        });
        this.coreMobile = [];
        this.coreMobileParam = {
          Radius: 0,
          Height_Control: 0,
        };
      },
      /**
       * 清空反制区
       */
      clearMobileDisposal() {
        this.disposalMobile.map((item) => {
          this.map.removeLayer(item);
        });
        this.disposalMobile = [];
        this.disposalMobileParam = {
          long: 0,
          Height_Control: 0,
        };
      },
      /**
       * 清空预警区
       */
      clearMobileWarn() {
        this.warnMobile.map((item) => {
          this.map.removeLayer(item);
        });
        this.warnMobile = [];
        this.warnMobileParam = {
          long: 0,
          Height_Control: 0,
        };
      },
      /**
       * 清空监听
       */
      clearOn() {
        if (this.map) {
          this.map.off("draw:created");
          this.map.off("draw:editstop");
          this.map.off("click");
        }
      },
  
      /**
       * 多边形增加点数方法
       * @type core-核心区
       * @dataIndex xx区数据的下标
       * @valueIndex 坐标点集合下标
       */
      addPolygonList(type, { dataIndex, valueIndex }) {
        let dataName = "";
        let point = {
          Latitude: 0,
          Longitude: 0,
        };
        switch (type) {
          // 核心区
          case "core":
            dataName = "trackData";
            break;
          // 反制区
          case "dispose":
            dataName = "trackData1";
            break;
          // 反制区
          case "disposeA":
            dataName = "trackData2";
            break;
          case "silence":
            dataName = "silenceData";
            break;
        }
        if (valueIndex) {
          this[dataName][dataIndex].protectParam.list.splice(
            valueIndex + 1,
            0,
            point
          );
        } else {
          this[dataName][dataIndex].protectParam.list.push(point);
        }
      },
  
      /**
       * 多边形删除点数方法
       * @type core-核心区
       * @dataIndex xx区数据的下标
       * @valueIndex 坐标点集合下标
       */
      delPolygonList(type, { dataIndex, valueIndex }) {
        let dataName = "";
        let shapeName = "";
        switch (type) {
          // 核心区
          case "core":
            dataName = "trackData";
            shapeName = "shape";
            break;
          // 反制区
          case "dispose":
            dataName = "trackData1";
            shapeName = "shapeA";
            break;
          // 识别区
          case "disposeA":
            dataName = "trackData2";
            shapeName = "shapeE";
            break;
          // 预警区
          case "silence":
            dataName = "silenceData";
            shapeName = "shapeC";
            break;
        }
        this[dataName][dataIndex].protectParam.list.splice(valueIndex, 1);
        // 重绘多边形
        this.reDrawPolygon(dataName, shapeName, dataIndex);
      },
  
      /**
       * 重绘多边形
       * @dataName 修改data名称
       * @shapeName 修改图形名称
       * @index 统一的下标
       */
      reDrawPolygon(dataName, shapeName, index) {
        let list = this[dataName][index].protectParam.list.map((item) => {
          return [item.Latitude, item.Longitude];
        });
        this[shapeName][index].list.setLatLngs(list);
        let polygonLayer = {
          layer: this[shapeName][index].list,
        };
        this[shapeName][index].list.editing._updateLatLngs(polygonLayer);
        this[shapeName][index].list.redraw();
        /**
         * 反制区是外延
         * 重绘反制区，预警区
         */
        if (this.Length_Defense === 2) {
          this.drawDisposeExtend();
          this.drawDisposeExtendA();
        }
        this.drawWarnExtend();
      },
  
      /**
       * 多边形外延计算公式
       * @pointList 多边形点位集合
       * @kilometer 外延长度
       */
      computationalExtension(pointList, kilometer) {
        let list = [];
        let len = pointList.length;
        let k = 0;
        for (let i = 0; i < len; i++) {
          let point = pointList[i];
          // 上一个点
          let point1 = pointList[i === 0 ? len - 1 : i - 1];
          // 下一个点
          let point2 = pointList[i === len - 1 ? 0 : i + 1];
  
          let p34 =
            (point1.Latitude - point.Latitude) *
              (point2.Longitude - point1.Longitude) -
            (point1.Longitude - point.Longitude) *
              (point2.Latitude - point1.Latitude);
          if (p34 > 0) {
            k++;
          } else {
            k--;
          }
        }
        for (let i = 0; i < len; i++) {
          let point = pointList[i];
          // 上一个点
          let point1 = pointList[i === 0 ? len - 1 : i - 1];
          // 下一个点
          let point2 = pointList[i === len - 1 ? 0 : i + 1];
          // 向量PP1
          const vectorX1 = point1.Longitude - point.Longitude; // 向量PP1 横坐标
          const vectorY1 = point1.Latitude - point.Latitude; // 向量PP1 纵坐标
          const n1 = this.norm(vectorX1, vectorY1); // 向量的平方根 为了对向量PP1做单位化
          let vectorUnitX1 = vectorX1 / n1; // 向量单位化 横坐标
          let vectorUnitY1 = vectorY1 / n1; // 向量单位化 纵坐标
  
          // 向量PP2
          const vectorX2 = point2.Longitude - point.Longitude; // 向量PP2 横坐标
          const vectorY2 = point2.Latitude - point.Latitude; // 向量PP2 纵坐标
          const n2 = this.norm(vectorX2, vectorY2); // 向量的平方根 为了对向量PP1做单位化
          let vectorUnitX2 = vectorX2 / n2; // 向量单位化 横坐标
          let vectorUnitY2 = vectorY2 / n2; // 向量单位化 纵坐标
  
          // PQ距离
          let number = this.km2Degree(kilometer / 1000);
          // let p12 = ''
          // let p23 = ''
          // let p1 = (pointList[0].Latitude, pointList[0].Longitude)
          // let p2 = (pointList[1].Latitude, pointList[1].Longitude)
          // let p3 = (pointList[2].Latitude, pointList[2].Longitude)
          // p12 = (x2 - x1, y2 - y1)
          // p23 = (x3 - x2, y3 - y2)
          //  (x2-x1)*(y3-y2)-(y2-y1)*(x3-x2)
          // console.log(point, point1, point2, '====')
          // p12 = (pointList[i + 1].Longitude - pointList[i].Longitude, pointList[i + 1].Latitude - pointList[i].Latitude)
          // p23 = (pointList[i + 2].Longitude - pointList[i + 1].Longitude, pointList[i + 2].Latitude - pointList[i + 1].Latitude)
          // let p34 = (pointList[i + 1].Latitude - pointList[i].Latitude) * (pointList[i + 2].Longitude - pointList[i + 1].Longitude) - (pointList[i + 1].Longitude - pointList[i].Longitude) * (pointList[i + 2].Latitude - pointList[i + 1].Latitude)
          // console.log(p34) // 大于0为逆时针
          //  (p1.y - p.y) * (p2.x - p1.x) - (p1.x - p.x) * (p2.y - p1.y);
          if (k < 0) {
            number = -number;
          }
          const vectorLen =
            number /
            Math.sqrt(
              (1 - (vectorUnitX1 * vectorUnitX2 + vectorUnitY1 * vectorUnitY2)) /
                2
            );
          // 根据向量的叉乘积来判断角是凹角还是凸角
          if (vectorX1 * vectorY2 + -1 * vectorY1 * vectorX2 < 0) {
            vectorUnitX2 *= -1;
            vectorUnitY2 *= -1;
            vectorUnitX1 *= -1;
            vectorUnitY1 *= -1;
          }
  
          // PQ的方向
          const vectorX = vectorUnitX1 + vectorUnitX2;
          const vectorY = vectorUnitY1 + vectorUnitY2;
          const n = vectorLen / this.norm(vectorX, vectorY);
          const vectorUnitX = vectorX * n;
          const vectorUnitY = vectorY * n;
  
          const polygonX = vectorUnitX + point.Longitude;
          const polygonY = vectorUnitY + point.Latitude;
  
          list.push({
            Latitude: polygonY,
            Longitude: polygonX,
          });
        }
        return list;
      },
  
      /**
       * 开平方
       */
      norm(x, y) {
        return Math.sqrt(x * x + y * y);
      },
  
      /**
       * 弧长公式
       */
      km2Degree(l) {
        // 公式:l(弧长)=degree（圆心角）× π（圆周率）× r（半径）/180
        // 转换后的公式：degree（圆心角）=l(弧长) × 180/(π（圆周率）× r（半径）)
        let degree = (180 / 6371.393 / Math.PI) * l;
        return degree;
      },
  
      /**
       * 设置层级顺序
       */
      setIndex() {
        // 设置层级-诱捕区
        // this.selectedDraw.trap.circleDrawLayer.bringToFront()
        // 设置层级-静默区
        this.selectedDraw.silence.circleDrawLayer.bringToFront();
        this.selectedDraw.silence.polygonDrawLayer.bringToFront();
  
        // 设置层级-识别区
        this.selectedDraw.disposeA.circleDrawLayer.bringToFront();
        this.selectedDraw.disposeA.polygonDrawLayer.bringToFront();
  
        // 设置层级-反制区-外延
        this.selectedDraw.dispose.extend &&
          this.selectedDraw.dispose.extend.bringToFront();
        // 设置层级-反制区
        this.selectedDraw.dispose.circleDrawLayer.bringToFront();
        this.selectedDraw.dispose.polygonDrawLayer.bringToFront();
  
        // 设置层级-核心区
        this.selectedDraw.core.circleDrawLayer.bringToFront();
        this.selectedDraw.core.polygonDrawLayer.bringToFront();
  
        // 设置层级-预警区-外延
        this.selectedDraw.warning.extend &&
          this.selectedDraw.warning.extend.bringToFront();
      },
      setPolygonIndex() {
        // 充值扇形层级
        // 设置层级-预警区
        // this.selectedDraw.silence.circleDrawLayer.bringToFront()
        this.shapeC.map((item) => item.list.bringToFront());
        // 设置层级-识别区
        //    this.selectedDraw.disposeA.circleDrawLayer.bringToFront()
  
        this.shapeE.map((item) => item.list.bringToFront());
        // 设置层级-反制区
        this.shapeA.map((item) => item.list.bringToFront());
        // 设置层级-核心区
        this.shape.map((item) => item.list.bringToFront());
  
        // this.selectedDraw.dispose.circleDrawLayer.bringToFront()
  
        // 设置层级-诱捕区
        // this.selectedDraw.trap.circleDrawLayer.bringToFront()
  
        // 设置层级-反制区-外延
        // this.selectedDraw.dispose.extend && this.selectedDraw.dispose.extend.bringToFront()
  
        // 设置层级-预警区-外延
        // this.selectedDraw.warning.extend && this.selectedDraw.warning.extend.bringToFront()
      },
  
      /**
       * 绘制反制区外延
       */
      drawDisposeExtend(val) {
        let newVal = val || this.disposalParam.long;
        this.clearDisposeExtend();
        if (!newVal) {
          return;
        }
        // extend-结果集
        let extend = [];
        this.trackData.map((item) => {
          let layer = "";
          let type = item.upParam.Shape_Region_Control;
          let { Latitude, Longitude, Radius, Angle_Centerline, Angle_Sector } =
            item.protectParam;
          switch (type) {
            // 圆形
            case "0x7A":
              layer = L.circle([Latitude, Longitude], {
                color: "#F9B604",
                fillOpacity: 0.2,
                radius: Number(Radius) + Number(newVal),
              });
              break;
            // 扇形
            case "0x7B":
              let points = this.getPoints(
                [Number(Latitude), Number(Longitude)],
                (Number(Radius) + Number(newVal)) / 111111.111,
                Number(Angle_Centerline),
                Number(Angle_Sector),
                1000
              );
              points[points.length] = points[0];
              layer = L.polygon(points, {
                color: "#F9B604",
                fillOpacity: 0.2,
              });
              break;
            // 多边形
            case "0x7F":
              let pointList = item.protectParam.list;
              let extensionList = this.computationalExtension(
                pointList,
                Number(newVal)
              );
              let list = extensionList.map((item) => {
                return [item.Latitude, item.Longitude];
              });
              layer = L.polygon(list, {
                color: "#F9B604",
                fillOpacity: 0.2,
              });
              break;
          }
          let con = {
            type: type,
            list: layer,
            index: item.index,
            indexA: "K",
          };
          extend.push(con);
        });
        this.selectedDraw.dispose.extend = new L.FeatureGroup(
          extend.map((item) => {
            return item.list;
          })
        );
        this.selectedDraw.dispose.extend.addTo(this.map);
        // 设置层级顺序
        this.setIndex();
      },
      /**
       * 绘制识别区外延
       */
      drawDisposeExtendA(val) {
        let newVal = val || this.disposalParamA.long;
        this.clearDisposeExtendA();
        if (!newVal) {
          return;
        }
        // extend-结果集
        let extend = [];
        this.trackData.map((item) => {
          let layer = "";
          let type = item.upParam.Shape_Region_Control;
          let { Latitude, Longitude, Radius, Angle_Centerline, Angle_Sector } =
            item.protectParam;
          switch (type) {
            // 圆形
            case "0x7A":
              layer = L.circle([Latitude, Longitude], {
                color: "rgba(199,122,206)",
                fillOpacity: 0.2,
                radius: Number(Radius) + Number(newVal),
              });
              break;
            // 扇形
            case "0x7B":
              let points = this.getPoints(
                [Number(Latitude), Number(Longitude)],
                (Number(Radius) + Number(newVal)) / 111111.111,
                Number(Angle_Centerline),
                Number(Angle_Sector),
                1000
              );
              points[points.length] = points[0];
              layer = L.polygon(points, {
                color: "rgba(199,122,206)",
                fillOpacity: 0.2,
              });
              break;
            // 多边形
            case "0x7F":
              let pointList = item.protectParam.list;
              let extensionList = this.computationalExtension(
                pointList,
                Number(newVal)
              );
              let list = extensionList.map((item) => {
                return [item.Latitude, item.Longitude];
              });
              layer = L.polygon(list, {
                color: "rgb(198,122,206)",
                fillOpacity: 0.3,
              });
              break;
          }
          let con = {
            type: type,
            list: layer,
            index: item.index,
            indexA: "K",
          };
          extend.push(con);
        });
        this.selectedDraw.disposeA.extend = new L.FeatureGroup(
          extend.map((item) => {
            return item.list;
          })
        );
        this.selectedDraw.disposeA.extend.addTo(this.map);
        // 设置层级顺序
        this.setIndex();
      },
      /**
       * 绘制预警区外延
       */
      drawWarnExtend(val) {
        let newVal = val || this.warnParam.long;
        this.clearWarnExtend();
        if (!newVal) {
          return;
        }
        // extend-结果集,dataList-被操作的集合,需要增加的外延长度
        let extend = [];
        let dataList = [];
        let addLength = 0;
        // 软
        // let extendA = []
        // let dataListA = []
        // let addLengthA = 0
        // 1-是自定义
        if (this.Length_Defense === 1) {
          if (this.RSS_Defense === 1) {
            // 1是软杀
            dataList = this.trackData2;
            addLength = Number(newVal);
          } else {
            // 2是硬杀
            dataList = this.trackData1;
            addLength = Number(newVal);
          }
        } else {
          // 2-外延
          if (
            Number(this.disposalParamA.long) !== 0 &&
            Number(this.disposalParam.long) !== 0
          ) {
            this.RSS_Defense = 1;
            dataList = this.trackData;
            addLength =
              Number(this.disposalParamA.long || 0) +
              Number(newVal) +
              Number(this.disposalParam.long || 0);
          } else if (
            Number(this.disposalParamA.long) === 0 ||
            Number(this.disposalParam.long) !== 0
          ) {
            dataList = this.trackData;
            this.RSS_Defense = 2;
            addLength = Number(this.disposalParam.long || 0) + Number(newVal);
          } else if (
            Number(this.disposalParamA.long) !== 0 ||
            Number(this.disposalParam.long) === 0
          ) {
            dataList = this.trackData;
            this.RSS_Defense = 1;
            addLength = Number(this.disposalParamA.long || 0) + Number(newVal);
          }
        }
        dataList.map((item, index) => {
          let layer = "";
          let type = item.upParam.Shape_Region_Control;
          let { Latitude, Longitude, Radius, Angle_Centerline, Angle_Sector } =
            item.protectParam;
          switch (type) {
            // 圆形
            case "0x7A":
              layer = L.circle([Latitude, Longitude], {
                color: "#F9B604",
                fillOpacity: 0.2,
                radius: Number(Radius) + addLength,
              });
              break;
            // 扇形
            case "0x7B":
              let points = this.getPoints(
                [Number(Latitude), Number(Longitude)],
                (Number(Radius) + addLength) / 111111.111,
                Number(Angle_Centerline),
                Number(Angle_Sector),
                1000
              );
              points[points.length] = points[0];
              layer = L.polygon(points, {
                color: "#F9B604",
                fillOpacity: 0.2,
              });
              break;
            // 多边形
            case "0x7F":
              let pointList = item.protectParam.list;
              let extensionList = this.computationalExtension(
                pointList,
                addLength
              );
              let list = extensionList.map((item) => {
                return [item.Latitude, item.Longitude];
              });
              layer = L.polygon(list, {
                color: "#F9B604",
                fillOpacity: 0.2,
              });
              break;
          }
          let con = {
            type: type,
            list: layer,
            index: item.index,
            indexA: "K",
          };
          extend.push(con);
        });
  
        this.selectedDraw.warning.extend = new L.FeatureGroup(
          extend.map((item) => {
            return item.list;
          })
        );
        this.selectedDraw.warning.extend.addTo(this.map);
        // 设置层级顺序
        this.setIndex();
      },
  
      /**
       * 机动式
       */
      reDrawMobile(list) {
        let _this = this;
        list.map((item, index) => {
          let latlng = {
            Latitude: item.Latitude_Truck / 1e8,
            Longitude: item.Longitude_Truck / 1e8,
          };
          // 绘制核心区
          _this.drawCore(latlng, index);
          // 绘制反制区
          _this.drawDisposal(latlng, index);
          // 绘制识别区
          _this.drawDisposalA(latlng, index);
          // 绘制预警区
          _this.drawWarn(latlng, index);
        });
      },
  
      /**
       * 绘制机动式-核心区
       */
      drawCore(points, index) {
        if (!Number(this.coreMobileParam.Radius)) {
          return;
        }
        if (this.coreMobile[index]) {
          this.coreMobile[index].setLatLng(
            L.latLng(points.Latitude, points.Longitude)
          );
          this.coreMobile[index].setRadius(Number(this.coreMobileParam.Radius));
        } else {
          let layer = L.circle(
            [points.Latitude, points.Longitude],
            Number(this.coreMobileParam.Radius),
            this.drawOptions.core.shapeOptions
          );
          layer.addTo(this.selectedDraw.core.circleDrawLayer);
          this.coreMobile.push(layer);
        }
      },
  
      /**
       * 绘制机动式-反制区
       */
      drawDisposal(points, index) {
        if (!Number(this.disposalMobileParam.long)) {
          return;
        }
        let radius =
          Number(this.disposalMobileParam.long) +
          Number(this.coreMobileParam.Radius);
        if (this.disposalMobile[index]) {
          this.disposalMobile[index].setLatLng(
            L.latLng(points.Latitude, points.Longitude)
          );
          this.disposalMobile[index].setRadius(radius);
        } else {
          let layer = L.circle(
            [points.Latitude, points.Longitude],
            radius,
            this.drawOptions.dispose.shapeOptions
          );
          layer.addTo(this.selectedDraw.dispose.circleDrawLayer);
          this.disposalMobile.push(layer);
        }
      },
      /**
       * 绘制机动式-识别区
       */
      drawDisposalA(points, index) {
        if (!Number(this.disposalMobileParamA.long)) {
          return;
        }
        let radius =
          Number(this.disposalMobileParamA.long) +
          Number(this.coreMobileParam.Radius);
        if (this.disposalMobileA[index]) {
          this.disposalMobileA[index].setLatLng(
            L.latLng(points.Latitude, points.Longitude)
          );
          this.disposalMobileA[index].setRadius(radius);
        } else {
          let layer = L.circle(
            [points.Latitude, points.Longitude],
            radius,
            this.drawOptions.disposeA.shapeOptions
          );
          layer.addTo(this.selectedDraw.dispose.circleDrawLayer);
          this.disposalMobileA.push(layer);
        }
      },
      /**
       * 绘制机动式-预警区
       */
      drawWarn(points, index) {
        if (!Number(this.warnMobileParam.long)) {
          return;
        }
        let radius =
          Number(this.disposalMobileParam.long) +
          Number(this.coreMobileParam.Radius) +
          Number(this.warnMobileParam.long);
        if (this.warnMobile[index]) {
          this.warnMobile[index].setLatLng(
            L.latLng(points.Latitude, points.Longitude)
          );
          this.warnMobile[index].setRadius(radius);
        } else {
          let layer = L.circle([points.Latitude, points.Longitude], radius, {
            color: "#F9B604",
            fillOpacity: 0.2,
          });
          layer.addTo(this.selectedDraw.warning.circleDrawLayer);
          this.warnMobile.push(layer);
        }
      },
    },
  
    watch: {
      // 绘制反制区延长范围
      "disposalParam.long": {
        handler(newVal, oldVal) {
          this.drawDisposeExtend(newVal);
          let num = Number(newVal) + Number(this.disposalParamA.long);
          this.drawDisposeExtendA(num);
          this.drawWarnExtend(Number(this.warnParam.long));
        },
        deep: true,
      },
      // 绘制识别区延长范围
      "disposalParamA.long": {
        handler(newVal, oldVal) {
          let num = Number(newVal) + Number(this.disposalParam.long);
          this.drawDisposeExtendA(num);
          this.drawWarnExtend(Number(this.warnParam.long));
        },
        deep: true,
      },
      /**
       * 绘制预警区延长范围
       * 这里有两种情况
       * 反制区自定义:需要遍历所有反制区
       * 反制区外延:只需要在反制区基础上增加外延
       * */
      "warnParam.long": {
        handler(newVal, oldVal) {
          this.drawWarnExtend(newVal);
        },
        deep: true,
      },
      /**
       * 监听机动式
       * */

    },
  };
  </script>





  <style lang="scss" scoped>
  ::v-deep(.el-form-item__content){
    flex-wrap: nowrap;
    gap:10px;
  }
    
  </style>


<style scoped>
.madalInp {
  display: flex;
}

/* .footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer div {
  width: 25%;
  height: 55px;
  font-size: 23px;
  color: #fff;
  text-align: center;
  line-height: 55px;
  background: #062a54;
} */
.task-content {
  flex: 1;
}

.task-content {
  display: flex;
  flex-direction: column;
}
</style><style lang="scss" scoped>
 #head .app-input .ivu-input-inner-container > input {
  width: 272px;
  height: 44px;
  text-align: left;
}

 #top .app-input .ivu-input-inner-container > input {
  width: 198px;
  height: 30px;
  text-align: left;
}

 #top .ivu-select-selection {
  width: 129px;
}

 #top .ivu-select-dropdown {
  min-width: 129px !important;
}

 #protect .coreName .ivu-input-inner-container .ivu-input,
 #trap .coreName .ivu-input-inner-container .ivu-input,
 #silence .coreName .ivu-input-inner-container .ivu-input,
 #deal .coreName .ivu-input-inner-container .ivu-input {
  width: 196px !important;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

 #protect .coreName .ivu-input-inner-container .ivu-select,
 #trap .coreName .ivu-input-inner-container .ivu-select,
 #silence .coreName .ivu-input-inner-container .ivu-select,
 #deal .coreName .ivu-input-inner-container .ivu-select {
  width: 129px !important;
  height: 40px !important;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

 #protect .coreName,
 #trap .coreName,
 #silence .coreName,
 #deal .coreName {
  display: flex;
  justify-content: space-between;
  margin-left: 104px;
  margin-top: 12px;
}

 #protect .ivu-form-item-content,
 #deal .ivu-form-item-content {
  position: relative;
  width: calc(100% - 100px);
}

 #protect .ivu-form-item-content .headname,
 #deal .ivu-form-item-content .headname {
  position: absolute;
  left: 25%;
  top: 17%;
}

.core {
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  width: 91%;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #fff;
  padding-right: 10%;
  margin: 8px 0;
}

.dr-title {
  align-items: center;
  margin: 8px 0;
}

.dr-title img {
  width: 40px;
  height: 40px;
  padding: 6px;
  background: #062a54;
  border-radius: 5px;
}

.dr-title i {
  font-size: 26px;
  display: block;
  color: #fff;
  margin-left: 20px;
}

.coustom i {
  font-size: 26px;
  display: block;
  color: #174572;
  background: #fff;
  width: 22px;
  height: 22px;
  line-height: 23px;
  text-align: center;
  border-radius: 50%;
}

.dr-title .el-input {
  margin: 0 20px;
}

.dr-title {
  display: flex;
  margin-left: 22px;
  width: 95%;
}

.dr-title span {
  font-size: 18px;
  color: #fff;
}

.delete-pic {
  font-size: 24px;
  position: absolute;
  left: 25px;
  top: 16px;
}

.circular-pic {
  width: 22px;
  height: 22px;
}

.circular1-pic {
  width: 22px;
  height: 22px;
  position: absolute;
  top: 14px;
  left: 350px;
}

.time-box > div,
.time-box {
  margin-left: 10px;
}

 .coreName .ivu-form-item-label {
  color: #fff;
  display: block;
  width: 200px;
  font-size: 18px;
  text-align: left;
}

 .coreName .ivu-form-item {
  width: 500px;
  margin-bottom: 0;
  margin-left: 16px;
  margin-right: 15px;
}

 .app-form .ivu-form-item {
  margin-bottom: 0 !important;
}

 .coreName .ivu-select-selection {
  width: 112px;
  margin-top: -2px;
}

 .coreName .ivu-select-dropdown {
  width: 140px !important;
  min-width: 140px !important;
}

 .app-form {
  margin-top: 10px;
  margin-right: 18px;

  .ivu-form-item-content {
    width: calc(100% - 100px);
  }

  .app-input-unit {
    margin: 0;
    position: absolute;
    right: -4px;
  }
}

 .coreName .show-title {
  margin-top: 0px;
}

 .core {
  position: relative;
  margin: 0 auto;
  width: 485px;
  padding-bottom: 10px;
  margin-bottom: 16px;

  .delete-pic {
    color: #fff;
    left: 6px;
  }
}

 .silence {
  width: 485px;
  margin: 0 auto;
  padding-bottom: 10px;
}

 .trap {
  width: 485px;
  margin: 0 auto;
  padding-bottom: 10px;
}

 .mobile {
  > div {
    padding-bottom: 10px;
  }
}

.task-content .ivu-form-item .ivu-form-item-label {
  text-align: right !important;
  width: 100px;
}

 #type .ivu-form-item-label {
  text-align: left !important;
}

.ivu-form-item-label {
  width: 95px !important;
}

.iconjihuoA {
  font-size: 34px;
  margin-left: 0;
  background: #062a54;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  color: #fff;
  margin-top: 10px;
  padding: 4px;
}

.btnIcon {
  background: rgba(255, 255, 255, 0.2);
  font-size: 12px;
  padding: 4px;
  margin-left: 58px;
  border-radius: 5px;
  cursor: pointer;
}

 .leaflet-popup-content {
  width: auto;
  background: rgba(255, 255, 255, 0.4) !important;
}

.positionR {
  position: absolute;

  > span {
    position: absolute;
    left: 63px;
    font-size: 24px;
    top: 12px;
    width: 30px;
    height: 30px;
    display: inline-block;
    background: #062a54;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    z-index: 9999;
  }
}

#chuzhiqu  .ivu-form-item-label {
  width: auto !important;

  .app-form {
    margin-top: 0;
  }
}

.boxSty {
  color: #ffffff;
  font-size: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
}

.huakuai {
  position: absolute;
  top: 7px;
  right: 25px;
  border-radius: 5px;
  display: inline-block;

  > i:nth-child(1) {
    left: 10px;
  }

  > i {
    position: relative;
    width: 70px;
    height: 30px;
    color: rgba(255, 255, 255, 0.8);
    background: #062a54;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    border-radius: 5px;
    margin: 0;
  }

  > .classTwo {
    background: #04eafb;
    color: #284c75;
    width: 70px;
    z-index: 10;
  }
}

 .app-input {
  .ivu-input-inner-container {
    > input {
      border: 1px solid rgba(255, 255, 255, 0.6);
      width: 92px;
      margin-right: 18px;
    }
  }

  .ivu-input {
    height: 32px;
  }
}

 .app-input {
  width: calc(100% + 100px) !important;
}

.time-box  .app-form .ivu-form-item .ivu-form-item-label {
  width: 100px;
}

.test-test {
  background-image: -webkit-radial-gradient(
    ellipse,
    hsla(120, 70%, 60%, 0.9),
    hsla(360, 60%, 60%, 0.9)
  );
  background-image: radial-gradient(
    ellipse,
    hsla(120, 70%, 60%, 0.9),
    hsla(360, 60%, 60%, 0.9)
  );
}

.time-box {
  .datatime-range {
    width: 360px;

    .el-input--prefix .el-input__inner {
      font-size: 16px;
    }
  }
}

.isLocked {
  background-color: #00ffff !important;
  color: #062a54 !important;
}

.isActive {
  border-color: #00ffff !important;
}

#fiexBox {
  position: fixed;
  width: 100%;
  height: calc(100vh - 140px);
  top: 80px;
  z-index: 99;
}

.isButton {
  padding: 3px 0px;
  border: none !important;
}

#head .app-form {
  margin: 0;
}

.ivu-btn {
  border-radius: 5px !important;
  background-color: transparent !important;
}
</style>