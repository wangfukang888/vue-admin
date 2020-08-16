import Cookies from 'js-cookie'
// 用户信息
import router from '../router'
import req from '../https'
import {
    routerListFun,
    routerListStr
} from '../router/Jurisdiction'
import {
    routerLists,
    routerAlls
} from '../router/configRouter'

const load = {
    state: {
        token: Cookies.get('token'),
        userList: Cookies.get('user_info') && JSON.parse(Cookies.get('user_info')),
        icons: false,
        menu_arr: Cookies.get('menu_list') ? JSON.parse(Cookies.get('menu_list')) : []
    },
    mutations: {
        addToken(state, src) {
            state.token = src.token
            if (src.checked) {
                Cookies.set('token', src.token, {
                    expires: 7
                })
            } else {
                Cookies.set('token', src.token)
            }
            src.token && this.dispatch('getMenu')
        },
        removeToken(state) {
            state.token = ''
            state.userList = {}
            Cookies.remove('token')
            Cookies.remove('user_info')
            Cookies.remove('menu_list')
            router.push('/login')
        },
        setUser(state, src) {
            state.userList = src
            Cookies.set('user_info', src)
        },
        tagTables(state) {
            state.icons = !state.icons
        },
        setMenu(state, arr) {
            state.menu_arr = arr
            Cookies.set('menu_list', arr)

        }
    },
    actions: {
        getMenu({
            commit
        }) {
            req.get('/apis/permission/menu').then(res => {
                if (res.code == 1) {
                    let _arr = []
                    const data = res.data
                    data.forEach(item => {
                        _arr.push(item.menu.id)
                        if (item.menus.length) {
                            item.menus.forEach(q => {
                                _arr.push(q.id)
                            })
                        }
                    })
                    // 先把路由信息对象字符串化，然后去除component字段 ，再传递给 权限配置表
                    let routerListString = JSON.stringify(routerLists)
                    let src = routerListStr(routerListString)
                    commit('serRouterList', src)
                    // //菜单id权限列表数组
                    let fixArr = [99, 100]
                    let arr = fixArr.concat(_arr)
                    //根据权限配置表和路由信息对象 获取本用户的路由信息表，并添加到 home组件的二级路由里
                    routerAlls[0].children = routerListFun(arr, routerLists)
                    //根据权限配置表和路由信息对象 获取本用户的菜单列表
                    let mentParse = JSON.parse(JSON.stringify(src))
                    let menuList = routerListFun(arr, mentParse)
                    commit('setMents', menuList)
                    commit('setMenu', arr)
                    router.addRoutes(routerAlls)
                    router.push('/index')
                }
            })
        }
    }
}

export default load