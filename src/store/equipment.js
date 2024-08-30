const equipment = {
  namespaced: true,
  state: {
    map: '',
    equipForm: {
      id: 0, // 主键
      type: '', // 设备类型
      model: '', // 设备型号
      deployType: '', // 部署方式
      sysId: '', // 用户自定义的设备id
      equipId: '', // 设备内部id
      ip1: '', // 连接设备IP
      port1: '', // 连接设备端口
      idpe: ''
    },
    // 无源侦测设备
    scannerQ: [
      {
        'data_rate': '',
        'found_target': 0,
        'gps_state': 0,
        'height': '',
        'id': '',
        'ip': '10.10.147.16',
        'latitude': '',
        'link_state': 0,
        'longitude': '',
        'expand': true
      }
    ],
    // 定向干扰
    jammerD: {
      'Time': 0,
      'Jammer_Status': 0
    },
    // 全向干扰
    jammerQ: {
      'height': 0,
      'id': 0,
      'ip': '10.10.147.19',
      'jamming_mode': 0,
      'jamming_state': 0,
      'jamming_trigger_mode': 0,
      'latitude': 0,
      'link_state': 0,
      'longitude': 0
    },
    // 雷达设备连接状态
    leidaStatus: 0,
    // 无源侦测设备连接状态
    deviceState: 0,
    // 全向干扰设备连接状态
    jammerQState: 0,
    // 定向干扰设备连接状态
    jammerDState: 0,
    // 转台-定向干扰
    zhuanTai_JammerD: {
      'State_Link_JammerD': 0,
      'Remain_JammingD_Time': 0,
      'State_Work_JammerD': 0,
      'Frequency_JammerD': '00000000',
      'JammerD_Strategy': 0
    },
    zhuanTai_JammerDSetTimeout: '',
    // 定向干扰转台状态
    zhuanTai_JammerD_Turntable: {
      'State_Work_Turntable': 0,
      'Horizontal_Angle_Turntable': 0,
      'Elevation_Angle_Turntable': 0
    },
    zhuanTai_JammerD_TurntableSetTimeout: '',
    // wsuri: 'ws://111.231.99.242:3041/websocket', // 转rabbitmq用websocket地址
    // wsuri: 'ws://192.168.7.111:3041/websocket', // 转rabbitmq用websocket地址 内网 10楼环境 //
    // wsuri: process.env.NODE_ENV === 'development' ? 'ws://111.231.99.242:3041/websocket' : ' ws://111.231.99.242:3041/websocket', // 转rabbitmq用websocket地址 三楼环境
    wsuri: window.location.host === '192.168.20.189' ? 'ws://192.168.20.189:3030/websocket' : 'ws://192.168.7.111:3030/websocket', // 转rabbitmq用websocket地址 三楼环境
    wsuriA: window.location.host === '192.168.20.189' ? 'ws://192.168.20.189:3031/recognize' : 'ws://192.168.7.111:3031/recognize', //  融合、威胁评估告警
    wsuriB: window.location.host === '192.168.20.189' ? 'ws://192.168.20.189:3032/survey' : 'ws://192.168.7.111:3032/survey', // 设备探测
    wsuriC: window.location.host === '192.168.20.189' ? 'ws://192.168.20.189:3033/state' : 'ws://192.168.7.111:3033/state', // 设备状态、控制
    wsuriD: window.location.host === '192.168.20.189' ? 'ws://192.168.20.189:3034/playback' : 'ws://192.168.7.111:3034/playback', //  记录回放
    radioUri: 'http://192.168.100.106.113:8980', // 光电控制后端地址 10楼
    // radioUri: 'http://192.168.20.106:3041', // 光电控制后端地址 3楼
    // radioUri1: 'http://10.10.147.113:8081', // 光电控制后端地址
    // rtmp://111.231.99.242:1935/lightN/test 可见光 pass
    // rtmp://111.231.99.242:1935/InfraredN/test 热成像 pass
    // http://192.168.100.106:8000/live?port=1935&app=live_NJ_lightN&stream=test 可见光
    // http://192.168.100.106:8000/live?port=1935&app=live_NJ_InfraredN&stream=test 热成像
    // http://192.168.20.43:8000/live?port=1935&app=live_NJ_lightN&stream=test 可见光
    // http://192.168.20.43:8000/live?port=1935&app=live_NJ_InfraredN&stream=test 热成像
    // 测试版本
    liveNJLightN: window.location.host === '192.168.20.189' ? 'http://192.168.20.189:8000/live?port=1935&app=live_NJ_lightN&stream=test' : 'http://192.168.100.106:8000/live?port=1935&app=live_NJ_lightN&stream=test', // 耐杰可见光视频地址 rtmp
    liveNJInfraredN: window.location.host === '192.168.20.189' ? 'http://192.168.20.189:8000/live?port=1935&app=live_NJ_InfraredN&stream=test' : 'http://192.168.100.106:8000/live?port=1935&app=live_NJ_InfraredN&stream=test',

    // 以前版本
    // liveNJLightN: window.location.host === 'development' ? 'http://192.168.100.106:8000/live?port=1935&app=live_NJ_lightN&stream=test' : 'http://192.168.100.106:8000/live?port=1935&app=live_NJ_lightN&stream=test', // 耐杰可见光视频地址 rtmp
    // liveNJInfraredN: window.location.host === 'development' ? 'http://192.168.100.106:8000/live?port=1935&app=live_NJ_InfraredN&stream=test' : 'http://192.168.100.106:8000/live?port=1935&app=live_NJ_InfraredN&stream=test',
    liveHPInfraredN: process.env.NODE_ENV === 'development' ? 'http://192.168.100.106:8000/live?port=1935&app=live_HP_InfraredN&stream=test' : ' http://192.168.100.106:8000/live?port=1935&app=live_HP_InfraredN&stream=test', // 和普
    liveHPLightN: process.env.NODE_ENV === 'development' ? 'http://192.168.100.106:8000/live?port=1935&app=live_HP_lightN&stream=test' : 'http://192.168.100.106:8000/live?port=1935&app=live_HP_lightN&stream=test', // 耐杰可见光视频地址 rtmp

    liveJGInfraredN: process.env.NODE_ENV === 'development' ? 'http://192.168.100.106:8000/live?port=1935&app=live_JGDJ_InfraredN&stream=test' : 'http://192.168.100.106:8000/live?port=1935&app=live_JGDJ_InfraredN&stream=test', // 激光红外视频地址 rtmp
    liveJGVideo: process.env.NODE_ENV === 'development' ? 'http://192.168.100.106:8000/live?port=1935&app=live_JGDJ_lightT&stream=test' : 'http://192.168.100.106:8000/live?port=1935&app=live_JGDJ_lightT&stream=test', // 激光可见光视频地址 rtmp
    liveJGLightN: process.env.NODE_ENV === 'development' ? 'http://192.168.100.106:8000/live?port=1935&app=live_JGDJ_lightN&stream=test' : 'http://192.168.100.106:8000/live?port=1935&app=live_JGDJ_lightN&stream=test' // 激光可见光视频地址 rtmp

    // pass平台
    // liveNJLightN: window.location.host === 'development' ? 'http://111.231.99.242:8000/live?port=1936&app=live_NJ_lightN&stream=test' : 'http://111.231.99.242:8000/live?port=1936&app=live_NJ_lightN&stream=test', // 耐杰可见光视频地址 rtmp
    // liveNJInfraredN: window.location.host === 'development' ? 'http://111.231.99.242:8000/live?port=1936&app=live_NJ_InfraredN&stream=test' : 'http://111.231.99.242:8000/live?port=1936&app=live_NJ_InfraredN&stream=test',
    // liveHPInfraredN: process.env.NODE_ENV === 'development' ? 'http://111.231.99.242:8000/live?port=1936&app=live_HP_InfraredN&stream=test' : 'http://111.231.99.242:8000/live?port=1936&app=live_HP_InfraredN&stream=test', // 和普
    // liveHPLightN: process.env.NODE_ENV === 'development' ? 'http://111.231.99.242:8000/live?port=1936&app=live_HP_lightN&stream=test' : 'http://111.231.99.242:8000/live?port=1936&app=live_HP_lightN&stream=test'

    //     激光打击可见光
    // http://localhost:8000/live?port=1935&app=live_JGDJ_lightN&stream=test
    //       激光打击红外
    // http://localhost:8000/live?port=1935&app=live_JGDJ_InfraredN&stream=test
    //       激光打击视频3
    // http://localhost:8000/live?port=1935&app=live_JGDJ_lightT&stream=test
  },
  // window.location.host
  mutations: {
    changeEquipForm (state, newForm) {
      state.equipForm = newForm
    },
    change_status (state, newStatus) {
      state.leidaStatus = newStatus
    },
    /**
     * 无源侦测设备
     * 前端判断是否展示，数据一直获取
     * @param {*} state
     * @param {0,1} newStatus
     */
    change_device_status (state, newStatus) {
      let type = true
      state.scannerQ.map((item) => {
        if (!item.link_state) {
          type = false
        }
      })
      if (state.scannerQ.length !== 0 && type) {
        state.deviceState = newStatus
      } else {
        state.deviceState = 0
      }
    },
    /**
     * 获取mq-
     * {无源侦测设备-scannerQ,全向干扰-jammerQ}
     * @param {*} state
     * @param {*} scannerQ
     */
    saveEquipmentJSON (state, { jammerQ, scannerQ }) {
      state.scannerQ = scannerQ.map((item) => {
        return {
          ...item,
          // 用于设备状态
          expand: scannerQ.length === 1,
          // 用于部署标校
          deployExpand: scannerQ.length === 1
        }
      })
      state.jammerQ = jammerQ[0]
    },

    /**
     * 全向干扰设备连接状态
     * @param {*} state
     * @param {0,1} newStatus
     */
    change_JammerQ_status (state, newStatus) {
      if (state.jammerQ.id) {
        state.jammerQState = newStatus
      } else {
        state.jammerQState = 0
      }
    },
    /**
     * 获取mq-
     * {定向干扰-jammerD}
     * @param {*} state
     * @param {*} scannerQ
     */
    save_JammerD_JSON (state, jammerD) {
      state.jammerD = jammerD
    },
    /**
     * 定向干扰设备连接状态
     * @param {*} state
     * @param {0,1} newStatus
     */
    change_JammerD_status (state, newStatus) {
      if (state.jammerD.Time) {
        state.jammerDState = newStatus
      } else {
        state.jammerDState = 0
      }
    },
    /**
     * 修改定向干扰设备连接状态
     * @param {*} state
     * @param {0,1} newStatus
     */
    // change_jammerQ_status (state, newStatus) {
    //   state.jammerQState = newStatus
    // },
    changeMapData (state, val) {
      state.map = val
    },

    /**
     * 获取mq-
     * 转台型干扰设备频段
     * @param {*} state
     * @param {*} scannerQ
     */
    save_zhuanTai_JammerD_JSON (state, data) {
      if (state.zhuanTai_JammerDSetTimeout) {
        clearTimeout(state.zhuanTai_JammerDSetTimeout)
      }
      state.zhuanTai_JammerD = data
      // console.log(data, 'zhuanTai_JammerDSetTimeout')
      state.zhuanTai_JammerDSetTimeout = setTimeout(() => {
        // console.log('zhuanTai_JammerDSetTimeout')
        state.zhuanTai_JammerD = {
          'State_Link_JammerD': 0,
          'Remain_JammingD_Time': 0,
          'State_Work_JammerD': 0,
          'Frequency_JammerD': '00000000'
        }
      }, 3000)
    },

    /**
     * 获取mq-
     * 干扰设备转台状态
     * @param {*} state
     * @param {*} scannerQ
     */
    save_zhuanTai_JammerD_Turntable (state, data) {
      if (state.zhuanTai_JammerD_TurntableSetTimeout) {
        clearTimeout(state.zhuanTai_JammerD_TurntableSetTimeout)
      }
      data.Horizontal_Angle_Turntable = data.Horizontal_Angle_Turntable / 1000
      data.Elevation_Angle_Turntable = data.Elevation_Angle_Turntable / 1000
      state.zhuanTai_JammerD_Turntable = data
      state.zhuanTai_JammerD_TurntableSetTimeout = setTimeout(() => {
        state.zhuanTai_JammerD_Turntable = {
          'State_Work_Turntable': 0,
          'Horizontal_Angle_Turntable': 0,
          'Elevation_Angle_Turntable': 0
        }
      }, 3000)
    }
  }
}

export default equipment
