import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$BASE_API_URL = process.env.VUE_APP_BASE_API_URL;

new Vue({
  render: h => h(App),
}).$mount('#app')
