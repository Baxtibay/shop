import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import ShopView from '../pages/ShopView.vue'
import ShopsPage from '../pages/ShopsPage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/shop/:id',
    name: 'shop',
    component: ShopView,
    props: true
  },
  {
    path: '/shops',
    name: 'shops',
    component: ShopsPage
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
