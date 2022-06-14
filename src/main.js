import Vue from 'vue'
import App from './App.vue'
import router from './router'

// plugins
import registerBaseComponents from './plugins/register-base-components'

Vue.config.productionTip = false

Vue.use(registerBaseComponents)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
