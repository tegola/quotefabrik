<template>
  <div v-if="quotes.length">
    <Item
      v-for="quote in quotes"
      :key="quote.id"
      :quote="quote"
    />
  </div>
  <div v-else class="no-items">
    No quotes {{ filter ? 'found' : '' }}
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'List',

  computed: {
    ...mapState(['filter']),
    ...mapGetters({
      quotes: 'filteredQuotes'
    }),
  }
}
</script>

<style scoped>
.no-items {
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
  margin: 3em 0;
  color: var(--muted);
}
</style>
