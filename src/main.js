import Vue from 'vue'
import App from '@/App'

import Button from '@/components/Button'
import CopyButton from '@/components/CopyButton'
import Icon from '@/components/Icon'
import Item from '@/components/Item'
import List from '@/components/List'
import Loader from '@/components/Loader'
import Suggestion from '@/components/Suggestion'
import Toolbar from '@/components/Toolbar'
import User from '@/components/User'

import store from '@/store'
import router from '@/router'

import '@/assets/css/index.css'

Vue.config.productionTip = false

Vue.component('Button', Button)
Vue.component('CopyButton', CopyButton)
Vue.component('Icon', Icon)
Vue.component('Item', Item)
Vue.component('List', List)
Vue.component('Loader', Loader)
Vue.component('Suggestion', Suggestion)
Vue.component('Toolbar', Toolbar)
Vue.component('User', User)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
