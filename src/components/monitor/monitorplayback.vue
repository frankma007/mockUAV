<template>
  <el-container class="myContainer" ref="myContainer">
    <el-main>
      <div class="mapId" :class="{cur: drawerVisible, sur: rightVisible}" id="playBackmapId" z-index="10">
      </div>
      <div class="right-drawer" :class="{cur: drawerVisible, sur: rightVisible}">
        <router-view></router-view>
      </div>
    </el-main>
    <img class="logo-img" src="../../assets/logo.png" alt="" @click="onLogin">
    <!-- 左侧梯形 -->
    <div class="left-trapezoid" :class="{more: moreVisible}"></div>
    <div class="top-img" :class="{leftBoxPic:isLeftSHow}">
      <div>
        <p :class="{'gl-pic':indexPic===item.title&&drawerVisible}" v-for="(item, index) of list" :key="index.title">
          <i :class="item.class" @click="e => leftBtnClicked(e, item.route,item.title)" :title='item.title'></i>
          <span>{{item.title}}</span>
        </p>
        <p :class="{'gl-pic':indexPic==='更多'&&drawerVisible}">
          <i class="iconfont icon-gengduo" @click="e => leftBtnClicked(e, 'more','更多')" title='更多'></i>
          <span>更多</span>
        </p>
      </div>
      <div v-if="moreVisible">
        <p></p>
        <p></p>
        <p :class="{'gl-pic':indexPic===item.title&&drawerVisible}" v-for="(item, index) of list1" :key="index">
          <i :class="item.class" @click="e => leftBtnClicked(e, item.route,item.title)" :title='item.title'></i>
          <span>{{item.title}}</span>
        </p>
      </div>
    </div>
    <div class="flex-right" :class="gdbtnchange === true ? 'guangdian guangdian-act' : 'guangdian'">
      <div>
        <i class="pic" @click="GdTaishi"></i>
        <i class="iconfont icon-pinpufenxi"></i>
        <i class="iconfont icon-liebiao" @click="GdList"></i>
      </div>
      <p>
        <span></span>
      </p>
    </div>

    <!-- 右侧态势显示区域 -->
    <!-- <div class="right-box" :class="{sur: rightVisible}">
      <router-view></router-view>
    </div> -->
    <!-- 顶部按钮 -->
    <div class="top-box" :class="{cur: drawerVisible, sur: rightVisible}">
      <div>
        <div>
          <img src="../../assets/imgs/map/top/top-4.png" alt="" @click="resetMapCenter">
        </div>
        <div>
          <img src="../../assets/imgs/map/top/top-5.png" alt=""
            @click="() => {this.layerSelectVisible = !this.layerSelectVisible}">
          <div v-show="layerSelectVisible" class="layer-select">
            <div v-for="(item, key) in uiConfig.mapConfig.baseLayers" :key="item.label">
              <span>{{item.label}}</span>
              <el-switch v-model="currentBaseLayer" :active-value="item.key" @change="changeBaseLayer(item.key)">
              </el-switch>
              <el-divider v-if="uiConfig.mapConfig.baseLayers[key + 1]"></el-divider>
            </div>
          </div>
        </div>
        <div>
          <img src="../../assets/imgs/map/top/top-3.png" alt="">
        </div>
      </div>
    </div>
    <div id="s-list-box">
      <alarm-list :data="alarmData" :class="{hover_hength:isGdList}"></alarm-list>
      <target-list class="target-list" :targetList="tarData" :delTarget="delTarget" :areaList="fkData"
        :trackData="trackData" :drawer="drawerVisible" :Adrawer="rightVisible" @areaChange="changeFK"
        @selectClick="targetSelect" @filterChange="filterChange" v-if="isGdList" :indexIsListShow="true"
        :isPlay='false'>
      </target-list>
    </div>
  </el-container>
</template>

