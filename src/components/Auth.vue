<template>
  <div class="auth">
    <h2 class="logo">{{ appName }}</h2>

    <div class="tabs">
      <label class="tab">
        <input class="tab__radio" type="radio" v-model="action" value="login">
        <div class="tab__label">Sign in</div>
      </label>
      <label class="tab">
        <input class="tab__radio" type="radio" v-model="action" value="register">
        <div class="tab__label">Register</div>
      </label>
    </div>

    <form v-if="action === 'login'" @submit.prevent="login">
      <div class="form-field">
        <label class="form-field__label" for="email">E-mail address</label>
        <input
          class="form-input"
          type="email"
          autocomplete="email"
          v-model="loginModel.email"
          id="email">
      </div>
      <div class="form-field">
        <label class="form-field__label" for="password">Password</label>
        <input
          class="form-input"
          type="password"
          autocomplete="password"
          v-model="loginModel.password"
          id="password">
      </div>
      <p v-if="loginError">{{ loginError }}</p>
      <button class="button" type="submit" :disabled="!canLogin">
        <Loader v-if="loading" />
        <template v-else>Sign in</template>
      </button>
    </form>

    <form v-if="action === 'register'" @submit.prevent="register">
      <div class="form-field">
        <label class="form-field__label" for="email">Name</label>
        <input
          class="form-input"
          type="text"
          autocomplete="given-name"
          v-model="registerModel.name"
          id="email">
      </div>
      <div class="form-field">
        <label class="form-field__label" for="email">E-mail address</label>
        <input
          class="form-input"
          type="email"
          autocomplete="email"
          v-model="registerModel.email"
          id="email">
      </div>
      <div class="form-field">
        <label class="form-field__label" for="password">Password</label>
        <input
          class="form-input"
          type="password"
          autocomplete="password"
          v-model="registerModel.password"
          id="password">
      </div>
      <p v-if="registerError">{{ registerError }}</p>
      <button class="button" type="submit" :disabled="!canRegister">
        <Loader v-if="loading" />
        <template v-else>Sign in</template>
      </button>
    </form>
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
  name: 'Auth',

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
    appName() {
      return process.env.VUE_APP_NAME
    },

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
        const { user } = await auth.createUserWithEmailAndPassword(
          this.registerModel.email,
          this.registerModel.password
        )
        await user.updateProfile({
          displayName: this.registerModel.name
        })
        this.$store.commit('setUser', user)
      } catch (e) {
        this.registerError = errorMsgs[e.code] || 'There was an error while trying to register.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.auth {
  width: 300px;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
}
.logo {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 1.25rem;
  margin: 0;
}
.tabs {
  background-color: white;
  border-radius: var(--radius);
  padding: 0.25rem;
  display: flex;
  margin-top: 1rem;
  margin-bottom: 2rem;
  box-shadow: var(--box-shadow);
  position: relative;
}
.tab {
  cursor: pointer;
  flex: 1;
  text-align: center;
}
.tab + .tab {
  margin-left: 0.25rem;
}
.tab__radio {
  position: absolute;
  opacity: 0.01;
}
.tab__label {
  display: block;
  padding: 0.25rem 0;
  border-radius: var(--radius-sm);
  transition: 200ms;
}
.tab__radio:not(:checked):focus ~ .tab__label {
  background-color: var(--light);
}
.tab__radio:checked ~ .tab__label {
  background-color: var(--dark);
  color: white;
}
.button {
  --color: #fff;
  width: 100%;
}
</style>
