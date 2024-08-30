import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-rotatedmarker'
import { formatDate, datePlusSecond, invalidateLatlng, course2String, isNullObj, isNotNullObj, copyObj } from './util.js'
import { data, map } from 'jquery'

let monitorData = [] // rest api获得的监视对象数组，监视的数据源
let dictMonitorData = {} // 为便于检索，创建key-value字典
function initMonitorData (data) {
  monitorData = data
  // 初始化key-value字典
  for (let i = 0; i < monitorData.length; i++) {
    let obj = monitorData[i]
    dictMonitorData[obj.deviceId] = obj
    dictDeviceStatus[obj.deviceId] = {}
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// 以下是实时更新相关的

// 建立字典，并不创建obj
function setupMonitorDataDict (obj) {
  dictMonitorData[obj.deviceId] = obj
  if (!dictDeviceStatus.hasOwnProperty(obj.deviceId)) {
    dictDeviceStatus[obj.deviceId] = {}
  }
}

// 新增了一个obj到monitorData， 同时建立字典
function addMonitorData (obj) {
  monitorData.push(obj)
  setupMonitorDataDict(obj)
}

// 更新monitorData中的obj对象， 注意仅更新传入参数obj的属性， 可以允许  monitorData中的obj对象的属性可能多于传入参数obj对象的属性
function updateMonitorData (obj) {
  let obj0 = dictMonitorData[obj.deviceId]
  // if (isNotNullObj(obj0) && isNotNullObj(obj)) {
  // copyObj(obj, obj0)
  // }
  for (let key in obj) {
    obj0[key] = obj[key]
  }
  // obj.deviceId = obj0.deviceId
  // obj.comment = obj0.comment
  // obj.org = obj0.org
  // dictMonitorData[obj.deviceId] = obj
}

function IsNewMonitorData (obj) {
  if (!dictMonitorData.hasOwnProperty(obj.deviceId)) {
    return true
  }

  return obj.utcTime > dictMonitorData[obj.deviceId].utcTime
}

// 如果obj不存在，新增了一个obj到monitorData， 同时建立字典
// 如果obj已经存在，则更新monitorData中的obj对象的属性
// 适用于socket接收数据后的处理
function addOrUpdateMonitorData (obj) {
  if (dictMonitorData.hasOwnProperty(obj.deviceId)) {
    updateMonitorData(obj)
  } else {
    addMonitorData(obj)
  }
}

function updateAllMonitorData (obj, zoom, clickedCallback, deleIS) {
  // monitorData.splice(0)
  markerClickedCallback = clickedCallback
  dictMonitorData[obj.ID_Target_Fusion] = obj
  // if (obj.Status_Track === 4 && dictMonitorData.hasOwnProperty(obj.ID_Target_Fusion)) {
  //   delete dictMonitorData[obj.ID_Target_Fusion]
  // }
  if (dictTrack.hasOwnProperty(obj.ID_Target_Fusion)) {
    drawTrack(obj)
  }
  drawMarker(false, obj, '', markerClick)
  if (deleIS === true) {
    dictLabel[obj.ID_Target_Fusion].remove()
    delete dictLabel[obj.ID_Target_Fusion]
  }
  if (obj.Type_Target === 2 || obj.Type_Target === 1) { // 目标类型为无人机时绘制速度方向箭头和告警背景
    drawAlarm(false, obj)
    drawDirection(false, obj)
  } else {
    if (dictAlarm.hasOwnProperty(obj.ID_Target_Fusion)) {
      dictAlarm[obj.ID_Target_Fusion].remove()
      delete dictAlarm[obj.ID_Target_Fusion]
    }
    if (dictDirection.hasOwnProperty(obj.ID_Target_Fusion)) {
      dictDirection[obj.ID_Target_Fusion].remove()
      delete dictDirection[obj.ID_Target_Fusion]
    }
  }
  if (selectedAdress === obj.ID_Target_Fusion) {
    markerClickedCallback(obj, true)
  }
  if (showLable && (obj.Type_Target === 1 || obj.Type_Target === 2 || obj.Type_Target === 8 || obj.Type_Target === 0)) {
    let type = dictTargetType[obj.Type_Target]
    let cfg = getLabelCfg(type, obj, zoom)
    if (cfg === null) {
      // 删除标牌
      if (dictLabel.hasOwnProperty(obj.ID_Target_Fusion)) {
        dictLabel[obj.ID_Target_Fusion].remove()
        delete dictLabel[obj.ID_Target_Fusion]
      }
      return null
    }
    let sLabel = getLabelContent(obj, zoom)
    if (sLabel === '') {
      // 删除标牌
      if (dictLabel.hasOwnProperty(obj.ID_Target_Fusion)) {
        dictLabel[obj.ID_Target_Fusion].remove()
        delete dictLabel[obj.ID_Target_Fusion]
      }
      return null
    }
    drawLabel(false, obj, sLabel, cfg.bkSize)
  } else if (dictLabel.hasOwnProperty(obj.ID_Target_Fusion)) {
    dictLabel[obj.ID_Target_Fusion].remove()
    delete dictLabel[obj.ID_Target_Fusion]
  }
}

function deleteTarget (obj) { // 删除目标数据和态势图标
  if (obj.ID_Target_Fusion === selectedAdress) { // 关闭环形菜单
    selectedAdress = null
    markerClickedCallback(obj, false)
  }
  if (dictMonitorData.hasOwnProperty(obj.ID_Target_Fusion)) { // 删除目标数据
    delete dictMonitorData[obj.ID_Target_Fusion]
  }

  if (dictMarker.hasOwnProperty(obj.ID_Target_Fusion)) { // 删除航迹图标
    dictMarker[obj.ID_Target_Fusion].remove()
    delete dictMarker[obj.ID_Target_Fusion]
  }

  if (dictLabel.hasOwnProperty(obj.ID_Target_Fusion)) { // 删除标牌
    dictLabel[obj.ID_Target_Fusion].remove()
    delete dictLabel[obj.ID_Target_Fusion]
  }

  if (dictDirection.hasOwnProperty(obj.ID_Target_Fusion)) { // 删除方向箭头图标
    dictDirection[obj.ID_Target_Fusion].remove()
    delete dictDirection[obj.ID_Target_Fusion]
  }

  if (dictAlarm.hasOwnProperty(obj.ID_Target_Fusion)) { // 删除告警背景
    dictAlarm[obj.ID_Target_Fusion].remove()
    delete dictAlarm[obj.ID_Target_Fusion]
  }

  if (dictTrack.hasOwnProperty(obj.ID_Target_Fusion)) { // 删除尾迹点
    deleteTrack(obj.ID_Target_Fusion)
  }
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// 以下是total相关的

// //////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// 以下是el_table相关的

// //////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// 以下是map 显示相关的
let layerMarker = null
let layerLabel = null
let layerTrack = null

let layerRayTrack = null
let mymap = null
let imgPathOffset = '@/../'
function initMapforMonitorData (map) {
  mymap = map
  layerMarker = L.layerGroup([])
  layerLabel = L.layerGroup([])
  layerTrack = L.layerGroup([])
  layerRayTrack = L.layerGroup([])

  layerMarker.addTo(mymap)
  layerLabel.addTo(mymap)
  layerTrack.addTo(mymap)
  layerRayTrack.addTo(mymap)
  if (removeDead) {
    setInterval(timer1s, 1000)
  }
}
let showLable = true
var showContent = false
let removeDead = false
let showTrack = false
let selectedAdress = null // 当前被选中的设备地址
/// 配置类型字典
/// 先按地址找类型
/// 按地址找不到再按 source 找类型
/// 找不到采用default类型
let dictCfgType = null
/// 显示设置
/// 先按类型分
/// 再按状态分
/// 某类型下的各状态的显示配置
let dictTypeCfg = null

let removeDeadSeconds = 5 // 航迹消失前保留时间

let dictDeviceStatus = {} // 设备状态字典

let dictMarker = [] // Marker字典

let markerClickedCallback = null // marker点击触发事件

let targetDeletedCallback = null // 目标删除触发事件

let dictTargetType = ['unknown', 'wing', 'uav', 'kite', 'balloon', 'bird', 'person', 'car', 'plane', 'electric', 'Radio'] // 目标类型字典

let dictTargetTypeName = ['不明确', '固定翼无人机', '多旋翼无人机', '风筝', '气球', '鸟', '人', '车', '有人机', '光电', '无线电测'] // 目标类型名称字典

let dictDirection = [] // 旋翼无人机方向箭头字典

let dictAlarm = [] // 告警动画字典

let dictTrack = [] // 目标尾迹字典

function initMonitMapConfig (typeCfg, cfgType, enableShowLable, enableShowContent, enableRemoveDead, enableShowTrack, delCallback) {
  dictTypeCfg = typeCfg
  dictCfgType = cfgType
  showLable = enableShowLable
  showContent = enableShowContent
  removeDead = enableRemoveDead
  showTrack = enableShowTrack
  targetDeletedCallback = delCallback
}

function getCfgType (obj) {
  if (dictCfgType.hasOwnProperty(obj.deviceId)) return dictCfgType[obj.deviceId]
  else if (dictCfgType.hasOwnProperty(obj.source)) return dictCfgType[obj.source]
  else if (dictCfgType.hasOwnProperty(obj.source.toLowerCase())) return dictCfgType[obj.source.toLowerCase()]
  else return 'default'
}
function typeMap (e) {
  removeDead = e
}
function getDeviceStatus (obj) {
  if (dictDeviceStatus.hasOwnProperty(obj.deviceId)) {
    if (dictDeviceStatus[obj.deviceId].selected === true) return 'selected'
    else if (isNullObj(dictDeviceStatus[obj.deviceId].status)) return 'default'
    else return dictDeviceStatus[obj.deviceId].status
  }
  return 'default'
}

function getLabelCfgByStatus (type, status, zoom) {
  let uiCfg = dictTypeCfg[type].statusCfg
  for (let i = 0; i < uiCfg[status].lableCfgs.length; i++) {
    if (
      zoom >= uiCfg[status].lableCfgs[i].zoomRange[0] &&
      zoom <= uiCfg[status].lableCfgs[i].zoomRange[1]
    ) {
      return uiCfg[status].lableCfgs[i]
    }
  }
  return null
}

function getLabelCfg (type, obj, zoom) {
  // let status = getDeviceStatus(obj)
  let status = 'default'
  return getLabelCfgByStatus(type, status, zoom)
}

function getLabelContent (obj, zoom) {
  // let type = getCfgType(obj)
  let type = dictTargetType[obj.Type_Target]
  let cfg = getLabelCfg(type, obj, zoom)
  if (isNullObj(cfg)) return ''
  if (cfg.labelKey === []) return ''

  let seperator = '<br>'
  let content = ''
  for (let i in cfg.labelKey) {
    let key = cfg.labelKey[i]
    let sFiled = ''
    if (key === 'ID_Target_Fusion') {
      sFiled = 'UFO ' + obj[key]
      if (Number(obj[key]) === Number(localStorage['list'])) {
        sFiled += '<p class="icon-genzongzhuangtaixianshi-01 iconfont"></p>'
      }
    } else if (key === 'Type_Target') {
      sFiled = '目标类型：' + dictTargetTypeName[obj[key]]
    } else if (key === 'Distance_Target') {
      sFiled = '距离：' + obj[key] + 'm'
    } else if (key === 'Speed') {
      sFiled = '速度：' + obj[key] + 'm/s'
    } else if (key === 'Altitude_Target') {
      sFiled = '高度：' + obj[key] + 'm'
    } else if (key === 'Angle_P_Target') {
      sFiled = '俯仰：' + obj[key] + '°'
    } else {
      sFiled = obj[key]
    }
    if (content !== '') content += seperator
    content += sFiled
  }
  return content
}

function drawMarker (addNew, obj, sContent, fnClick) { // 绘制目标图标
  let aMarker
  if (addNew === false && dictMarker.hasOwnProperty(obj.ID_Target_Fusion)) {
    aMarker = dictMarker[obj.ID_Target_Fusion]
    // if (obj.Status_Track === 4) {
    //   aMarker.remove()
    //   delete dictMarker[obj.ID_Target_Fusion]
    //   return
    // }
    let type = dictTargetType[obj.Type_Target]
    let uiCfg = dictTypeCfg[type].statusCfg
    // let status = getObjStatus(obj, uiCfg)
    let status = 'default'
    aMarker.setIcon(
      // eslint-disable-next-line new-cap
      new L.icon({
        iconUrl: imgPathOffset + uiCfg[status].iconUrl,
        iconSize: uiCfg[status].iconSize,
        iconAnchor: [
          uiCfg[status].iconSize[0] / 2,
          uiCfg[status].iconSize[1] / 2
        ]
      })
    )
    if (obj.Type_Target === 0) {
      aMarker.setRotationOrigin('center center')
      aMarker.setRotationAngle(obj.Direction)
    }
    if (sContent !== '') {
      aMarker.setPopupContent(sContent)
    }
    aMarker.setLatLng([obj.Latitude_Target, obj.Longitude_Target])
    aMarker.update()
  } else {
    let type = dictTargetType[obj.Type_Target]
    let uiCfg = dictTypeCfg[type].statusCfg
    // let status = getObjStatus(obj, uiCfg)
    let status = 'default'
    aMarker = L.marker([obj.Latitude_Target, obj.Longitude_Target], {
      // eslint-disable-next-line new-cap
      icon: new L.icon({
        iconUrl: imgPathOffset + uiCfg[status].iconUrl,
        iconSize: uiCfg[status].iconSize,
        iconAnchor: [
          uiCfg[status].iconSize[0] / 2,
          uiCfg[status].iconSize[1] / 2
        ]
      })
    })
    if (obj.Type_Target === 0) {
      // aMarker.setRotationOrigin('center center')
      // aMarker.setRotationAngle(obj.Direction)
    }
    dictMarker[obj.ID_Target_Fusion] = aMarker
    if (sContent !== '') {
      aMarker.bindPopup(sContent)
    }
    if (fnClick !== null) aMarker.on('click', fnClick)
    aMarker.addTo(layerMarker)
  }
}

function drawDirection (addNew, obj) { // 绘制多旋翼无人机方位箭头
  let aMarker
  if (addNew === false && dictDirection.hasOwnProperty(obj.ID_Target_Fusion)) {
    aMarker = dictDirection[obj.ID_Target_Fusion]
    if (obj.Speed === '-' || obj.Direction === '-') {
      aMarker.remove()
      delete dictDirection[obj.ID_Target_Fusion]
      return
    }
    aMarker.setIcon(
      // eslint-disable-next-line new-cap
      new L.icon({
        iconUrl: imgPathOffset + 'static/img/direction_arrow.png',
        iconSize: [32, obj.Speed * 2],
        iconAnchor: [16, obj.Speed * 2]
      })
    )
    aMarker.setRotationOrigin('center bottom')
    aMarker.setRotationAngle(obj.Direction)
    aMarker.setLatLng([obj.Latitude_Target, obj.Longitude_Target])
    aMarker.update()
  } else {
    if (obj.Speed === '-' || obj.Direction === '-') {
      return
    }
    aMarker = L.marker([obj.Latitude_Target, obj.Longitude_Target], {
      // eslint-disable-next-line new-cap
      icon: new L.icon({
        iconUrl: imgPathOffset + 'static/img/direction_arrow.png',
        iconSize: [32, obj.Speed * 2],
        iconAnchor: [16, obj.Speed * 2]
      })
    })
    aMarker.setRotationOrigin('center bottom')
    aMarker.setRotationAngle(obj.Direction)
    dictDirection[obj.ID_Target_Fusion] = aMarker
    aMarker.addTo(layerMarker)
  }
}

function drawAlarm (addNew, obj) {
  let aMarker
  let className = ''
  if (obj.Alarm_Level === 1) {
    className = 'alarm-target-red'
  } else if (obj.Alarm_Level === 2) {
    className = 'alarm-target-orange'
  } else if (obj.Alarm_Level === 3) {
    className = 'alarm-target-yellow'
  }

  if (addNew === false && dictAlarm.hasOwnProperty(obj.ID_Target_Fusion)) {
    aMarker = dictAlarm[obj.ID_Target_Fusion]
    // if (obj.Status_Track === 4 || obj.Alarm_Level === 4) {
    if (obj.Alarm_Level === 4 || obj.Alarm_Level === '-') {
      aMarker.remove()
      delete dictAlarm[obj.ID_Target_Fusion]
      return
    }
    aMarker.setIcon(
      // eslint-disable-next-line new-cap
      new L.divIcon({
        className: className,
        iconAnchor: [1, 1],
        iconSize: [1, 1]
      })
    )
    aMarker.setLatLng([obj.Latitude_Target, obj.Longitude_Target])
    aMarker.update()
  } else {
    // if (obj.Alarm_Level === 4) return
    if (obj.Alarm_Level === 4 || obj.Alarm_Level === '-') return
    aMarker = L.marker([obj.Latitude_Target, obj.Longitude_Target], {
      // eslint-disable-next-line new-cap
      icon: new L.divIcon({
        className: className,
        iconAnchor: [1, 1],
        iconSize: [1, 1]
      }),
      interactive: false
    })
    dictAlarm[obj.ID_Target_Fusion] = aMarker
    aMarker.addTo(layerMarker)
  }
}

// let dataPolylineNum = 0
// let dataPolyline = []
function drawTrack (obj) { // 绘制目标尾迹点
  let tMarker
  let className = 'track-point'
  tMarker = L.marker([obj.Latitude_Target, obj.Longitude_Target], {
    // eslint-disable-next-line new-cap
    icon: new L.divIcon({
      className: className,
      iconAnchor: [2, 2],
      iconSize: [10, 10]
    }),
    interactive: false
  })
  // 线
  // localStorage.listDong = obj.ID_Target_Fusion
  // dataPolylineNum++
  // if (dataPolylineNum % 6 !== 0) {
  //   dataPolyline.push([obj.Latitude_Target, obj.Longitude_Target])
  // }
  // dataPolyline.push([obj.Latitude_Target, obj.Longitude_Target])
  // // let colorArr = ['rgb(146,1,139)', 'rgb(246,80,27)', 'rgb(134,64,0)', 'rgb(33,178,159)', 'rgb(134,192,46)', 'rgb(238,185,28)', 'rgb(146,1,139)']
  // // let index = parseInt(Math.random() * 6)
  // tMarker = L.polyline(data, {
  //   // eslint-disable-next-line new-cap
  //   color: '#000',
  //   interactive: false
  // })
  // end
  tMarker.addTo(layerTrack)
  if (dictTrack.hasOwnProperty(obj.ID_Target_Fusion)) {
    dictTrack[obj.ID_Target_Fusion].push(tMarker)
  } else {
    dictTrack[obj.ID_Target_Fusion] = []
    dictTrack[obj.ID_Target_Fusion].push(tMarker)
  }
}

function deleteTrack (id) {
  if (id) {
    if (dictTrack.hasOwnProperty(id)) {
      for (let marker of dictTrack[id]) {
        layerTrack.removeLayer(marker)
      }
      delete dictTrack[id]
    }
  } else {
    layerTrack.clearLayers()
    dictTrack.splice(0)
  }
}

function markerClick (e) {
  for (let key in dictMonitorData) {
    let obj = dictMonitorData[key]
    if (dictMarker.hasOwnProperty(obj.ID_Target_Fusion)) {
      let marker = dictMarker[obj.ID_Target_Fusion]
      if (e.target._leaflet_id === marker._leaflet_id) {
        if (selectedAdress === obj.ID_Target_Fusion) {
          selectedAdress = null
          markerClickedCallback(obj, false)
          dictMarker[obj.ID_Target_Fusion].setZIndexOffset(500)
        } else {
          selectedAdress = obj.ID_Target_Fusion
          markerClickedCallback(obj, true)
          dictMarker[obj.ID_Target_Fusion].setZIndexOffset(2000)
        }
        // selectObj(obj.ID_Target_Fusion, e.target._map.getZoom(), obj)
        // if (showContent) {
        //   openPopup(obj.deviceId, e.target._map.getZoom())
        // }
      }
    }
  }
}

function openPopup (deviceId, mapZoom) {
  let sContent = getLabelContent(dictMonitorData[deviceId], mapZoom)
  let aMarker = dictMarker[deviceId]
  if (isNotNullObj(aMarker)) {
    if (sContent === '') {
      if (aMarker.isPopupOpen()) {
        aMarker.closePopup()
      }

      aMarker.closePopup()
    } else {
      if (aMarker.hasOwnProperty('_popup')) aMarker.unbindPopup()
      aMarker.bindPopup(sContent)
      aMarker.openPopup()
    }
  }
}

function selectObj (selected, mapZoom, obj) {
  let aMarker
  let type = getCfgType(dictMonitorData[selected])
  let uiCfg = dictTypeCfg[type].statusCfg
  if (dictDeviceStatus[selected].selected === true) {
    // 如果原来是被选中的，再选中变成不选中
    dictDeviceStatus[selected].selected = false
    selectedAdress = null
    if (dictMarker.hasOwnProperty(selected)) {
      let status = getDeviceStatus(dictMonitorData[selected])
      aMarker = dictMarker[selected]
      aMarker.setIcon(
        // eslint-disable-next-line new-cap
        new L.icon({
          iconUrl: imgPathOffset + uiCfg[status].iconUrl,
          // iconUrl: require(`../../../${uiCfg[status].iconUrl}.png`),
          // iconUrl: require('../../../static/img/aircraft_default.png'),
          // iconUrl: require(uiCfg[status].iconUrl),
          iconSize: uiCfg[status].iconSize,
          iconAnchor: [
            uiCfg[status].iconSize[0] / 2,
            uiCfg[status].iconSize[1] / 2
          ]
        })
      )
      aMarker.update()
    }
    if (showLable) updateDeviceLabel(dictMonitorData[selected], mapZoom)
    if (showTrack) updateMonitorTrack(dictMonitorData[selected], mapZoom)

    markerClickedCallback(obj, false)
  } else {
    // 选中的不是原先被选中的对象是的流程
    // 全不选
    for (let k in dictDeviceStatus) {
      let update = dictDeviceStatus[k].selected
      dictDeviceStatus[k].selected = false
      if (update === true) {
        if (dictMarker.hasOwnProperty(selected)) {
          let status = getDeviceStatus(dictMonitorData[k])
          aMarker = dictMarker[k]
          aMarker.setIcon(
            // eslint-disable-next-line new-cap
            new L.icon({
              iconUrl: imgPathOffset + uiCfg[status].iconUrl,
              // iconUrl: require(`../../../${uiCfg[status].iconUrl}.png`),
              // iconUrl: require('../../../static/img/aircraft_default.png'),
              iconSize: uiCfg[status].iconSize,
              iconAnchor: [
                uiCfg[status].iconSize[0] / 2,
                uiCfg[status].iconSize[1] / 2
              ]
            })
          )
          aMarker.update()
        }
        // updateAircraftLabel(dictMonitorData[k], mapZoom)
      }
    }
    // 选中
    dictDeviceStatus[selected].selected = true
    selectedAdress = selected // 记录当前选中的adress
    if (dictMarker.hasOwnProperty(selected)) {
      let status = getDeviceStatus(dictMonitorData[selected])
      aMarker = dictMarker[selected]
      aMarker.setIcon(
        // eslint-disable-next-line new-cap
        new L.icon({
          iconUrl: imgPathOffset + uiCfg[status].iconUrl,
          // iconUrl: require('../../../static/img/aircraft_default.png'),
          iconSize: uiCfg[status].iconSize,
          iconAnchor: [
            uiCfg[status].iconSize[0] / 2,
            uiCfg[status].iconSize[1] / 2
          ]
        })
      )
      aMarker.update()
    }
    if (showLable) updateDeviceLabel(dictMonitorData[selected], mapZoom)
    if (showTrack) updateMonitorTrack(dictMonitorData[selected], mapZoom)

    markerClickedCallback(obj, true)
  }
}

// function getTimingStatus (aryTimingStatus, seconds) {
//   for (let i = 0; i < aryTimingStatus.length; i++) {
//     let timingStatus = aryTimingStatus[i]
//     if (timingStatus.beginSecs <= seconds && timingStatus.endSecs >= seconds) { return timingStatus }
//   }
// }

function timer1s () {
  let curDate = new Date()
  let delObjs = []
  for (let key in dictMonitorData) {
    // 遍历对象，k即为key，obj[k]为当前k对应的值
    let obj = dictMonitorData[key]

    if (!dictMarker.hasOwnProperty(obj.ID_Target_Fusion)) {
      continue // 可能还没画完就调用timer1s了
    }
    // let objTime = new Date(obj.Timestamp_ms_Track)

    let objTime = obj.Timestamp_ms_recv
    let seconds = parseInt(Math.abs(curDate - objTime) / 1000)
    // let objTime = new Date(obj.Timestamp_ms_Track)
    // let seconds = parseInt(Math.abs(curDate - objTime + 8000 * 3600) / 1000)

    // let utcTime = new Date(obj.Timestamp_ms_Track / 1000)
    // let seconds = parseInt(Math.abs(curDate - utcTime - 8000 * 3600) / 1000)
    // let timingStatus = getTimingStatus(dictTypeCfg[type].aryTimingStatus, seconds)

    if (selectedAdress === obj.ID_Target_Fusion) {
      selectedAdress = obj.ID_Target_Fusion
      markerClickedCallback(obj, true)
    }
    if (removeDead && seconds >= removeDeadSeconds) {
      // 如果dead需要从地图上消失
      // 删除航迹
      delObjs.push(obj)
      deleteTarget(obj)
    }
  }
  targetDeletedCallback(delObjs)
}

function clearMarkerData () {
  dictMarker = []
  dictLabel = []
}
// 扇形
//  center 中心点 数组
//  radius 半径
// startAngle 起始角度
// endAngle 终止角度
// pointNum 圆弧上点的个数
function getPoints (center, radius, startAngle, endAngle, pointNum) {
  var sin
  var cos
  var x
  var y
  var angle
  var points = []
  points.push(center)
  for (var i = 0; i <= pointNum; i++) {
    angle = startAngle + (endAngle - startAngle) * i / pointNum
    sin = Math.sin(angle * Math.PI / 180)
    cos = Math.cos(angle * Math.PI / 180)
    y = center[0] + radius * cos
    x = center[1] + radius * sin
    points[i] = [y, x]
    // debugger
  }
  var point = points
  point.push(center)
  return point
}
function photoeleZTMap (obj) { // 转台方位线
  console.log(obj[0], '转台方位线')
  layerRayTrack.clearLayers()
  let data = obj[0]
  let listData2 = []
  let layer = ''
  let points = getPoints([Number(data.calibrate_Latitude), Number(data.calibrate_Longitude)], 0.045, data.altitude_Truck - 15, data.altitude_Truck + 15, 100)
  points[points.length] = points[0]
  layer = L.polygon(points, {
    color: 'rgba(0, 0, 0, 0)',
    fillColor: data.color,
    fillOpacity: 0.8,
    zIndex: 5,
    borderWidth: 0.2
  })
  listData2.splice(0, 0, layer)
  listData2[0].addTo(layerRayTrack)
}
function photoeleZCSMap (obj) { // 光电方位线 载车式
  layerRayTrack.clearLayers()
  let layer = ''
  let listData1 = []
  let listData2 = []
  if (obj.length > 0) {
    let data = obj[0]
    data.Angle_A_Target.forEach((item, i) => {
      let dataList = getPoints([Number(data.latitude_Truck), Number(data.longitude_Truck)], 0.045, Number(item) - 1, Number(item), 1000)
      dataList[dataList.length] = dataList[0]
      layerRayTrack.clearLayers(listData1[i])
      layer = L.polygon(dataList, {
        color: 'rgba(0, 0, 0, 0)',
        fillColor: '#3277FF',
        fillOpacity: 0.8,
        zIndex: 5,
        borderWidth: 0.2
      })
      let con = {
        ID_Target_Fusion: data.id_Device[i],
        latLon: dataList[dataList.length - 1]
      }
      listData1.splice(i, 0, layer)
      listData2.splice(i, 0, con)
    })

    for (var k = 0; k < listData1.length; k++) {
      listData1[k].addTo(layerRayTrack)
    }
    for (var j = 0; j < listData2.length; j++) {
      var myIcon = L.divIcon({
        html: "<p class='wyzcSty'>光电设备编号:" + listData2[j].ID_Target_Fusion + '</p>',
        className: '',
        iconSize: 30
      })
      L.marker(listData2[j].latLon, { icon: myIcon }).addTo(layerRayTrack)
    }
  } else {
    // layerRayTrack.clearLayers()
  }
}
function photoelectricMap (obj) { // 光电方位线 固定式
  // layerRayTrack.clearLayers()
  let layer = ''
  let listData1 = []
  let listData2 = []
  if (obj.length > 0) {
    // layerRayTrack.clearLayers()
    obj.forEach((item, i) => {
      // console.log(item,'方位线')
      let dataList = getPoints([Number(item.calibrate_Latitude), Number(item.calibrate_Longitude)], 0.045, Number(item.Angle_A_Target) - 1, Number(item.Angle_A_Target), 1000)
      dataList[dataList.length] = dataList[0]
      layerRayTrack.clearLayers(listData1[i])
      layer = L.polygon(dataList, {
        color: 'rgba(0, 0, 0, 0)',
        fillColor: item.color,
        fillOpacity: 0.8,
        zIndex: 5,
        borderWidth: 0.2
      })
      let con = {
        ID_Target_Fusion: item.ID_Target_Fusion,
        latLon: dataList[dataList.length - 1]
      }

      listData1.splice(i, 0, layer)
      listData2.splice(i, 0, con)
    })

    for (var k = 0; k < listData1.length; k++) {
      listData1[k].addTo(layerRayTrack)
    }
    for (var j = 0; j < listData2.length; j++) {
      var myIcon = L.divIcon({
        html: "<p class='wyzcSty'>光电设备编号:" + listData2[j].ID_Target_Fusion + '</p>',
        className: '',
        iconSize: 30
      })
      L.marker(listData2[j].latLon, { icon: myIcon }).addTo(layerRayTrack)
    }
  } else {
    // layerRayTrack.clearLayers()
  }
}
function wyzcMapZ (obj) {
  if (obj.length > 0) {
    let layer = ''
    let listData1 = []
    let listData2 = []
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Angle_A_Target !== '-') {
        let dataList = getPoints([Number(obj[i].lat), Number(obj[i].lon)], 0.05, Number(obj[i].Angle_A_Target) - 1, Number(obj[i].Angle_A_Target) + 1, 1000)
        dataList[dataList.length] = dataList[0]
        layerRayTrack.clearLayers(listData1[i])
        layer = L.polygon(dataList, {
          color: 'rgba(0, 0, 0, 0)',
          fillColor: '#000',
          fillOpacity: 0.8,
          zIndex: 5,
          borderWidth: 0.2
        })

        let con = {
          ID_Target_Fusion: obj[i].ID_Target_Fusion,
          latLon: dataList[dataList.length - 1]
        }
        listData1.splice(i, 0, layer)
        listData2.splice(i, 0, con)
      }
    }
    for (var k = 0; k < listData1.length; k++) {
      listData1[k].addTo(layerRayTrack)
    }
    for (var j = 0; j < listData2.length; j++) {
      var myIcon = L.divIcon({
        html: "<p class='wyzcSty'>目标批号:" + listData2[j].ID_Target_Fusion + '</p>',
        className: '',
        iconSize: 30
      })
      L.marker(listData2[j].latLon, { icon: myIcon }).addTo(layerRayTrack)
    }
  } else {
    // layerRayTrack.clearLayers()
  }
}
function wyzcMapG (obj) {
  if (obj.length > 0) {
    let layer = ''
    let listData1 = []
    let listData2 = []
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Angle_A_Target !== 'null' || obj[i].Angle_A_Target !== '-') {
        let dataList = getPoints([Number(obj[i].lat), Number(obj[i].lon)], 0.05, Number(obj[i].Angle_A_Target) - 1, Number(obj[i].Angle_A_Target) + 1, 1000)
        dataList[dataList.length] = dataList[0]
        layerRayTrack.clearLayers(listData1[i])
        layer = L.polygon(dataList, {
          color: 'rgba(0, 0, 0, 0)',
          fillColor: '#000',
          fillOpacity: 0.8,
          zIndex: 5,
          borderWidth: 0.2
        })

        let con = {
          ID_Target_Fusion: obj[i].ID_Target_Fusion,
          latLon: dataList[dataList.length - 1]
        }
        listData1.splice(i, 0, layer)
        listData2.splice(i, 0, con)
      }
    }
    for (var k = 0; k < listData1.length; k++) {
      listData1[k].addTo(layerRayTrack)
    }
    for (var j = 0; j < listData2.length; j++) {
      var myIcon = L.divIcon({
        html: "<p class='wyzcSty'>目标批号:" + listData2[j].ID_Target_Fusion + '</p>',
        className: '',
        iconSize: 30
      })
      L.marker(listData2[j].latLon, { icon: myIcon }).addTo(layerRayTrack)
    }
  } else {
    // layerRayTrack.clearLayers()
  }
}
function rayMap (obj) {
  if (obj) {
    // layerRayTrack.clearLayers()
    let layer = ''
    let listData1 = []
    let listData2 = []
    let colorList = ['#000', '#000', '#000', '#000', '#000', '#000', '#000']
    for (var i = 0; i < obj.drone.length; i++) {
      let dataList = getPoints([Number(obj.scannerQ_latitude), Number(obj.scannerQ_longitude)], 0.045, Number(obj.drone[i].azimuth) - 1, Number(obj.drone[i].azimuth) + 1, 1000)
      dataList[dataList.length] = dataList[0]
      layerRayTrack.clearLayers(listData1[i])
      layer = L.polygon(dataList, {
        color: 'rgba(0, 0, 0, 0)',
        fillColor: colorList[i % 7],
        fillOpacity: 0.8,
        zIndex: 5,
        borderWidth: 0.2
      })

      let con = {
        name: obj.drone[i].index,
        latLon: dataList[dataList.length - 1]
      }
      listData1.splice(i, 0, layer)
      listData2.splice(i, 0, con)
    }
    for (var k = 0; k < listData1.length; k++) {
      listData1[k].addTo(layerRayTrack)
    }
    for (var j = 0; j < listData2.length; j++) {
      var myIcon = L.divIcon({
        html: "<p class='wyzcSty'>目标批号:" + listData2[j].name + '</p>',
        className: '',
        iconSize: 30
      })
      L.marker(listData2[j].latLon, { icon: myIcon }).addTo(layerRayTrack)
    }
  } else {
    // layerRayTrack.clearLayers()
  }
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// 以下是标牌相关
let dictLabel = [] // Label字典

function drawLabel (addNew, obj, sLabel, bkSize) {
  let iconMaker
  let status = 'default'
  let type = dictTargetType[obj.Type_Target]
  let uiCfg = dictTypeCfg[type].statusCfg
  if (addNew === false && dictLabel.hasOwnProperty(obj.ID_Target_Fusion)) {
    iconMaker = dictLabel[obj.ID_Target_Fusion]
    // if (obj.Status_Track === 4) {
    //   iconMaker.remove()
    //   delete dictLabel[obj.ID_Target_Fusion]
    //   return
    // }
    iconMaker.setIcon(
      // eslint-disable-next-line new-cap
      new L.divIcon({
        className: 'class_icon_1',
        html: sLabel,
        iconAnchor: [
          -uiCfg[status].iconSize[0] / 3,
          -uiCfg[status].iconSize[1] / 3
        ],
        iconSize: bkSize
      })
    )
    iconMaker.setLatLng([obj.Latitude_Target, obj.Longitude_Target])
    iconMaker.update()
  } else {
    iconMaker = L.marker([obj.Latitude_Target, obj.Longitude_Target], {
      // eslint-disable-next-line new-cap
      icon: new L.divIcon({
        className: 'class_icon_1',
        html: sLabel,
        // bgPos: [-30, -30],
        iconAnchor: [
          -uiCfg[status].iconSize[0] / 3,
          -uiCfg[status].iconSize[1] / 3
        ],
        iconSize: bkSize
      }),
      interactive: false
    })
    dictLabel[obj.ID_Target_Fusion] = iconMaker
    iconMaker.addTo(layerLabel)
  }
}

function updateDeviceLabel (obj, zoom) {
  if (!showLable) return

  if (invalidateLatlng(obj.lat, obj.lon)) return null

  let type = getCfgType(obj)
  let cfg = getLabelCfg(type, obj, zoom)
  if (cfg === null) {
    // 删除标牌
    if (dictLabel.hasOwnProperty(obj.deviceId)) {
      dictLabel[obj.deviceId].remove()
      delete dictLabel[obj.deviceId]
    }
    return null
  }
  let sLabel = getLabelContent(obj, zoom)
  if (sLabel === '') {
    // 删除标牌
    if (dictLabel.hasOwnProperty(obj.deviceId)) {
      dictLabel[obj.deviceId].remove()
      delete dictLabel[obj.deviceId]
    }
    return null
  }

  return drawLabel(false, obj, sLabel, cfg.bkSize)
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// 以下是轨迹相关
let monitorTrackData = [] // 航空器轨迹数据
let monitorTrack = [] // 航空器轨迹线

function getLatLngsFromTrackData (arr) {
  let LatLngs = []
  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i]
    LatLngs.push([obj.lat, obj.lon])
  }
  return LatLngs
}

