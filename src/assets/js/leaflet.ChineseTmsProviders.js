import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

L.TileLayer.ChinaProvider = L.TileLayer.extend({
  initialize: function (type, options) {
    // (type, Object)
    let providers = L.TileLayer.ChinaProvider.providers

    let parts = type.split('.')

    let providerName = parts[0]
    let mapName = parts[1]
    let mapType = parts[2]

    let url = providers[providerName][mapName][mapType]
    options.subdomains = providers[providerName].Subdomains
    options.key = options.key || providers[providerName].key
    L.TileLayer.prototype.initialize.call(this, url, options)
    // console.log(url, options)
  }
})

L.TileLayer.ChinaProvider.providers = {
  TianDiTu: {
    Normal: {
      Map: 'http://t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}',
      Annotion: 'http://t{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}'
    },
    Satellite: {
      Map: 'http://t{s}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}',
      Annotion: 'http://t{s}.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}'
    },
    Terrain: {
      Map: 'http://t{s}.tianditu.com/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}',
      Annotion: 'http://t{s}.tianditu.com/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}'
    },
    Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    key: '0249d9f47878f2a446a8947ddcda1d51'
  },

  GaoDe: {
    Normal: {
      Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
    },
    Satellite: {
      Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
    },
    Subdomains: ['1', '2', '3', '4']
  },

  Google: {
    Normal: {
      Map: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
    },
    Satellite: {
      Map: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
    },
    Subdomains: []
  },

  Geoq: {
    Normal: {
      Map: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
      PurplishBlue: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      Gray: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
      Warm: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}'
    },
    Theme: {
      Hydro: 'http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}'
    },
    Subdomains: []
  },

  LiXian: {
    Normal: {
      //          Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      //  Map: 'img/{z}/{x}/{y}.png',
      Map: '/static/map-img/{z}/{x}/{y}.png'                
    },
    Satellite: {
      //          Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      Map: '/static/map-img/{z}/{x}/{y}.png',
      //          Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
      Annotion: '../../../static/map-img/{z}/{x}/{y}.png'
    },
    Subdomains: [ '3', '4','5', '6'],
    // zIndex:3
  },

  OSM: {
    Normal: {
      Map: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    },
    Subdomains: ['a', 'b', 'c']
  }
}

// L.tileLayer.chinaProvider = function (type, options) {
//   return new L.TileLayer.ChinaProvider(type, options)
// }
function chinaProvider (type, options) {
  return new L.TileLayer.ChinaProvider(type, options)
}

export {
  chinaProvider
}
