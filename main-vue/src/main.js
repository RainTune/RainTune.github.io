import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/reset.css'
import { registerApp } from './wujie-config/start'


Vue.config.productionTip = false

registerApp(Vue, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
