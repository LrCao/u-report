import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import VueExcelEditor from 'vue-excel-editor'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueExcel from 'vue-element-excel'

import '@/components/style/index.scss'
import Components from '@/components/index.js'
Vue.use(Components)

Vue.use(Antd)
Vue.use(VueExcelEditor)
Vue.use(ElementUI)
Vue.use(VueExcel)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')