function doubleToPoint (double) { // 经纬度 度转换为度分秒格式
  let db = Math.abs(double)
  let d = Math.floor(db) // 度
  let f = Math.floor((db - d) * 60) // 分
  let m = Math.round((db - d) * 3600 % 60 * 100) / 100 // 秒
  if (double < 0) {
    d = 0 - d
  }
  let point = [d, f, m]
  return point
}

function pointToDouble (point) { // 经纬度 度分秒转换为度格式
  let double = Math.abs(point[0]) + Math.round((Math.abs(point[1]) / 60 + Math.abs(point[2] / 3600)) * 10000000) / 10000000
  if (point[0] < 0) {
    double = 0 - double
  }
  return double
}

function random (min, max) { // 随机生成介于 min 和 max 之间的一个随机整数
  return Math.floor(Math.random() * (max - min) + min)
}

export {
  doubleToPoint,
  pointToDouble,
  random
}
