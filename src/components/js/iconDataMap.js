import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-rotatedmarker'
import { invalidateLatlng, isNullObj, isNotNullObj, copyObj } from './util.js'
// import { invalidateLatlng, isNullObj, isNotNullObj, copyObj } from './util.js'
import { data, map } from 'jquery'
// import { NULL } from 'node-sass'

// 以下是map 显示相关的
let layerMarker = null
let layerMarkerA = null
let layerMarkerB = null
let layerLabel = null
let layerTrack = null

let layerMultilateral = null
// 核心区
let core = null
// 硬杀伤
let dispose = null
// 软杀伤
let disposeA = null
// 预警区
let warn = null
// 静默区
let silence = null
// 诱捕区
let trap = null
let layerFence = null // 电子围栏地图图层

let mymap = null
let mymapA = null
let mymapB = null
let imgPathOffset = '@/../'
function initMapforMonitorDatasA (map) {
  mymapA = map
  layerMarkerA = L.layerGroup([])
  layerMarkerA.addTo(mymapA)
}
function initMapforMonitorDatasB (map) {
  mymapB = map
  layerMarkerB = L.layerGroup([])
  layerMarkerB.addTo(mymapB)
}
function initMapforMonitorDatas (map) {
  mymap = map
  layerMarker = L.layerGroup([])
  layerLabel = L.layerGroup([])
  layerTrack = L.layerGroup([])
  layerMultilateral = L.layerGroup([])

  core = L.layerGroup([])
  dispose = L.layerGroup([])
  disposeA = L.layerGroup([])
  warn = L.layerGroup([])
  silence = L.layerGroup([])
  trap = L.layerGroup([])
  layerFence = L.layerGroup([])
  layerMarker.addTo(mymap)

  layerLabel.addTo(mymap)
  layerTrack.addTo(mymap)
  layerMultilateral.addTo(mymap)
  trap.addTo(mymap)
  silence.addTo(mymap)
  warn.addTo(mymap)
  dispose.addTo(mymap)
  disposeA.addTo(mymap)
  core.addTo(mymap)
  layerFence.addTo(mymap)
  if (removeDead) {
    setInterval(timer1s, 1000)
  }
}

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

function updateAllMonitorDatas (obj, zoom, clickedCallback) {
  // monitorData.splice(0)
  markerClickedCallback = clickedCallback
  dictMonitorData[obj.ID_Target] = obj
  if (dictTrack.hasOwnProperty(obj.ID_Target)) {
    drawTrackA(obj)
  }
  drawMarker(false, obj, '', markerClick)
  if (dictAlarm.hasOwnProperty(obj.ID_Target)) {
    dictAlarm[obj.ID_Target].remove()
    delete dictAlarm[obj.ID_Target]
  }
  if (dictDirection.hasOwnProperty(obj.ID_Target)) {
    dictDirection[obj.ID_Target].remove()
    delete dictDirection[obj.ID_Target]
  }
  if (selectedAdress === obj.ID_Target) {
    markerClickedCallback(obj, true)
  }
  let type = dictTargetType[0]
  let cfg = getLabelCfg(type, obj, zoom)
  if (cfg === null) {
    // 删除标牌
    if (dictLabel.hasOwnProperty(obj.ID_Target)) {
      dictLabel[obj.ID_Target].remove()
      delete dictLabel[obj.ID_Target]
    }
    return null
  }
  let sLabel = getLabelContent(obj, zoom)
  if (sLabel === '') {
    // 删除标牌
    if (dictLabel.hasOwnProperty(obj.ID_Target)) {
      dictLabel[obj.ID_Target].remove()
      delete dictLabel[obj.ID_Target]
    }
    return null
  }
  drawLabel(false, obj, sLabel, cfg.bkSize)
}

function deleteTarget (obj) { // 删除目标数据和态势图标
  if (obj.ID_Target === selectedAdress) { // 关闭环形菜单
    selectedAdress = null
    markerClickedCallback(obj, false)
  }

  if (dictMonitorData.hasOwnProperty(obj.ID_Target)) { // 删除目标数据
    delete dictMonitorData[obj.ID_Target]
  }
  if (dictMarker.hasOwnProperty(obj.ID_Target)) { // 删除航迹图标
    dictMarker[obj.ID_Target].remove()
    delete dictMarker[obj.ID_Target]
  }

  if (dictLabel.hasOwnProperty(obj.ID_Target)) { // 删除标牌
    dictLabel[obj.ID_Target].remove()
    delete dictLabel[obj.ID_Target]
  }

  if (dictDirection.hasOwnProperty(obj.ID_Target)) { // 删除方向箭头图标
    dictDirection[obj.ID_Target].remove()
    delete dictDirection[obj.ID_Target]
  }

  if (dictAlarm.hasOwnProperty(obj.ID_Target)) { // 删除告警背景
    dictAlarm[obj.ID_Target].remove()
    delete dictAlarm[obj.ID_Target]
  }

  if (dictTrack.hasOwnProperty(obj.ID_Target)) { // 删除尾迹点
    deleteTrack(obj.ID_Target)
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
/// 配置类型字典
/// 先按地址找类型
/// 按地址找不到再按 source 找类型
/// 找不到采用default类型
/// 显示设置
/// 先按类型分
/// 再按状态分
/// 某类型下的各状态的显示配置

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
  }
  var point = points
  point.push(center)
  return point
}

