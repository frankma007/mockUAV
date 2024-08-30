<template>
  <el-container class="myContainer" ref="myContainer">
    <p :class="[isTitleShow===true? 'fexTop':'hidden']" @click="leftBtnClickTit">
      <!-- <img src="@/assets/imgs/top3.png" alt="" v-if="topTitlePic===true"> -->
      <img src="../../assets/imgs/statistics/title-bg.png" alt="" v-if="topTitlePic===true">
      <img src="@/assets/imgs/top4.png" alt="" v-else>
      <span>{{$t('home.title')}}</span>
    </p>
    <i class="icon-titleicon iconfont" :class="{cur_title: drawerVisible, sur_Title: rightVisible}"
      v-if="isTitleShow===false" @click="isTitleShow=true"></i>
    <!-- <div :style="{'position': 'fixed','z-index': 420,'top':styleTop+'px','left':styleLeft+'px'}">
      <h1>hhhhhhhhhhhhhhhhh</h1>
    </div> -->
    <el-main>
      <div id="mapData"></div>
      <div class="mapId" :class="{cur: drawerVisible, sur: rightVisible,moreTop: moreVisible}" id="mapId" z-index="10"
        v-if="zIndex===false">
      </div>
      <div class="mapId" :class="{cur: drawerVisible, sur: rightVisible,moreTop: moreVisible}" id="playBackmapId"
        z-index='100' v-else></div>
      <!-- <div id="cesiumContainer"></div> -->

      <div class="right-drawer backgroundrightBg" :class="{cur: drawerVisible, sur: rightVisible, zur: zIndex}">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </el-main>

    <div @click="onLogin" class="logo-img">
      <img src="../../assets/logo-top.png" alt="" width="100%" style="width: 50px;margin-top: 4px;">
      <img src="../../assets/logo-bot.png" alt="" width="100%" style="position: absolute;bottom: 6px;left: 0;">
    </div>
    <!-- 左侧梯形 -->
    <div class="left-trapezoid" :class="{more: moreVisible==true}"></div>
    <div :class='["top-img colorF topBackground ",rightVisible? "leftBoxHeight":"", moreVisible==true?"moreHeight":""]'
      :id='[isLeftSHow ? "leftBoxPic" : ""]'>
      <div>
        <p :class="{'gl-pic':indexPic===listA[item-1].title&&drawerVisible}" v-for="(item, index) in 7"
          :key="index.title">
          <i :class="listA[item-1].class"
            @click="e => leftBtnClicked(e, listA[item-1].route,listA[item-1].title,listA[item-1].num)"></i>
          <span>{{$t('home'+'.'+listA[item-1].index)}}</span>
          <!-- <span>{{listA[item].title}}</span> -->
        </p>
        <p :class="{'gl-pic':indexPic==='更多'&&drawerVisible}">
          <i class="iconfont icon-gengduo" @click="e => leftBtnClicked(e, 'more','更多',100)"></i>
          <span>{{$t('home.more')}}</span>
        </p>
      </div>
      <div v-if="moreVisible==true">
        <p :class="{'gl-pic':indexPic===item.title&&drawerVisible}" v-for="(item, index) of listB" :key="index">
          <i :class="item.class" @click="e => leftBtnClicked(e, item.route,item.title,item.num)"></i>
          <span>{{$t('home'+'.'+item.index)}}</span>
          <!-- <span>{{item.title}}</span> -->
        </p>
        <p :class="{'gl-pic':indexPic==='系统退出'&&drawerVisible}">
          <i class="iconfont icon-guanji1" @click="e => leftBtnClicked(e, 'exit','系统退出',100)"></i>
          <span>{{$t('home.systemExit')}}</span>
        </p>
        <p></p>
      </div>
    </div>
    <div class="flex-right" :class="gdbtnchange === true ? 'guangdian guangdian-act' : 'guangdian'"
      v-if="Number(isSeattionIndex.slice(0,1))===3||Number(isSeattionIndex.slice(0,1))===1">
      <div>
        <i class="pic" @click="GdTaishi"></i>
        <i class="iconfont icon-pinpufenxi"></i>
        <i class="iconfont icon-liebiao" @click="GdList"></i>
        <!-- <i class="iconfont icon-jiguangditu" @click="JiGuang(false)"></i> -->
      </div>
      <p>
        <span></span>
      </p>
    </div>

    <!-- 顶部按钮 -->
    <div class="top-box backgroundrightBg colorF border-box"
      :class="{cur: drawerVisible, sur: rightVisible,moreTop: moreVisible}">
      <div>
        <div class="track-prompt backgroundPublicOpacity border-box" v-if="statusNumber!==''">{{statusNumber}}</div>
        <div>
          <span class="iconfont icon-guixin-" @click="resetMapCenter"></span>
        </div>
        <div>
          <span :class="[layerSelectVisible?'iconfont icon-layers active':'iconfont icon-layers']"
            @click="() => {this.layerSelectVisible = !this.layerSelectVisible}"></span>
          <div v-show="layerSelectVisible" class="layer-select">
            <div class="borderBottom displayFSC">
              <span>{{$t('home.DZWL')}} </span>
              <el-switch v-model="fenceLayer1"></el-switch>
            </div>
            <div class="borderBottom displayFSC">
              <span>{{$t('home.RWSBBS')}}</span>
              <el-switch v-model="currentBaseLayer1"></el-switch>
            </div>
            <div v-for="(item, key) in uiConfig.mapConfig.baseLayers" :key="item.label"
              class="displayFSC borderBottom listBon">
              <span>{{$t('home'+'.'+item.index)}}</span>
              <el-switch v-model="currentBaseLayer" :active-value="item.key" @change="changeBaseLayer(item.key)">
              </el-switch>
              <el-divider v-if="uiConfig.mapConfig.baseLayers[key + 1]"></el-divider>
            </div>
          </div>
        </div>
        <div>
          <!-- 绘制测距 -->
          <!-- <span class="icon-bilichi iconfont" style="font-size:26px;"></span> -->
          <span class="icon-bilichi iconfont" style="font-size:26px;" @click="mappingRanging"></span>
        </div>
      </div>
      <app-box :modelFlag="modelFlag" modalTitle="命令提示" modalText="是否确认退出当前系统" :modalclose="modalclose"
        @delSingle="delSingle" @cancel="cancel" leftBtnText="是" rightBtnText="否"></app-box>
    </div>
    <Modal v-model="curiseModal" width="240px" :styles="{top: '200px'}" title="选择跟踪设备" draggable id='cruise-model'>
      <el-checkbox-group v-model="checkList"
        style="text-align: left;max-height: 160px;overflow: auto;width: 70px;margin: 0 auto;">
        <p v-for="(item,index) in styleList" :key="index" style="margin-bottom:10px">
          <el-checkbox :label="item.ip_Device" v-if="Number(item.equiment_Status)===10">{{item.id_Device}}</el-checkbox>
          <el-checkbox :label="item.ip_Device" disabled v-else>{{item.id_Device}}</el-checkbox>
        </p>
      </el-checkbox-group>
      <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}
        </el-checkbox>
      </el-checkbox-group> -->
      <div slot="footer">
        <Button class="app-button" @click="onSureStyle">确定</Button>
        <Button class="app-button">清除</Button>
      </div>
    </Modal>
    <div id="s-list-box">
      <alarm-list :data="alarmData" :class="{hover_hength:isGdList}" v-if="isGaoJing"></alarm-list>
      <target-list class="target-list" :targetList="tarDataW" :delTarget="delTarget" :areaList="fkData"
        :trackData="trackData" :drawer="drawerVisible" :Adrawer="rightVisible" @areaChange="changeFK"
        @selectClick="targetSelect" @filterChange="filterChange" v-if="isGdList" :indexIsListShow="true" :detection='[]'
        :isPlay='false'>
      </target-list>
      <div v-if="!isGaoJing" id="jiguang">
        <keep-alive>
          <jiguang-list :targetList="tarData_" :echartsList='tarData'></jiguang-list>
        </keep-alive>
      </div>
    </div>
  </el-container>
</template>

<script>
// import axios from 'axios'
// import Cesium from '../../../node_modules/cesium/Source/Cesium.js'
// import * as Cesium from '../../../node_modules/cesium/Source/Cesium.js'
// import '@/../node_modules/cesium/Source/Widgets/widgets.css'
import $ from 'jquery'
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import {
  initMyMap,
  initFKLayer,
  changeBaseLayer,
  initMeasureControl
} from '../js/playMapLayer.js'
import {
  getLayersData,
  drawArea
} from '../js/layersDraw.js'
import svgImage from '../svg/circleMenu'
import L from 'leaflet'
import {
  // IsNewMonitorData,
  initMonitMapConfig,
  initMapforMonitorData,
  // updateObjOnMap,
  // addOrUpdateMonitorData,
  updateAllMonitorData,
  // updateDeviceLabel,
  clearMarkerData,
  drawTrack,
  deleteTrack,
  deleteTarget,
  rayMap,
  wyzcMapG, // 无缘侦测固定
  wyzcMapZ, // 无缘侦测载车
  photoelectricMap, // 光电方位线
  photoeleZTMap, // 转台方位线
  photoeleZCSMap

} from '../js/monitorData.js'
import {
  mapF,
  initMapforMonitorDatas,
  drawTracks,
  RWtypeA,
  mapFence
  // fangkong
} from '../js/iconDataMap.js'
import {
  Container,
  Main
} from 'element-ui'
// import { formatDate } from '../js/util'
Vue.use(Container)
Vue.use(Main)
var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgElement.setAttribute('xmlns', 'http://www.w3.org/1999/xlink')
svgElement.setAttribute('viewBox', '0 0 813 828')
svgElement.setAttribute('style', 'enable-background:new 0 0 813 828;')
svgElement.setAttribute('space', 'preserve')
svgElement.innerHTML = svgImage

