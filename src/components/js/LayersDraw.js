import http from '@/api/http.js'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import markerIcon from 'leaflet-draw/dist/images/marker-icon.png'
// 引入全路径，用于exe打包
import { baseApi, taskApi, equipmentApi, apiAdmin } from '../basic/system'
// import markerIcon from '@/../static/img/red_flag.png'
// import 'leaflet-measure/dist/leaflet-measure.cn'
// import 'leaflet-measure/dist/leaflet-measure.css'

let orgId = '0'

/** ******************* 显示自绘图层相关 ***************************/

let cusLayerItems = []

function initCustomizeLayers (mapConfig) { // 初始化自绘图层
  for (let key in mapConfig.layerCfg) {
    if (mapConfig.layerCfg[key].type === 'userDraw') {
      mapConfig.layerCfg[key].layer = L.featureGroup([])
      return mapConfig.layerCfg[key]
    }
  }
}

function getLayersData (type) { // 根据图层类型，获取自绘图层接口数据
  let fullUrl = baseApi + '/api/ATMS/GetGeoLayerData/' + type + '/' + orgId
  let layersData = []
  return new Promise(resolve => {
    http.get(fullUrl).then(res => {
      if (res && res.code === '200') {
        layersData = res.data
        for (let key in layersData) {
          layersData[key].geoValue = JSON.parse(layersData[key].geoValue)
          layersData[key].layerConf = JSON.parse(layersData[key].layerConf)
          if (layersData[key].textConf) {
            layersData[key].textConf = JSON.parse(layersData[key].textConf)
          }
          if (layersData[key].popupOption) {
            layersData[key].popupOption = JSON.parse(layersData[key].popupOption)
          }
          if (layersData[key].tooltipOption) {
            layersData[key].tooltipOption = JSON.parse(layersData[key].tooltipOption)
          }
          if (layersData[key].jsonKey) {
            layersData[key].jsonKey = JSON.parse(layersData[key].jsonKey)
          }
          if (layersData[key].jsonValue) {
            layersData[key].jsonValue = JSON.parse(layersData[key].jsonValue)
          }
        }
        resolve(layersData)
      } else if (res && res.code === '204') {
        this.$Message.warning(res.message)
      } else if (!res.status) {
        this.$Message.error(res.message)
      }
    })
  })
}

function getCustomizeLayers (cfg) { // 获取自绘图层接口数据，判断绘制类型并进行绘制
  let fullUrl = cfg.url + orgId
  http.get(fullUrl).then((response) => {
    if (response && response.code === '200') {
      if (cfg.layer.getLayers().length > 0) {
        cfg.layer.clearLayers()
      }
      cusLayerItems = response.data
      for (let key in cusLayerItems) {
        cusLayerItems[key].geoValue = JSON.parse(cusLayerItems[key].geoValue)
        cusLayerItems[key].layerConf = JSON.parse(cusLayerItems[key].layerConf)
        if (cusLayerItems[key].textConf) {
          cusLayerItems[key].textConf = JSON.parse(cusLayerItems[key].textConf)
        }
        if (cusLayerItems[key].popupOption) {
          cusLayerItems[key].popupOption = JSON.parse(cusLayerItems[key].popupOption)
        }
        if (cusLayerItems[key].tooltipOption) {
          cusLayerItems[key].tooltipOption = JSON.parse(cusLayerItems[key].tooltipOption)
        }
        if (cusLayerItems[key].jsonKey) {
          cusLayerItems[key].jsonKey = JSON.parse(cusLayerItems[key].jsonKey)
        }
        if (cusLayerItems[key].jsonValue) {
          cusLayerItems[key].jsonValue = JSON.parse(cusLayerItems[key].jsonValue)
        }
        if (cusLayerItems[key].geoType === 'point') {
          drawPoint(cusLayerItems[key], cfg.layer)
        } else if (cusLayerItems[key].geoType === 'line') {
          drawLine(cusLayerItems[key], cfg.layer)
        } else if (cusLayerItems[key].geoType === 'area') {
          drawArea(cusLayerItems[key], cfg.layer)
        } else if (cusLayerItems[key].geoType === 'circle') {
          drawCircle(cusLayerItems[key], cfg.layer)
        }
      }
    } else if (response && response.code === '204') {
      this.$Message.warning(response.message)
    } else if (!response.status) {
      this.$Message.error(response.message)
    }
  }).catch(error => {
    console.log('error', error)
  })
}

function refreshCustomizeLayers (map, layer) {
  if (map.hasLayer(layer)) {
    layer.remove()
    layer.addTo(map)
  }
}

function getCusLayerItems () {
  return cusLayerItems
}

function arrTrans (arr) { // 一维数组转换为二维数组
  let a = []
  a.push(...arr)
  arr.splice(0)
  arr.push(a)
}

