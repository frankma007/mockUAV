import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {
  getBaseLayers
} from './layersDef.js'
import 'leaflet-measure/dist/leaflet-measure.cn'
import 'leaflet-measure/dist/leaflet-measure.css'

let baseLayers = null
let overLayMaps = null

let map = null
let mapConfig = null
let currentBaseLayerName = ''
let measureControl = null

function initMyMap (mapId, config) {
  mapConfig = config
  baseLayers = getBaseLayers()
  overLayMaps = L.featureGroup()
  map = L.map(mapId, {
    preferCanvas: true,
    center: mapConfig.mapCenter,
    maxZoom: 21,
    minZoom: 5,
    zoom: mapConfig.mapZoom,
    zoomControl: false,
    attributionControl: false
  })
  currentBaseLayerName = mapConfig.defaultBaseLayer
  map.addLayer(baseLayers[mapConfig.defaultBaseLayer])
  map.addLayer(overLayMaps)
  return map
}

function initMeasureControl () { // 初始化测距控件
  let options = {
    position: 'topleft',
    primaryLengthUnit: 'kilometers',
    secondaryLengthUnit: 'miles',
    primaryAreaUnit: 'sqkilometers',
    secondaryAreaUnit: 'sqmiles',
    units: {
      sqkilometers: {
        factor: 0.000001,
        display: '平方公里',
        decimals: 2
      }
    }
  }
  measureControl = new L.Control.Measure(options)
  measureControl.addTo(map)
  return measureControl
}

function switchMeasureControl () {
  if (measureControl) {
    measureControl.remove()
    measureControl = null
  } else {
    initMeasureControl()
  }
}

function initFKLayer () { // 初始化防控区域图层
  let fkLayer = L.layerGroup()
  overLayMaps.addLayer(fkLayer)
  return fkLayer
}

function changeBaseLayer (layerName) {
  if (currentBaseLayerName && map.hasLayer(baseLayers[currentBaseLayerName])) {
    map.removeLayer(baseLayers[currentBaseLayerName])
  }
  currentBaseLayerName = layerName
  baseLayers[currentBaseLayerName].setZIndex(1)
  map.addLayer(baseLayers[currentBaseLayerName])
}

function setOverLayVisible (layer, visible) {
  if (visible) {
    if (!overLayMaps.hasLayer(layer)) {
      overLayMaps.addLayer(layer)
    }
  } else {
    if (overLayMaps.hasLayer(layer)) {
      overLayMaps.removeLayer(layer)
    }
  }
}

function getMyBaseLayers () {
  return baseLayers
}

function getMap () {
  return map
}
export {
  initMyMap,
  initFKLayer,
  initMeasureControl,
  switchMeasureControl,
  setOverLayVisible,
  getMap,
  getMyBaseLayers,
  changeBaseLayer
}
