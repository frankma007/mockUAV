let type = true
// 基础接口
export const baseApi = type ? '' : 'http://192.168.100.106:8080'
// 防控任务
export const taskApi = type ? '/equipment' : 'http://192.168.100.106:8982'
//
export const equipmentATruntableJamming = type ? '/TruntableJamming' : 'http://127.0.0.1:21000'
export const equipmentA = type ? '/equipmentA' : 'http://192.168.100.106:14000'
export const equipmentB = type ? '/equipmentB' : 'http://192.168.100.106:14001'
export const equipmentC = type ? '/equipmentC' : 'http://192.168.100.106:14002'
export const equipmentD = type ? '/equipmentD' : 'http://192.168.100.106:14003'
export const equipmentE = type ? '/equipmentE' : 'http://192.168.100.106:14004'
export const equipmentF = type ? '/equipmentF' : 'http://192.168.100.106:14005'
export const equipmentG = type ? '/equipmentG' : 'http://192.168.100.106:14006'
export const equipmentK = type ? '/equipmentK' : 'http://192.168.100.106:14010'
//
export const equipmentDeploy = type ? '/deploy' : 'http://192.168.100.106:8981'
// 任务设备
export const equipmentRan = type ? '/equipment/ran' : 'http://192.168.100.106:8985/api'
// 光电和普
export const equipmentApiTmcc = type ? '/tmcc' : 'http://192.168.100.106:8986'
export const monitingApi = type ? '/moniting' : 'http://192.168.100.106:8984'
export const licenseApi = type ? '/license' : 'http://192.168.100.106:8987'
export const ufohunterApi = type ? '/ufohunter' : 'http://192.168.100.106:14030'
// 基础接口
export const apiAdmin = type ? '' : 'http://212.64.20.142:18765'