function mapS (con) {
  let listData1 = []
  let listData2 = []
  let layer = ''
  var radius = Number(con.Radius) / 111111.111
  // con.type ：0-核心区 ，1-硬杀伤
  if (con.type === 0) {
    let points = getPoints([Number(con.Latitude), Number(con.Longitude)], radius, Number(con.Angle_Centerline), Number(con.Angle_Sector), 1000)
    points[points.length] = points[0]
    layerMarker.clearLayers(listData1[con.index])
    layer = L.polygon(points)
    listData1.splice(con.index, 0, layer)
    listData1[con.index].addTo(layerMarker)
  } else {
    let points = getPoints([Number(con.Latitude), Number(con.Longitude)], radius, Number(con.Angle_Centerline), Number(con.Angle_Sector), 1000)
    points[points.length] = points[0]
    layer = L.polygon(points)
    listData2.splice(con.index, 0, layer)
    listData2[con.index].addTo(layerMarker)
  }
}
function mapF (con, type) {
  // let points = getPoints([39.917149, 116.360575], 0.045, 0, 100, 100)
  // points[points.length] = points[0]
  // L.polygon(points).addTo(mymap)
  console.log(con, '----------------------------js')
  if (type) {
    layerMultilateral.clearLayers()
    core.clearLayers()
    dispose.clearLayers()
    disposeA.clearLayers()
    warn.clearLayers()
    silence.clearLayers()
    trap.clearLayers()
    if (con.length > 0) {
      // 绘制预警区
      warnParamExtend(con)
      // 绘制诱捕区
      trapParam(con)
      // 绘制静默区
      silenceParam(con)
      // 绘制硬杀伤
      drawDisposeExtend(con)
      // 绘制软杀伤
      drawDisposeExtendA(con)
    }
    con.forEach((item, index) => {
      // let color = ''
      // if (Number(item.type_Region_Control) === 0) {
      //   color = 'red'
      // } else if (Number(item.type_Region_Control) === 1) {
      //   color = '#000'
      // } else if (Number(item.type_Region_Control) === 2) {
      //   color = 'blue'
      // } else if (Number(item.type_Region_Control) === 5) {
      //   color = 'pink'
      // }
      // let f = [
      //   [31.09711656670264, 121.44788805480316],
      //   [31.08748892703698, 121.47011952515899],
      //   [31.061485211458063, 121.4504157766427],
      //   [31.078416084426983, 121.42725099960221],
      //   [31.080458482913386, 121.45057894401904],
      //   [31.09711656670264, 121.44788805480316]
      // ]
      // L.polygon(f, {
      //   color: '#999',
      //   fillOpacity: 0.1
      // }).addTo(disposeA).bindPopup()

      // let a = JSON.parse(item.geometrys)
      // let b = []
      // a.forEach(itema => {
      //   let c = itema.split(' ')
      //   b.push([Number(c[2]), Number(c[1])])
      // })
      // console.log(b, 'mapF', item.type_Region_Control)
      // L.polygon(b, {
      //   color: color,
      //   fillOpacity: 0.1
      // }).addTo(disposeA).bindPopup()

      let { param } = drawTypeFormParam(item.shape_Region_Control, item)
      let colorBg = {}
      let mapType = ''
      switch (Number(item.type_Region_Control)) {
        // 核心区
        case 0:
          colorBg = {
            color: '#D9001B',
            fillColor: '#D9001B',
            opacity: 1,
            fill: true,
            fillOpacity: 0.2
          }
          mapType = core
          break
        // 硬杀伤
        case 1:
          colorBg = {
            color: '#F59A23',
            fillColor: '#F59A23',
            opacity: 1,
            fill: true,
            fillOpacity: 0.2
          }
          mapType = dispose
          break
        // 软杀伤
        case 2:
          colorBg = {
            color: 'rgb(198,122,206)',
            fillColor: 'rgb(198,122,206)',
            opacity: 1,
            fill: true,
            fillOpacity: 0.2
          }
          mapType = disposeA
          break
      }
      // 此处硬杀伤不做绘制
      if (mapType) {
        switch (item.shape_Region_Control) {
          // 圆形
          case '0x7A':
            let html = '<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>'
            L.circle([param.Latitude, param.Longitude], Number(param.Radius), colorBg).addTo(mapType).bindPopup(html)
            break
          // 扇形
          case '0x7B':
            let { Radius, Latitude, Longitude, Angle_Centerline: AngleCenterline, Angle_Sector: AngleSector } = param
            let radius = Number(Radius) / 111111.111
            let points = getPoints([Number(Latitude), Number(Longitude)], radius, Number(AngleCenterline), Number(AngleSector), 1000)
            points[points.length] = points[0]
            let htmls = '<div><span class="nameTaskBox_A">' + item.name_Task + ' : ' + item.shape_Name + '</span ></div > '
            L.polygon(points, colorBg).addTo(mapType).openPopup()
            // L.polygon(points, colorBg).addTo(mapType).bindPopup(htmls).openPopup()
            break
          // 多边形
          case '0x7F':
            L.polygon(param.list.map((item) => { return [item.Latitude, item.Longitude] }), colorBg).addTo(mapType).openPopup()
            // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
            break
        }
      }
    })
  } else {
    layerMultilateral.clearLayers()
    core.clearLayers()
    dispose.clearLayers()
    disposeA.clearLayers()
    warn.clearLayers()
    silence.clearLayers()
    trap.clearLayers()
  }
}
/**
 * 根据类型返回
 * @drawType 0x7A,0x7B,0x7F
 */
function drawTypeFormParam (drawType, item) {
  let param = {}
  switch (drawType) {
    case '0x7A':
      param = {
        Longitude: item.longitude,
        Latitude: item.latitude,
        Radius: item.radius,
        Height_Control: item.height_Control
      }
      break
    case '0x7B':
      param = {
        Longitude: item.longitude,
        Latitude: item.latitude,
        Angle_Centerline: item.angle_Centerline,
        Angle_Sector: item.angle_Sector,
        Radius: item.radius,
        Height_Control: item.height_Control
      }
      break
    case '0x7F':
      let points = JSON.parse(item.geometrys)
      param = {
        list: points.map((point) => {
          let points = point.trim().split(' ')
          return {
            Latitude: JSON.parse(points[1]),
            Longitude: JSON.parse(points[0])
          }
        }),
        height: item.height_Control
      }
      param.list.pop()
      break
    default:
      param = {
        Longitude: 0,
        Latitude: 0,
        Radius: 0,
        Height_Control: 0,
        type: 0
      }
      break
  }
  return { param }
}

