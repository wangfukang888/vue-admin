import Vue from 'vue'
import Router from 'vue-router'

import {routerLists, routerAlls} from '../router/configRouter'
import {
  routerListFun,
  routerListStr
} from './Jurisdiction'
import store from '../stores/index'
Vue.use(Router)

// 注册路由
let routers = new Router({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/user/login.vue'),
      meta: {
        title: '登陆',
        table: false
      }
    },
    {
      path: '*', //当路由不存在是 指向
      redirect: '/loading',
      meta: {

      }
    }
  ]
})

// // 先把路由信息对象字符串化，然后去除component字段 ，再传递给 权限配置表
let routerListString = JSON.stringify(routerLists)
let src = routerListStr(routerListString)
// //菜单id权限列表数组
let fixArr = []
let arr = fixArr.concat(...store.state.load.menu_arr)
let mentParse = JSON.parse(JSON.stringify(src))
let menuList = routerListFun(arr, mentParse)
//根据权限配置表和路由信息对象 获取本用户的路由信息表，并添加到 home组件的二级路由里
routerAlls[0].children = routerListFun(arr, routerLists)
//根据权限配置表和路由信息对象 获取本用户的菜单列表
store.commit('setMents', menuList)
store.commit('serRouterList', src)
routers.addRoutes(routerAlls)

// 进行全局导航守卫
routers.beforeEach((to, from, next) => {
  let token = store.state.load.token
  if (to.name != 'login') {
    if (token) {
      return next()
    }
    return next('/login')
  }
  next()
})

export default routers