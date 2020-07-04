<template>
  <div class="search-input">
    <input
        type="text"
        placeholder="Search quotes..."
        :value="filter"
        @input="applyFilter">
    <button v-if="filter" class="button" title="Clear search filter" @click="clear">
      <span class="button-icon">&times;</span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchInput',

  computed: {
    ...mapState(['filter'])
  },

  methods: {
    applyFilter(event) {
      this.commit(event.target.value.trim())
    },

    clear() {
      this.commit('')
    },

    commit(value) {
      this.$store.commit('setFilter', value)
    }
  }

}
</script>

<style scoped>
.search-input {
  position: relative;
}
.input {
  padding-left: 1rem;
  padding-right: 2rem;
}
.button {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  bottom: 0.4rem;
  padding: 0;
  border-radius: calc(var(--radius) / 2);
  font-size: 2rem;
  font-weight: 200;
  width: 1.6rem;
  height: 1.6rem;
  line-height: 0;
  letter-spacing: 0;
}
.button-icon {
  position: relative;
  top: -0.085em;
}
</style>
