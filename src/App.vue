<template>
  <div id="app">
    <template v-if="user">
      <User />
      <Toolbar />
    </template>

    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState(['user'])
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

.content {
  flex: 1;
  padding-bottom: 3rem; /* Some space at the end */
}
</style>
