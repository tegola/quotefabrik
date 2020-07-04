import Vue from 'vue'
import App from '@/App'

import AddForm from '@/components/AddForm'
import Auth from '@/components/Auth'
import CopyButton from '@/components/CopyButton'
import Item from '@/components/Item'
import Loader from '@/components/Loader'
import SearchInput from '@/components/SearchInput'
import Suggestion from '@/components/Suggestion'
import Toolbar from '@/components/Toolbar'
import User from '@/components/User'

import store from '@/store'

import '@/assets/css/index.css'

Vue.config.productionTip = false

Vue.component('AddForm', AddForm)
Vue.component('Auth', Auth)
Vue.component('CopyButton', CopyButton)
Vue.component('Item', Item)
Vue.component('Loader', Loader)
Vue.component('SearchInput', SearchInput)
Vue.component('Suggestion', Suggestion)
Vue.component('Toolbar', Toolbar)
Vue.component('User', User)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