function updateMonitorTrack (obj, zoom) {
  if (invalidateLatlng(obj.lat, obj.lon)) return null
  let status = getDeviceStatus(obj)
  let type = getCfgType(obj)
  let uiCfg = dictTypeCfg[type].statusCfg
  if (monitorTrackData.hasOwnProperty(obj.adress)) {
    let arr = monitorTrackData[obj.adress]
    // 根据条件判断是否跳过速度为零的点
    if (uiCfg[status].ignorZeroSpeed) {
      if (obj.speed === 0) return null
    }
    // 按照时间顺序插入obj，并根据时间判断是否是重复点
    let i = 0
    for (i = 0; i < arr.length; i++) {
      if (arr[i].utcTime === obj.utcTime) return null // 根据时间判断是重复点则返回
      if (arr[i].utcTime > obj.utcTime) {
        arr.splice(i, 0, obj)
        break
      }
    }
    if (i === arr.length) arr.push(obj)

    // 根据最大航迹点数判断是否需要shift
    if (arr.length > uiCfg[status].maxPointsOfTrack) arr.shift()
  } else {
    let arr = new Array(0)
    let obj2 = {}
    copyObj(obj, obj2)
    arr[0] = obj2
    monitorTrackData[obj.adress] = arr
  }

  if (monitorTrackData[obj.adress].length >= 2) {
    let aTrack = monitorTrack[obj.adress]
    if (aTrack != null) {
      aTrack.setLatLngs(getLatLngsFromTrackData(monitorTrackData[obj.adress]))
    } else {
      aTrack = L.polyline(
        getLatLngsFromTrackData(monitorTrackData[obj.adress]), {
        color: uiCfg[status].colorTrack,
        weight: uiCfg[status].weightTrack,
        opacity: uiCfg[status].opacityTrack
      })
      monitorTrack[obj.adress] = aTrack

      aTrack.addTo(layerTrack)
    }
  }
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////

function getMonitorObj (deviceId) {
  return dictMonitorData[deviceId]
}

function getMonitorData () {
  return monitorData
}

export {
  initMonitorData,
  setupMonitorDataDict,
  IsNewMonitorData,
  initMonitMapConfig,
  initMapforMonitorData,
  addOrUpdateMonitorData,
  updateAllMonitorData,
  getMonitorObj,
  getMonitorData,
  selectObj,
  openPopup,
  updateDeviceLabel,
  updateMonitorTrack,
  clearMarkerData,
  drawTrack,
  drawMarker,
  deleteTrack,
  deleteTarget,
  typeMap,
  rayMap, // 无源侦测方位线（下拉框）
  wyzcMapG, // 无缘侦测方位线 固定式（融合列表）
  wyzcMapZ, // 无缘侦测方位线 载车式（融合列表）
  photoeleZTMap, // 转台方位线
  photoeleZCSMap, // 光电方位线载车式
  photoelectricMap // 光电方位线固定式
}
