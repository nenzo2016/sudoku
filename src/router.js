import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export const constantRoutes = [
  {
    path: '/',
    component: () => import('./components/Home.vue'),
    meta: {keepAlive: true}
  },
  {
    path: '/game',
    component: () => import('./components/Game.vue'),
  },
  {
    path: '/answer',
    component: () => import('./components/Game.vue'),
  },
  {
    path: '/404',
    component: () => import('./components/404.vue'),
  },
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
