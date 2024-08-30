import http from '@//api/http.js'

let websock = null
let globalCallbackRecv = null
let wsuri = null
// let serverPort = '5000' // webSocket连接端口

// function getWebIP () {
//   let curIP = window.location.hostname
//   return curIP
// }

function SendHandshake () {
  let wsBody = {}
  wsBody.jwtStr = http.getToken().slice(7)
  wsBody.host = http.ipAddress
  let wsCmd = {}
  wsCmd.cmdType = 2
  wsCmd.encType = 0
  wsCmd.cmdBody = JSON.stringify(wsBody)
  websock.send(JSON.stringify(wsCmd))
}

function initZHWebSocket (url, callbackRecv) {
  // console.log('initWebSocket ' + url)
  wsuri = url
  globalCallbackRecv = callbackRecv
  OpenWebSocket(wsuri)
  setInterval(checkWebsocket, 1000)
}

function OpenWebSocket (url) {
  // 初始化weosocket
  // ws地址
  //   let wsuri = 'ws://' + getWebIP() + ':' + serverPort
  console.log('connect ' + url)
  websock = new WebSocket(wsuri)
  websock.onmessage = function (e) {
    websocketonmessage(e)
  }
  websock.onclose = function (e) {
    websocketclose(e)
  }
  websock.onopen = function () {
    websocketOpen()
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
      OpenWebSocket(wsuri)
    }
  } else if (websock.readyState === websock.OPEN) {
    counter = 0
    counterRecv++
    if (counterRecv > 30) {
      console.log('receive timeout, reconnect')
      counterRecv = 0
      OpenWebSocket(wsuri)
    }
    counterHandshake++
    if (counterHandshake >= 10) {
      counterHandshake = 0
      SendHandshake()
      // zhwsGetClientList()
      // zhwsTest()
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

function closeZHWebsocket () {
  if (websock !== null) websock.close()
}

// 数据接收
function websocketonmessage (e) {
  // globalCallbackRecv(JSON.parse(e.data))
  counterRecv = 0
  globalCallbackRecv(e.data)
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

function sendZH (cmd) {
  console.log('sendZH' + cmd)
}

// 获取在线用户列表
function zhwsGetClientList () {
  let wsCmd = {}
  wsCmd.cmdType = 3
  wsCmd.encType = 0
  wsCmd.cmdBody = ''
  websock.send(JSON.stringify(wsCmd))
}

// 转发文本
function zhwsSendText (idList, text) {
  let objSendText = {}
  objSendText.idList = idList
  objSendText.text = text
  let wsCmd = {}
  wsCmd.cmdType = 4
  wsCmd.encType = 0
  wsCmd.cmdBody = JSON.stringify(objSendText)
  websock.send(JSON.stringify(wsCmd))
}

function zhwsSendTextToAll (body) {
  let wsCmd = {}
  wsCmd.cmdType = 5
  wsCmd.encType = 0
  wsCmd.cmdBody = JSON.stringify(body)
  websock.send(JSON.stringify(wsCmd))
}

function zhwsTest () {
  let idList = []
  idList.push(1)
  zhwsGetClientList()
  // zhwsSendText(idList, 'hello')
}

export {
  initZHWebSocket,
  sendZH,
  zhwsGetClientList,
  zhwsSendText,
  zhwsSendTextToAll,
  closeZHWebsocket
}