// function drawTexts (text, layer) { // 绘制文字
//   if (text) {
//     if (!(points.latlng[0] instanceof Array)) {
//       arrTrans(points.latlng)
//     }
//
//     for (let key in points.latlng) {
//       let marker = L.marker(points.latlng[key], {
//         // eslint-disable-next-line new-cap
//         icon: new L.divIcon({
//           html: points.text[key].html,
//           iconSize: points.text[key].size,
//           iconAnchor: points.text[key].textAnchor,
//           className: 'text-div-icon'
//         })
//       })
//       marker.addTo(layer)
//     }
//   }
//   console.log('layer', layer)
// }

function drawPoint (point, layer) { // 绘制点类型的自绘图层
  let icon = L.icon(point.layerConf.icon.options)
  let marker = L.marker(point.geoValue, { icon: icon })
  // if (point.icon.geoContent) {
  //   marker.bindPopup(point.icon.geoContent)
  // }
  if (point.tooltipContent) {
    marker.bindTooltip(point.tooltipContent, point.tooltipOption)
  }
  marker.cusId = point.oid
  marker.addTo(layer)
  // drawTexts(point, layer)
}

function drawLine (line, layer) { // 绘制线类型的自绘图层
  let polyline = L.polyline(line.geoValue, line.layerConf)
  if (line.tooltipContent) {
    polyline.bindTooltip(line.tooltipContent, line.tooltipOption)
  }
  polyline.cusId = line.oid
  // if (line.line.geoContent) {
  //   polyline.bindPopup(line.line.geoContent)
  // }
  polyline.addTo(layer)
  // drawTexts(line, layer)
}

function drawArea (area, layer) { // 绘制面类型的自绘图层
  let polygon = L.polygon(area.geoValue, area.layerConf)
  if (area.tooltipContent) {
    polygon.bindTooltip(area.tooltipContent, area.tooltipOption)
  }
  polygon.cusId = area.oid
  // if (area.area.geoContent) {
  //   polygon.bindPopup(area.area.geoContent)
  // }
  polygon.addTo(layer)
  // drawTexts(area, layer)
}

function drawCircle (circle, layer) {
  let drawCircle = L.circle(circle.geoValue, circle.layerConf)
  if (circle.tooltipContent) {
    drawCircle.bindTooltip(circle.tooltipContent, circle.tooltipOption)
  }
  drawCircle.cusId = circle.oid
  drawCircle.addTo(layer)
}

/** ******************* 绘制自绘图层相关 ***************************/

let drawItems = null
let drawControl = null
let drawFlag = false

function changeDrawFlag (flag) { // 判断是否监听自定义绘制图层
  drawFlag = flag
}

function listenCreateDraw (map, createCallback) { // 监听自绘图层新增事件
  map.on('draw:created', (e) => {
    if (drawFlag) {
      let layer = e.layer
      console.log(e)
      drawItems.addLayer(layer)
      createCallback(e, drawItems, drawControl)
      layer.on('click', () => {
        createCallback(e, drawItems, drawControl)
      })
    }
  })
}

function addDraw (map, createCallback, editCallback) {
  drawItems = new L.FeatureGroup()
  drawItems.addTo(map)
  drawControl = new L.Control.Draw({
    position: 'topleft',
    draw: {
      marker: {
        // eslint-disable-next-line new-cap
        icon: new L.icon({
          iconUrl: markerIcon,
          iconAnchor: [12.5, 41]
        })
      },
      circlemarker: false
    },
    edit: {
      featureGroup: drawItems
    }
  })
  map.addControl(drawControl)
  listenCreateDraw(map, createCallback)
  return drawItems
}

function closeDraw (map) {
  drawControl.remove()
  drawControl = null
  if (map.hasLayer(drawItems)) {
    map.removeLayer(drawItems)
    drawItems.clearLayers()
    drawItems = null
  }
}

function isEnabledDraw () {
  if (drawControl === null) {
    return false
  } else {
    return true
  }
}

function cleanDrawItems () {
  drawItems.clearLayers()
}

/** ******************* 测距相关 ***************************/

let measureControl = null

// function initMeasureControl (map) {
//   let options = {
//     position: 'topleft',
//     primaryLengthUnit: 'kilometers',
//     secondaryLengthUnit: 'miles',
//     primaryAreaUnit: 'sqkilometers',
//     secondaryAreaUnit: 'sqmiles',
//     units: {
//       sqkilometers: {
//         factor: 0.000001,
//         display: '平方公里',
//         decimals: 2
//       }
//     }
//   }
//   measureControl = new L.Control.Measure(options)
//   measureControl.addTo(map)
// }

export {
  initCustomizeLayers,
  getCustomizeLayers,
  refreshCustomizeLayers,
  getCusLayerItems,
  arrTrans,
  addDraw,
  closeDraw,
  isEnabledDraw,
  cleanDrawItems,
  changeDrawFlag,
  getLayersData,
  drawArea
}
