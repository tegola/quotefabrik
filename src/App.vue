<template>
  <div id="app">
    <Auth v-if="!user" />

    <div v-else>
      <p>Hello {{ user.displayName || 'User' }}.</p>
      <input type="text" placeholder="Search quotes..." v-model="filter">
      <List v-if="quotes.length" :quotes="displayedQuotes" />
      <QuoteForm />
      <p>
        Save quote from anywhere. Drag the following link to your bookmark bar:
        <Bookmarklet />
      </p>
      <button @click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '@/firebase'

export default {
  name: 'App',

  data: () => {
    return {
      filter: ''
    }
  },

  computed: {
    ...mapState(['user', 'quotes']),

    displayedQuotes() {
      if (this.filter) {
        const re = new RegExp(this.filter, 'i')
        return this.quotes.filter(quote => quote.text.match(re))
      } else {
        return this.quotes
      }
    }
  },

  methods: {
    logout() {
      auth.signOut()
    }
  }
}
</script>
