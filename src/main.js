import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Toast from '@/components/common/toast'
import LazyLoad from 'vue-lazyload'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
/* eslint-disable no-new */
Vue.use(Toast)
Vue.use(LazyLoad, {
  loading: require('@/assets/img/common/placeholder.png')
})
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
