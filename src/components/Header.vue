<template>
  <div class="header">
		<div>
			<h1>Hello <strong>{{ user.displayName }}</strong>.</h1>
			<a href @click="logout">Log out</a>
		</div>
		<button class="button" type="button" title="Add">
			<div class="button-icon">&times;</div>
		</button>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '@/firebase'

export default {
	name: 'Header',

	computed: {
		...mapState(['user'])
	},

  methods: {
    logout() {
      auth.signOut()
    }
  }
}
</script>

<style scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid var(--black);
	padding-bottom: 1rem;
	margin-bottom: 1rem;
}
.button {
  border-radius: 50%;
  font-size: 2.5rem;
  font-weight: 100;
  width: 3rem;
  height: 3rem;
  letter-spacing: 0;
}
.button-icon {
	transform: rotate(45deg);
	position: relative;
	top: -0.07em;
	left: 0.05em;
}
h1 {
	margin: 0;
}
</style>