export default {
  components: {
    targetList: () => import('@/views/map/list/index.vue'),
    jiguangList: () => import('@/views/map/jiguang/index.vue'),
    alarmList: () => import('@/views/map/alarm/index.vue'),
    addIndex: () => import('@/views/task/configuration/add.vue'),
    appBox: () => import('@/components/basic/appBox.vue'),
    commonTable: () => import('@/views/display/configuration/seattion.vue'),
    appForm: () => import('@/App.vue')
  },
  computed: {
    ...mapState('config', [
      'targetLabel', // 是否显示目标标牌
      'baseLayerName', // 当前显示底图
      'listA',
      'listB',
      'seattionIndex',
      'targetList',
      'echartsList'
    ]),
    ...mapState('equipment', [
      'wsuri'
    ]),
    ...mapState('task', [
      'devicePointsList'
    ])
  },
  inject: ['reload'],
  data () {
    return {
      masg: '',
      inputModel: '',
      dataPush: [],
      intervalId: null,
      targetReceivedTime: '',
      statusNumberTime: '', // 光电队列时间
      WYZCNumberTime: '', // 无缘侦测队列时间
      ID_Target_FusionAA: '',
      statusNumber: '',
      styleTop: 0,
      styleLeft: 0,
      styleList: [],
      dataList: [],
      onSureStyleE: '',
      // checkAll: false,
      // checkedCities: ['上海', '北京'],
      cities: [],
      // isIndeterminate: true,
      curiseModal: false,
      checkList: [],
      isSeattionIndex: '', // 席位设置
      tarData_: [], // j激光设备
      topTitlePic: true,
      isTitleShow: true, // 标题是否显示
      fixedList1: [], // 转台数据
      fixedList: '',
      modelFlag: false,
      modalclose: false,
      getPreventMap: [], // 防控区域地图
      currentOption: '',
      ldData: -1,
      gdData: -1,
      calibration: true, // 动态标校图片
      gdbtnchange: false,
      tarData: [],
      tarDataW: [], // 威胁评估排序后
      isLeftSHow: false, // 左侧边栏是否显示
      isGdList: true, // 数据融合列表是否显示
      uiConfig: {
        title: '',
        logoIconUrl: '',
        logoIconSize: [38, 38],
        headerHeight: 38,
        mapHeight: 1080,
        footerHeight: 40,
        wsuri: 'ws://111.231.99.242:3041/websocket', // ws地址
        dictType: {
          xjzh: 'default',
          cq01: 'aircraft',
          zjkzh: 'aircraft',
          dqhg: 'aircraft',
          dqzh: 'aircraft',
          cast: 'aircraft'
        },
        aircraftCfg: {
          unknown: { // 不明确目标
            statusCfg: {
              default: { // 正常
                iconUrl: 'static/img/arrow.png',
                iconSize: [
                  32,
                  32
                ],
                lableCfgs: [{
                  zoomRange: [
                    10,
                    25
                  ],
                  bkSize: [
                    100,
                    116
                  ],
                  labelKey: [
                    'ID_Target_Fusion',
                    'Type_Target',
                    'Distance_Target',
                    'Speed',
                    'Altitude_Target',
                    'Angle_P_Target'
                  ]
                }]
              }
            }
          },
          wing: { // 固定翼无人机目标
            statusCfg: {
              default: { // 正常
                iconUrl: 'static/img/wing.png',
                iconSize: [
                  32,
                  32
                ],
                lableCfgs: [{
                  zoomRange: [
                    10,
                    25
                  ],
                  bkSize: [
                    100,
                    116
                  ],
                  labelKey: [
                    'ID_Target_Fusion',
                    'Type_Target',
                    'Distance_Target',
                    'Speed',
                    'Altitude_Target',
                    'Angle_P_Target'
                  ]
                }]
              }
            }
          },
          uav: { // 多旋翼无人机目标
            statusCfg: {
              default: { // 正常
                iconUrl: 'static/img/uav_default.png',
                iconSize: [
                  32,
                  32
                ],
                lableCfgs: [{
                  zoomRange: [
                    10,
                    25
                  ],
                  bkSize: [
                    100,
                    116
                  ],
                  labelKey: [
                    'ID_Target_Fusion',
                    'Type_Target',
                    'Distance_Target',
                    'Speed',
                    'Altitude_Target',
                    'Angle_P_Target'
                  ]
                }]
              }
            }
          },
          kite: { // 风筝
            statusCfg: {
              default: { // 正常
                iconUrl: 'static/img/kite.png',
                iconSize: [
                  32,
                  32
                ]
              }
            }
          },
          balloon: { // 气球
            statusCfg: {
              default: { // 正常
                iconUrl: 'static/img/balloon.png',
                iconSize: [
                  32,
                  32
                ]
              }
            }
          },
          bird: { // 鸟
            statusCfg: {
              default: { // 正常
                iconUrl: 'static/img/bird.png',
                iconSize: [
                  32,
                  32
                ]
              }
            }
          },
          person: { // 人
            statusCfg: {
              default: { // 正常
                iconUrl: 'static/img/person.png',
                iconSize: [
                  32,
                  32
                ]
              }
            }
          },
          car: { // 车
            statusCfg: {
              default: { // 正常
                iconUrl: 'static/img/car.png',
                iconSize: [
                  32,
                  32
                ]
              }
            }
          },
          plane: { // 有人机
            statusCfg: {
              default: { // 正常
                iconUrl: 'static/img/plane.png',
                iconSize: [
                  32,
                  32
                ],
                lableCfgs: [{
                  zoomRange: [
                    10,
                    25
                  ],
                  bkSize: [
                    100,
                    116
                  ],
                  labelKey: [
                    'ID_Target_Fusion',
                    'Type_Target',
                    'Distance_Target',
                    'Speed',
                    'Altitude_Target',
                    'Angle_P_Target'
                  ]
                }]
              }
            }
          },
          aircraft: {
            aryTimingStatus: [
              {
                beginSecs: 0,
                endSecs: 60,
                status: 'active',
                statusName: '活动'
              },
              {
                beginSecs: 60,
                endSecs: 120,
                status: 'default',
                statusName: '正常'
              },
              {
                beginSecs: 120,
                endSecs: 300,
                status: 'timeout',
                statusName: '超时'
              },
              {
                beginSecs: 300,
                endSecs: 2147483647,
                status: 'dead',
                statusName: '休眠'
              }
            ],
            statusCfg: {
              default: {
                iconUrl: 'static/img/aircraft_default.png',
                iconSize: [
                  76,
                  76
                ],
                colorTrack: 'yellow',
                weightTrack: 4,
                opacityTrack: 0.5,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [
                      10,
                      13
                    ],
                    bkSize: [
                      60,
                      36
                    ],
                    labelKey: [
                      'FN',
                      'adress'
                    ]
                  },
                  {
                    zoomRange: [
                      14,
                      25
                    ],
                    bkSize: [
                      60,
                      106
                    ],
                    labelKey: [
                      'FN',
                      'adress',
                      'alt',
                      'speed',
                      'course',
                      'UTCTime'
                    ]
                  }
                ]
              },
              selected: {
                iconUrl: 'static/img/aircraft_selected.png',
                iconSize: [
                  76,
                  76
                ],
                colorTrack: 'orange',
                weightTrack: 6,
                opacityTrack: 0.5,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [
                      1,
                      10
                    ],
                    bkSize: [
                      60,
                      36
                    ],
                    labelKey: [
                      'FN',
                      'adress'
                    ]
                  },
                  {
                    zoomRange: [
                      11,
                      25
                    ],
                    bkSize: [
                      60,
                      106
                    ],
                    labelKey: [
                      'FN',
                      'adress',
                      'alt',
                      'speed',
                      'course',
                      'UTCTime'
                    ]
                  }
                ]
              },
              active: {
                // iconUrl: '',
                iconUrl: 'static/img/default_default.png',
                // iconUrl: require('@/../static/img/default_default.png'),
                // iconUrl: require('../../../static/img/default_default.png'),
                iconSize: [
                  38,
                  38
                ],
                colorTrack: 'gray',
                weightTrack: 2,
                opacityTrack: 0.8,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [
                      1,
                      10
                    ],
                    bkSize: [
                      60,
                      36
                    ],
                    labelKey: [
                      'FN',
                      'adress'
                    ]
                  },
                  {
                    zoomRange: [
                      11,
                      25
                    ],
                    bkSize: [
                      60,
                      106
                    ],
                    labelKey: [
                      'FN',
                      'adress',
                      'alt',
                      'speed',
                      'course',
                      'UTCTime'
                    ]
                  }
                ]
              },
              timeout: {
                iconUrl: 'static/img/aircraft_timeout.png',
                iconSize: [
                  38,
                  38
                ],
                colorTrack: 'gray',
                weightTrack: 2,
                opacityTrack: 0.8,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [
                      1,
                      10
                    ],
                    bkSize: [
                      60,
                      36
                    ],
                    labelKey: [
                      'FN',
                      'adress'
                    ]
                  },
                  {
                    zoomRange: [
                      11,
                      25
                    ],
                    bkSize: [
                      60,
                      106
                    ],
                    labelKey: [
                      'FN',
                      'adress',
                      'alt',
                      'speed',
                      'course',
                      'UTCTime'
                    ]
                  }
                ]
              },
              dead: {
                iconUrl: 'static/img/aircraft_dead.png',
                iconSize: [
                  38,
                  38
                ],
                colorTrack: 'gray',
                weightTrack: 2,
                opacityTrack: 0.8,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [
                      1,
                      10
                    ],
                    bkSize: [
                      60,
                      36
                    ],
                    labelKey: [
                      'FN',
                      'adress'
                    ]
                  },
                  {
                    zoomRange: [
                      11,
                      25
                    ],
                    bkSize: [
                      60,
                      106
                    ],
                    labelKey: [
                      'FN',
                      'adress',
                      'alt',
                      'speed',
                      'course',
                      'UTCTime'
                    ]
                  }
                ]
              }
            }
          }
        },
        mapConfig: {
          mapZoom: 14, // 当前地图zoom值
          mapCenter: [31.024267, 121.453684], // 初始化地图中心
          defaultBaseLayer: '天地图',
          baseLayers: [
            {
              index: 'LXDT',
              label: '离线地图',
              key: '离线地图'
            },
            {
              index: 'WXYX',
              label: '卫星影像',
              key: '天地图影像'
            },
            {
              index: 'DZDT',
              label: '电子地图',
              key: '天地图'
            },
            {
              index: 'SSDT',
              label: '深色地图',
              key: '智图午夜蓝'
            },
            {
              index: 'CSBJ',
              label: '纯色背景',
              key: '纯色背景'
            }
          ],
          layerControlCfg: {
            pnlCfg: {
              floatLeft: '0px',
              floatTop: '0px'
            },
            nodeData: null,
            defaultProps: {
              label: 'label',
              children: 'children'
            },
            defaultCheckedKeys: []
          }
        }
      },
      asideWidth: 300,
      showAsideLeft: true,
      mouseLatlng: [0, 0], // 当前鼠标的经纬度位置
      latlngStringFormat: 0, // 经纬度格式 0: ddd°mm′ss.sssss″ 1: ddd.dddddd
      latlngString: '', // 经纬度显示内容
      map: null,
      mapPlay: null,
      fkLayer: null, // 防控区域图层
      fkData: [], // 防控区域数据
      urlConfig: this.$baseApi + '/api/ATMS/GetUIConfig/1',
      chartSpeedAlt: null,
      chartSpeed: null,
      chartVerSpeed: null,
      chartAlt: null,
      chartCourse: null,
      gaugeSpeed: null,
      maxBufferPoints: 120, // 航迹缓存点数
      loading: false,
      enableNotify: false,
      totalTableData: [],
      totalOptions: [],
      totalSelectValue: '',
      totalObj: {},
      filterText: '',
      objStyle: null,
      deviceListFilterData: [],
      counterSocketRecv: 0,
      // 输入框
      search: '',
      svgButton: '',
      // 右侧功能显示区
      drawerVisible: false, // 是否显示
      // 右侧态势显示区
      rightVisible: false,
      // 左侧功能区
      moreVisible: false, // 是否显示更多功能按钮
      currentBaseLayer: '', // 当前选择的底图
      currentBaseLayer1: false, // 任务部署
      fenceLayer1: false, // 电子栏杆
      fenceList: [], // 电子围栏数据
      layerSelectVisible: false, // 是否显示图层更改弹窗
      alarmData: {}, // 告警目标数据
      trackData: [], // 历史航迹数据
      indexPic: 0,
      threatData: {}, // 威胁评估数据
      delTarget: [], // 需要删除的目标
      zIndex: false, // 右边层级
      filterMethod: function () { return false }, // 目标过滤方法
      currentPage: '', // 左侧菜单当前选中页面
      selectedObj: null, // 当前选中目标
      isTime: 0,
      drawTracksList: [], // 无线电数据 固定式
      drawTracksList1: [], // 无线电数据 雷达式
      drawTracksListDemo: [],
      typeDeploy1: [],
      typeDeploy2: [],
      dataMap: [], // 防控区域已激活数据
      czsLanLon: [], // 车载式经纬度
      nameDeviceZJdata: [], // ZJ-1802数据
      drawTracksListCZS: [], // 光电车载式方位线
      drawTracksWYZCMapG: [], // 无缘侦测方位线 固定式
      drawTracksWYZCMapZ: [], // 无缘侦测方位线 载车式
      drawTracksListWyzcG: [], // 无缘侦测设备数据 固定式
      drawTracksListWyzcZ: [], // 无缘侦测设备数据 载车式
      isGaoJing: true, // 判断告警是否显示
      // 测距
      ranging: {
        e: null,
        option: {
          maxPoints: 2,
          shapeOptions: {
            stroke: true,
            color: '#284c75',
            opacity: 1,
            fill: true,
            fillColor: null, // same as color by default
            fillOpacity: 0.2,
            clickable: true
          }
        },
        drawLayer: null,
        edit: null,
        listA: []
      }
    }
  },
  mounted: async function () {
    let self = this
    this.methShow()
    this.intervalId = setInterval(this.timer1s, 1000)
    sessionStorage.displaySeattion = this.$store.state.config.seattionIndex
    self.isSeattionIndex = this.$store.state.config.seattionIndex
    this.rightVisible = true
    this.moreVisible = JSON.parse(localStorage['moreVisible'])
    this.$router.push({ name: 'GuangDianTaiShi' })
    this.onshowMap()
    var naid = localStorage.getItem('style')
    if (naid === '@/../static/css/deep.css') {
      this.topTitlePic = false
      this.uiConfig.mapConfig.defaultBaseLayer = '智图午夜蓝'
    } else {
      this.topTitlePic = true
      this.uiConfig.mapConfig.defaultBaseLayer = '天地图'
    }
    $('body').on('click', '.leaflet-popup-content', function () {
      event.stopPropagation()
    })
    if (this.$route.name === 'GuangDianTaiShi') {
      this.rightVisible = true
      this.gdbtnchange = true
    } else {
      this.rightVisible = false
      this.gdbtnchange = false
    }
    localStorage.mapShowTypeRH = 0
    this.map = initMyMap('mapId', this.uiConfig.mapConfig)
    initMonitMapConfig(this.uiConfig.aircraftCfg, this.uiConfig.dictType, this.targetLabel, false, true, false, this.targetDeleted)
    this.currentBaseLayer = this.uiConfig.mapConfig.defaultBaseLayer
    this.changeState({ state: 'baseLayerName', value: this.currentBaseLayer })
    let mc = initMeasureControl()
    console.log('measure control', mc)
    initMapforMonitorData(this.map)
    initMapforMonitorDatas(this.map)
    RWtypeA()
    this.initFK() // 初始化防控区域图层
    // this.initMap()
    this.map.on('zoomend', this.map_zoomend)
    clearMarkerData()
    rayMap()
    this.onShow()
    this.GetAAngle()// 转台方位线
    this.mqsocketR.initWebSocket(this.$store.state.equipment.wsuriA, this.wsreceivedA)
    this.mqsocketC.initWebSocket(this.$store.state.equipment.wsuriC, this.wsreceived)
    this.mqsocket.initWebSocket(this.$store.state.equipment.wsuri, '')
    this.$store.commit('equipment/changeMapData', this.map)
    // fangkong()// 暂时的防控区域
    localStorage.mapConfigMapZoom = this.uiConfig.mapConfig.mapZoom
    localStorage.mapConfigMapLat = this.uiConfig.mapConfig.mapCenter[0]
    localStorage.mapConfigMapLon = this.uiConfig.mapConfig.mapCenter[1]

    // this.mqsocket.addCallbackRecv(this.wsReceived)
    // this.test()
    // initWebSocket(this.uiConfig.wsuri, this.websocketonmessage)
    // setInterval(this.timer_1s, 1000)
    // 初始化绘制测距
    this.initRanging()
  },
  destroyed () {
    // 页面销毁时清除回调方法
    this.mqsocket.clearCallbackRecv()
    this.mqsocketC.clearCallbackRecv()
    this.mqsocketR.clearCallbackRecv()
  },
  methods: {
    ...mapMutations('config', [
      'changeState'
    ]),

    initMap () {
      // this.viewer = new Cesium('cesiumContainer')
      this.viewer = new Cesium.Viewer('cesiumContainer', {
        fullscreenButton: true, // 是否显示全屏
        homeButton: false, // 是否显示home按钮
        animation: false, // 是否显示动画控件(左下方那个)
        baseLayerPicker: false, // 是否显示图层选择控件
        geocoder: false, // 是否显示地名查找控件
        timeline: false, // 是否显示时间线控件
        sceneModePicker: false, // 是否显示投影方式控件
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: false, // 是否显示点击要素之后显示的信息
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
        })
      })
      // 跳转至指定位置，视角固定
      // common.location(viewer, 116.45, 39.85, 3000)
    },
    onshowMap () {
      let _this = this
      let url = this.$taskApi + '/api/Prevention/queryPrevent'
      this.http.post(url).then(con => {
        if (Number(con.code) === 200) {
          _this.getPreventMap = con.dataMap.getPrevent
          // 查询详情集合
          _this.getDetailList()
        } else {
          _this.$message.error(con.message)
        }
      })
    },
    getDetailList () {
      let _this = this
      let url = this.$taskApi + '/api/Prevention/getPrevent'
      this.http.post(url).then(con => {
        let showList = _this.getPreventMap.filter((item) => { return item.activation_Task === '1' }).map((show) => { return show.id })
        let previewList = con.filter((item) => {
          return showList.indexOf(item.id_Task) !== -1
        })
        mapF(previewList, true)
        if (Number(con.code) === 400) {
          this.$message.error(con.message)
        }
      })
    },
    timer1s () {
      let curTime = new Date()
      if (Math.abs(curTime - this.targetReceivedTime) > 5000) {
        photoelectricMap([]) // 光电固定式
        this.dataPush = []
      }
      if (Math.abs(curTime - this.WYZCNumberTime) > 5000) {
        wyzcMapG([]) // 无缘侦测固定式
        wyzcMapZ([])
        // this.dataPush = []
        // wyzcMapG, // 无缘侦测固定
        //   wyzcMapZ, // 无缘侦测载车
      }
      if (Math.abs(curTime - this.statusNumberTime) > 5000) {
        this.statusNumber = ''
      }
      if (Math.abs(curTime - this.statusNumberTime) > 5000 && this.statusNumber === '' && this.masg !== '') {
        this.$Message.info(this.masg)
      }
    },
    initChartSeries (id) {
      this.chartData[id] = {
        Angle_A_Target: [],
        Angle_P_Target: [],
        Distance_Target: [],
        time: [],
        id: id
      }
      if (this.trackData.length > 0 && this.trackData[0].ID_Target_Fusion === id) {
        for (let obj of this.trackData) {
          this.updateChartData(obj)
        }
      }
    },
    methShow () {
      let self = this
      this.drawTracksList = []
      this.drawTracksList1 = []
      this.drawTracksListWyzcZ = []
      this.drawTracksListWyzcG = []
      this.http.post(this.$equipmentDeploy + '/api/Deploy/getTruck').then(res => { // 车载式数据
        let data = res.dataMap.infoPack_truck
        if (data) {
          this.czsLanLon = [data.latitude_Truck, data.longitude_Truck]
          this.typeDeploy2.push(data)
          data.Angle_A_Target = []
          this.drawTracksListCZS.push(data) // 光电载车式
          this.drawTracksWYZCMapZ.push(data) // 无缘侦测载车式
        }
      })
      let url = self.$equipmentDeploy + '/api/Deploy/queryDeploy'
      this.typeDeploy1 = []
      self.http.post(url).then(res => {
        let list = res.dataMap.queryDeploy
        list.forEach((item, i) => {
          if (Number(item.type_Deploy) === 2) {
            self.typeDeploy1.push(item)
            // if (Number(item.type_Device) === 1 || Number(item.type_Device) === 2 || Number(item.type_Device) === 4 || Number(item.type_Device) === 5) {
            //   self.typeDeploy1.push(item)
            // }
          }
          // 光电
          if (Number(item.type_Device) === 2 && Number(item.type_Deploy) === 2) {
            this.drawTracksList.push(item)
          } else if (Number(item.type_Device) === 2 && Number(item.type_Deploy) === 1) {
            this.drawTracksList1.push(item)
          }
          // 无缘侦测
          if (Number(item.type_Device) === 3 && Number(item.type_Deploy) === 2 && item.name_Device === 'ZKWL-1310') {
            this.drawTracksListWyzcG.push(item)
          } else if (Number(item.type_Device) === 3 && Number(item.type_Deploy) === 1 && item.name_Device === 'ZKWL-1310') {
            this.drawTracksListWyzcZ.push(item)
          }
        })
      })
      this.http.getDataByTable('Direction_Strategy').then(msg => {
        if (msg.data) {
          let data = JSON.parse(msg.data[0])
          this.fixedList1 = [data.Latitude, data.Longitude]
        }
      })
    },
    GetAAngle () {
      var self = this
      // setInterval(function () {
      //   let url = self.$equipmentDeploy + '/api/Deploy/queryDeploy'
      //   setTimeout(function () {
      //     self.http.get(self.$baseApi + '/TruntableJamming/GetAAngle').then(resA => {
      //       if (resA.code === 200) {
      //         self.http.post(url).then(res => {
      //           let list = res.dataMap.queryDeploy
      //           list.forEach((item, i) => {
      //             if (Number(item.type_Device) === 9 && item.name_Device === 'ZJ-1802') {
      //               self.nameDeviceZJdata[0] = item
      //               self.nameDeviceZJdata[0].altitude_Truck = Number(resA.data)
      //               self.nameDeviceZJdata[0].color = '#90dcf8'
      //               photoeleZTMap(self.nameDeviceZJdata)
      //             }
      //           })
      //         })
      //       }
      //     })
      //   }, 1000)
      // }, 5000)
    },
    delSingle () { // 确定退出系统
      this.$router.push({ path: '/' })
      this.modelFlag = false
    },
    cancel () { // 取消退出系统
      this.modelFlag = false
    },
    onShow () {
      let url1 = this.$taskApi + '/api/queryElectronicfence'
      this.http.post(url1).then(res => {
        let data = res.dataMap.queryElectronicfenceList
        data.forEach((item, index) => {
          item.listCoordinate.forEach((items, indexs) => {
            res.dataMap.queryElectronicfenceList[index].listCoordinate[indexs] = [items.y, items.x]
          })
          item.listCoordinate2.forEach((items, index1) => {
            res.dataMap.queryElectronicfenceList[index].listCoordinate2[index1] = [items.y, items.x]
          })
          this.fenceList.push(res.dataMap.queryElectronicfenceList[index])
        })
      }).catch((err) => {
        console.log('锁定报错:' + err)
      })
    },
    // test () { // 测试用方法，可删 yk
    //   // [38.83905278, 105.61799167]
    //   let obj = {
    //     Longitude_Target: 105.61799167,
    //     Latitude_Target: 38.83905278,
    //     ID_Target_Fusion: 1,
    //     Type_Target: 2
    //   }
    //   updateAllMonitorData(obj, this.map.getZoom, this.markerClicked)
    // },
    GdTaishi () { // 光电态势的按钮动作
      // this.isGdList = false
      this.rightVisible = !this.rightVisible
      this.isGaoJing = true
      // alert(this.rightVisible)
      if (this.rightVisible === true) {
        this.drawerVisible = false
        this.currentPage = ''
        this.gdbtnchange = true
        setTimeout(() => {
          this.reload()
        }, 1)
        this.$router.push({ name: 'GuangDianTaiShi' })
      } else {
        this.gdbtnchange = false
        this.$router.replace('/app')
      }
    },
    // JiGuang (type) {
    //   this.isGdList = false
    //   this.isGaoJing = !this.isGaoJing // 激光为false的时候显示
    //   this.rightVisible = false
    // },
    GdList () {
      this.isGdList = !this.isGdList
      this.isGaoJing = true
    },
    onLogin () { // 点击login
      this.isLeftSHow = !this.isLeftSHow
    },
    timer_1s () {
      // this.updateTotalObj(getMonitorData())
      this.counterSocketRecv = 0
    },
    layoutResize () {
      this.$nextTick(() => {
        this.map.invalidateSize(true)
      })
    },
    map_zoomend (e) {
      this.uiConfig.mapConfig.mapZoom = e.target.getZoom()
    },
    resetMapCenter () { // 重置地图中心
      let zoom = localStorage['mapConfigMapZoom']
      let lat = localStorage['mapConfigMapLat']
      let lon = localStorage['mapConfigMapLon']
      if (lat) {
        this.map.flyTo([Number(lat), Number(lon)], Number(zoom))
      } else {
        this.$Message.warning('请先选择要归心的区域')
      }
    },
    changeBaseLayer (layerName) { // 更换底图
      this.changeState({ state: 'baseLayerName', value: layerName })
      changeBaseLayer(layerName)
    },
    filterChange (func) {
      this.filterMethod = func
    },
    targetDeleted (objs) { // 目标删除时触发事件
      this.delTarget = objs
    },
    wsreceivedA (msg) {
      let wsCmd = JSON.parse(msg)
      if (wsCmd.cmdType === 6) {
        let body = JSON.parse(wsCmd.cmdBody)

        if (body.routingKey.indexOf('InfoPack_FusionTrack_Recognize') !== -1) {
          // this.methShow()
          let clientTime = new Date()
          let data = JSON.parse(body.data)
          let self = this
          let tarData = []
          let tarData_ = []
          if (data.SCT_MARK_TGT) {
            for (let target of data.SCT_MARK_TGT) {
              target.Alarm_Level = this.alarmData.hasOwnProperty(target.ID_Target_Fusion) ? Math.floor(this.alarmData[target.ID_Target_Fusion].Type_Alarm / 10) : '-'
              target.Type_Alarm = this.alarmData.hasOwnProperty(target.ID_Target_Fusion) ? this.alarmData[target.ID_Target_Fusion].Type_Alarm : '-'
              target.ThreatRank = this.threatData.hasOwnProperty(target.ID_Target_Fusion) ? this.threatData[target.ID_Target_Fusion].ThreatRank : '-'
              target.ID_Radar = target.ID_Radar === 0xFFFFFFFF ? 0 : target.ID_Radar
              target.ID_PE = target.ID_PE === 0xFFFFFFFF ? 0 : target.ID_PE
              target.ID_Radio = target.ID_Radio === 0xFFFFFFFF ? 0 : target.ID_Radio
              target.ID_GroupRadio = target.ID_GroupRadio === 0xFFFFFFFF ? 0 : target.ID_GroupRadio
              target.ID_GroupTDOA = target.ID_GroupTDOA === 0xFFFFFFFF ? 0 : target.ID_GroupTDOA
              target.ID_Target_Radio = target.ID_Target_Radio === 0xFFFFFFFF ? 0 : target.ID_Target_Radio
              target.ID_Target_RadioLocate = target.ID_Target_RadioLocate === 0xFFFFFFFF ? 0 : target.ID_Target_RadioLocate
              target.ID_Target_RadioTDOA = target.ID_Target_RadioTDOA === 0xFFFFFFFF ? 0 : target.ID_Target_RadioTDOA
              target.ID_Target_White = target.ID_Target_White === 0xFFFFFFFF ? 0 : target.ID_Target_White
              target.ID_Target_Chain = target.ID_Target_Chain === 0xFFFFFFFF ? 0 : target.ID_Target_Chain
              target.Speed = target.Speed === 0xFFFFFFFF ? '-' : Number((Number(target.Speed) * 0.01).toFixed(1))
              target.Direction = target.Direction === 0xFFFFFFFF ? '-' : Number((Number(target.Direction) * 0.001).toFixed(2))
              target.Angle_A_Target = target.Angle_A_Target === 0x7FFFFFFF ? '-' : Number((Number(target.Angle_A_Target) * 0.001).toFixed(2))
              target.Angle_P_Target = target.Angle_P_Target === 0x7FFFFFFF ? '-' : Number((Number(target.Angle_P_Target) * 0.001).toFixed(2))
              target.Altitude_Target = target.Altitude_Target === 0x7FFFFFFF ? '-' : Number((Number(target.Altitude_Target) * 0.01).toFixed(1))
              target.Distance_Target = target.Distance_Target === 0xFFFFFFFF ? '-' : Number((Number(target.Distance_Target) * 0.01).toFixed(1))
              target.Prop_IFF = this.threatData.hasOwnProperty(target.ID_Target_Fusion) ? this.threatData[target.ID_Target_Fusion].PropIFFTarget : 0
              target.Type_Target = this.threatData.hasOwnProperty(target.ID_Target_Fusion) ? this.threatData[target.ID_Target_Fusion].TypeTarget : 0
              target.TypeChange = this.threatData.hasOwnProperty(target.ID_Target_Fusion) ? this.threatData[target.ID_Target_Fusion].TypeChange : 0
              target.PropChange = this.threatData.hasOwnProperty(target.ID_Target_Fusion) ? this.threatData[target.ID_Target_Fusion].PropChange : 0
              target.Status_Track = Number(target.Status_Track)
              target.Latitude_Target = target.Latitude_Target === 0x7FFFFFFFFFFFFFFF ? 0 : Number((Number(target.Latitude_Target) * 0.00000001).toFixed(8))
              target.Longitude_Target = target.Longitude_Target === 0x7FFFFFFFFFFFFFFF ? 0 : Number((Number(target.Longitude_Target) * 0.00000001).toFixed(8))
              target.Timestamp_ms_recv = clientTime
              if (Number(target.Direction) >= 180) {
                target.Direction = Number(target.Direction - 360).toFixed(2)
              }
              if (target.ID_Target_Radio !== 0 || target.ID_Target_RadioLocate !== 0 || target.ID_Target_RadioTDOA !== 0) {
                target.Type_Target = 2
              }
              if (this.filterMethod(target)) {
                tarData_ = []
                deleteTarget(target)
                // photoelectricMap([]) // 光电固定式
                // photoeleZCSMap([])// 光电载车式
              } else {
                if (Number(target.Prop_IFF) === 1) {
                  tarData_.push(target)
                }
                tarData.push(target)
                var isShowMapRH = localStorage['mapShowTypeRH']// qu
                if (Number(isShowMapRH) !== 2) {
                  this.dataList.push({ id: target.ID_Target_Fusion, dataArr: [target.Latitude_Target, target.Longitude_Target] })
                  updateAllMonitorData(target, this.map.getZoom(), this.markerClicked)
                }
              }
            }
            this.tarData = tarData
            this.tarData_ = tarData_
            // console.log(this.tarData, '========融合数据')
            // scope.row.ID_Target_Radio !== 0 || scope.row.ID_Target_RadioLocate!== 0 || scope.row.ID_Target_RadioTDOA
            if (this.tarData.length > 0) {
              this.tarData.forEach((data, indexA) => {
                if (data.ID_Target_Radio !== 0 || data.ID_Target_RadioLocate !== 0 || data.ID_Target_RadioTDOA !== 0) { // 判断数据来源为I
                  if (Number(data.Angle_A_Target)) { // 判断是否有方位角
                    this.WYZCNumberTime = new Date()
                    this.drawTracksWYZCMapG = []
                    this.drawTracksWYZCMapZ = []
                    // 无缘侦测固定式
                    this.drawTracksListWyzcG.forEach((item, index) => {
                      item.lat = this.drawTracksListWyzcG[indexA].calibrate_Latitude
                      item.lon = this.drawTracksListWyzcG[indexA].calibrate_Longitude
                      item.Angle_A_Target = data.Angle_A_Target
                      item.ID_Target_Fusion = data.ID_Target_Fusion
                      this.drawTracksWYZCMapG.push(item)
                    })
                    // 无缘侦测载车式
                    self.drawTracksWYZCMapZ[0].Angle_A_Target = []

                    if (self.drawTracksListWyzcZ) {
                      self.drawTracksListWyzcZ.forEach((item1, index1) => {
                        self.drawTracksWYZCMapZ[0].Angle_A_Target.push(Number(data.Angle_A_Target))
                        self.drawTracksWYZCMapZ[0].id_Device = item1.id_Device
                        // photoeleZCSMap(self.drawTracksWYZCMapZ)
                      })
                    }
                    // this.drawTracksListWyzcZ.forEach((item, index) => {
                    //   item.lat = this.czsLanLon[0]
                    //   item.lon = this.czsLanLon[1]
                    //   item.Angle_A_Target = data.Angle_A_Target
                    //   item.ID_Target_Fusion = data.ID_Target_Fusion
                    //   this.drawTracksWYZCMapZ.push(item)
                    // })
                    setTimeout(function () {
                      wyzcMapG(this.drawTracksWYZCMapG)
                      wyzcMapZ(this.drawTracksWYZCMapZ)
                    }, 200)
                  }
                }
              })
            } else {
              // photoelectricMap([]) // 光电固定式
              // photoeleZCSMap([])// 光电载车式
            }
          }
        }
        if (body.routingKey.indexOf('InfoPack_Threat') !== -1) {
          let data = JSON.parse(body.data)
          let arr = []
          data.SCT_Threat.forEach((item, index) => {
            this.threatData[item.ID_Target] = {
              ID_Target: item.ID_Target,
              ThreatRank: item.ThreatRank,
              TypeTarget: item.Type_Target,
              PropIFFTarget: item.Prop_IFF_Target,
              TypeChange: item.Type_Change,
              PropChange: item.Prop_Change
            }
            this.tarData.forEach((item1, index1) => {
              if (Number(item.ID_Target) === Number(item1.ID_Target_Fusion)) {
                arr.splice(index, 0, item1)
              }
            })
          })
          this.tarDataW = arr
        }
        if (body.routingKey.indexOf('InfoPack_Alarm') !== -1) {
          let data = JSON.parse(body.data)
          if (data && data.SCT_AlarmEvent.length > 0) {
            this.alarmData = {}
            for (let obj of data.SCT_AlarmEvent) {
              if (obj.Prop_AlarmEvent === 5) continue
              this.alarmData[obj.ID_Target] = obj
            }
          }
        }
        if (body.routingKey.indexOf('InfoPack_Track_Disappear') !== -1) {
          let data = JSON.parse(body.data)
          if (data.ID_Target_Fusion) {
            this.delTarget = [data]
            deleteTarget(data)
          }
        }
      }
    },
    wsreceived (msg) { // websocket接收航迹数据
      let wsCmd = JSON.parse(msg)
      if (wsCmd.cmdType === 6) {
        let body = JSON.parse(wsCmd.cmdBody)
        if (body.routingKey.indexOf('Track_State') !== -1) {
          let data = JSON.parse(body.data)
          if (Number(body.data.idtarget) === Number(localStorage['list'])) {
            localStorage['list'] = NaN
            this.isTrueShow()
          }
          if (data.status === false) {
            this.masg = data.message
            this.statusNumber = ''
          } else {
            this.statusNumberTime = new Date()
            this.statusNumber = data.message
          }
        }
        if (body.routingKey.indexOf('InfoPack_State_PE1') !== -1) {
          let data = JSON.parse(body.data)
          let self = this
          self.drawTracksListCZS[0].Angle_A_Target = []
          self.targetReceivedTime = new Date()
          let colorArr = ['rgb(146,1,139)', 'rgb(246,80,27)', 'rgb(134,64,0)', 'rgb(33,178,159,)']
          setTimeout(function () {
            if (self.drawTracksList1) {
              self.drawTracksList1.forEach((item1, index1) => {
                if (Number(data.ID_PE) === Number(item1.id_Device)) {
                  self.drawTracksListCZS[0].Angle_A_Target.push(Number(data.Angle_A_PE_Show))
                  self.drawTracksListCZS[0].id_Device = item1.id_Device
                  photoeleZCSMap(self.drawTracksListCZS)
                }
              })
            }
          }, 1000)
          self.drawTracksList.forEach((item, index) => {
            if (Number(data.ID_PE) === Number(item.id_Device)) {
              this.dataPush[index] = []
              var dataName = {
                calibrate_Latitude: Number(data.Device_Latitude),
                calibrate_Longitude: Number(data.Device_Longitude),
                Angle_A_Target: Number(data.Angle_A_PE_Show), // Angle_A_Truck
                ID_Target_Fusion: Number(data.ID_PE),
                color: colorArr[index]
              }
              this.dataPush[index] = dataName
              photoelectricMap(this.dataPush) // 光电固定式
            }
          })
        }
      }
    },
    showFirstButton (e) {
      let dom = e.currentTarget
      let self = this
      event.stopPropagation()
      // localStorage.name = self.selectedObj.ID_Target_Fusion
      if (dom.className.baseVal.indexOf('active1') !== -1) {
        dom.classList.remove('active1')
      } else {
        dom.classList.add('active1')
      }
      if (document.getElementById('first-button-box').className.baseVal.indexOf('hidden') !== -1) {
        localStorage['selected'] = 1
        document.getElementById('first-button-box').classList.remove('hidden')
        document.getElementById('third-button-box').classList.add('hidden')
        document.getElementById('fourth-button-box').classList.add('hidden')
      } else {
        localStorage['selected'] = ''
        document.getElementById('first-button-box').classList.add('hidden')
      }
      document.getElementById('first-one').onmousedown = (j) => self.startTrack(j)
      document.getElementById('first-two').onmousedown = (g) => self.startRadarTrack(g)
      document.getElementById('first-record').onmousedown = (f) => self.recordTrack(f)
      document.getElementById('first-button-box').onmousedown = () => self.btnGroup()

      return false
    },
    /**
* 目标类型点击事件
*/
    showThirdButton (e) {
      let dom = e.currentTarget
      let self = this
      event.stopPropagation()
      // localStorage.name = self.selectedObj.ID_Target_Fusion
      if (dom.className.baseVal.indexOf('active1') !== -1) {
        dom.classList.remove('active1')
      } else {
        dom.classList.add('active1')
      }
      if (document.getElementById('third-button-box').className.baseVal.indexOf('hidden') !== -1) {
        localStorage['selected'] = 3
        document.getElementById('third-button-box').classList.remove('hidden')
        document.getElementById('first-button-box').classList.add('hidden')
        document.getElementById('fourth-button-box').classList.add('hidden')
      } else {
        localStorage['selected'] = ''
        document.getElementById('third-button-box').classList.add('hidden')
      }
      for (let i = 0, j = 9; i < j; i++) {
        document.getElementById('third-' + i).onmousedown = () => self.setAimsType(i)
      }
      return false
    },
    /**
* 敌我属性点击事件
*/
    showFourButton (e) {
      let dom = e.currentTarget
      let self = this
      event.stopPropagation()
      // localStorage.name = self.selectedObj.ID_Target_Fusion
      if (dom.className.baseVal.indexOf('active1') !== -1) {
        dom.classList.remove('active1')
      } else {
        dom.classList.add('active1')
      }
      if (document.getElementById('fourth-button-box').className.baseVal.indexOf('hidden') !== -1) {
        localStorage['selected'] = 4
        document.getElementById('fourth-button-box').classList.remove('hidden')
        document.getElementById('first-button-box').classList.add('hidden')
        document.getElementById('third-button-box').classList.add('hidden')
      } else {
        localStorage['selected'] = ''
        document.getElementById('fourth-button-box').classList.add('hidden')
      }
      for (let i = 0, j = 5; i < j; i++) {
        document.getElementById('fourth-' + i).onmousedown = () => self.setEnemyType(i)
      }
      return false
    },
    /**
* 设置目标类型
*/
    setAimsType (type) {
      let data = {
        'Time_change': new Date().getTime(),
        'ID_Target_Fusion': this.selectedObj.ID_Target_Fusion,
        'Type_Change': 1,
        'Type_Target': type,
        'Prop_Change': this.selectedObj.PropChange,
        'Prop_IFF_Target': this.selectedObj.Prop_IFF
      }
      this.mqsocket.sendConfigToMQ(data, 'ATMS.topic', 'InfoPack_Type_Change')
    },
    /**
* 设置敌我属性
*/
    setEnemyType (type) {
      let data = {
        'Time_change': new Date().getTime(),
        'ID_Target_Fusion': this.selectedObj.ID_Target_Fusion,
        'Prop_Change': 1,
        'Prop_IFF_Target': type,
        'Type_Change': this.selectedObj.TypeChange,
        'Type_Target': this.selectedObj.Type_Target
      }
      this.mqsocket.sendConfigToMQ(data, 'ATMS.topic', 'InfoPack_Type_Change')
    },
    markerClicked (obj, open) { // 飞机图标点击触发事件, open: true打开按钮栏， false关闭
      // alert(1)
      if (open === true) {
        this.ID_Target_FusionAA = obj.ID_Target_Fusion
        this.selectedObj = obj
        if (Number(this.selectedObj.ID_Target_Fusion) === Number(localStorage['list'])) {
          if (Number(localStorage['listOne']) === 1 || Number(localStorage['listTwo']) === 1 || Number(localStorage['listRecord']) === 1) {
            // 假如还在运行，则隐藏box，保留按钮选中效果
            if (Number(localStorage['selected']) === 1) {
              $('#first-button-box').attr('class', '')
            } else {
              $('#first-button-box').attr('class', 'hidden')
            }
          } else if (Number(localStorage['listOne']) === 0 && Number(localStorage['listTwo']) === 0 && Number(localStorage['listRecord']) === 0) {
            $('#right-top').attr('class', '')
            $('#first-button-box').attr('class', 'hidden')
          }

          if (Number(localStorage['listOne']) === 1) {
            $('#first-one').attr('class', 'active')
            $('#right-top').attr('class', 'active2')
          } else {
            $('#first-one').attr('class', '')
          }
          if (Number(localStorage['listTwo']) === 1) {
            $('#first-two').attr('class', 'active')
            $('#right-top').attr('class', 'active2')
          } else {
            $('#first-two').attr('class', '')
          }

          if (Number(localStorage['listDong']) === 1) {
            $('#standard3').attr('class', 'active')
            $('#standard2').attr('class', 'active')
            $('#standard').attr('class', 'active')
          } else {
            $('#standard3').attr('class', '')
            $('#standard2').attr('class', '')
            $('#standard').attr('class', '')
          }

          if (Number(localStorage['listRecord']) === 1) {
            $('#first-record').attr('class', 'active')
            $('#right-top').attr('class', 'active2')
          } else {
            $('#first-record').attr('class', '')
          }
        } else {
          this.ldData = -1
          this.gdData = -1

          $('#first-one').attr('class', '')
          $('#first-two').attr('class', '')
          $('#first-record').attr('class', '')
          $('#right-top').attr('class', '')
          // 动态标校开始
          $('#standard3').attr('class', '')
          $('#standard2').attr('class', '')
          $('#standard').attr('class', '')
          // 结束
        }
        // 判断当前是否需要选中敌我目标
        for (let i = 0, j = 5; i < j; i++) {
          if (this.selectedObj.PropChange && (i === this.selectedObj.Prop_IFF)) {
            $('#fourth-' + i).attr('class', 'active')
          } else {
            $('#fourth-' + i).attr('class', '')
          }
        }
        // 判断当前是否需要选中目标类型
        for (let a = 0, b = 9; a < b; a++) {
          if (this.selectedObj.TypeChange && (a === this.selectedObj.Type_Target)) {
            $('#third-' + a).attr('class', 'active')
          } else {
            $('#third-' + a).attr('class', '')
          }
        }
        if (!this.svgButton) {
          // this.svgButton = L.popup({
          //   offset: L.point(29, 169),
          //   // keepInView: true,
          //   autoClose: false,
          //   closeOnClick: false
          // })
          //   .setLatLng({ lon: obj.Longitude_Target, lat: obj.Latitude_Target })
          //   // SHJ--> 环形导航
          //   .setContent(svgElement)
          //   .openOn(this.map)
          this.svgButton = L.marker([obj.Latitude_Target, obj.Longitude_Target], {
            // eslint-disable-next-line new-cap
            icon: new L.divIcon({
              className: 'circle-menu',
              html: svgElement,
              iconSize: [220, 220],
              iconAnchor: [114, 109]
            }),
            zIndexOffset: 1000
          })
          this.svgButton.addTo(this.map)
          let trackButton = document.getElementById('right-top')
          if (trackButton) {
            trackButton.onclick = (e) => this.showFirstButton(e)
          }
          // 目标类型
          let typeButton = document.getElementById('right-bottom')
          if (typeButton) {
            typeButton.onclick = (e) => this.showThirdButton(e)
          }
          // 敌我属性
          let enemyButton = document.getElementById('left-bottom')
          if (enemyButton) {
            enemyButton.onclick = (e) => this.showFourButton(e)
          }
          // 目标类型
          let standardButton = document.getElementById('standard')
          if (standardButton) {
            standardButton.onclick = (e) => this.onStandard(e)
          }
          let standardButton1 = document.getElementById('shjcs')
          if (standardButton1) {
            standardButton1.onclick = (e) => this.onStandard(e)
          }
        } else {
          this.svgButton.setLatLng({ lon: obj.Longitude_Target, lat: obj.Latitude_Target }).update(this.map)
        }
      } else {
        this.selectedObj = null
        this.svgButton.remove()
        this.svgButton = null
      }
    },
    leftBtnClickTit () {
      this.isTitleShow = !this.isTitleShow
    },

    // /////////////////// 左侧按钮栏点击事件 ///////////////////////////////
    leftBtnClicked (e, type, index, num) {
      let dom = e.currentTarget
      this.indexPic = index
      localStorage.created = 1 // cun
      if (index !== '更多' && index !== '系统退出') {
        if (this.currentPage !== index) {
          this.drawerVisible = true
          this.currentPage = index
        } else {
          this.drawerVisible = false
          this.currentPage = ''
        }
        if (this.drawerVisible === true) {
          this.rightVisible = false
          this.gdbtnchange = false
        }
      } else if (index === '系统退出') {
        this.modelFlag = !this.modelFlag
        return false
      } else {
        if (this.moreVisible == true) {
          this.moreVisible = false
          localStorage.moreVisible = false
        } else {
          this.moreVisible = true
          localStorage.moreVisible = true
        }
      }
      if (index !== '更多') {
        if (dom.className.indexOf('active') !== -1) {
          console.log(111)
        } else {
          console.log(111)
        }
      }
      if (index === '记录回放') {
        this.zIndex = true
        // mapF({}, false)
      } else {
        this.zIndex = false
      }
      if (dom.className.indexOf('active') !== -1) {
        dom.classList.remove('active')
        // this.drawerVisible = false
        let indexNum = this.$store.state.config.seattionIndex === 0 ? '0' : Number(this.$store.state.config.seattionIndex.slice(0, 1))
        if (indexNum === 1) {
          this.rightVisible = true
          this.isGaoJing = true
          this.isGdList = true
          if (index !== '更多') {
            setTimeout(() => {
              this.reload()
            }, 1)
            this.$router.push({ name: 'GuangDianTaiShi' })
          }
        } else if (indexNum === 2) {
          if (index !== '更多') {
            this.isGdList = false
            this.isGaoJing = false // 激光为false的时候显示
            this.rightVisible = false
          }
        } else if (indexNum === 3) {
          if (index !== '更多') {
            this.isGdList = true
            this.isGaoJing = true
            this.rightVisible = false
          }
        }
      } else {
        dom.classList.add('active')
        if (type !== 'more' && index !== 'exit') {
          this.isGdList = false
          this.$router.push({ name: type })
          this.isGaoJing = true
          this.drawerVisible = true
          if (type === 'calibration') {
            this.calibration = !this.calibration
          } else {
            this.calibration = true
          }
        }
        // 判断不同类型
      }
      if (type === 'live') {
        this.$router.replace({ name: type })
      }
    },

    // /////////////////// 防控区域 ///////////////////////////////
    initFK () { // 获取数据，初始化防控区域图层
      this.fkLayer = initFKLayer()
      // let url = this.$taskApi + '/api/Prevention/queryPrevent'
      // this.http.post(url).then(con => {
      //   this.fkData = []
      //   if (con.code === 200) {
      //     con.dataMap.getPrevent.forEach((item, index) => {
      //       if (Number(item.activation_Task) === 1) {
      //         this.fkData.push(item)
      //       }
      //     })
      //   }
      // })
      // getLayersData('FKQY').then(data => {
      //   this.fkData = data
      //   var a = 0
      //   var b = 0
      //   data[0].geoValue.forEach((item, index) => {
      //     a += item[0]
      //     b += item[1]
      //   })
      //   this.uiConfig.mapConfig.mapCenter[0] = (a / data[0].geoValue.length + this.uiConfig.mapConfig.mapCenter[0]) / 2 - 0.02
      //   this.uiConfig.mapConfig.mapCenter[1] = (b / data[0].geoValue.length + this.uiConfig.mapConfig.mapCenter[1]) / 2
      //   drawArea(this.fkData[0], this.fkLayer)
      // })
    },
    changeFK (key) { // 选择显示不同的防控区域
      // if (this.fkData.hasOwnProperty(key)) {
      //   this.fkLayer.clearLayers()
      //   drawArea(this.fkData[key], this.fkLayer)
      // }

      let url = this.$taskApi + '/api/Prevention/getPrevent'
      this.http.post(url, { id: key }).then(con => {
        var a = []
        var b = []
        for (var i = 0; i < con.length; i++) {
          var dataDemo = JSON.parse(con[i].geometrys)
          // var dataDemo1 = JSON.parse(con[i].geometrysWarning)
          if (dataDemo) {
            dataDemo.forEach((item1, index1) => {
              item1 = item1.split(' ')
              a.push(Number(item1[2]))
              b.push(Number(item1[1]))
            })
          }
          // if (dataDemo1) {
          //   dataDemo1.forEach((item1, index1) => {
          //     item1 = item1.split(' ')
          //     a.push(Number(item1[2]))
          //     b.push(Number(item1[1]))
          //   })
          // }
          if (dataDemo) { // && dataDemo1
            this.uiConfig.mapConfig.mapCenter[0] = (Math.max.apply(null, a) + Math.min.apply(null, a)) / 2
            this.uiConfig.mapConfig.mapCenter[1] = (Math.max.apply(null, b) + Math.min.apply(null, b)) / 2
            let Lat1 = Math.max.apply(null, a) * 3.1415926 / 180
            let Lat2 = Math.min.apply(null, a) * 3.1415926 / 180
            let Lon1 = Math.max.apply(null, b) * 3.1415926 / 180
            let Lon2 = Math.min.apply(null, b) * 3.1415926 / 180
            let Lata = Lat1 - Lat2// 两点纬度之差
            let Latb = Lon1 - Lon2 // 经度之差
            let s = 0
            s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(Lata / 2), 2) + Math.cos(Lat1) * Math.cos(Lat2) * Math.pow(Math.sin(Latb / 2), 2)))
            s = s * 6378137.0
            if (s < 10000) {
              this.uiConfig.mapConfig.mapZoom = 14
            } else if (s > 10000 && s < 25000) {
              this.uiConfig.mapConfig.mapZoom = 13
            } else if (s > 25000 && s < 40000) {
              this.uiConfig.mapConfig.mapZoom = 12
            } else if (s > 40000 && s < 80000) {
              this.uiConfig.mapConfig.mapZoom = 11
            } else if (s > 80000 && s < 160000) {
              this.uiConfig.mapConfig.mapZoom = 10
            } else if (s > 160000 && s < 320000) {
              this.uiConfig.mapConfig.mapZoom = 9
            } else if (s > 320000 && s < 640000) {
              this.uiConfig.mapConfig.mapZoom = 8
            }
            localStorage.mapConfigMapZoom = this.uiConfig.mapConfig.mapZoom
            localStorage.mapConfigMapLat = this.uiConfig.mapConfig.mapCenter[0]
            localStorage.mapConfigMapLon = this.uiConfig.mapConfig.mapCenter[1]
            this.map.flyTo(this.uiConfig.mapConfig.mapCenter, this.uiConfig.mapConfig.mapZoom)
          }
        }
        if (Number(con.code) === 400) {
          this.$message.error(con.message)
        }

        // mapF(con, true)
      })
    },

    // /////////////////// 目标列表选中 ///////////////////////////////
    targetSelect (type, id) {
      if (type === 'selected') {
        let url = this.$baseApi + '/api/ATMS/UFOGetTrail/' + id
        this.http.get(url).then(res => {
          if (res && res.code === '200') {
            let trackData = JSON.parse(res.data)
            for (let obj of trackData) {
              obj.Latitude_Target = obj.Latitude_Target === 0x7FFFFFFFFFFFFFFF ? 0 : Number((Number(obj.Latitude_Target) * 0.00000001).toFixed(8))
              obj.Longitude_Target = obj.Longitude_Target === 0x7FFFFFFFFFFFFFFF ? 0 : Number((Number(obj.Longitude_Target) * 0.00000001).toFixed(8))
              obj.Angle_A_Target = obj.Angle_A_Target === 0x7FFFFFFF ? '-' : Number((Number(obj.Angle_A_Target) * 0.001).toFixed(2))
              obj.Angle_P_Target = obj.Angle_P_Target === 0x7FFFFFFF ? '-' : Number((Number(obj.Angle_P_Target) * 0.001).toFixed(2))
              obj.Altitude_Target = obj.Angle_P_Target === 0x7FFFFFFF ? '-' : Number((Number(obj.Altitude_Target) * 0.01).toFixed(1))
              obj.Distance_Target = obj.Distance_Target === 0xFFFFFFFF ? '-' : Number((Number(obj.Distance_Target) * 0.01).toFixed(1))
              drawTrack(obj)
            }
            this.trackData = trackData
            // this.trackData.data = trackData
          } else {
            this.$Message.warning('目标尾迹获取失败，' + res.message)
          }
        })
      } else if (type === 'cancel') {
        deleteTrack(id)
      }
    },
    onInputModelQX () {
      this.cancelTrack(0, this.inputModel)
    },
    onInputModel () {
      this.cancelTrack(0, localStorage.list)
      setTimeout(() => {
        localStorage.list = this.inputModel
        localStorage.listOne = 1
        this.gdData = 1
        this.http.post(this.$equipmentDeploy + '/task/taskhandle/guideTargetEq', {
          idTarget: this.inputModel
        }).then(res => {
          if (res) {
            // this.$Message.info(res.message)
          }
        })
      }, 100) // 1秒后执行代码
    },
    // /////////////////// 手动跟踪 ///////////////////////////////
    startTrack (e) { // 开始光电跟踪
      event.stopPropagation()
      this.curiseModal = true
      let url = this.$equipmentDeploy + '/api/Deploy/queryDeploy'
      this.onSureStyleE = e.currentTarget
      this.http.post(url, { Type_Device: 2 }).then(res => {
        this.styleList = res.dataMap.queryDeploy
        console.log(this.styleList)
        this.styleList.forEach(item => {
          this.cities.push(item.id_Device)
        })
      })
    },
    onSureStyle (e) {
      let time = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()
      if (time > this.isTime) {
        this.isTime = time
        // let dom = this.onSureStyleE.currentTarget
        let two = $('#first-two').attr('class')
        let record = $('#first-record').attr('class')
        this.isTrueShow()
        console.log(this.onSureStyleE, '==============')
        if (this.onSureStyleE.className.baseVal.indexOf('active') !== -1) {
          localStorage.listOne = 0
          $('#first-one').attr('class', '')
          this.gdData = -1
          if (two.indexOf('active') === -1 && record.indexOf('active') === -1) {
            localStorage.list = NaN
            $('#right-top').attr('class', '')
          }
          this.cancelTrack(0, this.selectedObj.ID_Target_Fusion)
        } else {
          this.cancelTrack(0, localStorage.list)
          setTimeout(() => {
            $('#first-one').attr('class', 'active')
            localStorage.list = this.selectedObj.ID_Target_Fusion
            localStorage.listOne = 1
            this.gdData = 1
            this.http.post(this.$equipmentDeploy + '/task/taskhandle/guideTargetEq', {
              idTarget: this.ID_Target_FusionAA,
              IP_Device: this.checkList
            }).then(res => {
              if (res) {
                // this.$Message.info(res.message)
              }
            })
          }, 100) // 1秒后执行代码
        }
      }
    },
    startRadarTrack (e) { // 开始雷达跟踪
      event.stopPropagation()
      let time = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()
      if (time > this.isTime) {
        let dom = e.currentTarget
        this.isTrueShow()
        if (dom.className.baseVal.indexOf('active') !== -1) {
          $('#first-two').attr('class', '')
          localStorage.listTwo = 0
          this.ldData = -1
          let one = $('#first-one').attr('class')
          let record = $('#first-record').attr('class')
          if (one.indexOf('active') === -1 && record.indexOf('active') === -1) {
            localStorage.list = NaN
            $('#right-top').attr('class', '')
          }
          this.cancelTrack(1, this.selectedObj.ID_Target_Fusion)
        } else {
          this.cancelTrack(1, localStorage.list)
          setTimeout(() => {
            $('#first-two').attr('class', 'active')
            localStorage.listTwo = 1
            localStorage.list = this.selectedObj.ID_Target_Fusion
            this.ldData = 1
            this.http.post(this.$equipmentDeploy + '/task/taskhandle/guideTargetLader', {
              idTarget: this.ID_Target_FusionAA
            }).then(res => {
              if (res) {
                // this.$Message.info(res.message)
              }
            })
          }, 100) // 1秒后执行代码
        }
      }
    },
    // 动态标校
    onStandard (e) {
      let dom = e.currentTarget
      let num = 0
      this.isTrueShow()
      if (dom.className.baseVal.indexOf('active') !== -1) {
        localStorage.listDong = 0
        $('#standard3').attr('class', '')
        $('#standard').attr('class', '')
        $('#standard2').attr('class', '')
        num = 0
      } else {
        localStorage.listDong = 1
        localStorage.list = this.selectedObj.ID_Target_Fusion
        $('#standard3').attr('class', 'active')
        $('#standard').attr('class', 'active')
        $('#standard2').attr('class', 'active')
        num = 1
      }
      this.mqsocket.sendConfigToMQ({ BeginOrEnd: num, ID_Target_Fusion: this.selectedObj.ID_Target_Fusion }, 'ATMS.topic', 'Dynamic_Calibration_Record')
    },
    cancelTrack (type, id) { // 取消跟踪
      // type 0是光电 1是雷达 cancelTrackAsignTarget(以前接口)
      if (Number(type) === 0) {
        this.http.post(this.$equipmentDeploy + '/task/taskhandle/cancelGuideTargetEq', {
          idTarget: id
        }).then(res => {
          if (res) {
            // this.$Message.info(res.message)
          }
        })
      } else if (Number(type) === 1) {
        this.http.post(this.$equipmentDeploy + '/task/taskhandle/cancelGuideTargetLader', {
          idTarget: id
        }).then(res => {
          if (res) {
            // this.$Message.info(res.message)
          }
        })
      }
    },
    recordTrack (e) { // 记录
      event.stopPropagation()
      let time = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()
      if (time > this.isTime) {
        let dom = e.currentTarget
        let data1 = ''
        this.isTrueShow()
        if (dom.className.baseVal.indexOf('active') !== -1) {
          dom.classList.remove('active')
          localStorage.listRecord = 0
          let one = $('#first-one').attr('class')
          let two = $('#first-two').attr('class')
          if (one.indexOf('active') === -1 && two.indexOf('active') === -1) {
            localStorage.list = NaN
            $('#right-top').attr('class', '')
          }
          data1 = { state: 0, 'ID_Target_Fusion': this.selectedObj.ID_Target_Fusion }
          this.mqsocket.sendConfigToMQ(data1, 'ATMS.topic', 'Single_Data_Record')
        } else {
          dom.classList.add('active')
          localStorage.listRecord = 1
          localStorage.list = this.selectedObj.ID_Target_Fusion
          data1 = { state: 1, 'ID_Target_Fusion': this.selectedObj.ID_Target_Fusion }
          this.mqsocket.sendConfigToMQ(data1, 'ATMS.topic', 'Single_Data_Record')
        }
      }
    },
    btnGroup () {
      event.stopPropagation()
    },
    isTrueShow () {
      if (Number(this.selectedObj.ID_Target_Fusion) !== Number(localStorage['list'])) {
        let one = localStorage['listOne']
        let two = localStorage['listTwo']
        let record = localStorage['listRecord']
        let dong = localStorage['listDong']
        if (Number(one) === 1) {
          localStorage.listOne = 0
        }
        if (Number(two) === 1) {
          localStorage.listTwo = 0
        }
        if (Number(record) === 1) {
          localStorage.listRecord = 0
        }
        if (Number(dong) === 1) {
          localStorage.listDong = 0
        }
      }
    },

    /**
       * 初始化绘制测绘
       */
    initRanging () {
      this.ranging.e = new L.Draw.Polyline(this.map)
      // this.ranging.e = new L.Draw.Polygon(this.map)
      this.ranging.e.setOptions(this.ranging.option)
      this.ranging.drawLayer = new L.FeatureGroup()
      this.ranging.drawLayer.addTo(this.map)
      this.map.on('draw:created', this.drawCreated)
    },

    /**
       * 绘制测距
       */
    mappingRanging () {
      // this.map.off('draw:created')
      localStorage.created = 0 // cun
      this.ranging.e.enable()
    },

    /**
       * 监听绘制开始事件
       * 只调用一次:其余根据选中类型判断
       * l,第一个点，r-第二个点，c-中间显示距离
       */
    drawCreated (e) {
      if (!e.layer ||
        !e.layer.options ||
        !e.layer.options.color ||
        e.layer.options.color !== '#284c75') {
        return
      }
      let _this = this
      e.layer.addTo(this.ranging.drawLayer)
      // let l, r, c, a, b, distance = 0, cLat = 0, cLng = 0, d, angle = 0
      let l = 0
      let r = 0
      let c = 0
      let a = 0
      let b = 0
      let distance = 0
      let cLat = 0
      let cLng = 0
      let d = 0
      let angle = 0
      let startIcon = L.icon({
        iconUrl: require('@/assets/imgs/mark-start.png'),
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [-3, -3]
      })
      let endIcon = L.icon({
        iconUrl: require('@/assets/imgs/mark-end.png'),
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [-3, -3]
      })
      let delIcon = L.icon({
        iconUrl: require('@/assets/imgs/del.png'),
        iconSize: [30, 30],
        iconAnchor: [15, -10],
        popupAnchor: [-3, -3]
      })
      e.layer._latlngs.map((item, index) => {
        if (index === 0) {
          a = item
          cLat += item.lat * 10e14
          cLng += item.lng * 10e14
          l = L.marker(item, { icon: startIcon }).addTo(this.map)
          // l = L.popup({ autoClose: false, closeOnClick: false })
          //   .setLatLng(item)
          //   .setContent('<p class="lng-lat-show">经度: ' + item.lng + '<br />纬度:' + item.lat + '</p>')
          //   .openOn(this.map)
        } else if (index === 1) {
          b = item
          cLat += item.lat * 10e14
          cLng += item.lng * 10e14
          r = L.marker(item, { icon: endIcon }).addTo(this.map)
          // r = L.popup({ autoClose: false, closeOnClick: false })
          //   .setLatLng(item)
          //   .setContent('<p class="lng-lat-show">经度: ' + item.lng + '<br />纬度:' + item.lat + '</p>')
          //   .openOn(this.map)
        }
      })
      distance = (a.distanceTo(b) / 1000).toFixed(2)
      angle = this.bearing(a, b)
      c = L.popup({ autoClose: false, closeOnClick: false })
        .setLatLng(L.latLng(cLat / 2 / 10e14, cLng / 2 / 10e14))
        .setContent('<p class="lng-lat-show" style="padding: 10px;width: 180px;display: block;background: #fff;border-radius: 5px; font-size: 16px;box-shadow: 0 0 10px rgb(0 0 0 / 20%);">距离: ' + distance + '公里<br />正北偏移角:' + angle + '°</p>')
        .openOn(this.map)
      let index = _this.listA.length
      d = L.marker(L.latLng(cLat / 2 / 10e14, cLng / 2 / 10e14), { icon: delIcon }).addTo(this.map).on('click', (e) => {
        let item = _this.listA[index]
        for (let k in item) {
          item[k] && item[k].remove()
        }
      })
      this.listA.push({
        layer: e.layer,
        l: l,
        r: r,
        c: c,
        d: d
      })
    },

    /*
      * 计算两点对于正北方向的朝向角度 [0,360]
      * @param {*} start format:{'lat': 30, 'lng': 120 }
      * @param {*} end
      */
    bearing (start, end) {
      let rad = Math.PI / 180
      let lat1 = start.lat * rad
      let lat2 = end.lat * rad
      let lon1 = start.lng * rad
      let lon2 = end.lng * rad
      const a = Math.sin(lon2 - lon1) * Math.cos(lat2)
      const b = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)

      return this.radiansToDegrees(Math.atan2(a, b))
    },

    /*
      * 弧度转换为角度
      */
    radiansToDegrees (radians) {
      const degrees = radians % (2 * Math.PI)
      return (degrees * 180 / Math.PI).toFixed(2)
    }
  },
  watch: {
    fenceLayer1 (e) {
      mapFence(this.fenceList, e)
    },
    currentBaseLayer1 (e) {
      this.methShow()
      setTimeout(() => {
        drawTracks(this.typeDeploy1, this.typeDeploy2, e)
      }, 1000) // 1秒后执行代码
    },
    drawerVisible: {
      handler (val) {
        this.layoutResize()
      }
    },
    rightVisible: {
      handler (val) {
        this.layoutResize()
      }
    },
    seattionIndex: {
      handler (newVal, oldVal) {
        this.isSeattionIndex = newVal
        let index = Number(newVal.split('_')[0])
        if (index === 1) {
          this.rightVisible = !this.rightVisible
          this.isGaoJing = true
          this.isGdList = true
          if (this.rightVisible === true) {
            this.drawerVisible = false
            this.currentPage = ''
            this.gdbtnchange = true
            setTimeout(() => {
              this.reload()
            }, 1)
            this.$router.push({ name: 'GuangDianTaiShi' })
          }
        } else if (index === 2) {
          this.isGdList = false
          this.isGaoJing = false // 激光为false的时候显示
          this.rightVisible = false
        } else if (index === 3) {
          this.isGdList = true
          this.isGaoJing = true
          this.rightVisible = false
        }
        if (index === 1 || index === 2 || index === 3) {
          this.drawerVisible = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// /deep/ .app-form {
//   margin: 0;
// }
.hover_hength {
  bottom: 214px !important;
}
#s-list-box {
  position: fixed;
  // width: 100%;
  left: 0;
  bottom: 0;
  z-index: 403;
  .upHeigths {
    height: 380px;
  }
}
.flex-right:hover > div {
  width: 190px;
  height: 190px;
  position: fixed;
  margin-top: -54px;
  right: -95px;
  z-index: 99999;
  opacity: 1;
  transition: all 0.6s;
}
// .flex-right > div {
//   width: 190px;
//   height: 190px;
//   position: fixed;
//   margin-top: -54px;
//   right: -95px;
//   z-index: 99999;
//   opacity: 1;
//   transition: all 0.6s;
//   background: #062a54;
// }
.flex-right {
  width: 42px;
  height: 84px;
  overflow: hidden;
  position: fixed;
  right: 0;
  bottom: 20%;
  z-index: 999999;
  p {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    position: fixed;
    right: -42px;
    bottom: 20%;
    z-index: 100000;
  }
  span {
    background: #062a54;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: block;
  }
  > div {
    width: 42px;
    height: 84px;
    border-radius: 50%;
    background: rgba(6, 42, 84, 0.5);
    position: relative;
    opacity: 0;
    transition: all 0.6s;
    > i {
      position: absolute;
      color: #fff;
      font-size: 38px;
    }
    .pic {
      top: 22px;
      margin-left: 50px;
      background-image: url("../../assets/imgs/map/radio/btn-gd.png");
      width: 30px;
      height: 26px;
      background-size: cover;
    }
    .pic:active {
      background-image: url("../../assets/imgs/map/radio/btn-gd-active.png");
    }

    > .icon-pinpufenxi {
      left: 12px;
      margin-top: 78px;
      font-size: 30px;
    }
    > .icon-liebiao {
      font-size: 23px;
      bottom: 18px;
      margin-left: 48px;
    }
    > .icon-jiguangditu {
      font-size: 26px;
      left: 54px;
      bottom: 16px;
    }
    > .icon-liebiao:active,
    > .icon-jiguangditu:active,
    > .icon-pinpufenxi:active {
      color: #03f6f8;
    }
  }
}

#mapId,
#playBackmapId {
  /*margin: -20px -20px -20px -20px;*/
  height: 100%;
  width: 100%;
}
#mapId.cur,
#playBackmapId.cur {
  width: calc(100% - 554px);
  /*width: calc(100% - 553px);*/
  /*right: 553px;*/
}
#mapId.sur,
#playBackmapId.sur {
  width: calc(100% - 771px);
}
.map {
  /* left: 0px;*/
  /*top: 0px;*/
  height: 100%;
  width: 100%;
}
.myContainer {
  height: 100%;
  width: 100%;
}
/deep/ .el-main {
  padding: 0;
  overflow: hidden;
}
.deviceListPanel {
  position: absolute;
  left: 2px;
  top: calc(100% - 244px);
  height: 200px;
  width: calc(100% - 4px);
  box-shadow: 0 0 2px #8c939d;
  z-index: 999;
  float: top;
  filter: alpha(Opacity=80);
  -moz-opacity: 1;
  opacity: 1;
  background-color: rgb(220, 220, 220);
}

