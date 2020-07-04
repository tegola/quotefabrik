<template>
  <div class="auth">
    <h2 class="logo">{{ appName }}</h2>
    <div class="forms">
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
        <Button type="submit" :disabled="!canLogin">
          <Loader v-if="loading" size="sm" />
          <template v-else>Sign in</template>
        </Button>
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
        <Button type="submit" :disabled="!canRegister">
          <Loader v-if="loading" size="sm" />
          <template v-else>Register</template>
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'

const errorMsgs = {
  'auth/email-already-in-use': 'Error: this e-mail is already in use.',
  'auth/invalid-email': 'Error: invalid e-mail address.',
  'auth/user-disabled': 'Error: your account has been disabled.',
  'auth/user-not-found': "Error: account not found. Please register if you haven't already.",
  'auth/weak-password': 'Error: the specified password is too weak.',
  'auth/wrong-password': 'Error: wrong password'
}

export default {
  name: 'Auth',

  data: () => {
    return {
      action: 'login',
      loading: false,
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

      try {
        await auth.signInWithEmailAndPassword(
          this.loginModel.email,
          this.loginModel.password
        )

        this.$router.push('/')
      } catch (e) {
        alert(errorMsgs[e.code] || 'There was an error while trying to login.')
      } finally {
        this.loading = false
      }

    },

    async register() {
      this.loading = true

      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          this.registerModel.email,
          this.registerModel.password
        )
        await user.updateProfile({
          displayName: this.registerModel.name
        })
        this.$store.commit('setUser', user)

        this.$router.push('/')
      } catch (e) {
        alert(errorMsgs[e.code] || 'There was an error while trying to register.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.auth {
  width: 280px;
  margin: auto;
}
.logo {
  text-align: center;
  font-size: 1.5rem;
  margin: -2.5rem 0 1.5rem; /* Vertical centering */
}
.forms {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  padding: 1rem;
}
.tabs {
  display: flex;
  margin-bottom: 1.5rem;
}
.tab {
  cursor: pointer;
  flex: 1;
  text-align: center;
}
.tab__radio {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.01;
}
.tab__label {
  display: block;
  padding: 0.4rem 0;
  background-color: var(--light);
  transition: var(--transition-duration);
}
.tab:first-child .tab__label {
  border-top-left-radius: var(--radius-sm);
  border-bottom-left-radius: var(--radius-sm);
}
.tab:last-child .tab__label {
  border-top-right-radius: var(--radius-sm);
  border-bottom-right-radius: var(--radius-sm);
}
.tab__radio:checked ~ .tab__label {
  background-color: var(--dark);
  color: white;
}
.tab__radio:focus ~ .tab__label {
  box-shadow: 0 0 0 2px rgba(var(--dark-rgb), 0.2);
}
.button {
  --color: #fff;
  width: 100%;
}
</style>
