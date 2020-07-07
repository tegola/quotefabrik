<template>
  <div>
    <Toolbar />
    <Suggestion v-if="suggestionOpen && !filter" />
    <List />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapState(['suggestionOpen', 'filter'])
  }
}
</script>

<style scoped>
.list {
  margin-top: 1rem;
  margin-bottom: 3rem;
}
</style>