/**
 * 绘制硬杀伤
 */
function drawDisposeExtend (con) {
  con.map((item) => {
    let newVal = 0
    if (Number(item.type_Region_Control) === 0) {
      newVal = Number(item.extend_Length)
    }
    if (!newVal) {
      return
    }
    let { param } = drawTypeFormParam(item.shape_Region_Control, item)
    switch (item.shape_Region_Control) {
      // 圆形
      case '0x7A':
        L.circle([param.Latitude, param.Longitude], {
          color: '#F59A23',
          fillOpacity: 0.2,
          radius: Number(param.Radius) + Number(newVal)
        }).addTo(dispose).openPopup()
        // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
        break
      // 扇形
      case '0x7B':
        let { Radius, Latitude, Longitude, Angle_Centerline: AngleCenterline, Angle_Sector: AngleSector } = param
        let points = getPoints([Number(Latitude), Number(Longitude)], (Number(Radius) + Number(newVal)) / 111111.111, Number(AngleCenterline), Number(AngleSector), 1000)
        points[points.length] = points[0]
        L.polygon(points, {
          color: '#F59A23',
          fillOpacity: 0.2
        }).addTo(dispose).openPopup()
        // .bindPopup('<div><span  class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
        break
      // 多边形
      case '0x7F':
        let extensionList = computationalExtension(param.list, newVal)
        let list = extensionList.map((item) => {
          return [
            item.Latitude, item.Longitude
          ]
        })
        L.polygon(list, {
          color: '#F59A23',
          fillOpacity: 0.2
        }).addTo(dispose).openPopup()
        // .bindPopup('<div><span  class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
        break
    }
  })
}
/**
 * 绘制软杀伤
 */
function drawDisposeExtendA (con) {
  // let list = con.filter((item) => { return Number(item.type_Region_Control) === 0 })
  con.map((item) => {
    let newVal = 0
    // 外延
    if (Number(item.type_Region_Control) === 0) {
      newVal = Number(item.extend_Length)
    }
    if (!newVal) {
      return
    }
    let { param } = drawTypeFormParam(item.shape_Region_Control, item)
    console.log(param, '测试防控区域')
    switch (item.shape_Region_Control) {
      // 圆形
      case '0x7A':
        L.circle([param.Latitude, param.Longitude], {
          color: 'rgb(198,122,206)',
          fillOpacity: 0.2,
          radius: Number(param.Radius) + Number(newVal)
        }).addTo(disposeA).openPopup()
        // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
        break
      // 扇形
      case '0x7B':
        let { Radius, Latitude, Longitude, Angle_Centerline: AngleCenterline, Angle_Sector: AngleSector } = param
        let points = getPoints([Number(Latitude), Number(Longitude)], (Number(Radius) + Number(newVal)) / 111111.111, Number(AngleCenterline), Number(AngleSector), 1000)
        points[points.length] = points[0]
        L.polygon(points, {
          color: 'rgb(198,122,206)',
          fillOpacity: 0.2
        }).addTo(disposeA).openPopup()
        // .bindPopup('<div><span  class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
        break
      // 多边形
      case '0x7F':
        let extensionList = computationalExtension(param.list, newVal)
        let list = extensionList.map((item) => {
          return [
            item.Latitude, item.Longitude
          ]
        })
        L.polygon(list, {
          color: 'rgb(198,122,206)',
          fillOpacity: 0.2
        }).addTo(disposeA).openPopup()
        // .bindPopup('<div><span  class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
        break
    }
  })
}
function compare (property) {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value2 - value1
  }
}
/**
 * 绘制预警区外延
 */
