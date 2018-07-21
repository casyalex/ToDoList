import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import creatRouter from './config/router'

Vue.use(VueRouter)

const router = creatRouter()

router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
  // if (to.fullPath === '/app') {
  //   next({ path: 'login' })
  // } else {
  //   next()
  // }
})

router.beforeResolve((to, from, next) => {
  console.log('before Resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
