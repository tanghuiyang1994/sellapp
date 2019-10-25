import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/Goods.vue';


Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods,
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: () => import('./pages/Evaluate.vue')
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('./pages/Merchant.vue')
    }, 
    {
      path: '/shopcar',
      name: 'shopcar',
      component: () => import('./pages/Shopcar.vue')
    }
  ]
})
