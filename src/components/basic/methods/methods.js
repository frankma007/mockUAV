function changeDecimalPlace (dec, num) { // 浮点数精确到小数点后6位
  for (let key in dec) {
    if (typeof dec[key] === 'number') {
      dec[key] = Math.round(dec[key] * Math.pow(10, num)) / Math.pow(10, num)
    }
  }
}
function formatGeoOutput (e, type) { // 将坐标信息格式转换成一维和二维数组
  let geo = null
  if (type === 'marker' || type === 'circle' || type === 'circlemarker') {
    changeDecimalPlace(e._latlng, 6)
    geo = [e._latlng.lat, e._latlng.lng]
  } else if (type === 'polyline') {
    geo = []
    e._latlngs.forEach(latlng => {
      changeDecimalPlace(latlng, 6)
      geo.push([latlng.lat, latlng.lng])
    })
  } else if (type === 'polygon' || type === 'rectangle') {
    geo = []
    e._latlngs[0].forEach(latlng => {
      changeDecimalPlace(latlng, 6)
      geo.push([latlng.lat, latlng.lng])
    })
  }
  return geo
}

function kvArrayToObject (keys, values) { // 根据keys和values两个数组生成一个对象
  let obj = {}
  for (let key in keys) {
    if (values[key]) {
      obj[keys[key]] = values[key]
    }
  }
  return obj
}

function getIndexFloor (ids, index) { // 获取ids中所有小于等于index的元素的最大值
  let floor = ids.filter(id => {
    return id <= index
  })
  let maxFloor
  if (floor.length > 0) {
    floor.sort()
    maxFloor = floor[floor.length - 1]
  } else {
    return null
  }
  return maxFloor
}

export {
  changeDecimalPlace,
  formatGeoOutput,
  kvArrayToObject,
  getIndexFloor
}
