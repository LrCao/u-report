import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Report from '../views/report.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'report',
    component: Report
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/excel-editor',
    name: 'editor',
    component: () => import('./../views/excel-editor.vue')
  },
  {
    path: '/report-designer',
    name: 'designer',
    component: () => import('./../views/report-designer.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router