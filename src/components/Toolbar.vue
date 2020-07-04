<template>
  <div class="toolbar">
    <div class="toolbar__search">
      <input
        class="toolbar__search-input"
        type="text"
        placeholder="Search..."
        :value="filter"
        @keyup.esc="clear"
        @input="search">
      <button
        v-if="filter"
        class="toolbar__search-clear"
        title="Clear search filter"
        @click="clear">
        <Icon name="close" />
      </button>
    </div>
     <transition name="slide-fade">
      <Button
        v-if="!filter && !formOpen"
        class="toolbar__add"
        title="Add"
        @click="openForm">
        New
      </Button>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Toolbar',

  computed: {
    ...mapState(['user', 'filter', 'formOpen']),
  },

  methods: {
    search(event) {
      window.scrollTo(0, 0);
      this.$store.commit('setFilter', event.target.value)
    },

    clear() {
      window.scrollTo(0, 0);
      this.$store.commit('setFilter', '')
    },

    openForm() {
      this.$store.commit('setFormOpen', true)
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
	align-items: stretch;
	justify-content: space-between;
  border-radius: var(--radius-pill);
  background-color: white;
  padding: 0.5rem;
  height: 56px;
  box-shadow: var(--box-shadow);
  position: sticky;
  top: 0.5rem;
  left: 1rem;
  right: 1rem;
  z-index: 1;
}
/* Search */
.toolbar__search {
  position: relative;
  flex: 1;
}
.toolbar__search-input {
  border: 0;
  height: 100%;
  width: 100%;
  font-size: 1.15rem;
  padding: 0 1rem;
  border-radius: var(--radius-pill);
  background: rgba(var(--dark-rgb), 0.05);
  transition: var(--transition-duration);
  outline: none;
}
.toolbar__search-input:focus {
  background-color: transparent;
}
.toolbar__search-clear {
  position: absolute;
  top: 50%;
  margin-top: -1rem;
  right: 0.5rem;
  padding: 0;
  border: 0;
  border-radius: 2rem;
  width: 2rem;
  height: 2rem;
  background-color: var(--light);
  outline: none;
}
.toolbar__search-clear:focus {
  background-color: var(--dark);
  color: white;
}

/* Add */
.toolbar__add {
  border-radius: var(--radius-pill);
  font-size: 1rem;
  margin-left: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.toobar__add.v-enter-active,
.toobar__add.v-leave-active {
  transition: 1000ms;
}
.toolbar__add.v-enter,
.toolbar__add.v-leave-to {
  opacity: 50;
}
.toolbar__add-icon {
  position: relative;
  top: -0.09em;
  left: 0.01em;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 200ms ease-out;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(1rem);
  opacity: 0;
}
</style>
