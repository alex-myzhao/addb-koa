import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import App from './App.vue'
import router from './router/index'
import store from './store/index.js'
import ClientConfig from './client-config'

// self-defined styles
import '@/styles/style.css'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

axios.defaults.baseURL = `http://${ClientConfig.BASE_URL}`
