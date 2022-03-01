import { asyncRoutes, constantRoutes } from '@/router'
/**
 * 处理按钮权限方法，并返回当前页面存在的按钮权限
 * @param sub menu.sub 
 */
export function handleMetaBtnActions(sub = []) {
  if (sub.length) {
    let btnActions = []
    sub.map(s => {
      //如果action有值，则说明属于按钮权限
      if (s.action) {
        btnActions.push(s.action)
      }
    })
    return btnActions
  }
  return []
}
/**
 * 处理配置 hidden true，且属于菜单路由的子页面时的方法
 * 根据 activeMenu 去识别父级路由
 * @param tmp  当前路由信息
 * @param menuList  当前后端返回路由的层级信息
 */
export function handleChildrenPage(tmp, menuList) {
  const parentMenu = tmp.meta && tmp.meta.activeMenu
  const findResult = menuList.find(m => m.webRouter === parentMenu)
  if (findResult) {
    //将父级的按钮权限赋值给子级
    tmp.meta.btnActions = handleMetaBtnActions(findResult.sub)
    return tmp
  }
  return null
}
/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param menuList
 */
export function filterAsyncRoutes(routes, menuList) {
  const res = []
  routes.forEach(route => {
    //去和前端权限路由去匹配，匹配到符合条件的，如果有下级，则继续往下匹配
    const tmp = { ...route }

    // 在 asyncRoutes 里面需要跳过和后端菜单对比的数据
    if (tmp.path === '*') {
      res.push(tmp)
    } else if (tmp.hidden) {
      const childrenPage = handleChildrenPage(tmp, menuList)
      if (childrenPage) {
        res.push(childrenPage)
      }
    } else {
      //拿后端返回的路由菜单层级和前端asyncRoutes路由做对比，并找出符合条件的数据，判断是否往下进行
      let menu = menuList.find(mu => mu.webRouter === tmp.path) || {}
      if (menu && menu.sub) {
        if (tmp.meta) {
          tmp.meta.title = menu.name
          //获取按钮权限，并携带到每个对应路由的meta里面
          tmp.meta.btnActions = handleMetaBtnActions(menu.sub)
        }
        //判断有下一层，则继续遍历
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, menu.sub)
        }
        res.push(tmp)
      }
    }
  })
  return res
}

const state = {
  //路由表 （侧边栏处有使用）
  routes: [],
  addRoutes: [],
  btnActions: [], //当前路由页面的操作权限
}

const mutations = {
  //储存添加后的路由
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BTN_ACTIONS: (state, btnActions) => {
    state.btnActions = btnActions
  },
}

const actions = {
  //生成路由表
  generateRoutes({ commit }, menuList) {
    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, menuList)
      // let accessedRoutes = asyncRoutes // 开发时，不使用后端返回的菜单

      //在没有概览的情况下，默认取后端返回菜单排第一位的路由地址
      let firstRouterPath = accessedRoutes[0].children[0].path
      accessedRoutes = [{ path: '/', redirect: firstRouterPath }, ...accessedRoutes]

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
    //服务500时跳过重定向，进行页面开发
    // commit('SET_ROUTES', [])
  },
  //更新当前页按钮权限
  updatePageBtnActions({ commit }, btnActions) {
    return new Promise(resolve => {
      commit('SET_BTN_ACTIONS', btnActions)
      resolve(btnActions)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
