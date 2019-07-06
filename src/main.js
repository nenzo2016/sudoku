import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible/flexible.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './app.css'
Vue.config.productionTip = false
Vue.use(Mint);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
