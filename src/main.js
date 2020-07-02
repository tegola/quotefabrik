import Vue from 'vue'
import App from '@/App'

import Auth from '@/components/Auth'
import Bookmarklet from '@/components/Bookmarklet'
import CopyButton from '@/components/CopyButton'
import Header from '@/components/Header'
import List from '@/components/List'
import QuoteForm from '@/components/QuoteForm'
import SearchInput from '@/components/SearchInput'
import Spinner from '@/components/Spinner'

import store from '@/store'

import '@/assets/css/index.css'

Vue.config.productionTip = false

Vue.component('Auth', Auth)
Vue.component('Bookmarklet', Bookmarklet)
Vue.component('CopyButton', CopyButton)
Vue.component('Header', Header)
Vue.component('List', List)
Vue.component('QuoteForm', QuoteForm)
Vue.component('SearchInput', SearchInput)
Vue.component('Spinner', Spinner)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
