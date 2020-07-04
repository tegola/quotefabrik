<template>
  <div class="user">
    <h1 class="user__greeting">Hello <strong>{{ user.displayName }}</strong>.</h1>
    <div>
      <Button
        class="user__signout"
        size="sm"
        variant="naked"
        @click="signout">
        Sign out
      </Button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '@/firebase'

export default {
  name: 'User',

  computed: {
    ...mapState(['user']),
  },

  methods: {
    signout() {
      auth.signOut()
    }
  }
}
</script>

<style scoped>
.user {
  padding: 2rem 0.5em 0 1rem;
  display: flex;
	align-items: baseline;
  justify-content: space-between;
}
.user__greeting {
  font-size: 1.15rem;
}
.user__signout {
  color: var(--muted);
}
.user__signout:hover {
  background-color: var(--muted);
  color: white;
}
</style>
