import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 没有重定向白名单

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      //---------------------处理用户已登录下的数据和信息
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        //每次页面加载都会更新当前页面的按钮权限
        await store.dispatch('permission/updatePageBtnActions', to.meta.btnActions || [])
        next()
      } else {
        try {
          //获取用户信息，这里需要菜单路由做处理
          const { webRouter } = await store.dispatch('user/getInfo')
          // 根据后端返回的菜单和现有的菜单做对比，生成可访问路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', webRouter)
          // console.log(accessRoutes);
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          //设置replace: true，这样导航将不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
