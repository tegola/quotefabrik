<template>
  <div id="app">
    <AuthForm v-if="!user" />

    <div v-else>
      <input type="text" placeholder="Search quotes..." v-model="filter">
      <QuoteList v-if="quotes.length" :quotes="displayedQuotes" />
      <QuoteForm />
      <p>
        Save quote from anywhere. Drag the following link to your bookmark bar:
        <a :href="bookmarkletContent">Save quote</a>
      </p>
      <button @click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/firebase'
import AuthForm from '@/components/AuthForm'
import QuoteForm from '@/components/QuoteForm'
import QuoteList from '@/components/QuoteList'

const quotesCollection = db.collection('quotes')

export default {
  name: 'App',

  components: {
    AuthForm,
    QuoteForm,
    QuoteList
  },

  data: () => {
    return {
      filter: '',
      quotes: [],
    }
  },

  computed: {
    user() {
      return this.$root.user
    },

    displayedQuotes() {
      if (this.filter) {
        const re = new RegExp(this.filter, 'i')
        return this.quotes.filter(quote => quote.text.match(re))
      } else {
        return this.quotes
      }
    },

    bookmarkletContent() {
      return `javascript:(function(){location='${location.href}?i='+encodeURIComponent(document.getSelection().toString())})()`;
    }
  },

  watch: {
    user: {
      immediate: true,
      handler(user) {
        if (user) {
          this.$bind('quotes', quotesCollection.where('user_id', '==', user.uid))
        }
      }
    }
  },

  created() {
    // Handle bookmarklet input and clean url
    // FIXME: Doesn't work with IE (any version)
    const urlParams = new URLSearchParams(location.search)
    const params = Object.fromEntries(urlParams.entries())

    if (params.i) {
      const text = params.i
      const newUrl = location.href.replace(location.search, '')

      history.pushState({}, '', newUrl)

      console.log('bookmarklet text', text)
    }
  },

  methods: {
    logout() {
      auth.signOut()
    }
  }
}
</script>
