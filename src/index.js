import Vue from 'vue'
import App from './app.vue'

import './assets/styles/test.css'
import './assets/styles/test.styl'
import './assets/images/IMG_20170125_083856.jpg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount()