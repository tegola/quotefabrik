<template>
  <div id="app">
    <Auth v-if="!user" />

    <div v-else class="content">
      <Icon name="plus" />
      <Icon name="copy" />
      <Icon name="close" />
      <Icon name="trash" />
      <User />
      <Toolbar />
      <AddForm v-if="formOpen" />
      <Suggestion v-if="suggestionOpen" />
      <List />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState(['user', 'suggestionOpen', 'formOpen'])
  },

  created() {
    // Handle bookmarklet input and clean url
    // FIXME: Doesn't work with IE (any version)
    const urlParams = new URLSearchParams(location.search)
    const params = Object.fromEntries(urlParams.entries())

    if (params.t) {
      this.$store.commit('setBookmarkletText', params.t)
      this.$store.commit('setFormOpen', true)
      history.replaceState({}, '', location.href.replace(location.search, ''))
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

.list {
  margin-top: 1rem;
}
</style>
