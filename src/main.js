import Vue from 'vue'
import App from './App.vue'
import router from './router'

// plugins
import registerBaseComponents from './plugins/register-base-components'
import registerBaseDirectives from './plugins/register-base-directives'

Vue.config.productionTip = false

Vue.use(registerBaseComponents)
Vue.use(registerBaseDirectives)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
