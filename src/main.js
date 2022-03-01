import Vue from 'vue'
/**
 * https://jerryzou.com/posts/aboutNormalizeCss/
 * CSS重置的一个现代替代方案
 */
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import vfilters from '@/utils/vfilters.js' // 引入过滤方法
import directives from '@/utils/directives.js'
import Pagination from './components/Pagination'
import PageHeader from './components/PageHeader'
import { SearchLabel } from './components/SearchBlock'
import moment from 'moment'
import * as exportExcel from '@/utils/exportExcel.js'
import * as utils from '@/utils/index.js'
import * as constant from '@/utils/constant.js'
window.adr = {
  moment,
  exportExcel,
  utils: utils,
  constant
}

for (const key in vfilters) {
  Vue.filter(key, vfilters[key])
}
// 注册自定义指令
for (const key in directives) {
  Vue.directive(key, directives[key])
}
Vue.use(ElementUI, { size: 'small' })
Vue.component('Pagination', Pagination)// 全局引入分页组件
Vue.component('PageHeader', PageHeader)// 全局引入页头组件
Vue.component('SearchLabel', SearchLabel)// 全局引入搜索模块样式
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
