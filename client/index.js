import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import creatRouter from './config/router'

Vue.use(VueRouter)

const router = creatRouter()

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
