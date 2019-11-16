import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active-link',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/disk/:type?',
      name: 'disk',
      title: '全部',
      component: () => import(/* webpackChunkName: "disk" */ './views/disk.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/x-login.vue')
    }
  ]
})