<script>
// import axios from 'axios'
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import {
  initMyMap,
  initFKLayer,
  changeBaseLayer
} from '../js/initMapLayer.js'
import {
  getLayersData,
  drawArea
} from '../js/layersDraw.js'
import svgImage from '../svg/circleMenu'
import {
  clearMarkerData,
  drawTrack,
  deleteTrack
} from '../js/monitorData.js'
import {
  drawTracks
} from '../js/iconDataMap.js'
import {
  Container,
  Main
} from 'element-ui'

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
    alarmList: () => import('@/views/map/alarm/index.vue'),
    addIndex: () => import('@/views/task/configuration/add.vue')
  },
  computed: {
    ...mapState('config', [
      // 'targetLabel', // 是否显示目标标牌
      // 'baseLayerName', // 当前显示底图
      'list',
      'list1'
    ])
    // ...mapState('equipment', [
    //   'wsuri'
    // ])
  },
  data () {
    return {
      currentOption: '',
      ldData: -1,
      gdData: -1,
      calibration: true, // 动态标校图片
      gdbtnchange: false,
      tarData: [],
      isLeftSHow: false, // 左侧边栏是否显示
      isGdList: false, // 数据融合列表是否显示
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
                    'Altitude_Target'
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
                    'Altitude_Target'
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
                    'Altitude_Target'
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
                    'Altitude_Target'
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
          mapZoom: 13, // 当前地图zoom值
          mapCenter: [38.83905278, 105.61799167], // 初始化地图中心
          defaultBaseLayer: '天地图',
          baseLayers: [
            {
              label: '任务设备部署',
              key: '0'
            },
            {
              label: '卫星影像',
              key: '天地图影像'
            },
            {
              label: '电子地图',
              key: '天地图'
            },
            {
              label: '深色地图',
              key: '智图午夜蓝'
            },
            {
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
      drawTracksList: []// 无线电数据
    }
  },
  mounted: async function () {
    // this.$store.state.equipment.wsuri = this.$store.state.equipment.wsuriA
    this.http.post(this.$equipmentA + '/ufohunter/Video/fixed/queryFixed', {}).then(res => {
      drawTracks(res)
      res['固定式'].forEach((item, index) => {
        if (item.equipmentInfo_type === '光电') {
          item.equipmentInfo_equipId = index
          this.drawTracksList.splice(0, 0, item)
        }
      })
    })
    // typeMap(true)
    $('body').on('click', '.leaflet-popup-content', function () {
      event.stopPropagation()
      // $('.leaflet-popup-pane').html('')
    })
    if (this.$route.name === 'GuangDianTaiShi') {
      this.rightVisible = true
      this.gdbtnchange = true
    } else {
      this.rightVisible = false
      this.gdbtnchange = false
    }
    // this.uiConfig.wsuri = this.$store.state.equipment.wsuri
    // initMonitMapConfig(this.uiConfig.aircraftCfg, this.uiConfig.dictType, this.targetLabel, false, true, false, this.targetDeleted)
    // this.map = initMyMap('playBackmapId', this.uiConfig.mapConfig)
    // this.currentBaseLayer = this.uiConfig.mapConfig.defaultBaseLayer
    // this.changeState({ state: 'baseLayerName', value: this.currentBaseLayer })
    // let mc = initMeasureControl()
    this.initFK() // 初始化防控区域图层
    // initMapforMonitorData(this.map)
    this.map.on('zoomend', this.map_zoomend)
    clearMarkerData()
    // this.$store.commit('equipment/changeMapData', this.map)
  },
  destroyed: function () {
    // 页面销毁时关闭长连接
    this.mqsocket.closeWebsocket()
    // closeWebsocket()
  },
  methods: {
    ...mapMutations('config', [
      'changeState'
    ]),
    GdTaishi () { // 光电态势的按钮动作
      // this.isGdList = false
      this.rightVisible = !this.rightVisible
      if (this.rightVisible === true) {
        this.drawerVisible = false
        this.currentPage = ''
        this.gdbtnchange = true
        this.$router.replace({ name: 'GuangDianTaiShi' })
      } else {
        this.gdbtnchange = false
        this.$router.replace('/app')
      }
    },
    GdList () {
      this.isGdList = !this.isGdList
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
      this.map.flyTo(this.uiConfig.mapConfig.mapCenter, 13)
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
      document.getElementById('first-button-box').onmousedown = () => self.btnGroup()
      return false
    },
    /**
   * 目标类型点击事件
   */
    /**
   * 设置敌我属性
   */
    // /////////////////// 左侧按钮栏点击事件 ///////////////////////////////
    leftBtnClicked (e, type, index) {
      debugger
      this.indexPic = index
      let dom = e.currentTarget
      console.log('0', type)

      if (dom.title !== '更多') {
        if (this.currentPage !== dom.title) {
          this.drawerVisible = true
          this.currentPage = dom.title
        } else {
          this.drawerVisible = false
          this.currentPage = ''
        }
        if (this.drawerVisible === true) {
          this.rightVisible = false
          this.gdbtnchange = false
        }
      } else {
        this.moreVisible = !this.moreVisible
      }
      if (dom.className.indexOf('active') !== -1) {
        dom.classList.remove('active')
      } else {
        dom.classList.add('active')
      }
      if (type === 'live') {
        this.$router.replace({ name: type })
      }
      // 判断不同类型
      if (type !== 'more') {
        this.$router.push({ name: type }, onComplete => { }, onAbort => { })
        if (type === 'calibration') {
          this.calibration = !this.calibration
        } else {
          this.calibration = true
        }
      }
      // this.$router.push({ name: 'playback' })
      // this.$router.replace('/index/playback')
      // switch (type) {
      //   case 'equipment':
      //     this.$router.push({ name: 'equipment' }, onComplete => {}, onAbort => {})
      // }
    },

    // /////////////////// 防控区域 ///////////////////////////////
    initFK () { // 获取数据，初始化防控区域图层
      this.fkLayer = initFKLayer()
      getLayersData('FKQY').then(data => {
        this.fkData = data
        drawArea(this.fkData[0], this.fkLayer)
      })
    },
    changeFK (key) { // 选择显示不同的防控区域
      if (this.fkData.hasOwnProperty(key)) {
        this.fkLayer.clearLayers()
        drawArea(this.fkData[key], this.fkLayer)
      }
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
    }
    // /////////////////// 手动跟踪 ///////////////////////////////
  },
  watch: {
    drawerVisible: {
      handler (val) {
        this.layoutResize()
      }
    },
    rightVisible: {
      handler (val) {
        this.layoutResize()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hover_hength {
  bottom: 214px !important;
}
#s-list-box {
  position: fixed;
  // width: 100%;
  left: 0;
  bottom: 0;
  z-index: 400;
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
    // padding: 53px;
    position: relative;
    // transform: rotate(180deg);
    opacity: 0;
    transition: all 0.6s;
    > i {
      position: absolute;
      color: #fff;
      font-size: 38px;
    }
    .pic {
      top: 20px;
      margin-left: 46px;
      background-image: url("../../assets/imgs/map/radio/btn-gd.png");
      width: 36px;
      height: 31px;
      background-size: cover;
    }
    .pic:active {
      background-image: url("../../assets/imgs/map/radio/btn-gd-active.png");
    }

    > .icon-pinpufenxi {
      left: 10px;
      margin-top: 68px;
      font-size: 36px;
    }
    .icon-pinpufenxi:active {
      color: #03f6f8;
    }
    > .icon-liebiao {
      font-size: 26px;
      bottom: 16px;
      margin-left: 46px;
    }
    > .icon-liebiao:active {
      color: #03f6f8;
    }
  }
}

#playBackmapId {
  /*margin: -20px -20px -20px -20px;*/
  height: 100%;
  width: 100%;
}
#playBackmapId.cur {
  width: 72%;
  /*width: calc(100% - 553px);*/
  /*right: 553px;*/
}
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
.leftBoxPic {
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
  position: absolute;
  right: 0;
}
.top-box {
  position: absolute;
  top: 10px;
  right: 10%;
  z-index: 400;
  display: flex;
  > div {
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    overflow: hidden;
    > div {
      width: 65px;
      height: 60px;
      /*height: 60px;*/
      background-color: #284c75;
      border-right: 1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    > div:last-child {
      border-right: 0px;
    }
    > div:active {
      background-color: #071459;
    }
    > div:focus {
      background-color: #071459;
    }
  }
  img {
    width: 45px;
  }

  .layer-select {
    position: absolute;
    top: 65px;
    color: #ffffff;
    font-size: 22px;
    background-color: rgba(40, 76, 117, 0.5);
    border-radius: 5px;
    width: 200px;
    /deep/ .el-divider--horizontal {
      margin: 0;
      background-color: #284c75;
    }
    span,
    /deep/ .el-switch {
      margin: 10px;
    }
  }
}
.top-box.cur {
  right: calc(10px + 28%);
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
  position: absolute;
  top: 3px;
  left: 20px;
  width: 78px;
  z-index: 403;
}
// top导航栏
.top-img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 402;
  color: #fff;
  background: rgba(40, 76, 117, 0.6);
  width: calc(100% - 771px);
  transition: all 0.4s;
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
  background: #284c75;
  width: 0;
  height: 100%;
  z-index: 999;
}
// 右侧态势显示界面尺寸
.right-drawer.sur {
  width: 771px;
  left: calc(100% - 771px);
}
// 右侧菜单栏显示区域
.right-drawer.cur {
  width: 28%;
  left: 72%;
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
  right: 28%;
}
</style>
<style>
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
</style>
