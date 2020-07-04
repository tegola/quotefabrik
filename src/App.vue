<template>
  <div id="app">
    <Auth v-if="!user" />

    <template v-else>
      <User />
      <Toolbar />

      <AddForm v-if="formOpen" />

      <Suggestion v-if="suggestionOpen" />

      <template v-if="filteredQuotes.length">
        <Item
          v-for="quote in filteredQuotes"
          :key="quote.id"
          :quote="quote"
        />
      </template>
      <div v-else class="no-items">
        No quotes {{ filter ? 'found' : '' }}
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState([
      'user',
      'filter',
      'suggestionOpen',
      'formOpen'
      ]),
    ...mapGetters(['filteredQuotes']),
  },

  created() {
    // Handle bookmarklet input and clean url
    // FIXME: Doesn't work with IE (any version)
    const urlParams = new URLSearchParams(location.search)
    const params = Object.fromEntries(urlParams.entries())

    if (params.t) {
      this.$store.commit('setBookmarkletText', params.t)
      history.replaceState({}, '', location.href.replace(location.search, ''))
    }
  }
}
</script>

<style scoped>
/* No items */
.no-items {
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
  margin: 3em 0;
  color: var(--muted);
}
</style>
