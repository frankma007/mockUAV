<template>
  <div :id="divId" class="cesiumContainer">
    <div class="mapLngLat" v-show="showMapLngLat">
      <el-button type="text" @click="btnClick_latlngString">{{ latlngString }}
      </el-button>
      <!-- <el-button type="text">{{ mapZoom }}</el-button> -->
    </div>
    <!-- <cesiumDrawviewer ref="draw" v-if="enableDrawTool" v-show="showDrawer" :viewer="viewer" :extendMarkerImage="imags"
      :extendMarkerModel="model" @closeEvent="showDrawer = !showDrawer"></cesiumDrawviewer> -->

    <!-- 比例尺面板 -->
    <div class="scale-container" v-show="showMapScale">
      <div class="scale-label">{{ distanceLabel || '' }}</div>
      <div v-if="barWidth" class="scale-bar" :style="{ width: barWidth + 'px' }"></div>
    </div>

    <!-- <cesiumMeasure ref="measure" v-if="enableMeasureTool" :viewer="viewer"></cesiumMeasure> -->
  </div>

</template>
<script>
import {
  isNotNullObj
} from '@/../src/utilities/util.js'
import '@/../node_modules/cesium/Source/Widgets/widgets.css'
window.Cesium = require('@/../node_modules/cesium/Source/Cesium')
const Cesium = window.Cesium

