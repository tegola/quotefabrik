<template>
  <div class="search-input">
    <input
        class="form-input input"
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
  border-radius: 2rem;
  padding-left: 1rem;
  padding-right: 2rem;
}
.button {
  position: absolute;
  top: 0.45rem;
  right: 0.45rem;
  bottom: 0.45rem;
  padding: 0;
  border-radius: 50%;
  font-size: 1.9rem;
  font-weight: 200;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 0;
  letter-spacing: 0;
}
.button-icon {
  position: relative;
  top: -0.085em;
}
</style>