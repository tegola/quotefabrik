<template>
  <div class="toolbar">
    <div class="toolbar__search">
      <Icon
        name="search"
        class="toolbar__search-icon"
      />
      <input
        class="toolbar__search-input"
        type="text"
        placeholder="Search..."
        :value="filter"
        @keyup.esc="clear"
        @input="search">
      <Button
        v-if="filter"
        class="toolbar__search-clear"
        variant="naked"
        icon="close"
        icon-only
        title="Clear search"
        @click="clear"
      />
    </div>
    <transition name="slide-fade">
      <Button
        tag="router-link"
        v-if="!filter"
        to="/add"
        class="toolbar__add">
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
    ...mapState(['user', 'filter']),
  },

  methods: {
    search(event) {
      window.scrollTo(0, 0);
      this.$store.commit('setFilter', event.target.value)
    },

    clear() {
      window.scrollTo(0, 0);
      this.$store.commit('setFilter', '')
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
  padding: 0 1rem 0 2.5rem;
  border-radius: var(--radius-pill);
  background: rgba(var(--dark-rgb), 0.05);
  transition: var(--transition-duration);
  outline: none;
}
.toolbar__search-input:focus {
  background-color: transparent;
}
.toolbar__search-input::placeholder {
  color: var(--muted);
}

.toolbar__search-icon {
  position: absolute;
  top: 50%;
  margin-top: -0.8rem;
  left: 0.5rem;
  color: var(--muted);
}

.toolbar__search-clear {
  position: absolute;
  top: 50%;
  margin-top: -0.85rem;
  right: 0.4rem;
  padding: 0;
  width: 1.75rem;
  height: 1.75rem;
}
.toolbar__search-clear:focus {
  background-color: var(--dark);
  color: white;
}

/* Add */
.toolbar__add {
  font-size: 1rem;
  line-height: 1.5rem;
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 200ms ease-out;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(1rem);
  opacity: 0;
}
</style>