export default {
  components: {
    // cesiumDrawViewer: () =>
    //   import('@/components/cesium/cesiumDraw/cesiumDrawViewer.vue'),
    // cesiumDrawViewer: () =>
    //   import('@/components/cesium/cesiumDraw/ownCesiumDraw.vue'),
    // cesiumMeasure: () =>
    //   import('@/components/cesium/cesiumMeasure/cesiumMeasure.vue')
  },
  props: {
    divId: {
      type: String,
      default: 'cesiumContainer'
    },
    enableDrawTool: {
      type: Boolean,
      default: false
    },
    enableMeasureTool: {
      type: Boolean,
      default: false
    },
    showMapLngLat: {
      type: Boolean,
      default: true
    },
    showMapScale: {
      type: Boolean,
      default: true
    },
    maxTailPoints: {
      type: Number,
      default: 100
    },
    tailLineColor: {
      type: String,
      default: '#0000FF'
    },
    clampToGround: {
      // 是否贴地显示
      type: Boolean,
      default: false
    },
    baseLayer: {
      type: String,
      default: 'TianDi'
    },
    imageType: {
      type: String,
      default: 'vector'
    },
    homeLon: {
      type: Number,
      default: 121.506377 // 87.198293
    },
    homeLat: {
      type: Number,
      default: 31.245105 // 43.841076
    },
    homeHeight: {
      type: Number,
      default: 7850000
    },
    loadTerrain: {
      type: Boolean,
      default: true
    },
    showGrid: {
      type: Boolean,
      default: false
    },
    showInfoBox: {
      type: Boolean,
      default: true
    },
    enableCameraChanged: {
      type: Boolean,
      default: false
    },
    enableMouseHandler: {
      type: Boolean,
      default: true
    },
    fullscreenButton: {
      type: Boolean,
      default: true
    },
    homeButton: {
      type: Boolean,
      default: true
    },
    sceneModePicker: {
      type: Boolean,
      default: false
    },
    sceneMode: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      layerType: this.imageType,
      mouseLatlng: { lng: 0, lat: 0, alt: 0 }, // 当前鼠标的经纬度位置
      latlngStringFormat: 0, // 经纬度格式 0: ddd°mm′ss.sssss″ 1: ddd.dddddd
      latlngString: '', // 经纬度显示内容
      mapZoom: 1,
      viewer: {},
      scene: {},
      lastSelectedEntity: {},
      // mouseMoveLabel: {},
      dictTail: {},
      tailPoints: [],
      showDrawer: true,
      imags: [
        // '@/../static/images/markers/1.png',
        // '@/../static/images/markers/2.png',
        // '@/../static/images/markers/3.png',
        // '@/../static/images/markers/4.png',
        // '@/../static/images/markers/5.png',
        // '@/../static/images/markers/6.png',
        // '@/../static/images/markers/7.png',
        // '@/../static/images/markers/8.png',
        // '@/../static/images/markers/5.png',
        // '@/../static/images/markers/6.png'
      ],
      model: [
        // {
        //   id: 'model0',
        //   name: '木塔',
        //   url: 'http://localhost:8180/cesium/3DModel/test/gltf_zapo/Object02.gltf'
        // },
        // { id: 'model1', name: '人', url: 'http://localhost:8180/cesium/3DModel/test/gltf_zapo/Object02.gltf' },
        // {
        //   id: 'model2',
        //   name: '车',
        //   url: 'http://localhost:8180/cesium/3DModel/test/gltf_zapo/ZP_DB_04.gltf'// @/../static/models/CesiumMilkTruck.gltf
        // },
        // { id: 'model3', name: '平面', url: 'http://localhost:8180/cesium/3DModel/test/gltf_zapo/Object02.gltf' }
      ],
      distanceLabel: undefined,
      barWidth: undefined,
      customLayers: {},
      cameraPitch: -90
    }
  },
  mounted: async function () {
    this.initViewer()
    this.viewer.imageryLayers.removeAll()
    this.loadTianDiImageryLayers()

    if (this.showGrid) {
      this.addAdditionalLayerOption(
        'Grid',
        new Cesium.GridImageryProvider(),
        0.5,
        true
      )
      this.addAdditionalLayerOption(
        'Tile Coordinates',
        new Cesium.TileCoordinatesImageryProvider(),
        0.5,
        true
      )
    }
    if (this.loadTerrain) {
      this.initTerrain()
    }
    // this.initTerrain()
    if (this.enableMouseHandler) this.initMouseHandler()
    this.usrInit()
  },
  methods: {
    usrInit () {
      if (this.enableCameraChanged) {
        this.viewer.camera.changed.addEventListener(this.cameraChanged)
        this.viewer.camera.percentageChanged = 0.01
      }

      // 将三维球定位到默认位置
      // if (this.sceneMode === Cesium.SceneMode.SCENE3D) {
      this.flyTo(this.homeLon, this.homeLat, this.homeHeight)
      // }

      // this.$emit('compLoaded')

      // 场景变化监听事件
      this.viewer.scene.postRender.addEventListener(this.cesiumScale)
    },
    // 比例尺
    cesiumScale () {
      var geodesic = new Cesium.EllipsoidGeodesic()
      var distances = [
        1,
        2,
        3,
        5,
        10,
        20,
        30,
        50,
        100,
        200,
        300,
        500,
        1000,
        2000,
        3000,
        5000,
        10000,
        20000,
        30000,
        50000,
        100000,
        200000,
        300000,
        500000,
        1000000,
        2000000,
        3000000,
        5000000,
        10000000,
        20000000,
        30000000,
        50000000
      ]
      // Find the distance between two pixels at the bottom center of the screen.
      let scene = this.viewer.scene
      let width = scene.canvas.clientWidth
      let height = scene.canvas.clientHeight

      let left = scene.camera.getPickRay(
        new Cesium.Cartesian2((width / 2) | 0, height - 1)
      )
      let right = scene.camera.getPickRay(
        new Cesium.Cartesian2((1 + width / 2) | 0, height - 1)
      )

      let globe = scene.globe
      let leftPosition = globe.pick(left, scene)
      let rightPosition = globe.pick(right, scene)

      if (!Cesium.defined(leftPosition) || !Cesium.defined(rightPosition)) {
        this.barWidth = undefined
        this.distanceLabel = undefined
        return
      }

      let leftCartographic = globe.ellipsoid.cartesianToCartographic(
        leftPosition
      )
      let rightCartographic = globe.ellipsoid.cartesianToCartographic(
        rightPosition
      )

      geodesic.setEndPoints(leftCartographic, rightCartographic)
      let pixelDistance = geodesic.surfaceDistance

      // Find the first distance that makes the scale bar less than 100 pixels.
      let maxBarWidth = 100
      let distance
      for (
        let i = distances.length - 1;
        !Cesium.defined(distance) && i >= 0;
        --i
      ) {
        if (distances[i] / pixelDistance < maxBarWidth) {
          distance = distances[i]
        }
      }

      if (Cesium.defined(distance)) {
        var label =
          distance >= 1000
            ? (distance / 1000).toString() + ' km'
            : distance.toString() + ' m'
        this.barWidth = (distance / pixelDistance) | 0
        this.distanceLabel = label
      } else {
        this.barWidth = undefined
        this.distanceLabel = undefined
      }
    },
    // 设置镜头缩放
    // setCameraZoom (rate) {
    //   if (rate < 1) {
    //     this.viewer.camera.zoomIn(this.getCameraHeight() * rate)
    //   } else {
    //     this.viewer.camera.zoomOut(this.getCameraHeight() * rate)
    //   }
    // },
    initViewer () {
      // 设置静态资源目录
      // buildModuleUrl.setBaseUrl('../../../static/Cesium/')
      // 加载自己的账户Token，没有的话会在显示版权信息的时候显示使用了默认Token的警告信息
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YjdjZWNjNy1iZDhhLTRjNDYtYjA3MC0wOGU2NTE4MTQxZjUiLCJpZCI6NDI1NDYsImlhdCI6MTYxMTU2NDI5Nn0.8oViu6YZZlDmHbsjL5sMjnWYukjmmnxYIrGswIto2Qo'
      // 创建viewer实例
      this.viewer = new Cesium.Viewer(this.divId, {
        vrButton: false, // 是否显示双屏
        animation: false, // 是否显示动画控件
        shouldAnimate: false, // 是否初始时刻运动
        homeButton: this.homeButton, // 是否显示Home按钮
        fullscreenButton: this.fullscreenButton, // 是否显示全屏按钮
        baseLayerPicker: false, // 是否显示图层选择控件 去掉自带的图层选择器
        geocoder: false, // 是否显示地名查找控件,设置为true，则无法查询
        timeline: false, // 是否显示时间线控件
        sceneModePicker: this.sceneModePicker, // 是否显示投影方式控件 三维/二维
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: this.showInfoBox, // 是否显示点击要素之后显示的信息 信息框小部件
        requestRenderMode: false, // true启用请求渲染模式:更新实体需拖动地图 视图才更新[true 加载完entity后requestRender一下]
        scene3DOnly: true, // 每个几何实例将只能以3D渲染以节省GPU内存 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        sceneMode: this.sceneMode, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode.SCENE2D
        fullscreenElement: document.body, // 全屏时渲染的HTML元素
        selectionIndicator: true // 是否显示选取指示器组件
        // terrainProvider: Cesium.createWorldTerrain() // 注释时相当于使用默认地形，解开注释相当于使用全球地形[世界地形数据]
      })
      // 隐藏版权信息
      this.viewer._cesiumWidget._creditContainer.style.display = 'none'
      // 隐藏地名查找控件
      // this.viewer.geocoder.container.style.display = 'none'

      // 抗锯齿
      this.viewer.scene.postProcessStages.fxaa.enabled = false
      // 水雾特效
      this.viewer.scene.globe.showGroundAtmosphere = true
      // 设置最大俯仰角，[-90,0]区间内，默认为-30，单位弧度
      this.viewer.scene.screenSpaceCameraController.constrainedPitch = Cesium.Math.toRadians(
        -20
      )
      // 取消默认的双击事件
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      )

      // if (this.sceneMode === Cesium.SceneMode.SCENE2D) {
      // disable any camera movement on the 2D view
      this.viewer.scene.screenSpaceCameraController.enableRotate = true
      this.viewer.scene.screenSpaceCameraController.enableTranslate = true // 平移
      this.viewer.scene.screenSpaceCameraController.enableZoom = true
      // this.viewer.scene.screenSpaceCameraController.enableTilt = false // 倾斜
      this.viewer.scene.screenSpaceCameraController.enableLook = true // 自由外观
      // }

      // 修改homeButton的默认位置
      // let viewer = this.viewer
      // let homeLon = this.homeLon
      // let homeLat = this.homeLat
      // let homeHeight = this.homeHeight

      this.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        e => {
          e.cancel = true
          this.toHomeButton()
        }
      )

      // // 经度: 87.198293
      // // 纬度: 43.841076
      // let lon = this.homeLon
      // let lat = this.homeLat
      // Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(lon - 1, lat - 1, lon + 1, lat + 1)// Rectangle(west, south, east, north)
      // this.scene = this.viewer.scene
      // if (!this.scene.pickPositionSupported) {
      //   window.alert('This browser does not support pickPosition.')
      // }

      this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 20
      this.viewer.scene.screenSpaceCameraController.maximumZoomDistance =
        500000 * 5 * 2 * 1.8
      // this.viewer.selectedEntityChanged.addEventListener(
      //   this.selectedEntityChanged
      // )

      // 监听地图移动完成事件
      // this.viewer.camera.moveEnd.addEventListener(this.onMoveendMap)
    },
    toHomeButton () {
      // 你要飞的位置
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          this.homeLon,
          this.homeLat,
          this.homeHeight
        ),
        orientation: {
          // 包含了方位(direction)、上方向(up)以及方位角(heading)、俯仰角(pitch)、滚动角(roll)属性的对象。
          // heading: Cesium.Math.toRadians(348.4202942851978),
          // pitch: Cesium.Math.toRadians(-89.74026687972041),
          heading: Cesium.Math.toRadians(-34.3),
          pitch: Cesium.Math.toRadians(-90),
          roll: Cesium.Math.toRadians(0)
        }
      })
    },
    onMoveendMap () {
      // 监听地图移动完成事件
      // 获取当前相机高度
      // let height = Math.ceil(this.viewer.camera.positionCartographic.height)
      // let zoom = this.altitudeToZoom(height)
      // this.latlngString = this.getZoomLatlngString()
      // let bounds = this.getMapBounds() // this.viewer.camera.computeViewRectangle()

      // if (
      //   // isNotNullObj(bounds[0]) &&
      //   // isNotNullObj(bounds[1]) &&
      //   // isNotNullObj(bounds[2]) &&
      //   // isNotNullObj(bounds[3])
      // ) {
      //   let pitch = this.viewer.camera.pitch
      //   if (this.mapZoom !== zoom || this.cameraPitch !== pitch) {
      //     this.$emit('mapZoomChanged', zoom, bounds)
      //   }
      //   this.mapZoom = zoom

      //   this.$emit('mapViewChanged', zoom, bounds)
      // }
      // console.log('地图变化监听事件', height, zoom, bounds)
      // let camera=this.viewer.camera
      // console.log(camera.heading, camera.pitch,camera.roll)
      // console.log(Cesium.Math.toDegrees(camera.heading), Cesium.Math.toDegrees(camera.pitch),Cesium.Math.toDegrees(camera.roll))
    },
    // getMapBounds () {
    //   var rectangle = this.viewer.camera.computeViewRectangle()
    //   // if (isNullObj(rectangle)) {
    //   //   return []
    //   // }

    //   // 弧度转为经纬度，west为左（西）侧边界的经度，以下类推
    //   var west = (rectangle.west / Math.PI) * 180
    //   var north = (rectangle.north / Math.PI) * 180
    //   var east = (rectangle.east / Math.PI) * 180
    //   var south = (rectangle.south / Math.PI) * 180
    //   // 鉴于高德、leaflet获取的边界都是southwest和northeast字段来表示，本例保持一致性
    //   // var bounds = {
    //   //     southwest: {
    //   //         lng: west,
    //   //         lat: south
    //   //     },
    //   //     northeast: {
    //   //         lng: east,
    //   //         lat: north
    //   //     }
    //   // }
    //   // return bounds;
    //   return [west, south, east, north]
    // },
    // Cartesian3ToCartographic (x, y, h) {
    //   // // 屏幕坐标转世界坐标
    //   // var pick= new Cesium.Cartesian2(window.innerWidth,window.innerHeight);
    //   // var cartesian = scene.globe.pick(viewer.camera.getPickRay(pick), scene);

    //   // // 世界坐标转地理坐标（弧度）
    //   // var cartographic = scene.globe.ellipsoid.cartesianToCartographic(cartesian);
    //   // // 或
    //   // var cartographic = Cesium.Cartographic.fromCartesian(cartesian);

    //   // //地理坐标（弧度）转经纬度坐标
    //   // var point=[ cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
    //   let cartesian = new Cesium.Cartesian3(x, y, h)
    //   var ellipsoid = this.viewer.scene.globe.ellipsoid
    //   var cartographic = ellipsoid.cartesianToCartographic(cartesian)
    //   var lat = Cesium.Math.toDegrees(cartographic.latitude)
    //   var lng = Cesium.Math.toDegrees(cartographic.longitude)
    //   var alt = cartographic.height
    //   return [lng, lat, alt]
    // },
    // altitudeToZoom (altitude) {
    //   //  z      altitude (metres)
    //   // -----   -----------------
    //   //  3          10311040
    //   //  4           5932713
    //   //  5           2966357
    //   //  6           1483178
    //   //  7            741589
    //   //  8.6          243624
    //   // 11.35          36310
    //   // 13.85           6410
    //   // 15.26           2411
    //   // 17.01            717
    //   // 18.27            214
    //   // 19.6             119
    //   // 20.77             50
    //   // 21                44

    //   var A = 40487.57
    //   var B = 0.00007096758
    //   var C = 91610.74
    //   var D = -40467.74

    //   // return D + (A - D) / (1 + Math.pow(altitude / C, B))
    //   return Math.round(D + (A - D) / (1 + Math.pow(altitude / C, B)))
    // },
    // getMapZoom () {
    //   return this.mapZoom
    // },
    selectedEntityChanged (newEntity) {
      let oldid = null
      let newid = null
      if (isNotNullObj(this.lastSelectedEntity)) {
        let id = this.lastSelectedEntity.id
        oldid = id
        let pline = this.viewer.entities.getById('T' + id)
        this.viewer.entities.remove(pline)
      }
      if (newEntity != null && newEntity.gvtype == null) {
        this.lastSelectedEntity = newEntity
        if (isNotNullObj(this.lastSelectedEntity)) {
          let id = this.lastSelectedEntity.id
          newid = id
          this.createTailLine(id, this.tailLineColor)
        }
        this.$emit('selectedEntityChanged', oldid, newid)
      }
    },
    initTerrain () {
      this.viewer.terrainProvider = Cesium.createWorldTerrain()
      this.viewer.scene.primitives.add(Cesium.createOsmBuildings())

      this.viewer.terrainProvider = new Cesium.ArcGISTiledElevationTerrainProvider({
        url:
          'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
      })
    },
    addAdditionalLayerOption (name, imageryProvider, alpha, show) {
      var layer = this.viewer.imageryLayers.addImageryProvider(imageryProvider)
      layer.alpha = Cesium.defaultValue(alpha, 0.5)
      layer.show = Cesium.defaultValue(show, true)
      layer.name = name
    },
    // loadGaoDeImageryLayers () {
    //   // 加载高德/百度影像地图，UrlTemplateImageryProvider该接口是加载谷歌地图服务的接口
    //   this.viewer.imageryLayers.addImageryProvider(
    //     new Cesium.UrlTemplateImageryProvider({
    //       url:
    //         'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    //       subdomains: ['1', '2', '3', '4'],
    //       layer: 'tdtVecBasicLayer',
    //       style: 'default',
    //       format: 'image/png',
    //       tileMatrixSetID: 'GoogleMapsCompatible',
    //       show: false
    //     })
    //   )
    //   // 如果需要叠加高德/百度注记地图则添加以下代码
    //   this.viewer.imageryLayers.addImageryProvider(
    //     new Cesium.UrlTemplateImageryProvider({
    //       url:
    //         'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    //       layer: 'tdtAnnoLayer',
    //       style: 'default',
    //       format: 'image/jpeg',
    //       tileMatrixSetID: 'GoogleMapsCompatible'
    //     })
    //   )
    // },
    loadTianDiImageryLayers () {
      var token = 'd9d0266f47e18559f5e7a3df33766957'

      // // 叠加国界服务
      // this.viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      //   url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
      //   subdomains: subdomains,
      //   tilingScheme: new Cesium.WebMercatorTilingScheme(),
      //   maximumLevel: 10
      // }))
      // 矢量地图
      this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' + token,
        layer: 'tdtBasicLayer',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'GoogleMapsCompatible',
        show: true,
        maximumLevel: 18
      }))
      // 矢量中文地名注记
      let tdtAnnoLayer = new Cesium.WebMapTileServiceImageryProvider({
        url: 'http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' + token,
        layer: 'tdtAnnoLayer',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'GoogleMapsCompatible',
        show: true
      })
      tdtAnnoLayer.alpha = 0.5
      tdtAnnoLayer.brightness = 2.0
      this.viewer.imageryLayers.addImageryProvider(tdtAnnoLayer)
    },
    loadLocalImageryLayers () {
      // 加载本地wms服务
      // http://192.168.3.246:8090/iserver/services/map-mbtiles-xianImagePNG/wmts100
      // let image = new Cesium.WebMapTileServiceImageryProvider({
      //   url: url,
      //   layer: 'worldImage',
      //   format: 'image/png',
      //   style: 'default',
      //   maximumLevel: 21,
      //   show: true,
      //   tileMatrixSetID: 'Custom_worldImage'
      // })
      // let url = "/iserver/services/map-mbtiles-worldImage2/wmts100/worldImage/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"
      let url = ''
      let image = null
      url =
        '/iserver/services/map-china400/wmts100/China/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'
      image = new Cesium.WebMapTileServiceImageryProvider({
        url: url,
        layer: 'China_4326',
        format: 'image/png',
        style: 'default',
        maximumLevel: 21,
        show: true,
        tileMatrixSetID: 'Custom_China'
      })
      this.viewer.imageryLayers.addImageryProvider(image)
    },
    // initImageryLayers () {
    //   // let url = 'http://212.64.20.142:47492/iserver/services/map-new424/wmts100/enroute/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'
    //   // let image = new Cesium.WebMapTileServiceImageryProvider({
    //   //   url: url,
    //   //   layer: 'enroute',
    //   //   format: 'image/png',
    //   //   style: 'tile',
    //   //   // style: 'default',
    //   //   maximumLevel: 21,
    //   //   show: true,
    //   //   tileMatrixSetID: 'GlobalCRS84Scale_enroute'
    //   // })
    //   let url = "/iserver/services/map-mbtiles-worldImage2/wmts100/worldImage/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"
    //   let image = new Cesium.WebMapTileServiceImageryProvider({
    //     url: url,
    //     layer: 'worldImage',
    //     format: 'image/png',
    //     style: 'default',
    //     maximumLevel: 21,
    //     show: true,
    //     tileMatrixSetID: 'Custom_worldImage'
    //   })
    //   this.viewer.imageryLayers.addImageryProvider(image)
    // },
    initMouseHandler () {
      // this.mouseMoveLabel = this.viewer.entities.add({
      //   label: {
      //     show: false,
      //     showBackground: true,
      //     font: '14px monospace',
      //     horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      //     verticalOrigin: Cesium.VerticalOrigin.TOP,
      //     pixelOffset: new Cesium.Cartesian2(15, 0)
      //   }
      // })

      // Mouse over the globe to see the cartographic position
      let handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas)
      handler.setInputAction(
        this.mouseMoveHander,
        Cesium.ScreenSpaceEventType.MOUSE_MOVE
      )
      handler.setInputAction(
        this.mouseLeftDoubleClickHandler,
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      )
    },
    cameraChanged () {
      var worldPosition
      var distance
      // The center of the view is the point that the 3D camera is focusing on
      var viewCenter = new Cesium.Cartesian2(
        Math.floor(this.viewer.canvas.clientWidth / 2),
        Math.floor(this.viewer.canvas.clientHeight / 2)
      )
      // Given the pixel in the center, get the world position
      var newWorldPosition = this.viewer.scene.camera.pickEllipsoid(viewCenter)
      if (Cesium.defined(newWorldPosition)) {
        // Guard against the case where the center of the screen
        // does not fall on a position on the globe
        worldPosition = newWorldPosition
      }
      // Get the distance between the world position of the point the camera is focusing on, and the camera's world position
      distance = Cesium.Cartesian3.distance(
        worldPosition,
        this.viewer.scene.camera.positionWC
      )
      this.$emit('cameraChanged', worldPosition, distance)
    },
    lookAt (position, distance) {
      this.viewer.scene.camera.lookAt(
        position,
        new Cesium.Cartesian3(0.0, 0.0, distance)
      )
    },
    setView (x, y, h) {
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(x, y, h)
      })
    },
    flyTo (x, y, h) {
      // 将三维球定位到中国
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, h),
        orientation: {
          // 包含了方位(direction)、上方向(up)以及方位角(heading)、俯仰角(pitch)、滚动角(roll)属性的对象。
          // heading: Cesium.Math.toRadians(348.4202942851978),
          // pitch: Cesium.Math.toRadians(-89.74026687972041),
          heading: Cesium.Math.toRadians(-34.3),
          pitch: Cesium.Math.toRadians(-90),
          roll: Cesium.Math.toRadians(0)
        },
        complete: function callback () {
          // 定位完成之后的回调函数
        },
        duration: 1 // 飞行持续时间（以秒为单位）
      })
    },
    getTerrainHeight: async function (x, y) {
      var positions = [Cesium.Cartographic.fromDegrees(x, y)]
      await Cesium.sampleTerrainMostDetailed(
        this.viewer.terrainProvider,
        positions
      ).then(r => {
        return r[0].height
      })
      return null
    },
    btnClick_latlngString (e) {
      if (this.latlngStringFormat === 0) {
        this.latlngStringFormat = 1
      } else if (this.latlngStringFormat === 1) {
        this.latlngStringFormat = 0
      }
      this.latlngString = this.getZoomLatlngString()
    },
    getZoomLatlngString () {
      // return (
      //   this.mapZoom +
      //   ' ' +
      //   // getLatlngString(this.latlngStringFormat, this.mouseLatlng)
      // )
    },
    mouseLeftDoubleClickHandler (e) {
      var ray = this.viewer.camera.getPickRay(e.position)
      var cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene)
      if (Cesium.defined(cartesian)) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        let x = Cesium.Math.toDegrees(cartographic.longitude)
        let y = Cesium.Math.toDegrees(cartographic.latitude)
        var positions = [Cesium.Cartographic.fromDegrees(x, y)]
        Cesium.sampleTerrainMostDetailed(
          this.viewer.terrainProvider,
          positions
        ).then(r => {
          this.$Message.info('地形高度:' + r[0].height + 'm')
        })
      }
    },
    mouseMoveHander (movement) {
      var ray = this.viewer.camera.getPickRay(movement.endPosition)
      var cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene)
      if (Cesium.defined(cartesian)) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        this.mouseLatlng.lng = Cesium.Math.toDegrees(cartographic.longitude)
        this.mouseLatlng.lat = Cesium.Math.toDegrees(cartographic.latitude)
        this.mouseLatlng.alt = cartographic.height
        this.latlngString = this.getZoomLatlngString()
      }
    },
    getCameraHeight () {
      /* 获取camera高度  */
      if (this.viewer) {
        var scene = this.viewer.scene
        var ellipsoid = scene.globe.ellipsoid
        var height = ellipsoid.cartesianToCartographic(
          this.viewer.camera.position
        ).height
        return height
      }
    },
    getViewer () {
      return this.viewer
    },
    createPolylineInstance (pts, cesiumColor, width) {
      // if (isNullObj(width)) width = 1.0
      var positions = Cesium.Cartesian3.fromDegreesArrayHeights(pts)
      let geometry = new Cesium.PolylineGeometry({
        positions: positions,
        width: width,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
      })

      var instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(cesiumColor)
        }
      })
      return instance
    },
    createPolygonInstance (pts, cesiumColor, minHeight, maxHeight) {
      let hierarchy = new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray(pts)
      )
      return this.createPolygonInstanceByHierarchy(
        hierarchy,
        cesiumColor,
        minHeight,
        maxHeight
      )
    },
    createPolygonInstanceByHierarchy (
      hierarchy,
      cesiumColor,
      minHeight,
      maxHeight,
      key
    ) {
      if (typeof key !== 'undefined') {
        var polygonInstance = new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: hierarchy,
            height: minHeight,
            extrudedHeight: maxHeight,
            vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(cesiumColor)
          },
          id: key
        })
        return polygonInstance
      } else {
        // var polygonInstance = new Cesium.GeometryInstance({
        //   geometry: new Cesium.PolygonGeometry({
        //     polygonHierarchy: hierarchy,
        //     height: minHeight,
        //     extrudedHeight: maxHeight,
        //     vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
        //   }),
        //   attributes: {
        //     color: Cesium.ColorGeometryInstanceAttribute.fromColor(cesiumColor)
        //   }
        // })
        // return polygonInstance
      }
    },
    createPolygonOutlineInstance (pts, cesiumColor, minHeight, maxHeight) {
      let hierarchy = new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray(pts)
      )
      return this.createPolygonOutlineInstanceByHierarchy(
        hierarchy,
        cesiumColor,
        minHeight,
        maxHeight
      )
    },
    createPolygonOutlineInstanceByHierarchy (
      hierarchy,
      cesiumColor,
      minHeight,
      maxHeight,
      key
    ) {
      if (typeof key !== 'undefined') {
        var polygonOutlineInstance = new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonOutlineGeometry({
            polygonHierarchy: hierarchy,
            height: minHeight,
            extrudedHeight: maxHeight
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(cesiumColor)
          },
          id: key
        })
        return polygonOutlineInstance
      } else {
        // var polygonOutlineInstance = new Cesium.GeometryInstance({
        //   geometry: new Cesium.PolygonOutlineGeometry({
        //     polygonHierarchy: hierarchy,
        //     height: minHeight,
        //     extrudedHeight: maxHeight
        //   }),
        //   attributes: {
        //     color: Cesium.ColorGeometryInstanceAttribute.fromColor(cesiumColor)
        //   }
        // })
        // return polygonOutlineInstance
      }
    },
    createPolygonPrimitive (primitives) {
      let primitive = new Cesium.Primitive({
        geometryInstances: primitives,
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: true, // 为true 无光照
          translucent: true, // 透明配置，false是不透明
          renderState: {
            lineWidth: Math.min(4.0, this.scene.maximumAliasedLineWidth)
          }
        })
      })
      return primitive
    },
    createPolylinePrimitive (primitives, cesiumColor) {
      // if (isNullObj(cesiumColor)) {
      //   cesiumColor = new Cesium.Color(0.9, 0.9, 0.9, 0.5)
      // }
      let primitive = new Cesium.Primitive({
        geometryInstances: primitives,
        appearance: new Cesium.PolylineMaterialAppearance({
          // material: Cesium.Material.fromType(Cesium.Material.PolylineGlowType)
          // material : Cesium.Material.fromType('Color')
          material: new Cesium.Material({
            fabric: {
              type: 'Color',
              uniforms: {
                color: cesiumColor
              }
            }
          })
        })
      })
      return primitive
    },
    courseAngle (lngA, latA, lngB, latB) {
      //  /**
      //  * 计算a点和b点的角度（偏转角）
      //  * @param lng_a  a点经度
      //  * @param lat_a  a点维度
      //  * @param lng_b  b点经度
      //  * @param lat_b  b点维度
      //  * @returns 角度
      //  */
      // 以a点为原点建立局部坐标系（东方向为x轴,北方向为y轴,垂直于地面为z轴），得到一个局部坐标到世界坐标转换的变换矩阵
      var localToWorldMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(lngA, latA)
      )
      // 求世界坐标到局部坐标的变换矩阵
      var worldToLocalMatrix = Cesium.Matrix4.inverse(
        localToWorldMatrix,
        new Cesium.Matrix4()
      )
      // a点在局部坐标的位置，其实就是局部坐标原点
      var localPositionA = Cesium.Matrix4.multiplyByPoint(
        worldToLocalMatrix,
        Cesium.Cartesian3.fromDegrees(lngA, latA),
        new Cesium.Cartesian3()
      )

      // B点在以A点为原点的局部的坐标位置
      var localPositionB = Cesium.Matrix4.multiplyByPoint(
        worldToLocalMatrix,
        Cesium.Cartesian3.fromDegrees(lngB, latB),
        new Cesium.Cartesian3()
      )
      // 弧度
      var angle = Math.atan2(
        localPositionB.y - localPositionA.y,
        localPositionB.x - localPositionA.x
      )
      // 角度
      var theta = angle * (180 / Math.PI)
      if (theta < 0) {
        theta = theta + 360
      }
      return theta
    },
    ComputeLngLat (caCoord, localCoord) {
      // 已知点，根据角度和距离，计算另一个点，同样是参照官方的矩阵计算方式。
      // _ca_coord是Cesium  Cartesian3 坐标
      // local_coord是相对于当前坐标的偏移米数
      // 返回值可以是 Carte sian3 坐标，也可以是经纬度坐标
      // 计算出两个点的北向偏移角，根据箭头所要偏移的角度和米数，通过三角函数sin和cos，计算出x方向和y方向的偏移距离，调用函数，就能计算出新的点位置，将点连接成线，就能实现简单箭头的效果。
      // 同样是建立局部坐标系
      const localToWorldMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        caCoord
      )
      // 根据偏移的三个方向距离，计算新的坐标点
      const ca = Cesium.Matrix4.multiplyByPoint(
        localToWorldMatrix,
        Cesium.Cartesian3.fromElements(
          localCoord[1],
          localCoord[0],
          localCoord[2]
        ),
        new Cesium.Cartesian3()
      )
      // 返回不同的坐标类型，自由控制
      return ca
      // return Cesium.Cartographic.fromCartesian(ca)
    },
    createclusterLayer (name) {
      let clusterLayer = new Cesium.CustomDataSource(name)
      clusterLayer.clustering.enabled = true
      clusterLayer.clustering.pixelRange = 15
      clusterLayer.clustering.minimumClusterSize = 3
      // this.customStyle(clusterLayer)
      this.viewer.dataSources.add(clusterLayer)
      this.customLayers[name] = clusterLayer
      return clusterLayer
    },
    createLayer (name) {
      let customLayer = new Cesium.CustomDataSource(name)
      this.viewer.dataSources.add(customLayer)
      this.customLayers[name] = customLayer
      return customLayer
    },
    getLayer (layername) {
      return this.customLayers[layername]
    },
    showLayer (layername, bShow) {
      let lyr = this.customLayers[layername]
      if (isNotNullObj(lyr)) {
        lyr.show = bShow
      }
    },
    createModel (id, url, position, orientation, text, color) {
      let heightReference = Cesium.HeightReference.NONE
      if (this.clampToGround) {
        heightReference = Cesium.HeightReference.CLAMP_TO_GROUND
      }

      let model = null
      if (color === null || typeof color === 'undefined') {
        model = {
          uri: url,
          // scale: 0.01,
          runAnimations: true,
          minimumPixelSize: 48, // 96 * 2,
          // maximumScale: 20000,
          heightReference: heightReference
        }
      } else {
        model = {
          uri: url,
          // scale: 0.01,
          runAnimations: true,
          // color: color,
          minimumPixelSize: 48,
          // maximumScale: 20000,
          color: Cesium.Color.fromCssColorString(color),
          colorBlendMode: Cesium.ColorBlendMode.Mix,
          // colorBlendAmount: parseFloat(0.5),
          // silhouetteColor: Cesium.Color.fromAlpha(Cesium.Color.GREEN, parseFloat(0.5)),
          // silhouetteSize: parseFloat(2.0),
          heightReference: heightReference
        }
      }
      let entity = {
        id: id,
        name: id,
        description: text,
        position: position,
        orientation: orientation,
        model: model,
        label: {
          pixelOffset: new Cesium.Cartesian2(0, -20),
          showBackground: true,
          backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.2),
          scale: 0.6,
          font: '24px SourceHanSansSC-Medium',
          // fillColor: fengjiColor,
          text: text
        }
      }
      // this.viewer.entities.add(entity)
      return entity
    },
    createImg (id, url, position, heading, text, color) {
      if (color === null || typeof color === 'undefined') color = 'yellow'
      // let heightReference = Cesium.HeightReference.NONE
      // if (this.clampToGround) heightReference = Cesium.HeightReference.CLAMP_TO_GROUND
      let entity = {
        id: id,
        name: id,
        description: text,
        position: position,
        show: true,
        billboard: {
          // 图标
          image: url,
          // width: 96,
          // height: 96,
          scale: 0.5,
          rotation: heading
        },
        label: {
          pixelOffset: new Cesium.Cartesian2(0, -20),
          showBackground: true,
          backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.2),
          scale: 0.5,
          font: '24px SourceHanSansSC-Medium',
          style: Cesium.LabelStyle.FILL,
          outlineWidth: 2,
          // fillColor: fengjiColor,
          text: text
        }
      }
      // this.viewer.entities.add(entity)
      return entity
    },
    createPoint (id, position, orientation, text, color) {
      if (color === null || typeof color === 'undefined') color = 'yellow'
      let heightReference = Cesium.HeightReference.NONE
      if (this.clampToGround) {
        heightReference = Cesium.HeightReference.CLAMP_TO_GROUND
      }
      let entity = {
        id: id,
        name: id,
        description: text,
        position: position,
        orientation: orientation,
        point: {
          pixelSize: 10,
          color: Cesium.Color.fromCssColorString(color),
          heightReference: heightReference
          // 控制是否贴地
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },
        label: {
          pixelOffset: new Cesium.Cartesian2(0, -20),
          showBackground: true,
          backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.2),
          scale: 0.6,
          font: '24px SourceHanSansSC-Medium',
          // fillColor: fengjiColor,
          text: text
        }
      }
      // this.viewer.entities.add(entity)
      return entity
    },
    createPoint0 (id, position, orientation, text, color) {
      if (color === null || typeof color === 'undefined') color = 'yellow'
      let geometry = {
        // outlineColor: Cesium.Color.WHITE,
        // outlineWidth: 2.0,
        pixelSize: 10,
        color: Cesium.Color.fromCssColorString(color),
        position: position,
        disableDepthTestDistance: Number.POSITIVE_INFINITY // 永远禁用深度测试
      }

      let pointPrimitives = this.viewer.scene.primitives.add(
        new Cesium.PointPrimitiveCollection({
          blendOption: Cesium.BlendOption.TRANSLUCENT // 透明混合度,用于大数据量渲染时提高效率
          // debugShowBoundingVolume:true
        })
      )
      pointPrimitives.add(geometry)

      // var instance = new Cesium.GeometryInstance({
      //   id: id,
      //   geometry: geometry
      // })

      // this.viewer.scene.primitives.add(new Cesium.Primitive({
      //   geometryInstances: instance,
      //   appearance: new Cesium.PerInstanceColorAppearance()
      // }))
    },
    // 仅更新图片
    updateUrl (id, url, objType) {
      let entity = null
      entity = this.viewer.entities.getById(id)
      if (entity !== null && typeof entity !== 'undefined') {
        // 非监视主页模块时不显示图标图片
        entity.billboard.image = url
      }
      // 根据id获取对象
      // let obj = getObjById(id)
      // 根据左侧表格按钮状态展示不同设备
      setTimeout(() => {
        if (Object.keys(objType).length > 0 && entity !== undefined) {
          entity.show = true
          // 飞机部分时
          if (objType.index === 0) {
            entity.show = true
          } else if (objType.index === 1) {
            // 汽车部分时
            // 合作状态时
            // if (objType.name === '合作') {
            //   if (obj.care === 0 && obj.fN == undefined) {
            //     entity.show = false
            //   }
            // }
            // 非合作
            // if (objType.name === '非合作') {
            //   if (obj.care === 1 && obj.fN == undefined) {
            //     entity.show = false
            //   }
            // }
            // 活动
            // if (objType.name === '活动') {
            //   if (obj.status !== 1 && obj.fN == undefined) {
            //     entity.show = false
            //   }
            // }
            // 空闲
            // if (objType.name === '空闲') {
            //   if (obj.status !== 3 && obj.fN == undefined) {
            //     entity.show = false
            //   }
            // }
            // 离线
            // if (objType.name === '离线') {
            //   if (obj.status !== 4 && obj.fN == undefined) {
            //     entity.show = false
            //   }
            // }
          }
        }
      }, 500)
    },
    // 得到四角
    getCesiumViewerExtend () {
      // debugger;
      let params = {}
      let extend = this.viewer.camera.computeViewRectangle()
      if (typeof extend === 'undefined') {
        // 2D下会可能拾取不到坐标，extend返回undefined,所以做以下转换
        let canvas = this.viewer.scene.canvas
        let upperLeft = new Cesium.Cartesian2(0, 0) // canvas左上角坐标转2d坐标
        let lowerRight = new Cesium.Cartesian2(
          canvas.clientWidth,
          canvas.clientHeight
        ) // canvas右下角坐标转2d坐标

        let ellipsoid = this.viewer.scene.globe.ellipsoid
        let upperLeft3 = this.viewer.camera.pickEllipsoid(upperLeft, ellipsoid) // 2D转3D世界坐标

        let lowerRight3 = this.viewer.camera.pickEllipsoid(
          lowerRight,
          ellipsoid
        ) // 2D转3D世界坐标

        let upperLeftCartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(
          upperLeft3
        ) // 3D世界坐标转弧度
        let lowerRightCartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(
          lowerRight3
        ) // 3D世界坐标转弧度

        let minx = Cesium.Math.toDegrees(upperLeftCartographic.longitude) // 弧度转经纬度
        let maxx = Cesium.Math.toDegrees(lowerRightCartographic.longitude) // 弧度转经纬度

        let miny = Cesium.Math.toDegrees(lowerRightCartographic.latitude) // 弧度转经纬度
        let maxy = Cesium.Math.toDegrees(upperLeftCartographic.latitude) // 弧度转经纬度
        // console.log("经度：" + minx + "----" + maxx);
        // console.log("纬度：" + miny + "----" + maxy);
        params.minx = minx
        params.maxx = maxx
        params.miny = miny
        params.maxy = maxy
      } else {
        // 3D获取方式
        params.maxx = Cesium.Math.toDegrees(extend.east)
        params.maxy = Cesium.Math.toDegrees(extend.north)

        params.minx = Cesium.Math.toDegrees(extend.west)
        params.miny = Cesium.Math.toDegrees(extend.south)
      }
      return params // 返回屏幕所在经纬度范围
    },
    // 用对象来获取屏幕位置
    getScreenXYById (id) {
      let entity = this.viewer.entities.getById(id)
      // 标注的屏幕坐标
      return Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        entity.position._value
      )
    },
    // 用对象来获取屏幕位置
    getScreenXYByRaw (lat, lon, height) {
      let position = new Cesium.Cartesian3()
      position = Cesium.Cartesian3.fromDegrees(lat, lon, height)
      // 标注的屏幕坐标
      return Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        position
      )
    },
    // 更新位置，不存在时新增
    // type: 0-几何点 1-图片 2-模型
    addOrUpdateEntity (type, id, url, x, y, z, h, p, r, text, color, layername) {
      console.log(type, x, y, z, url, '==')
      let position = new Cesium.Cartesian3()
      position = Cesium.Cartesian3.fromDegrees(x, y, z) // (经度，纬度，高程)
      let heading = Cesium.Math.toRadians(h) // heading 船首向
      let pitch = Cesium.Math.toRadians(p) // pitch   左右翻转
      let roll = Cesium.Math.toRadians(r) // roll     前后翻转
      let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
      let orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      )

      let entity = null
      let lyr = null
      if (isNotNullObj(layername)) {
        lyr = this.customLayers[layername]
        if (isNotNullObj(lyr)) {
          entity = lyr.entities.getById(id)
        }
      } else {
        entity = this.viewer.entities.getById(id)
      }
      if (entity === null || typeof entity === 'undefined') {
        if (type === 0) {
          entity = this.createPoint(id, position, orientation, text, color)
          if (isNotNullObj(lyr)) {
            lyr.entities.add(entity)
          } else {
            this.viewer.entities.add(entity)
          }
        } else if (type === 1) {
          // 具体设置图标
          entity = this.createImg(id, url, position, heading, text, color)
          if (isNotNullObj(lyr)) {
            lyr.entities.add(entity)
          } else {
            this.viewer.entities.add(entity)
          }
        } else if (type === 2) {
          // 具体设置图标
          entity = this.createModel(id, url, position, orientation, text, color)
          if (isNotNullObj(lyr)) {
            lyr.entities.add(entity)
          } else {
            this.viewer.entities.add(entity)
          }
        }
      } else {
        entity.position = position
        entity.orientation = orientation
        if (entity.label) {
          entity.label.text = text
        }
        entity.description = text
        if (type === 1) {
          entity.billboard.rotation = heading
        }
      }
      return entity
    },
    getTailPoints () {
      return this.tailPoints
    },
    createTailLine (id, color) {
      let pline = this.viewer.entities.getById('T' + id)
      if (isNotNullObj(pline)) {
        this.viewer.entities.remove(pline)
      }
      this.tailPoints = this.dictTail[id]
      return this.viewer.entities.add({
        id: 'T' + id,
        name: 'T' + id,
        show: true,
        polyline: {
          show: true,
          positions: new Cesium.CallbackProperty(this.getTailPoints, false),
          width: 5,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.fromCssColorString(color),
            outlineWidth: 2,
            outlineColor: Cesium.Color.WHITE
          })
        }
      })
    },
    updateEntityTrackLine (id, x, y, z, color) {
      // if (color === null || typeof color === 'undefined') color = '#0000FF'
      // let p = new Cesium.Cartesian3()
      // p = Cesium.Cartesian3.fromDegrees(x, y, z) // (经度，纬度，高程)
      // if (isNullObj(this.dictTail[id])) {
      //   this.dictTail[id] = [p]
      // } else {
      //   this.dictTail[id].push(p)
      //   if (this.dictTail[id].length > this.maxTailPoints) {
      //     this.dictTail[id].pop()
      //   }
      // }
    },
    // 更新位置，不存在时新增
    // type: 0-几何点 1-图片 2-模型
    updateEntity (type, id, url, x, y, z, h, p, r, text, color, layername) {
      return this.addOrUpdateEntity(
        type,
        id,
        url,
        x,
        y,
        z,
        h,
        p,
        r,
        text,
        color,
        layername
      )
    },
    getEntitiesCount () {
      // if (isNullObj(this.viewer.entities.values)) return 0
      // return this.viewer.entities.values.length
    },
    getSelectEntityId () {
      let entity = this.viewer._selectedEntity
      if (entity === null || typeof entity === 'undefined') return null
      else {
        return entity.id
      }
    },
    openGeojsonFile (geojsonFile, callback) {
      // let self = this
      let url = geojsonFile
      var promise = Cesium.GeoJsonDataSource.load(url) // load完之后即为一个promise对象
      promise.then(function (dataSource) {
        // 此处类似于添加3D对象中的动画。
        // self.viewer.dataSources.add(dataSource) // 在callback中决定是否添加到viewer.dataSources
        if (callback !== undefined && callback !== null) {
          callback(dataSource)
        }
      })
    },
    // 删除多边形
    // removePolygon (element, layer) {
    //   let entity = layer.entities.getById(element.layerType + element.id)
    //   layer.entities.remove(entity)
    // },
    // 新增或更新多边形
    // createPolygon (element, layer) {
    //   // 绘制多边形
    //   let coordinates = []
    //   let positions = []
    //   coordinates = element.geoValue
    //   for (let c of coordinates) {
    //     positions.push(c[0])
    //     positions.push(c[1])
    //   }
    //   let position = Cesium.Cartesian3.fromDegreesArray(positions)
    //   let entity = layer.entities.getById(element.layerType + element.id)
    //   if (!entity) {
    //     entity = {
    //       id: element.layerType + element.id,
    //       name: element.name,
    //       description: element.tooltipContent || element.name,
    //       gvtype: 2,
    //       polygon: {
    //         hierarchy: position,
    //         fill: element.layerConf.fill || true,
    //         material: Cesium.Color.fromCssColorString(
    //           element.layerConf.material || '#04eafb'
    //         ).withAlpha(element.layerConf.materialOpacity || 1),
    //         height: 100,
    //         outline: element.layerConf.outline || true,
    //         outlineColor: Cesium.Color.fromCssColorString(
    //           element.layerConf.outlineColor || '#04eafb'
    //         ).withAlpha(element.layerConf.outlineOpacity || 1),
    //         outlineWidth: element.layerConf.outlineWidth || 1.0,
    //         label: {
    //           text: element.name,
    //           color: Cesium.Color.fromCssColorString('#fff'),
    //           font: 'normal 32px MicroSoft YaHei',
    //           showBackground: true,
    //           scale: 0.5,
    //           horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,
    //           verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //           disableDepthTestDistance: 10000.0
    //         }
    //       }
    //     }
    //     layer.entities.add(entity)
    //   } else {
    //     entity.polygon.hierarchy = position
    //     entity.name = element.name
    //     if (entity.label) {
    //       entity.label.text = element.name
    //     }
    //     entity.description = element.tooltipContent || element.name
    //     entity.polygon.outlineColor = Cesium.Color.fromCssColorString(
    //       element.layerConf.outlineColor || '#04eafb'
    //     ).withAlpha(element.layerConf.outlineOpacity || 1)
    //     entity.polygon.material = Cesium.Color.fromCssColorString(
    //       element.layerConf.material || '#04EAFB'
    //     ).withAlpha(element.layerConf.materialOpacity || 1)
    //   }
    // },
    // 开始画图
    draw (type) {
      this.$refs.draw.menuAction(type)
    },
    // 清空画图数据
    removeDraw () {
      this.$refs.draw.removeAll()
    }
  }
}
</script>

