import http from '@/api/http.js'
let websock = null
let globalCallbackRecv = []
let wsuriA = null
let $vue = null
// let serverPort = '5000' // webSocket连接端口

// function getWebIP () {
//   let curIP = window.location.hostname
//   return curIP
// }

function init (vue) {
  $vue = vue
}

function SendHandshake () {
  let wsBody = {}
  wsBody.jwtStr = http.getToken().slice(7)
  wsBody.host = wsuriA

  let wsCmd = {}
  wsCmd.cmdType = 2
  wsCmd.encType = 0
  wsCmd.cmdBody = JSON.stringify(wsBody)
  websock.send(JSON.stringify(wsCmd))
}

function initWebSocket (url, callbackRecv) {
  wsuriA = url
  globalCallbackRecv.push(callbackRecv)
  OpenWebSocket(wsuriA)
  setInterval(checkWebsocket, 1000)
}
function initWebSocketA (url, callbackRecv) {
  wsuriA = url
  globalCallbackRecv.push(callbackRecv)
  OpenWebSocket(wsuriA)
  setInterval(checkWebsocket, 1000)
}

function OpenWebSocket (url) {
  // 初始化weosocket
  // ws地址
  //   let wsuriA = 'ws://' + getWebIP() + ':' + serverPort
  closeWebsocket()
  websock = null
  console.log('connect ' + url)
  websock = new WebSocket(wsuriA)
  websock.onmessage = function (e) {
    websocketonmessage(e)
  }
  websock.onclose = function (e) {
    websocketclose(e)
  }
  websock.onopen = function () {
    websocketOpen()
    // websock.send(websocketOpen)
  }

  // 连接发生错误的回调方法
  websock.onerror = function () {
    console.log('WebSocket连接发生错误')
  }

  // 立即发一次握手
  counterHandshake = 1000
}

let counter = 0
let counterRecv = 0
let counterHandshake = 0

function checkWebsocket () {
  // let sSockState = ['CONNECTING', 'OPEN', 'CLOSING ', 'CLOSED']
  // console.log(sSockState[websock.readyState], counter, counterRecv)
  if (websock.readyState === websock.CLOSED) {
    counter++
    counterRecv = 0
    counterHandshake = 0
    if (counter > 5) {
      console.log('reconnect')
      counter = 0
      OpenWebSocket(wsuriA)
    }
  } else if (websock.readyState === websock.OPEN) {
    counter = 0
    counterRecv++
    if (counterRecv > 30) {
      console.log('receive timeout, reconnect')
      counterRecv = 0
      OpenWebSocket(wsuriA)
    }
    counterHandshake++
    if (counterHandshake >= 10) {
      counterHandshake = 0
      SendHandshake()
    }
  } else {
    counter = 0
    counterRecv = 0
    counterHandshake = 0
  }
}

// 实际调用的方法
function sendSock (agentData) {
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData)
    }, 1000)
  }
}

function addCallbackRecv (callback) {
  globalCallbackRecv.push(callback)
}

function clearCallbackRecv () {
  globalCallbackRecv.pop()
}

function closeWebsocket () {
  if (websock !== null) websock.close()
  // globalCallbackRecv = []
  console.log('ws closed')
}

// 数据接收
function websocketonmessage (e) {
  // globalCallbackRecv(JSON.parse(e.data))
  counterRecv = 0
  // console.log(e)
  globalCallbackRecv.forEach(callback => {
    callback(e.data)
  })
}

// 数据发送
function websocketsend (agentData) {
  websock.send(JSON.stringify(agentData))
}

// 关闭
function websocketclose (e) {
  console.log('connection closed (' + e.code + ')')
}

function websocketOpen (e) {
  console.log('连接成功')
}

function sendConfigToMQ (data, exchange, routingKey) {
  data.equipmentInfo = $vue.$store.state.equipment.equipForm
  let body = {
    exchange: exchange,
    routingKey: routingKey,
    data: JSON.stringify(data)
  }
  let wsCmd = {
    cmdType: 6,
    encType: 0,
    cmdBody: JSON.stringify(body)
  }
  websock.send(JSON.stringify(wsCmd))
}

export default {
  init,
  initWebSocket,
  initWebSocketA,
  sendSock,
  sendConfigToMQ,
  addCallbackRecv,
  closeWebsocket,
  clearCallbackRecv
}
