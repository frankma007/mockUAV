<template>
     <div class="mapId"          id="mapId"    ></div>
</template>
<script>
import {
  initMyMap,
  initFKLayer,
  changeBaseLayer,
  initMeasureControl,
} from "@/assets/js/playMapLayer.js";
import L from "leaflet";

export default {
  data(){
    return{

      map: null,
    uiConfig: {
        title: "",
        logoIconUrl: "",
        logoIconSize: [38, 38],
        headerHeight: 38,
        mapHeight: 1080,
        footerHeight: 40,
        wsuri: "ws://111.231.99.242:3041/websocket", // ws地址
        dictType: {
          xjzh: "default",
          cq01: "aircraft",
          zjkzh: "aircraft",
          dqhg: "aircraft",
          dqzh: "aircraft",
          cast: "aircraft",
        },
        aircraftCfg: {
          unknown: {
            // 不明确目标
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/arrow.png",
                iconSize: [32, 32],
                lableCfgs: [
                  {
                    zoomRange: [10, 25],
                    bkSize: [100, 116],
                    labelKey: [
                      "ID_Target_Fusion",
                      "Type_Target",
                      "Distance_Target",
                      "Speed",
                      "Altitude_Target",
                      "Angle_P_Target",
                    ],
                  },
                ],
              },
            },
          },
          wing: {
            // 固定翼无人机目标
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/wing.png",
                iconSize: [32, 32],
                lableCfgs: [
                  {
                    zoomRange: [10, 25],
                    bkSize: [100, 116],
                    labelKey: [
                      "ID_Target_Fusion",
                      "Type_Target",
                      "Distance_Target",
                      "Speed",
                      "Altitude_Target",
                      "Angle_P_Target",
                    ],
                  },
                ],
              },
            },
          },
          uav: {
            // 多旋翼无人机目标
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/uav_default.png",
                iconSize: [32, 32],
                lableCfgs: [
                  {
                    zoomRange: [10, 25],
                    bkSize: [100, 116],
                    labelKey: [
                      "ID_Target_Fusion",
                      "Type_Target",
                      "Distance_Target",
                      "Speed",
                      "Altitude_Target",
                      "Angle_P_Target",
                    ],
                  },
                ],
              },
            },
          },
          kite: {
            // 风筝
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/kite.png",
                iconSize: [32, 32],
              },
            },
          },
          balloon: {
            // 气球
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/balloon.png",
                iconSize: [32, 32],
              },
            },
          },
          bird: {
            // 鸟
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/bird.png",
                iconSize: [32, 32],
              },
            },
          },
          person: {
            // 人
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/person.png",
                iconSize: [32, 32],
                lableCfgs: [
                  {
                    zoomRange: [10, 25],
                    bkSize: [100, 116],
                    labelKey: [
                      "ID_Target_Fusion",
                      "Type_Target",
                      "Distance_Target",
                      "Speed",
                      "Altitude_Target",
                      "Angle_P_Target",
                    ],
                  },
                ],
              },
            },
          },
          car: {
            // 车
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/car.png",
                iconSize: [32, 32],
              },
            },
          },
          plane: {
            // 有人机
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/plane.png",
                iconSize: [32, 32],
                lableCfgs: [
                  {
                    zoomRange: [10, 25],
                    bkSize: [100, 116],
                    labelKey: [
                      "ID_Target_Fusion",
                      "Type_Target",
                      "Distance_Target",
                      "Speed",
                      "Altitude_Target",
                      "Angle_P_Target",
                    ],
                  },
                ],
              },
            },
          },
          aircraft: {
            aryTimingStatus: [
              {
                beginSecs: 0,
                endSecs: 60,
                status: "active",
                statusName: "活动",
              },
              {
                beginSecs: 60,
                endSecs: 120,
                status: "default",
                statusName: "正常",
              },
              {
                beginSecs: 120,
                endSecs: 300,
                status: "timeout",
                statusName: "超时",
              },
              {
                beginSecs: 300,
                endSecs: 2147483647,
                status: "dead",
                statusName: "休眠",
              },
            ],
            statusCfg: {
              default: {
                iconUrl: "static/img/aircraft_default.png",
                iconSize: [76, 76],
                colorTrack: "yellow",
                weightTrack: 4,
                opacityTrack: 0.5,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [10, 13],
                    bkSize: [60, 36],
                    labelKey: ["FN", "adress"],
                  },
                  {
                    zoomRange: [14, 25],
                    bkSize: [60, 106],
                    labelKey: [
                      "FN",
                      "adress",
                      "alt",
                      "speed",
                      "course",
                      "UTCTime",
                    ],
                  },
                ],
              },
              selected: {
                iconUrl: "static/img/aircraft_selected.png",
                iconSize: [76, 76],
                colorTrack: "orange",
                weightTrack: 6,
                opacityTrack: 0.5,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [1, 10],
                    bkSize: [60, 36],
                    labelKey: ["FN", "adress"],
                  },
                  {
                    zoomRange: [11, 25],
                    bkSize: [60, 106],
                    labelKey: [
                      "FN",
                      "adress",
                      "alt",
                      "speed",
                      "course",
                      "UTCTime",
                    ],
                  },
                ],
              },
              active: {
                // iconUrl: '',
                iconUrl: "static/img/default_default.png",
                // iconUrl: require('@/../static/img/default_default.png'),
                // iconUrl: require('../../../static/img/default_default.png'),
                iconSize: [38, 38],
                colorTrack: "gray",
                weightTrack: 2,
                opacityTrack: 0.8,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [1, 10],
                    bkSize: [60, 36],
                    labelKey: ["FN", "adress"],
                  },
                  {
                    zoomRange: [11, 25],
                    bkSize: [60, 106],
                    labelKey: [
                      "FN",
                      "adress",
                      "alt",
                      "speed",
                      "course",
                      "UTCTime",
                    ],
                  },
                ],
              },
              timeout: {
                iconUrl: "static/img/aircraft_timeout.png",
                iconSize: [38, 38],
                colorTrack: "gray",
                weightTrack: 2,
                opacityTrack: 0.8,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [1, 10],
                    bkSize: [60, 36],
                    labelKey: ["FN", "adress"],
                  },
                  {
                    zoomRange: [11, 25],
                    bkSize: [60, 106],
                    labelKey: [
                      "FN",
                      "adress",
                      "alt",
                      "speed",
                      "course",
                      "UTCTime",
                    ],
                  },
                ],
              },
              dead: {
                iconUrl: "static/img/aircraft_dead.png",
                iconSize: [38, 38],
                colorTrack: "gray",
                weightTrack: 2,
                opacityTrack: 0.8,
                ignorZeroSpeed: false,
                maxPointsOfTrack: 120,
                lableCfgs: [
                  {
                    zoomRange: [1, 10],
                    bkSize: [60, 36],
                    labelKey: ["FN", "adress"],
                  },
                  {
                    zoomRange: [11, 25],
                    bkSize: [60, 106],
                    labelKey: [
                      "FN",
                      "adress",
                      "alt",
                      "speed",
                      "course",
                      "UTCTime",
                    ],
                  },
                ],
              },
            },
          },
          uavSwarm: {
            // 无人机群 带标牌
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/uav_default.png",
                iconSize: [32, 32],
                lableCfgs: [
                  {
                    zoomRange: [10, 25],
                    bkSize: [100, 116],
                    labelKey: [
                      "ID_Target_Fusion",
                      "Type_Target",
                      "Distance_Target",
                      "Speed",
                      "Altitude_Target",
                      "Angle_P_Target",
                      "Type",
                      "Count",
                    ],
                  },
                ],
              },
            },
          },
          uavSwarm2: {
            // 无人机群 不带标牌
            statusCfg: {
              default: {
                // 正常
                iconUrl: "static/img/uav_default.png",
                iconSize: [32, 32],
              },
            },
          },
        },
        mapConfig: {
          mapZoom: 13, // 当前地图zoom值
          

          mapCenter: [22.112353, 113.548569], // 初始化地图中心
          defaultBaseLayer: "天地图影像",
          baseLayers: [
            {
              index: "LXDT",
              label: "离线地图",
              key: "离线地图",
            },
            {
              index: "WXYX",
              label: "卫星影像",
              key: "天地图影像",
            },
            {
              index: "DZDT",
              label: "电子地图",
              key: "天地图",
            },
            {
              index: "SSDT",
              label: "深色地图",
              key: "智图午夜蓝",
            },
            {
              index: "CSBJ",
              label: "纯色背景",
              key: "纯色背景",
            },
          ],
          layerControlCfg: {
            pnlCfg: {
              floatLeft: "0px",
              floatTop: "0px",
            },
            nodeData: null,
            defaultProps: {
              label: "label",
              children: "children",
            },
            defaultCheckedKeys: [],
          },
          
        },
      },
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

    }

  },
  mounted(){
    this.map = initMyMap("mapId", this.uiConfig.mapConfig);




let circle = L.circle([22.152353, 113.492999], 500,{
            stroke: true,
            color: "#D9001B",
            opacity: 1,
            fill: true,
            fillColor: null, // same as color by default
            fillOpacity: 0.2,
            clickable: true,
          },);
//  circle.editing.enable();
 circle.addTo(this.map)
 let circle2 = L.circle([22.152353, 113.492999], 2000,{
            stroke: true,
            color: "#F9B604",
            opacity: 1,
            fill: true,
            fillColor: null, // same as color by default
            fillOpacity: 0.2,
            clickable: true,
          },);
//  circle.editing.enable();
 circle2.addTo(this.map)




let circle3 = L.circle([22.114353, 113.544569], 300,{
            stroke: true,
            color: "#D9001B",
            opacity: 1,
            fill: true,
            fillColor: null, // same as color by default
            fillOpacity: 0.2,
            clickable: true,
          },);
//  circle.editing.enable();
 circle3.addTo(this.map)
 let circle4 = L.circle([22.114353, 113.544569], 1200,{
            stroke: true,
            color: "#F9B604",
            opacity: 1,
            fill: true,
            fillColor: null, // same as color by default
            fillOpacity: 0.2,
            clickable: true,
          },);
//  circle.editing.enable();
 circle4.addTo(this.map)







  },
  methods:{
  },

}
</script>
<style lang="scss" scoped>
#mapId{
  border-radius: 3px;
  position:absolute;
  left:3px;top:3px;
  border:4px;
  width: calc(100% - 6px);
  height:calc(100% - 6px);
}

 .leaflet-control-attribution.leaflet-control {
    display: none;
}
::v-deep(.iclient-leaflet-logo.leaflet-control){
    display: none;
}
</style>


