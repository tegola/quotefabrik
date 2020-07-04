<template>
  <div class="toolbar">
    <SearchInput />
    <button
      type="button"
      class="button toolbar__add"
      :class="formOpen ? 'invisible': null"
      title="Add"
      @click="openForm">
      <div class="toolbar__add-icon">+</div>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '@/firebase'

export default {
  name: 'Toolbar',

  computed: {
    ...mapState(['user', 'filter', 'formOpen']),
  },

  methods: {
    openForm() {
      this.$store.commit('setFormOpen', true)
    },

    signout() {
      auth.signOut()
    }
  }
}
</script>

<style scoped>
.toolbar {
  position: sticky;
  top: 0.5rem;
  left: 1rem;
  right: 1rem;
  display: flex;
	align-items: center;
	justify-content: space-between;
  border-radius: 10rem;
  background-color: white;
  padding: 0.5rem;
  box-shadow: var(--box-shadow);
}
.toolbar__add {
  border-radius: 50%;
  font-size: 2.25rem;
  font-weight: 200;
  width: 2.5rem;
  height: 2.5rem;
  letter-spacing: 0;
  text-align: center;
  padding: 0;
}
.toolbar__add-icon {
  position: relative;
  top: -0.09em;
  left: 0.01em;
}
</style>
