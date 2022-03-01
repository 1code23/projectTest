import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 *
 * hidden: true                   如果设置为真，项目将不会显示在侧边栏中(默认为假)
 * alwaysShow: true               如果设置为真，将始终显示根菜单
 *                                如果没有设置alwaysShow，当项目有多个子路径时，
 *                                它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect          如果设置了noRedirect将不会在面包屑中重定向
 * name:'router-name'            该名称由<keep-alive>使用(必须设置!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色(可以设置多个角色)
    title: 'title'               在侧边栏和面包屑中显示的名称(推荐设置)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            如果设置为false，项目将隐藏在面包屑中(默认为true)
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
    btnActions                   按钮权限集合，默认会从后端获取生成
  }

 */
// 不需要权限校验的页面
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: {
  //       title: '概览',
  //       icon: 'dashboard'
  //     }
  //   }]
  // },
  {
    path: '/tes',
    component: Layout,
    alwaysShow: true,
    redirect: 'tesView',
    meta: { title: '导入导出表格', icon: 'dashboard' },
    children: [{
      path: '/tes/tesView',
      name: 'TesView',
      component: () => import('@/views/tes/testview/index'),
      meta: { title: '导入导出' }
    },
    {
      path: '/tes/tesView1',
      name: 'TesView1',
      component: () => import('@/views/tes/testview1/index'),
      meta: { title: '导入导出表格页面封装后的' }
    }
    // {
    //   path: '/privacy/permissions',
    //   name: 'Permissions',
    //   component: () => import('@/views/privacy/permissions/index'),
    //   meta: { title: '权限规则管理' }
    // }
    ]
  }
]
// 需要权限校验的页面
export const asyncRoutes = [
  {
    path: '/privacy',
    component: Layout,
    alwaysShow: true,
    redirect: 'application',
    meta: { title: '隐私合规检测', icon: 'dashboard' },
    children: [{
      path: '/privacy/application',
      name: 'Application',
      component: () => import('@/views/privacy/application/index'),
      meta: { title: '应用合规检测' }
    },
    {
      path: '/privacy/permissions',
      name: 'Permissions',
      component: () => import('@/views/privacy/permissions/index'),
      meta: { title: '权限规则管理' }
    }
    ]
  },
  {
    path: '/account',
    component: Layout,
    alwaysShow: true,
    redirect: 'members',
    meta: { title: '账号管理', icon: 'dashboard' },
    children: [{
      path: '/account/members',
      name: 'Members',
      component: () => import('@/views/account/members/index'),
      meta: {
        title: '成员管理'
        // btnActions: ["query", "edit", "operate", "delete", "add"]
      }
    },
    {
      path: '/account/role',
      name: 'Role',
      component: () => import('@/views/account/role/index'),
      meta: { title: '角色管理' }
    },
    {
      path: '/account/menu',
      name: 'Menu',
      component: () => import('@/views/account/menu/index'),
      meta: { title: '菜单管理' }
    },
    {
      path: '/account/info',
      name: 'Info',
      component: () => import('@/views/account/info/index'),
      meta: { title: '账号信息' }
    }
    ]
  },
  {
    path: '/tes',
    component: Layout,
    alwaysShow: true,
    redirect: 'tesView',
    meta: { title: '测试', icon: 'dashboard' },
    children: [{
      path: '/tes/tesView',
      name: 'TesView',
      component: () => import('@/views/tes/testview/index'),
      meta: { title: '测试页面' }
    }
    // {
    //   path: '/privacy/permissions',
    //   name: 'Permissions',
    //   component: () => import('@/views/privacy/permissions/index'),
    //   meta: { title: '权限规则管理' }
    // }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
