import Vue from 'vue'
import App from '@/App'

import Auth from '@/components/Auth'
import List from '@/components/List'
import QuoteForm from '@/components/QuoteForm'
import Bookmarklet from '@/components/Bookmarklet'

import store from '@/store'

import '@/assets/css/index.css'

Vue.config.productionTip = false

Vue.component('Auth', Auth)
Vue.component('List', List)
Vue.component('QuoteForm', QuoteForm)
Vue.component('Bookmarklet', Bookmarklet)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
