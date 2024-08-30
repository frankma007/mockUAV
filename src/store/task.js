const task = {
  namespaced: true,
  state: {
    // 设备移动的坐标集合
    devicePointsList: []
  },
  mutations: {
    /**
     * mq队列推送设备坐标集合
     * @param {*} state
     * @param {0,1} newStatus
     */
    setDevicePointsList (state, pointsList) {
      state.devicePointsList = pointsList
    }
  }
}

export default task
