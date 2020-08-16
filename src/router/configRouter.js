// 格式化 按需加载
function _import(file) {
  return () => import('@/views/' + file + '.vue')
}
import Home from '../views/Home.vue'

export const routerAlls = [{
  path: '/',
  name: 'index',
  component: Home
}]

export const routerLists = [{
    id: 99,
    path: '/',
    label: '首页',
    redirect: '/index',
    meta: {
      title: '首页',
      table: true,
      display: false,
      icon: 'el-icon-s-home'
    }
  },
  {
    id: 100,
    path: '/index',
    name: 'index',
    label: '首页',
    component: _import('Index/Index'),
    meta: {
      title: '首页',
      table: true,
      display: true,
      icon: 'el-icon-s-home'
    }
  },
  {
    id: 1,
    path: '/shop',
    name: 'shop',
    label: '成本管理',
    component: _import('Layout/Layout'),
    meta: {
      title: '成本管理',
      table: true,
      display: true,
      icon: 'el-icon-menu'
    },
    children: [{
      id: 2,
      path: '/hoistcost/cost',
      label: '成本明细',
      component: _import('hoistcost/cost'),
      meta: {
        title: '成本明细',
        table: true,
        display: true,
        icon: 'el-icon-tickets'
      }
    }],
  },
  {
    id: 3,
    path: '/futures',
    name: 'futures',
    label: '期货价格',
    component: _import('futures/index'),
    meta: {
      title: '期货价格',
      table: true,
      display: true,
      icon: 'el-icon-s-help'
    }
  },
  {
    id: 4,
    path: '/guide',
    name: 'guide',
    label: '基准价格',
    component: _import('guide/index'),
    meta: {
      title: '基准价格',
      table: true,
      display: true,
      icon: 'el-icon-s-data'
    }
  },
  {
    id: 5,
    path: '/balance',
    name: 'balance',
    label: '经销商结算',
    component: _import('balance/index'),
    meta: {
      title: '经销商结算',
      table: true,
      display: true,
      icon: 'el-icon-s-finance'
    }
  },
  {
    id: 6,
    path: '/system',
    name: 'system',
    label: '系统设置',
    component: _import('Layout/Layout'),
    meta: {
      title: '系统设置',
      table: true,
      display: true,
      icon: 'el-icon-s-tools'
    },
    children: [{
        id: 7,
        path: '/user',
        label: '用户管理',
        component: _import('admin/index'),
        meta: {
          title: '用户管理',
          table: true,
          display: true,
          icon: 'el-icon-tickets'
        }
      },
      {
        id: 8,
        path: '/fit',
        label: '参数设置',
        component: _import('system/index'),
        meta: {
          title: '参数设置',
          table: true,
          display: true,
          icon: 'el-icon-tickets'
        }
      },
      {
        id: 9,
        path: '/role/list',
        label: '角色权限管理',
        component: _import('role/index'),
        meta: {
          title: '角色权限管理',
          table: true,
          display: true,
          icon: 'el-icon-tickets'
        }
      }
    ]
  }
]