function warnParamExtend (list) {
  let warnParamLong = 0
  let Defense = 0
  let custom = 1
  let lengthDefenseR = 0
  let lengthDefenseY = 0
  let warnParamLongYJ = 0
  let idArr = []
  let listData = list.sort(compare('type_Region_Control'))
  listData = list.sort(compare('id'))
  listData.map((item, index) => {
    item.type_Region_Control = Number(item.type_Region_Control)
    item.extend_Length = Number(item.extend_Length)
    // 绘制预警区外延
    let newVal = 0
    // 显示预警区
    if (item.extend_Length !== 0 && item.type_Region_Control === 5) {
      warnParamLong = item.extend_Length
      Defense = item.extendKillArea_Type // 1是软 2是硬
      warnParamLongYJ = item.extend_Length
      idArr.push(item.id)
    }
    // 判断硬杀伤是否自定义 大于则是外延， = 0则是自定义
    if (item.type_Region_Control === 1) {
      lengthDefenseY = item.extend_Length
    }
    if (item.type_Region_Control === 2) {
      lengthDefenseR = item.extend_Length
    }
    if (item.type_Region_Control === 1 || item.type_Region_Control === 2) {
      if (item.extend_Length === 0) {
        if (Defense === 1) {
          custom = 1 // 自定义 软
        } else if (Defense === 2) {
          custom = 2 // 自定义 硬
        }
      } else {
        custom = 3 // 外延
      }
    }
    if (idArr.indexOf(item.id) !== -1) {
      if (custom === 1 && item.type_Region_Control === 2) { // 硬
        newVal = Number(warnParamLong)
      } else if (custom === 2 && item.type_Region_Control === 1) { // 软
        newVal = Number(warnParamLongYJ)
      } else if (custom === 3 && Number(warnParamLongYJ) !== 0) {
        newVal = Number(warnParamLongYJ) + lengthDefenseR + lengthDefenseY
      }
    }
    setTimeout(function () {
      if (!newVal) {
        return
      }
      if (item.type_Region_Control === 0 && custom === 3) {
        let { param } = drawTypeFormParam(item.shape_Region_Control, item)
        // console.log(param, newVal, radius)
        switch (item.shape_Region_Control) {
          // 圆形
          case '0x7A':
            L.circle([param.Latitude, param.Longitude], {
              color: '#F9D904',
              fillOpacity: 0.2,
              // radius: Number(radius) + newVal
              radius: Number(param.Radius) + newVal
            }).addTo(layerMultilateral).openPopup()
            // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ': ' + item.shape_Name + '</span ></div > ')
            break
          // 扇形
          case '0x7B':
            let { Radius, Latitude, Longitude, Angle_Centerline: AngleCenterline, Angle_Sector: AngleSector } = param
            let points = getPoints([Number(Latitude), Number(Longitude)], (Number(Radius) + newVal) / 111111.111, Number(AngleCenterline), Number(AngleSector), 1000)
            points[points.length] = points[0]
            L.polygon(points, {
              color: '#F9D904',
              fillOpacity: 0.2
            }).addTo(layerMultilateral).openPopup()
            // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
            break
          // 多边形
          case '0x7F':
            let extensionList = computationalExtension(param.list, newVal)
            let list = extensionList.map((item) => {
              return [
                item.Latitude, item.Longitude
              ]
            })
            L.polygon(list, {
              color: '#F9D904',
              fillOpacity: 0.2
            }).addTo(layerMultilateral).openPopup()
            // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
            break
        }
      } else if (custom !== 3) {
        let { param } = drawTypeFormParam(item.shape_Region_Control, item)
        switch (item.shape_Region_Control) {
          // 圆形
          case '0x7A':
            L.circle([param.Latitude, param.Longitude], {
              color: '#F9D904',
              fillOpacity: 0.2,
              radius: Number(param.Radius) + newVal
            }).addTo(layerMultilateral).openPopup()
            // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ': ' + item.shape_Name + '</span ></div > ')
            break
          // 扇形
          case '0x7B':
            let { Radius, Latitude, Longitude, Angle_Centerline: AngleCenterline, Angle_Sector: AngleSector } = param
            let points = getPoints([Number(Latitude), Number(Longitude)], (Number(Radius) + newVal) / 111111.111, Number(AngleCenterline), Number(AngleSector), 1000)
            points[points.length] = points[0]
            L.polygon(points, {
              color: '#F9D904',
              fillOpacity: 0.2
            }).addTo(layerMultilateral).openPopup()
            // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
            break
          // 多边形
          case '0x7F':
            let extensionList = computationalExtension(param.list, newVal)
            let list = extensionList.map((item) => {
              return [
                item.Latitude, item.Longitude
              ]
            })
            L.polygon(list, {
              color: '#F9D904',
              fillOpacity: 0.2
            }).addTo(layerMultilateral).openPopup()
            // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
            break
        }
      }
    }, 1000)
  })
  console.log(listData, '排序')
}
/**
 * 绘制静默区
 */
function silenceParam (list) {
  list.map((item) => {
    let { param } = drawTypeFormParam(item.shape_Region_Control, item)
    let colorBg = {}
    // 绘制静默区
    let mapType = ''
    switch (Number(item.type_Region_Control)) {
      // 静默区
      case 3:
        colorBg = {
          color: 'rgb(158,222,115)',
          fillColor: 'rgb(158,222,115)',
          opacity: 1,
          fill: true,
          fillOpacity: 0.2
        }
        mapType = silence
        break
    }
    if (mapType) {
      L.circle([param.Latitude, param.Longitude], Number(param.Radius), colorBg).addTo(mapType).openPopup()
      // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
    }
  })
}
/**
 * 绘制诱捕区
 */
function trapParam (list) {
  list.map((item) => {
    let { param } = drawTypeFormParam(item.shape_Region_Control, item)
    let colorBg = {}
    // 绘制诱捕区
    let mapType = ''
    switch (Number(item.type_Region_Control)) {
      // 诱捕区
      case 4:
        colorBg = {
          color: 'rgb(40,181,181)',
          fillColor: 'rgb(40,181,181)',
          opacity: 1,
          fill: true,
          fillOpacity: 0.2
        }
        mapType = trap
        break
    }
    if (mapType) {
      L.circle([param.Latitude, param.Longitude], Number(param.Radius), colorBg).addTo(mapType).openPopup()
      // .bindPopup('<div><span class="nameTaskBox_A">' + item.name_Task + ':' + item.shape_Name + '</span></div>')
    }
  })
}
/**
 * 多边形外延计算公式
 * @pointList 多边形点位集合
 * @kilometer 外延长度
 */
