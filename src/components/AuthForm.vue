<template>
	<div>
		<label>
			<input type="radio" v-model="action" value="login">
			Login
		</label>
		<label>
			<input type="radio" v-model="action" value="register">
			Register
		</label>

		<form v-if="action === 'login'" @submit.prevent="login">
			<div class="form-field">
				<label class="form-field__label" for="email">E-mail address</label>
				<input type="email" v-model="loginModel.email" id="email">
			</div>
			<div class="form-field">
				<label class="form-field__label" for="password">Password</label>
				<input type="password" v-model="loginModel.password" id="password">
			</div>
			<p v-if="loginError">{{ loginError }}</p>
			<button type="submit" :disabled="!canLogin">Sign in</button>
		</form>

		<form v-if="action === 'register'" @submit.prevent="register">
			<div class="form-field">
				<label class="form-field__label" for="email">Name</label>
				<input type="text" v-model="registerModel.name" id="email">
			</div>
			<div class="form-field">
				<label class="form-field__label" for="email">E-mail address</label>
				<input type="email" v-model="registerModel.email" id="email">
			</div>
			<div class="form-field">
				<label class="form-field__label" for="password">Password</label>
				<input type="password" v-model="registerModel.password" id="password">
			</div>
			<p v-if="registerError">{{ registerError }}</p>
			<button type="submit" :disabled="!canRegister">Register</button>
		</form>

		<div v-if="loading">Loading...</div>
	</div>
</template>

<script>
import { auth } from '@/firebase'

const errorMsgs = {
	'auth/email-already-in-use': 'Error: this e-mail is already in use.',
	'auth/invalid-email': 'Error: invalid e-mail address.',
	'auth/user-disabled': 'Error: your user has been disabled.',
	'auth/user-not-found': 'Error: user not found.',
	'auth/weak-password': 'Error: the specified password is too weak.',
	'auth/wrong-password': 'Error: wrong password'
}

export default {
	name: 'AuthForm',

	data: () => {
		return {
			action: 'login',
			loading: false,
			loginError: '',
			registerError: '',
			loginModel: {
				email: '',
				password: ''
			},
			registerModel: {
				name: '',
				email: '',
				password: ''
			},
		}
	},

	computed: {
		canLogin() {
			return Object.values(this.loginModel).every(v => v)
		},

		canRegister() {
			return Object.values(this.registerModel).every(v => v)
		}
	},

	methods: {
		async login() {
			this.loading = true
			this.loginError = ''

			try {
				await auth.signInWithEmailAndPassword(
					this.loginModel.email,
					this.loginModel.password
				)
				this.loginModel.email = ''
				this.loginModel.password = ''
			} catch (e) {
				this.loginError = errorMsgs[e.code] || 'There was an error while trying to login.'
			} finally {
				this.loading = false
			}

		},

		async register() {
			this.loading = true
			this.registerError = ''

			try {
				const user = await auth.createUserWithEmailAndPassword(
					this.registerModel.email,
					this.registerModel.password
				)
				await user.updateProfile({
					displayName: this.registerModel.name
				})
				this.registerUser.name = ''
				this.registerModel.email = ''
				this.registerModel.password = ''
			} catch (e) {
				this.registerError = errorMsgs[e.code] || 'There was an error while trying to register.'
			} finally {
				this.loading = false
			}
		}
	}
}
</script>