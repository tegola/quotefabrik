<template>
  <div class="user">
    <h1 class="user__greeting">Hello <strong>{{ user.displayName }}</strong>.</h1>
    <a class="user__signout" type="button" @click="signout">Sign out</a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '@/firebase'

export default {
  name: 'User',

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
.user {
  padding: 0 0.5em 0 1rem;
  display: flex;
	align-items: baseline;
  justify-content: space-between;
}
.user__greeting {
  font-size: 1rem;
}
.user__signout {
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 0.25em 0.5em;
  border-radius: var(--radius-sm);
}
.user__signout:hover {
  background-color: var(--muted);
  color: white;
}
.user__signout:active {
  opacity: 0.75;
}
</style>