function computationalExtension (pointList, kilometer) {
  console.log(pointList, kilometer, '=======AAA')
  let list = []
  let len = pointList.length
  let k = 0
  for (let i = 0; i < len; i++) {
    let point = pointList[i]
    // 上一个点
    let point1 = pointList[i === 0 ? len - 1 : i - 1]
    // 下一个点
    let point2 = pointList[i === len - 1 ? 0 : i + 1]

    let p34 = (point1.Latitude - point.Latitude) * (point2.Longitude - point1.Longitude) - (point1.Longitude - point.Longitude) * (point2.Latitude - point1.Latitude)
    if (p34 > 0) {
      k++
    } else {
      k--
    }
  }
  for (let i = 0; i < len; i++) {
    let point = pointList[i]
    // 上一个点
    let point1 = pointList[i === 0 ? len - 1 : i - 1]
    // 下一个点
    let point2 = pointList[i === len - 1 ? 0 : i + 1]
    // 向量PP1
    const vectorX1 = point1.Longitude - point.Longitude // 向量PP1 横坐标
    const vectorY1 = point1.Latitude - point.Latitude // 向量PP1 纵坐标
    const n1 = norm(vectorX1, vectorY1) // 向量的平方根 为了对向量PP1做单位化
    let vectorUnitX1 = vectorX1 / n1 // 向量单位化 横坐标
    let vectorUnitY1 = vectorY1 / n1 // 向量单位化 纵坐标

    // 向量PP2
    const vectorX2 = point2.Longitude - point.Longitude // 向量PP2 横坐标
    const vectorY2 = point2.Latitude - point.Latitude // 向量PP2 纵坐标
    const n2 = norm(vectorX2, vectorY2) // 向量的平方根 为了对向量PP1做单位化
    let vectorUnitX2 = vectorX2 / n2 // 向量单位化 横坐标
    let vectorUnitY2 = vectorY2 / n2 // 向量单位化 纵坐标

    // PQ距离
    let number = km2Degree(kilometer / 1000)
    if (k < 0) {
      number = -number
    }
    const vectorLen = number / Math.sqrt((1 - ((vectorUnitX1 * vectorUnitX2) + (vectorUnitY1 * vectorUnitY2))) / 2)
    // 根据向量的叉乘积来判断角是凹角还是凸角
    if (((vectorX1 * vectorY2) + (-1 * vectorY1 * vectorX2)) < 0) {
      vectorUnitX2 *= -1
      vectorUnitY2 *= -1
      vectorUnitX1 *= -1
      vectorUnitY1 *= -1
    }

    // PQ的方向
    const vectorX = vectorUnitX1 + vectorUnitX2
    const vectorY = vectorUnitY1 + vectorUnitY2
    const n = vectorLen / norm(vectorX, vectorY)
    const vectorUnitX = vectorX * n
    const vectorUnitY = vectorY * n

    const polygonX = vectorUnitX + point.Longitude
    const polygonY = vectorUnitY + point.Latitude

    list.push({
      Latitude: polygonY,
      Longitude: polygonX
    })
  }
  return list
}
// function computationalExtension (pointList, kilometer) {
//   let list = []
//   let len = pointList.length
//   for (let i = 0; i < len; i++) {
//     let p = pointList[i]
//     let p1 = pointList[i === 0 ? len - 1 : i - 1]
//     let p2 = pointList[i === len - 1 ? 0 : i + 1]
//     let v1x = p1.Longitude - p.Longitude
//     let v1y = p1.Latitude - p.Latitude
//     let n1 = norm(v1x, v1y)
//     v1x /= n1
//     v1y /= n1

//     let v2x = p2.Longitude - p.Longitude
//     let v2y = p2.Latitude - p.Latitude
//     let n2 = norm(v2x, v2y)
//     v2x /= n2
//     v2y /= n2
//     let number = km2Degree(kilometer / 1000)
//     let l = -number / Math.sqrt((1 - (v1x * v2x + v1y * v2y)) / 2)

//     let vx = v1x + v2x
//     let vy = v1y + v2y
//     let n = l / norm(vx, vy)
//     vx *= n
//     vy *= n

//     list.push({
//       Latitude: vy + p.Latitude,
//       Longitude: vx + p.Longitude
//     })
//   }
//   return list
// }

/**
 * 开平方
 */
function norm (x, y) {
  return Math.sqrt(x * x + y * y)
}

/**
 * 弧长公式
 */
function km2Degree (l) {
  // 公式:l(弧长)=degree（圆心角）× π（圆周率）× r（半径）/180
  // 转换后的公式：degree（圆心角）=l(弧长) × 180/(π（圆周率）× r（半径）)
  let degree = (180 / 6371.393 / Math.PI) * l
  return degree
}

function mapFence (con, type) { // 电子围栏地图
  // var polygon1 = L.polygon([
  //   [40.00731268214264, 116.50831698687676],
  //   [40.297050018995306, 116.75614233900228],
  //   [40.03879213291865, 116.9257836037459],
  //   [40.03879213291865, 116.9257836037459],
  //   [40.00731268214264, 116.50831698687676]
  // ], {
  //   color: 'red',
  //   fillOpacity: 1
  // }).addTo(layerFence)
  // polygon1.bindPopup()
  if (type) {
    con.forEach((item, index) => {
      var polygon1 = L.polygon(item.listCoordinate2, {
        color: 'rgba(0,0,0,0.0)',
        fillColor: '#999',
        fillOpacity: 0.6
      }).addTo(layerFence)
      polygon1.bindPopup()
      var html = '<div class="my-div-icon"><p class="title">' + item.airportCode + ' ' + item.airportName + '</p ><p>跑道号：  ' + item.airportRunway + ' id:' + item.id + '</p><p>机场标高：  ' + item.airportElevation + 'm</p><p>电子围栏生效时间：  ' + item.effectiveDate + '</p></div >'
      var polygon = L.polygon(item.listCoordinate, {
        color: '#D9001B',
        fillOpacity: 0.2
      }).addTo(layerFence)
      polygon.bindPopup(html)
    })
  } else {
    layerFence.clearLayers()
  }
}
function bearing (start, end) {
  let rad = Math.PI / 180
  let lat1 = start.latitude * rad
  let lat2 = end.latitude * rad
  let lon1 = start.longitude * rad
  let lon2 = end.longitude * rad
  const a = Math.sin(lon2 - lon1) * Math.cos(lat2)
  const b = Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
  return radiansToDegrees(Math.atan2(a, b))
}

/*
 * 弧度转换为角度
 */