<style lang="scss">
.cesiumContainer {
  width: 100%;
  height: calc(100vh);
}

.mapLngLat {
  position: absolute;
  left: 0;
  /*top: calc(100% - 32px);*/
  bottom: 0;
  height: 32px;
  width: 20;
  box-shadow: 0 0 2px #8c939d;
  z-index: 999;
  float: top;
  filter: alpha(Opacity=80);
  -moz-opacity: 0;
  opacity: 0.8;
  .el-button--text {
    background: rgba(255, 255, 255, 0.5);
    color: #333;
  }
}

.scale-container {
  position: absolute;
  z-index: 1001;
  left: 0;
  bottom: 32px;
  width: 100px;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  color: #333;
}
.scale-label {
  font-size: 12px;
  text-align: center;
}
.scale-bar {
  position: relative;
  padding-top: 4px;
}
.scale-bar::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 10px;
  border: 1px solid #fff;
  border-top: none;
  left: 0;
  bottom: 0;
}
/*--------------------------气泡弹窗Start---------------------------*/
/*leaflet风格气泡窗口样式模板*/
.trackPopUp {
  display: none;
  color: rgb(255, 255, 255);
  height: 50px;
}
.leaflet-popup {
  position: absolute;
}
.leaflet-popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 4px 0 0;
  text-align: center;
  font: 25px/25px Tahoma, Verdana, sans-serif;
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-weight: bold;
  background: transparent;
}
.leaflet-popup-content-wrapper {
  max-height: 200px;
  overflow-y: auto;
  height: 133px;
  padding: 1px;
  text-align: left;
  border-radius: 12px;
  // background-image: url('../images/pop/popbackground.png');
}
.leaflet-popup-content {
  margin: 5px 20px;
  line-height: 1.4;
}
.leaflet-popup-content div {
  text-align: center;
}
.leaflet-popup-content div {
  font-size: 18px;
}
.leaflet-popup-content table {
  margin-top: 15px;
}
.leaflet-popup-content table tr {
  height: 25px;
}
/*--------------------------气泡弹窗END---------------------------*/
</style>
