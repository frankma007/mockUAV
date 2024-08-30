function datePlusSecond (date, second) {
  return new Date(new Date(date).valueOf() + second * 1000)
}

function formatDate (date, fmt) {
  let dt = new Date(date)
  let o = {
    'M+': dt.getMonth() + 1, // 月份
    'd+': dt.getDate(), // 日
    'h+': dt.getHours(), // 小时
    'm+': dt.getMinutes(), // 分
    's+': dt.getSeconds(), // 秒
    'q+': Math.floor((dt.getMonth() + 3) / 3), // 季度
    S: dt.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (dt.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

function changeToDFM (du) {
  const arr1 = du.toString().split('.')
  const d = arr1[0]
  let tp = '0.' + arr1[1]
  tp = String(tp * 60) // 这里进行了强制类型转换
  const arr2 = tp.split('.')
  const f = arr2[0]
  tp = '0.' + arr2[1]
  tp = tp * 60
  const m = tp
  const dfm = d + '°' + f + "'" + Math.round(m * 100) / 100 + '"'
  return dfm
}

function getLatlngString (latlngStringFormat, aLatLng) {
  let latlngString
  if (latlngStringFormat === 0) {
    let lng
    let lat
    let ns
    let ew
    if (aLatLng.lng < 0) {
      lng = -aLatLng.lng
      ew = 'W'
    } else {
      lng = aLatLng.lng
      ew = 'E'
    }
    if (aLatLng.lat < 0) {
      lat = -aLatLng.lat
      ns = 'S'
    } else {
      lat = aLatLng.lat
      ns = 'N'
    }

    latlngString = changeToDFM(lng) + ew + ' ' + changeToDFM(lat) + ns
  } else if (latlngStringFormat === 1) {
    latlngString =
      Math.floor(aLatLng.lng * 1000000) / 1000000 +
      ', ' +
      Math.floor(aLatLng.lat * 1000000) / 1000000
  }
  return latlngString
}
function invalidateLatlng (lat, lon) {
  return lat > 54 || lat < 18 || lon < 70 || lon > 136
}

function findObjByKeyValue (arraytosearch, key, valuetosearch) {
  if (arraytosearch !== null) {
    for (var i = 0; i < arraytosearch.length; i++) {
      if (arraytosearch[i][key] === valuetosearch) {
        return arraytosearch[i]
      }
    }
  }
  return null
}

function course2String (dCourse) {
  let result = ''
  if ((dCourse >= 0 && dCourse < 22.5) || (dCourse >= 337.5 && dCourse <= 360)) { result = '北' } else if (dCourse >= 22.5 && dCourse < 67.5) { result = '东北' } else if (dCourse >= 67.5 && dCourse < 112.5) { result = '东北' } else if (dCourse >= 112.5 && dCourse < 157.5) { result = '东南' } else if (dCourse >= 157.5 && dCourse < 202.5) { result = '南' } else if (dCourse >= 202.5 && dCourse < 247.5) { result = '西南' } else if (dCourse >= 247.5 && dCourse < 292.5) { result = '西' } else if (dCourse >= 292.5 && dCourse < 337.5) { result = '西北' }
  return result
}

function isNotNullObj (myObj) {
  return (typeof myObj !== 'undefined' && myObj !== null)
}

function isNullObj (myObj) {
  return (typeof myObj === 'undefined' || myObj === null)
}

function copyObj (objSrc, objDest) {
  if (isNotNullObj(objSrc) && isNotNullObj(objDest)) {
    for (let key in objSrc) {
      objDest[key] = objSrc[key]
    }
  }
}

export {
  datePlusSecond,
  formatDate,
  getLatlngString,
  invalidateLatlng,
  findObjByKeyValue,
  course2String,
  isNullObj,
  isNotNullObj,
  copyObj
}