function radiansToDegrees (radians) {
  const degrees = radians % (2 * Math.PI)
  return degrees * 180 / Math.PI
}
function guiji (data, dataList) {
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 'auto'],
      iconAnchor: [1, 1]
    },
    interactive: false
  })
  data.forEach((item, index) => {
    L.marker([Number(item.lat), Number(item.lon)], { icon: new LeafIcon({ iconUrl: imgPathOffset + item.icon }) }).addTo(layerMarkerA).bindPopup()
  })
  let tMarker = L.polyline(dataList, {
    color: '#0ff',
    interactive: false
  })
  tMarker.addTo(layerMarkerA)
}
function RWtypeA () {
  mymap.on('zoomend ', function (e) {
    let zoom = mymap.getZoom()
    let widthNum = 0
    if (zoom === 9) {
      widthNum = 46
    } else if (zoom === 10) {
      widthNum = 86
    } else if (zoom === 11) {
      widthNum = 175
    } else if (zoom === 12) {
      widthNum = 358
    } else if (zoom === 13) {
      widthNum = 700
    } else if (zoom === 14) {
      widthNum = 1380
    } else if (zoom === 15) {
      widthNum = 2700
    } else if (zoom === 16) {
      widthNum = 5600
    }
    layerMarker.clearLayers()
    let myIcon = L.divIcon({
      html: `<div id="canvasLD" style="width: ` + widthNum + `px;height:` + widthNum + `px;margin-top:` + (widthNum / 2 * -1 + 25) + `px;margin-left:` + (widthNum / 2 * -1 + 25) + `px;box-shadow: 2px 2px ` + widthNum / 3 + `px rgba(149, 242 ,4 , 0.6) inset"><p class="lineA"></p><p class="lineB"></p><p class="yuanA"></p><p class="yuanB"></p><p class="line"><span></span></p></div >`,
      className: 'my-div-label',
      iconSize: 30
    })
    L.marker([39.916527, 116.397128], { icon: myIcon }).addTo(layerMarker)
  })
}
function RWtype (data, zoom) {
  // let data = [
  //   {
  //     icon: 'static/img/1.png',
  //     lat: 39.916527,
  //     lon: 116.397128,
  //     radius: 3
  //   },
  //   {
  //     icon: 'static/img/c.png',
  //     lat: 39.956527,
  //     lon: 116.397128,
  //     radius: 2.5
  //   }
  // ]
  var LeafIcon = ''
  mymapB.on('zoomend ', function (e) {
    let zoom = mymapB.getZoom()
    console.log(zoom, '----csssa')
    let widthNum = 0
    if (zoom > 8) {
      layerMarkerB.clearLayers()
      data.forEach((item, index) => {
        if (zoom === 16 && item.radius === 3.5) {
          widthNum = 800
        } else if (zoom === 15 && item.radius === 3.5) {
          widthNum = 1930
        } else if (zoom === 14 && item.radius === 3.5) {
          widthNum = 960
        } else if (zoom === 13 && item.radius === 3.5) {
          widthNum = 487
        } else if (zoom === 12 && item.radius === 3.5) {
          widthNum = 251
        } else if (zoom === 11 && item.radius === 3.5) {
          widthNum = 126
        } else if (zoom === 10 && item.radius === 3.5) {
          widthNum = 63
        } else if (zoom === 9 && item.radius === 3.5) {
          widthNum = 33
        } else if (zoom === 9 && item.radius === 2.5) {
          widthNum = 23
        } else if (zoom === 10 && item.radius === 2.5) {
          widthNum = 43
        } else if (zoom === 11 && item.radius === 2.5) {
          widthNum = 90
        } else if (zoom === 12 && item.radius === 2.5) {
          widthNum = 181
        } else if (zoom === 13 && item.radius === 2.5) {
          widthNum = 374
        } else if (zoom === 14 && item.radius === 2.5) {
          widthNum = 734
        } else if (zoom === 15 && item.radius === 2.5) {
          widthNum = 1510
        } else if (zoom === 16 && item.radius === 2.5) {
          widthNum = 3100
        } else if (zoom === 9 && item.radius === 2) {
          widthNum = 20
        } else if (zoom === 10 && item.radius === 2) {
          widthNum = 35
        } else if (zoom === 11 && item.radius === 2) {
          widthNum = 72
        } else if (zoom === 12 && item.radius === 2) {
          widthNum = 140
        } else if (zoom === 13 && item.radius === 2) {
          widthNum = 276
        } else if (zoom === 14 && item.radius === 2) {
          widthNum = 554
        } else if (zoom === 15 && item.radius === 2) {
          widthNum = 1100
        } else if (zoom === 16 && item.radius === 2) {
          widthNum = 2200
        } else if (zoom === 9 && item.radius === 3) {
          widthNum = 27
        } else if (zoom === 10 && item.radius === 3) {
          widthNum = 54
        } else if (zoom === 11 && item.radius === 3) {
          widthNum = 108
        } else if (zoom === 12 && item.radius === 3) {
          widthNum = 210
        } else if (zoom === 13 && item.radius === 3) {
          widthNum = 422
        } else if (zoom === 14 && item.radius === 3) {
          widthNum = 850
        } else if (zoom === 15 && item.radius === 3) {
          widthNum = 1740
        } else if (zoom === 16 && item.radius === 3) {
          widthNum = 3500
        }
        LeafIcon = L.Icon.extend({
          options: {
            iconSize: [widthNum, 'auto'],
            iconAnchor: [1, 1]
          },
          interactive: false
        })
        L.marker([Number(item.lat), Number(item.lon)], { icon: new LeafIcon({ iconUrl: imgPathOffset + item.icon }) }).addTo(layerMarkerB).bindPopup()
      })
    } else {
      layerMarkerB.clearLayers()
    }
  })
}
function drawTracks (draw, turntable, type) { // 1绘制目标尾迹点
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 'auto'],
      iconAnchor: [1, 1]
    },
    interactive: false
  })
  // ----------------------------------------
  // let carList = draw['载车式']
  // let fixed = draw['固定式']
  var pe = new LeafIcon({ iconUrl: imgPathOffset + 'static/img/gd.png' }) // 光电
  var radar = new LeafIcon({ iconUrl: imgPathOffset + 'static/img/ld.png' }) // 雷达
  var radio = new LeafIcon({ iconUrl: imgPathOffset + 'static/img/wxzc.png' }) // 无线电
  var WY = new LeafIcon({ iconUrl: imgPathOffset + 'static/img/WY.png' }) // 无缘侦测
  var DXGR = new LeafIcon({ iconUrl: imgPathOffset + 'static/img/DXGR.png' }) // 定向干扰
  var QXGR = new LeafIcon({ iconUrl: imgPathOffset + 'static/img/QXGR.png' }) // 全向干扰
  var car = new LeafIcon({ iconUrl: imgPathOffset + 'static/img/cars.png' }) // 载车式
  if (type) {
    if (draw.length > 0) {
      draw.forEach((item, index) => {
        if (Number(item.type_Device) === 2) {
          let html = ' <div class="itemIconText"><p>设备类型：光电 </p><p>设备型号：' + item.name_Device + '</p> 设备编号：' + item.id_Device + '</div>'
          L.marker([Number(item.calibrate_Latitude), Number(item.calibrate_Longitude)], { icon: pe }).addTo(layerMarker).bindPopup(html)
        }
        if (Number(item.type_Device) === 1) {
          let html = ' <div class="itemIconText"><p>设备类型：雷达 </p><p>设备型号：' + item.name_Device + '</p> 设备编号：' + item.id_Device + '</div>'
          L.marker([Number(item.calibrate_Latitude), Number(item.calibrate_Longitude)], { icon: radar }).addTo(layerMarker).bindPopup(html)
        }
        if (Number(item.type_Device) === 3 || Number(item.type_Device) === 10) {
          let type = ''
          if (Number(item.type_Device) === 3) {
            type = '无源侦测设备'
          }
          if (Number(item.type_Device) === 10) {
            type = '云哨设备'
          }
          let html = ' <div class="itemIconText"><p>设备类型：' + type + ' </p><p>设备型号：' + item.name_Device + '</p> 设备编号：' + item.id_Device + '</div>'
          L.marker([Number(item.calibrate_Latitude), Number(item.calibrate_Longitude)], { icon: WY }).addTo(layerMarker).bindPopup(html)
        }
        if (Number(item.type_Device) === 6 || Number(item.type_Device) === 9) {
          let type = ''
          if (Number(item.type_Device) === 6) {
            type = '定向干扰设备'
          }
          if (Number(item.type_Device) === 9) {
            type = '转台型定向干扰设备'
          }
          let html = ' <div class="itemIconText"><p>设备类型 ：' + type + ' </p><p>设备型号 ：' + item.name_Device + '</p> 设备编号 ：' + item.id_Device + '</div>'
          L.marker([Number(item.calibrate_Latitude), Number(item.calibrate_Longitude)], { icon: DXGR }).addTo(layerMarker).bindPopup(html)
        }
        if (Number(item.type_Device) === 7) {
          let html = ' <div class="itemIconText"><p>设备类型 ：全向干扰设备 </p><p>设备型号 ：' + item.name_Device + '</p> 设备编号 ：' + item.id_Device + '</div>'
          L.marker([Number(item.calibrate_Latitude), Number(item.calibrate_Longitude)], { icon: QXGR }).addTo(layerMarker).bindPopup(html)
        }
        if (Number(item.type_Device) === 4 || Number(item.type_Device) === 5) {
          let type = ''
          if (Number(item.type_Device) === 4) {
            type = '无线电交叉定位设备'
          }
          if (Number(item.type_Device) === 5) {
            type = '无线电TDOA设备'
          }
          let html = ' <div class="itemIconText"><p>设备类型 ：' + type + ' </p><p>设备型号 ：' + item.name_Device + '</p> 设备编号 ：' + item.id_Device + '</div>'
          L.marker([Number(item.calibrate_Latitude), Number(item.calibrate_Longitude)], { icon: radio }).addTo(layerMarker).bindPopup(html)
        }
      })
    }
    if (turntable.length > 0) {
      let html = ' <div class="itemIconText"><p>设备类型 ：车载式 </p><p>载车编号：' + turntable[0].id_Truck + '</p> </div>'
      L.marker([Number(turntable[0].latitude_Truck), Number(turntable[0].longitude_Truck)], { icon: car }).addTo(layerMarker).bindPopup(html)
    }
    //   if (carList !== null) {
    //     var lat = Number((Number(carList.latitude_Truck) * 0.00000001).toFixed(8))
    //     var lon = Number((Number(carList.longitude_Truck) * 0.00000001).toFixed(8))
    //     L.marker([lat, lon], { icon: car }).addTo(layerMarker)
    //   }
    //   if (fixed.length > 0) {
    //     for (var i = 0; i < fixed.length; i++) {
    //       if (fixed[i] !== null) {
    //         if (fixed[i].equipmentInfo_type === '光电') {
    //           L.marker([Number(fixed[i].lat), Number(fixed[i].lon)], { icon: pe }).addTo(layerMarker)
    //         }
    //         if (fixed[i].equipmentInfo_type === '雷达') {
    //           L.marker([Number(fixed[i].lat), Number(fixed[i].lon)], { icon: radar }).addTo(layerMarker)
    //         }
    //         if (fixed[i].equipmentInfo_type === '无线电') {
    //           L.marker([Number(fixed[i].lat), Number(fixed[i].lon)], { icon: radio }).addTo(layerMarker)
    //         }
    //       }
    //     }
    //   }
  } else {
    layerMarker.clearLayers()
  }
}

