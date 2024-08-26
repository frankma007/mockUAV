import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
// import DataManage from '@/views/DataManage.vue'
// import ImitatedData from '@/views/ImitatedData.vue'
// import Login from './views/DataManage/Login.vue'
// import ColumnDetail from './views/ColumnDetail.vue'
// import CreatePost from './views/CreatePost.vue'


const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        // {
        //     path: '/DataManage',
        //     name: 'DataManage',
        //     component: DataManage,
        //     //   meta: { redirectAlreadyLogin: true }
        //     //   meta: { redirectAlreadyLogin: true }
        // }, {
        //     path: '/ImitatedData',
        //     name: 'ImitatedData',
        //     component: ImitatedData,
        //     //   meta: { redirectAlreadyLogin: true }
        //     //   meta: { redirectAlreadyLogin: true }
        // },
        // {
        //   path: '/create',
        //   name: 'create',
        //   component: CreatePost,
        //   meta: { requiredLogin: true }
        // },
        // {
        //   path: '/column/:id',
        //   name: 'column',
        //   component: ColumnDetail
        // }
    ]
})



export default router
