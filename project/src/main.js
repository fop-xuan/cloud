import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.less'
import './plugins'
import Vuerify from 'vuerify'
import VuerifyDirective from 'v-vuerify-next'

Vue.use(VuerifyDirective)
Vue.use(Vuerify)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