//
function initMonitMapConfigs (typeCfg, cfgType, enableShowLable, enableShowContent, enableRemoveDead, enableShowTrack, delCallback) {
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

function getLabelContent (objData, zoom) {
  // let type = getCfgType(obj)
  let obj = objData
  let type = dictTargetType[0]
  let cfg = getLabelCfg(type, obj, zoom)
  if (isNullObj(cfg)) return ''
  if (cfg.labelKey === []) return ''

  let seperator = '<br>'
  let content = ''
  for (let i in cfg.labelKey) {
    let key = cfg.labelKey[i]
    let sFiled = ''
    if (key === 'ID_Target') {
      sFiled = '' + obj[key]
      if (Number(obj[key]) === Number(localStorage['list'])) {
        sFiled += '<p class="icon-genzongzhuangtaixianshi-01 iconfont"></p>'
      }
    } else if (key === 'Type_Target') {
      sFiled = '目标类型：无人机'
    } else if (key === 'speed') {
      sFiled = '速度：' + obj[key] + 'm/s'
    } else if (key === 'Height_Target') {
      sFiled = '高度：' + obj[key] + 'm'
    }
    if (content !== '') content += seperator
    content += sFiled
  }
  return content
}

function drawTrackA (obj) { // 2绘制目标尾迹点
  let tMarker
  let className = 'track-point'
  tMarker = L.marker([obj.Latitude_Target, obj.Longitude_Target], {
    // eslint-disable-next-line new-cap
    icon: new L.divIcon({
      className: className,
      iconAnchor: [5, 5],
      iconSize: [10, 10]
    }),
    interactive: false
  })
  tMarker.addTo(layerTrack)
  if (dictTrack.hasOwnProperty(obj.ID_Target)) {
    dictTrack[obj.ID_Target].push(tMarker)
  } else {
    dictTrack[obj.ID_Target] = []
    dictTrack[obj.ID_Target].push(tMarker)
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
    if (dictMarker.hasOwnProperty(obj.ID_Target)) {
      let marker = dictMarker[obj.ID_Target]
      if (e.target._leaflet_id === marker._leaflet_id) {
        if (selectedAdress === obj.ID_Target) {
          selectedAdress = null
          markerClickedCallback(obj, false)
          dictMarker[obj.ID_Target].setZIndexOffset(500)
        } else {
          selectedAdress = obj.ID_Target
          markerClickedCallback(obj, true)
          dictMarker[obj.ID_Target].setZIndexOffset(2000)
        }
      }
    }
  }
}

function openPopup (deviceId, mapZoom) {
  let sContent = getLabelContent(dictMonitorData[deviceId], mapZoom)
  let aMarker = dictMarker[deviceId]
  if (isNotNullObj(aMarker)) {
    if (sContent === '') {
      if (aMarker.isPopupOpen()) { aMarker.closePopup() }
      aMarker.unbindPopup()
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

function getTimingStatus (aryTimingStatus, seconds) {
  for (let i = 0; i < aryTimingStatus.length; i++) {
    let timingStatus = aryTimingStatus[i]
    if (timingStatus.beginSecs <= seconds && timingStatus.endSecs >= seconds) { return timingStatus }
  }
}

function timer1s () {
  let curDate = new Date()
  let delObjs = []
  for (let key in dictMonitorData) {
    // 遍历对象，k即为key，obj[k]为当前k对应的值
    let obj = dictMonitorData[key]

    if (!dictMarker.hasOwnProperty(obj.ID_Target)) {
      continue // 可能还没画完就调用timer1s了
    }
    let objTime = new Date(obj.Timestamp_ms_Track)
    let seconds = parseInt(Math.abs(curDate - objTime + 8000 * 3600) / 1000)
    if (selectedAdress === obj.ID_Target) {
      selectedAdress = obj.ID_Target
      markerClickedCallback(obj, true)
    }
    if (removeDead && seconds >= removeDeadSeconds) {
      // 如果dead需要从地图上消失
      // 删除航迹
      delObjs.push(obj)
      deleteTarget(obj)
    }
  }
  // targetDeletedCallback(delObjs)
}

function clearMarkerDatas () {
  dictMarker = []
  dictLabel = []
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// 以下是标牌相关
let dictLabel = [] // Label字典

function drawLabel (addNew, objData, sLabel, bkSize) {
  let iconMaker
  let status = 'default'
  let obj = objData
  let type = dictTargetType[0]
  let uiCfg = dictTypeCfg[type].statusCfg

  if (addNew === false && dictLabel.hasOwnProperty(obj.ID_Target)) {
    iconMaker = dictLabel[obj.ID_Target]
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
    dictLabel[obj.ID_Target] = iconMaker
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
function drawMarker (addNew, objData, sContent, fnClick) { // 绘制目标图标
  let aMarker
  // let obj = objData[0]
  if (addNew === false && dictMarker.hasOwnProperty(objData.ID_Target)) {
    aMarker = dictMarker[objData.ID_Target]
    let type = dictTargetType[0]
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
    if (objData.Type_Target === 0) {
      aMarker.setRotationOrigin('center center')
      aMarker.setRotationAngle(objData.Direction)
    }
    if (sContent !== '') {
      aMarker.setPopupContent(sContent)
    }
    aMarker.setLatLng([objData.Latitude_Target, objData.Longitude_Target])
    aMarker.update()
  } else {
    let type = dictTargetType[0]
    let uiCfg = dictTypeCfg[type].statusCfg
    // let status = getObjStatus(obj, uiCfg)
    let status = 'default'
    aMarker = L.marker([objData.Latitude_Target, objData.Longitude_Target], {
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
    if (objData.Type_Target === 0) {
      aMarker.setRotationOrigin('center center')
      aMarker.setRotationAngle(objData.Direction)
    }
    dictMarker[objData.ID_Target] = aMarker
    if (sContent !== '') {
      aMarker.bindPopup(sContent)
    }
    if (fnClick !== null) aMarker.on('click', fnClick)
    aMarker.addTo(layerMarker)
  }
}
export {
  initMonitorData,
  setupMonitorDataDict,
  IsNewMonitorData,
  initMonitMapConfigs,
  initMapforMonitorDatas,
  initMapforMonitorDatasA,
  initMapforMonitorDatasB,
  addOrUpdateMonitorData,
  updateAllMonitorDatas,
  getMonitorObj,
  getMonitorData,
  selectObj,
  openPopup,
  updateDeviceLabel,
  updateMonitorTrack,
  clearMarkerDatas,
  drawMarker,
  deleteTrack,
  deleteTarget,
  typeMap,
  drawTracks,
  guiji, // 无人机飞行轨迹显示
  RWtype, // 任务设备部署状态
  RWtypeA,
  drawTrackA,
  mapF,
  mapFence,
  mapS
  // fangkong
}
