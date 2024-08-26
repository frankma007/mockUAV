import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import router from './router'
import router from './router.ts'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'



import 'element-plus/theme-chalk/dark/css-vars.css'

import './assets/styles/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import zhCn from "element-plus/lib/locale/lang/zh-cn";//国际化
import 'bootstrap/dist/css/bootstrap.min.css'
const app = createApp(App);
import locale from 'element-plus/dist/locale/zh-cn.mjs' //如果是vite构建，引入部分会爆红，可以在vite-env.d.ts中declare一下 
// app.use(ElementPlus, {  })
// app.config.globalProperties.$message = ElMessage
import DataV from '@kjgl77/datav-vue3';


app.use(DataV)
app.use(ElementPlus, { size: 'large', zIndex: 3000,locale}).use(router).mount('#app')

//全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
