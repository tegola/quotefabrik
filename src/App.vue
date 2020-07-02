<template>
  <div id="app">
    <Auth v-if="!user" />

    <div v-else>
      <Header />

      <SearchInput />

      <List
        v-if="filteredQuotes.length"
        :quotes="filteredQuotes"
      />

      <QuoteForm />

      <p class="bookmarklet">
        Tip: Save quote from anywhere. Drag the following element to your bookmarks bar:<br>
        <Bookmarklet />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState(['user']),
    ...mapGetters(['filteredQuotes']),
  }
}
</script>