/deep/ .class_icon_1 {
  border: 0;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.56);
  font-size: 10px;
  color: red;
  text-align: left;
  padding-top: 0px;
  padding-left: 2px;
}
/deep/ .circle-menu {
  background: none;
  border: none;
}
/deep/ .obj-counter {
  position: absolute;
  left: 40px;
  height: auto;
}
.plugin {
  margin-top: 10px;
  margin-left: 0;
}
/deep/.el-container {
  position: relative;
  overflow: hidden;
}
#leftBoxPic {
  transition: all 0.4s;
  width: 0px !important;
  overflow: hidden;
}
.left-img {
  // width: 76px;
  height: 666px;
  position: absolute;
  left: 0px;
  top: 188px;
  z-index: 401;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  transition: all 0.4s;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 71px;
    align-items: center;
    position: relative;
    margin-right: 1px;
    > span {
      position: absolute;
      width: 100%;
      height: 100%;
      transform: perspective(2em) rotateY(2deg);
      z-index: -1;
      background-image: linear-gradient(#003f71, #32407e, #3e4182);
    }
    > p,
    i {
      height: 107px;
      width: 68px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 48px;
    }
    > .gl-pic {
      background-image: url("../../assets/imgs/map/left/bg.png");
      background-size: cover;
      color: #00ffff;
    }
  }
  > div:nth-child(1) {
    height: 666px;
  }
  > div:nth-child(2),
  div:nth-child(3) {
    height: 444px;
    margin-top: 111px;
  }
  img {
    width: 44px;
  }
}
// 底部告警列表
.bottom-box {
  position: absolute;
  z-index: 400;
  bottom: 20px;
  width: 630px;
  left: calc((100% - 630px) / 2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    width: 60px;
    height: 60px;
    background: linear-gradient(145deg, transparent 11px, #e89e43 0) left;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  > div:nth-child(1) {
    background: linear-gradient(145deg, transparent 11px, #c62929 0) left;
  }
  > div:nth-child(2) {
    background: linear-gradient(145deg, transparent 11px, #ec7b31 0) left;
  }
  > div:nth-last-child(1) {
    background: linear-gradient(145deg, transparent 11px, #414c81 0) left;
  }
  > div:nth-last-child(2) {
    background: linear-gradient(145deg, transparent 11px, #414c81 0) left;
  }
}
// 底部目标列表
.target-list {
  height: 214px;
  width: 1150px !important;
}

// 顶部按钮
/deep/.el-switch {
  right: 0;
  position: absolute;
}
.moreTop {
  margin-top: 92px;
}
.top-box {
  // top: 10px;
  // right: 10%;
  // z-index: 400;
  // display: flex;
  // border-radius: 5px;
  // position: absolute;
  top: 102px;
  right: 10%;
  z-index: 400;
  border-radius: 5px;
  position: fixed;
  left: 10px;
  width: 45px;
  > div {
    // display: flex;
    overflow: hidden;
    border-radius: 5px;
    flex-direction: row;
    > div {
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      // border-right: 1px solid rgba(255, 255, 255, 0.5);
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      > span {
        font-size: 24px;
      }
      .active {
        color: #00ffff;
      }
    }
    > div:last-child {
      border-right: 0px;
      border-bottom: none !important;
    }
    > div:active > span {
      color: #00ffff;
    }
    > div:focus > span {
      color: #00ffff;
    }
  }
  img {
    width: 45px;
  }

  .layer-select {
    position: absolute;
    top: 45px;
    // color: #ffffff;
    left: 45px;
    font-size: 20px;
    background-color: rgba(40, 76, 117, 0.5);
    border-radius: 5px;
    width: 200px;
    /deep/ .el-divider--horizontal {
      margin: 0;
      height: 0px;
      border-bottom: 1px solid #284c75;
      background-color: transparent;
      width: 0;
      display: none;
    }
    span,
    /deep/ .el-switch {
      margin: 5px 10px;
    }
  }
}
.top-box.cur {
  right: 564px;
}
.top-box.sur {
  right: 790px;
}
.top-box-search {
  height: 60px;
  width: 313px;
  margin-right: 10px;

  /deep/ .el-input__inner {
    height: 60px;
    font-size: 20px;
  }
}
.logo-img {
  position: fixed;
  top: 3px;
  left: 46px;
  width: 78px;
  z-index: 403;
  text-align: center;
}
// top导航栏
.leftBoxHeight {
  width: calc(100% - 771px) !important;
}
.moreHeight {
  height: 180px !important;
  transition: all 0.4s;
}
.top-img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 402;
  width: calc(100% - 770px);
  transition: all 0.4s;
  height: 90px;
  > div {
    height: 90px;
    display: flex;
    width: calc(100% - 160px);
    margin-left: 160px;
    justify-content: space-around;
    align-items: center;
    > .gl-pic {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      color: #00ffff;
    }
    > p {
      width: 90px;
      height: 90px;
      position: relative;
      i {
        display: block;
        font-size: 46px;
        width: 90px;
        text-align: center;
      }
      .icon-guanji1,
      .icon-jiankang,
      .icon-yonghu {
        font-size: 43px;
      }
      .icon-shuju,
      .icon-jiankang,
      .icon-yonghu,
      .icon-guanji1 {
        margin-top: 2px;
      }
      .icon-shiyongshuoming {
        margin-top: 3px;
      }
      .icon-huifang {
        margin-top: 5px;
      }
      .icon-huifang,
      .icon-shiyongshuoming {
        font-size: 40px;
      }
      .icon-guanyuwomen,
      .icon-xiazai,
      .icon-tongji,
      .icon-dongtaibiaoxiao_huaban1_huaban1 {
        margin-top: -2px;
      }
      .icon-xianshiqi {
        margin-top: 1px;
      }
      .icon-jinggao {
        font-size: 52px;
      }
      .icon-jinggao {
        margin-top: -4px;
      }
      span {
        display: block;
        font-size: 16px;
        position: absolute;
        width: 90px;
        text-align: center;
        bottom: 8px;
      }
    }
  }
}
// 右侧功能显示区
.right-drawer {
  position: absolute;
  top: 0;
  right: 0;
  left: 100%;
  width: 0;
  height: 100%;
  z-index: 405;
  opacity: 0;
  display: none;
}
// 右侧态势显示界面尺寸
.right-drawer.sur {
  width: 771px !important;
  left: calc(100% - 771px) !important;
  opacity: 1;
  display: block;
}
// 右侧菜单栏显示区域
.right-drawer.cur {
  width: 554px !important;
  left: calc(100% - 554px) !important;
  opacity: 1;
  display: block;
}
.right-drawer.cal {
  width: 553px;
  left: inherit;
  right: 0;
}
// 右侧态势按钮区域
.right-btn-box {
  position: fixed;
  top: 73%;
  width: 42px;
  height: 84px;
  right: 0;
  display: flex;
  justify-content: right;
  z-index: 99999;
  .guangdian {
    .gdbtn {
      width: 35px;
      height: 32px;
      background-image: url("../../assets/imgs/map/radio/btn-gd.png");
      background-size: cover;
      margin-right: 21px;
    }
    span {
      font-size: 22px;
      font-weight: bold;
    }
  }
  .guangdian-act {
    color: #04eafb;
    .gdbtn-act {
      background-image: url("../../assets/imgs/map/radio/btn-gd-active.png");
    }
  }
}
.right-btn-box.sur {
  width: 192px;
  right: 770px;
}
.right-btn-box.cur {
  right: 554px;
}
.leaflet-popup-content-wrapper {
  background: none !important;
  box-shadow: none !important;
}
.leaflet-popup-close-button {
  display: none;
}
.leaflet-popup-tip-container {
  display: none;
}
.leaflet-popup-content {
  width: 260px;
}
.leaflet-popup-pane {
  z-index: 700 !important;
}
body .hidden {
  display: none !important;
  opacity: 0 !important;
}
/* #right-top:hover #first-button-box {
  display: block;
}*/
.active1 > .st6 {
  fill: #062a54 !important;
}
.active1 > .st1 {
  fill: #fff !important;
}
.active2 > .st6 {
  fill: #062a54 !important;
}
.active2 > .st1 {
  fill: #00ffff !important;
}

.active2 > .st1 {
  fill: #00ffff !important;
}
.active > .st1 {
  fill: #00ffff !important;
}
/* .zur {
  z-index: 10000 !important;
} */

.ring-box {
  width: 200px;
  height: 200px;
  position: fixed;
  top: 400px;
  left: 400px;
  /* background: pink; */
  z-index: 9990;
}
.icon-ring-nei {
  position: relative;
}
.icon-ring-nei > div {
  position: absolute;
  font-size: 60px;
  color: #284c75;
}
.icon-ring-nei > div > p {
  font-size: 20px;
  color: #fff;
  position: absolute;
  /* top: 76px; */
  top: 56px;
  z-index: 9;
  left: 42px;
}
.icon-ring-nei > div > p:hover,
.icon-ring-nei > div > p > span i:hover {
  color: #04eafb;
  transition: all 0.6s;
}
.icon-ring-nei > div > p:hover > span {
  opacity: 1;
  display: block;
  transition: all 0.6s;
}
.icon-ring-nei > div > p > span {
  position: absolute;
  font-size: 100px;
  color: #284c75;
  opacity: 0;
  display: none;
  transition: all 0.6s;
}
.icon-ring-nei > div:nth-child(1) {
  top: 0;
  left: 100px;
}
.icon-ring-nei > div:nth-child(2) {
  transform: rotate(-60deg);
  top: -4px;
  left: 46px;
}
.icon-ring-nei > div:nth-child(3) {
  transform: rotate(-120deg);
  top: 41px;
  left: 16px;
}
.icon-ring-nei > div:nth-child(4) {
  transform: rotate(-181deg);
  top: 89px;
  left: 39px;
}
.icon-ring-nei > div:nth-child(5) {
  transform: rotate(120deg);
  top: 92px;
  left: 93px;
}
.icon-ring-nei > div:nth-child(6) {
  transform: rotate(60deg);
  top: 48px;
  left: 123px;
}
.icon-ring-nei > div .icon-zhizhuwang {
  font-size: 22px;
}
.icon-ring-nei > div .icon-dunpai {
  transform: rotate(-120deg);
}
.icon-ring-nei > div .icon- {
  transform: rotate(-55deg);
  left: 43px;
  top: 72px;
}
.icon-ring-nei > div .icon-xiangqingmianxing {
  font-size: 16px;
}
.icon-ring-nei > div .icon-lujing span:nth-child(1) {
  /* left: -18px;
  top: -85px; */
  /* left: -18px;
  top: -80px; */
  left: -67px;
  top: -76px;
  font-size: 130px;
  transform: rotate(-3deg);
  /* font-size: 114px; */
}
.icon-ring-nei > div .icon-lujing {
  transform: rotate(61deg);
  left: 44px;
}
.icon-ring-nei > div > p i {
  position: absolute;
  color: #fff;
  font-size: 24px;
}
.icon-ring-nei > div .icon-biaoji {
  transform: rotate(-51deg);
  left: 42px;
  /* top: 72px; */
  top: 51px;
}
.icon-ring-nei > div .icon-biaoji span {
  /* transform: rotate(352deg); */
  /* bottom: -170px;
  right: 199px; */
  transform: rotate(351deg);
  bottom: -161px;
  right: 199px;
  font-size: 270px;
  width: 0;
}
.icon-biaoji > span {
  color: #fff;
  font-size: 30px;
}
.icon-ring-nei > div .icon-dunpai > span {
  font-size: 260px;
  top: -186px;
  left: -152px;
  transform: rotate(-3deg);
}
.icon-ring-nei > div .icon-guanlianx > span {
  width: 10px;
  height: 10px;
  top: -25px;
  left: 245px;
  transform: rotate(110deg);
  font-size: 270px;
}
.icon-ring-nei > div .icon-chuzhi-1jitufu-01 > span {
  font-size: 270px;
  width: 53px;
  text-align: revert;
  height: 124px;
  z-index: -99;
  line-height: 111px;
  display: flex;
  justify-content: center;
  transform: rotate(-183deg);
  top: -39px;
  left: 117px;
}
.icon-biaoji > span i:nth-child(1) {
  bottom: 251px;
  left: 102px;
  font-size: 20px;
}
.icon-biaoji > span i:nth-child(2) {
  bottom: 226px;
  left: 75px;
}
.icon-biaoji > span i:nth-child(3) {
  top: 160px;
  left: 60px;
  font-size: 20px;
  transform: rotate(-45deg);
}
.icon-biaoji > span i:nth-child(4) {
  top: 198px;
  left: 58px;
}
.icon-biaoji > span i:nth-child(5) {
  top: 224px;
  left: 74px;
}
.icon-biaoji > span i:nth-child(6) {
  bottom: 96px;
  left: 104px;
  transform: rotate(45deg);
  font-size: 26px;
}
.icon-biaoji > span i:nth-child(7) {
  bottom: 86px;
  left: 140px;
}
.icon-biaoji > span i:nth-child(8) {
  bottom: 94px;
  left: 178px;
}
.icon-biaoji > span i:nth-child(9) {
  left: 209px;
  bottom: 116px;
  font-size: 18px;
}

.icon-dunpai > span i:nth-child(1) {
  top: 136px;
  left: 94px;
  font-size: 20px;
}
.icon-dunpai > span i:nth-child(2) {
  top: 165px;
  left: 95px;
  font-size: 20px;
}
.icon-dunpai > span i:nth-child(3) {
  top: 194px;
  left: 106px;
  font-size: 18px;
}
.icon-dunpai > span i:nth-child(4) {
  top: 213px;
  left: 128px;
  font-size: 25px;
}
.icon-dunpai > span i:nth-child(5) {
  bottom: 110px;
  right: 83px;
  font-size: 16px;
}
.icon-ring-nei > div > p i b {
  width: 30px;
  height: 2px;
  background: red;
  display: block;
  position: absolute;
  transform: rotate(45deg);
}

body .icon-genzongzhuangtaixianshi-01 {
  color: #00ffff !important;
  position: absolute !important;
  font-size: 120px !important;
  left: -118px !important;
  top: -96px !important;
}
body .leaflet-popup {
  margin-bottom: 38px !important;
  margin-left: -6px !important;
}
.borderBottom {
  border-bottom: 1px solid #284c75;
  margin: 0 4px;
}
.listBon:last-child {
  border: none !important;
}
.lng-lat-show {
  position: relative;
  top: 55px;
  text-align: center;
  background: rgba(255, 255, 255, 0.6);
  width: 150px;
  padding: 5px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  left: 100px;
}
.bottomBor {
  position: fixed;
  height: 6px;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #00ffff;
  z-index: 990;
}
.fexTop {
  position: fixed;
  top: 0;
  width: 400px;
  z-index: 401;
  left: calc(50% - 200px);
}
.fexTop img {
  width: 400px;
  height: 8vh;
  margin: 0 auto;
  display: flex;
}
.fexTop span {
  position: absolute;
  width: 100%;
  text-align: center;
  display: block;
  z-index: 401;
  color: #fff;
  font-size: 28px;
  top: 0;
  line-height: 8vh;
  letter-spacing: 10px;
  left: 5px;
}
.icon-titleicon {
  font-size: 28px !important;
  position: fixed;
  background: #284c75;
  z-index: 473;
  top: 16px;
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-left: 97%;
  color: #fff;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.icon-titleicon:active {
  color: #04eafb;
}
.cur_title {
  right: 563px;
}
.sur_Title {
  right: 780px;
}

#s-list-box #videoBeginBox {
  z-index: 999999999;
}
// .right-drawer .leftCon {
//   height: 0 !important;
// }
// .titleWidth2 {
//   width: calc(100% - 554px);
// }
// .titleWidth1 {
//   width: calc(100% - 771px);
// }
// .titleWidth2 > span {
//   letter-spacing: 10px;
//   left: 5px;
// }
// .titleWidth1 > span {
//   letter-spacing: 4px;
//   left: 2px;
// }
.track-prompt {
  position: absolute;
  left: 46px;
  width: 280px !important;
  padding: 6px;
  border-radius: 5px;
  font-size: 18px;
  height: auto !important;
  display: block;
}
.mapId /deep/ .leaflet-control {
  top: 193px;
  margin-top: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}
.moreTop /deep/ .leaflet-control {
  top: 285px !important;
}
.mapId /deep/ .leaflet-control > a {
  width: 44px;
  height: 42px;
  background: transparent;
}
.mapId /deep/ .leaflet-control > div {
  background: rgba(40, 76, 117, 0.6);
  color: #fff;
  border-radius: 5px;
  margin-left: 46px;
}
.mapId /deep/ .leaflet-top,
.mapId /deep/ .leaflet-bottom {
  position: fixed;
}
.mapId /deep/ .leaflet-control > div a {
  color: rgba(255, 255, 255, 0.8);
}
.mapId /deep/ .leaflet-control > div a.start {
  background-image: url("../../assets/jt.png");
}
.mapId /deep/ .leaflet-control > div a.finish {
  background-image: url("../../assets/wc.png");
}
.mapId /deep/ .leaflet-control > div a.cancel {
  background-image: url("../../assets/gb.png");
}
.mapId /deep/.leaflet-popup-content-wrapper > div a.deletemarkup {
  background-image: url("../../assets/sc.png");
}
.mapId /deep/.leaflet-popup-content-wrapper > div a.zoomto {
  background-image: url("../../assets/jz.png");
  background-size: 18px 18px;
}
.mapId /deep/.leaflet-control-measure .results .heading {
  color: #fff;
}
.mapId /deep/.leaflet-control-measure .results .group {
  border-color: #284c75;
}
.mapId
  /deep/.leaflet-measure-resultpopup
  .leaflet-popup-content-wrapper
  .leaflet-popup-content {
  padding: 10px;
  width: 190px !important;
  border-radius: 5px;
  color: rgba(255, 255, 255, 1);
  background: rgba(40, 76, 117, 0.6);
}
.mapId /deep/.leaflet-popup-content-wrapper > div a {
  color: #fff;
}
.mapId /deep/.leaflet-control-measure h3,
.mapId /deep/.leaflet-measure-resultpopup h3,
.mapId /deep/.leaflet-control-measure .tasks,
.mapId /deep/.leaflet-measure-resultpopup .tasks {
  border-color: #284c75 !important;
}
#cesiumContainer {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
}
</style>
