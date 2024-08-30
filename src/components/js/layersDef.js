import L from 'leaflet'
import {
  chinaProvider
} from './leaflet.ChineseTmsProviders.js'
import {
  tiledMapLayer
} from '@supermap/iclient-leaflet'

function getBaseLayers () {
  /**
   * 智图地图内容
   */
  let normalm1 = chinaProvider('Geoq.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
  })
  // let normalm2 = chinaProvider('Geoq.Normal.Color', {
  //   maxZoom: 18,
  //   minZoom: 5
  // })
  let normalm3 = chinaProvider('Geoq.Normal.PurplishBlue', {
    maxZoom: 18,
    minZoom: 5
  })
  let normalm4 = chinaProvider('Geoq.Normal.Gray', {
    maxZoom: 18,
    minZoom: 5
  })
  let normalm5 = chinaProvider('Geoq.Normal.Warm', {
    maxZoom: 18,
    minZoom: 5
  })
  // let normalm6 = chinaProvider('Geoq.Normal.Cold', {
  //   maxZoom: 18,
  //   minZoom: 5
  // })
  /**
   * 天地图内容
   */
  let normalm = chinaProvider('TianDiTu.Normal.Map', {
    maxZoom: 21,
    minZoom: 0
  })
  let normala = chinaProvider('TianDiTu.Normal.Annotion', {
    maxZoom: 21,
    minZoom: 0
  })
  let imgm = chinaProvider('TianDiTu.Satellite.Map', {
    maxZoom: 21,
    minZoom: 0
  })
  let imga = chinaProvider('TianDiTu.Satellite.Annotion', {
    maxZoom: 21,
    minZoom: 0
  })

  let normal = L.layerGroup([ normalm, normala ])
  // console.log(imgm, imga)
  let image = L.layerGroup([ imgm, imga ])
  /**
   * 谷歌
   */
  let normalMap = chinaProvider('Google.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
  })
  let satelliteMap = chinaProvider('Google.Satellite.Map', {
    maxZoom: 18,
    minZoom: 5
  })
  /**
   * 高德地图
   */
  let Gaode = chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
  })
  let Gaodimgem = chinaProvider('GaoDe.Satellite.Map', {
    maxZoom: 18,
    minZoom: 5
  })
  let Gaodimga = chinaProvider('GaoDe.Satellite.Annotion', {
    maxZoom: 18,
    minZoom: 5
  })
  let Gaodimage = L.layerGroup([ Gaodimgem, Gaodimga ])
  /**
   * 离线高德地图
   */
  let LiXian = chinaProvider('LiXian.Normal.Map', {
    maxZoom: 9,
    minZoom: 3
  })

  let baseLayers = {
    离线地图: LiXian,
    iserver卫星影像图: tiledMapLayer(
      'http://212.64.20.142:10080/iserver/services/map-new424/rest/maps/image3857'
    ),
    iserver航行情报简图: tiledMapLayer(
      'http://212.64.20.142:10080/iserver/services/map-new424/rest/maps/main3857'
    ),
    iserver全国浅色图: tiledMapLayer(
      'http://212.64.20.142:10080/iserver/services/map-new424/rest/maps/China3857'
    ),
    天地图: normal,
    天地图影像: image,
    谷歌地图: normalMap,
    谷歌影像: satelliteMap,
    高德地图: Gaode,
    高德影像: Gaodimage,
    智图地图: normalm1,
    // 智图多彩: normalm2,
    智图午夜蓝: normalm3,
    智图灰色: normalm4,
    智图暖色: normalm5,
    纯色背景: L.layerGroup()
    // 智图冷色: normalm6,
  }

  return baseLayers
}

export {
  getBaseLayers
}
