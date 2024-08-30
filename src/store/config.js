const config = {
  namespaced: true,
  state: {
    seattionIndex: '1_',
    // targetList: [],//激光打击列表
    // echartsList:[],//激光打击运动曲线
    latlngType: 'double', // 经纬度格式: point 度, double 度分秒
    targetLabel: true, // 是否显示标牌
    baseLayerName: '天地图影像', // 底图
    djEchartsList: [], // 打击目标运动曲线
    listA: [{
      'title': '防控任务',
      'index': 'FKRW',
      'route': 'taskList',
      'num': 4,
      'class': 'iconfont icon-doughnut-chart'
    }, {
      'title': '设备管理',
      'index': 'SBGL',
      'route': 'list',
      'num': 6,
      'class': 'iconfont icon-shebei-copy'
    }, {
      'title': '威胁告警',
      'index': 'WXGJ',
      'route': 'rightList',
      'num': 7,
      'class': 'iconfont icon-jinggao'
    }, {
      'title': '记录回放',
      'index': 'JLHF',
      'route': 'playback',
      'num': 8,
      'class': 'iconfont icon-huifang'
    }, {
      'title': '数据管理',
      'index': 'SJGL',
      'num': 9,
      'route': 'dataManagement',
      'class': 'iconfont icon-shuju'
    },
    {
      'title': '动态标校',
      'index': 'DTBX',
      'num': 13,
      'route': 'calibration',
      'class': 'iconfont icon-dongtaibiaoxiao_huaban1_huaban1'
    },

    {
      'title': '健康管理',
      'index': 'JKGL',
      'route': 'healthIndex',
      'num': 11,
      'class': 'iconfont icon-jiankang'
    }
    ],
    listB: [
      {
        'title': '统计分析',
        'route': 'statisticsIndex', //
        'index': 'TJFX',
        'num': 14,
        'class': 'iconfont icon-tongji'

      },
      {
        'title': '显示设置',
        'index': 'XSSZ',
        'num': 15,
        'route': 'seattion',
        'class': 'iconfont icon-xianshiqi'

      },
      {
        'title': '用户管理',
        'index': 'YHGL',
        'route': 'userList',
        'num': 10,
        'class': 'iconfont icon-yonghu'

      },
      {
        'title': '下载更新',
        'index': 'XZGX',
        'num': '',
        'route': 'softwareUpdate',
        'class': 'iconfont icon-xiazai'

      },
      {
        'title': '使用说明',
        'index': 'SYSM',
        'num': 100,
        'route': 'use-description',
        'class': 'iconfont icon-shiyongshuoming'

      },
      {
        'title': '关于我们',
        'index': 'GYWM',
        'route': 'aboutUs',
        'num': 100,
        'class': 'iconfont icon-guanyuwomen'

      }

    ]
  },
  mutations: {
    changeState (state, data) {
      state[data.state] = data.value
    },
    changeLatlngType (state, newType) {
      state.latlngType = newType
    },
    changeTargetLabel (state, newVal) {
      state.targetLabel = newVal
    },
    changeList (state, newList) {
      state.list = newList
    },
    changeList1 (state, newList1) {
      state.list1 = newList1
    },
    chngeseattionIndex (state, newVal) {
      state.seattionIndex = newVal
    }
    // chngetargetList (state, newVal) {
    //   state.targetList = newVal
    // },
    // chngeechartsList (state, newVal) {
    //   state.echartsList = newVal
    // }
  }
}

export default config
