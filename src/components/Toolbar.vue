<template>
  <div class="toolbar">
    <div class="toolbar__search">
      <input
        class="toolbar__search-input"
        type="text"
        placeholder="Search..."
        :value="filter"
        @input="search">
      <button
        v-if="filter"
        class="button toolbar__search-clear"
        title="Clear search filter"
        @click="clear">
        <Icon name="close" />
      </button>
    </div>
     <transition name="slide-fade">
      <button
        v-if="!filter && !formOpen"
        type="button"
        class="button toolbar__add"
        title="Add"
        @click="openForm">
        New
      </button>
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
  --radius: 10rem;

  display: flex;
	align-items: stretch;
	justify-content: space-between;
  border-radius: var(--radius);
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
  border-radius: var(--radius);
  background: rgba(var(--dark-rgb), 0.05);
  transition: 200ms;
  outline: none;
}
.toolbar__search-input:focus {
  background-color: transparent;
  border-color: transparent;
  box-shadow: 0 0 0 2px rgba(var(--dark-rgb), 0.1) inset;
}
.toolbar__search-clear {
  position: absolute;
  padding: 0;
  top: 50%;
  margin-top: -0.75rem;
  right: 0.5rem;

  border-radius: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
}

/* Add */
.toolbar__add {
  border-radius: var(--radius);
  font-weight: 300;
  font-size: 1rem;
  margin-left: 0.5rem;
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
  transition: all .3s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(1rem);
  opacity: 0;
}
</style>
