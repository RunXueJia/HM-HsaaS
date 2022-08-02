import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
//全局组件
import component from '@/components'
Vue.use(component)
//引入自定义指令
import * as directive from '@/directive'
Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key])
})
//引入过滤器
import * as filters from '@/filters'
// console.log(filters);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
