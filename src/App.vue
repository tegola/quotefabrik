<template>
  <div id="app">
    <transition name="fade">
      <User v-if="user" />
    </transition>

    <transition :name="transition" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  data() {
    return {
      transition: ''
    }
  },

  computed: {
    ...mapState(['user']),
  },

  watch: {
    '$route' (to, from) {
      if (to.path === '/auth' || from.path === '/auth') {
        this.transition = 'fade'
      } else {
        const toDepth = to.path.length
        const fromDepth = from.path.length

        this.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  },

  mounted() {
    this.bindKeyToUrl('n', '/add')
    this.bindKeyToUrl('l', '/')
  },

  methods: {
    bindKeyToUrl(key, path) {
      document.body.addEventListener('keyup', e => {
        const isInput = ['input', 'textarea'].includes(e.target.tagName.toLowerCase())
        const alreadyThere = this.$route.path === path

        if (e.key === key && !isInput && !alreadyThere) {
          this.$router.push(path)
        }
      })
    }
  }
}
</script>

<style scoped>
#app {
  min-height: 100%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
}
@media screen and (min-width: 768px) {
  #app {
    margin-left: auto;
    margin-right: auto;
    width: 700px;
  }
}

.fade-enter-active,
.fade-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: var(--transition);
}
.fade-leave-to,
.fade-enter {
  opacity: 0;
}
.slide-left-leave-to,
.slide-right-enter {
  transform: translateX(-100px);
  opacity: 0;
}
.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
