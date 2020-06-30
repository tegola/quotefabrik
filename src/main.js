import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import App from '@/App'
import { auth } from '@/firebase'
import '@/assets/css/index.css'

Vue.config.productionTip = false
Vue.use(firestorePlugin)

new Vue({
  render: h => h(App),

  data() {
    return {
      // We keep the user on the root node to avoid using a store
      user: null
    }
  },

  created() {
    auth.onAuthStateChanged(user => {
      this.user = user
    })
  },
}).$mount('#app')
