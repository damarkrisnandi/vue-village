import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { MdButton, MdIcon, MdCard, MdAvatar } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdCard);
Vue.use(MdAvatar);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
